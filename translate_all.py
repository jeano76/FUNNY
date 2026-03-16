#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML 파일 자동 번역 스크립트
모든 루트 HTML 파일을 19개 언어로 번역해서 각 언어 폴더에 배치
"""

import os
import re
from pathlib import Path
from html.parser import HTMLParser
from googletrans import Translator

# 언어 매핑
LANGUAGES = {
    'en': 'English',
    'jp': 'Japanese',      # jp는 내부적으로 ja로 처리
    'zh': 'Chinese',       # Simplified Chinese
    'es': 'Spanish',
    'de': 'German',
    'fr': 'French',
    'ru': 'Russian',
    'pt': 'Portuguese',
    'id': 'Indonesian',
    'hi': 'Hindi',
    'vi': 'Vietnamese',
    'th': 'Thai',
    'tr': 'Turkish',
    'it': 'Italian',
    'nl': 'Dutch',
    'ar': 'Arabic',
    'mn': 'Mongolian',
    'la': 'Latin'
}

# 언어 코드 매핑 (googletrans용)
LANG_MAPPING = {
    'jp': 'ja',  # 내부적으로 ja 사용
    'zh': 'zh-CN',  # Simplified Chinese
}

class TextExtractor(HTMLParser):
    """HTML에서 번역 가능한 텍스트만 추출"""
    def __init__(self):
        super().__init__()
        self.texts = []
        self.skip_tags = {'script', 'style', 'meta', 'title'}
        self.current_tag = None
        self.title_text = None
        self.in_tag = False

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag == 'title':
            self.in_tag = True

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_tag = False
        self.current_tag = None

    def handle_data(self, data):
        text = data.strip()
        # 텍스트가 있고, 스크립트/스타일 태그가 아니고, 공백만 아닐 때
        if text and len(text) > 1:
            self.texts.append(text)

def extract_translatable_texts(html_content):
    """HTML에서 번역 가능한 텍스트 추출"""
    texts = {}

    # title 추출
    title_match = re.search(r'<title>([^<]+)</title>', html_content, re.IGNORECASE)
    if title_match:
        texts['_title'] = title_match.group(1)

    # description 추출
    desc_match = re.search(r'<meta name="description" content="([^"]+)"', html_content, re.IGNORECASE)
    if desc_match:
        texts['_description'] = desc_match.group(1)

    # og:title 추출
    og_title_match = re.search(r'<meta property="og:title" content="([^"]+)"', html_content, re.IGNORECASE)
    if og_title_match:
        texts['_og_title'] = og_title_match.group(1)

    # og:description 추출
    og_desc_match = re.search(r'<meta property="og:description" content="([^"]+)"', html_content, re.IGNORECASE)
    if og_desc_match:
        texts['_og_description'] = og_desc_match.group(1)

    # 본문 텍스트 추출 (정규식으로 >와 < 사이의 텍스트)
    # 하지만 HTML 태그와 속성은 제외
    body_match = re.search(r'<body[^>]*>(.*)</body>', html_content, re.IGNORECASE | re.DOTALL)
    if body_match:
        body = body_match.group(1)
        # 스크립트 태그 제거
        body = re.sub(r'<script[^>]*>.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
        # 스타일 태그 제거
        body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.DOTALL | re.IGNORECASE)
        # HTML 태그 제거하면서 텍스트 추출
        text_content = re.sub(r'<[^>]+>', '\n', body)
        # 텍스트 정렬
        lines = [line.strip() for line in text_content.split('\n') if line.strip() and len(line.strip()) > 1]
        for i, line in enumerate(lines):
            texts[f'_body_{i}'] = line

    return texts

def translate_text(text, target_lang):
    """텍스트를 대상 언어로 번역"""
    try:
        translator = Translator()
        # 언어 코드 변환
        lang_code = LANG_MAPPING.get(target_lang, target_lang)
        result = translator.translate(text, src_language='ko', dest_language=lang_code)
        return result['text']
    except Exception as e:
        print(f"  ⚠️  번역 실패 ({target_lang}): {text[:30]}... - {e}")
        return text

def replace_text_in_html(html_content, original_texts, translated_texts):
    """HTML에서 원본 텍스트를 번역된 텍스트로 교체"""
    result = html_content

    # title 교체
    if '_title' in original_texts and '_title' in translated_texts:
        result = re.sub(
            r'<title>[^<]+</title>',
            f"<title>{translated_texts['_title']}</title>",
            result,
            flags=re.IGNORECASE
        )

    # description 교체
    if '_description' in original_texts and '_description' in translated_texts:
        result = re.sub(
            r'(<meta name="description" content=")[^"]+(")',
            f'\\1{translated_texts["_description"]}\\2',
            result,
            flags=re.IGNORECASE
        )

    # og:title 교체
    if '_og_title' in original_texts and '_og_title' in translated_texts:
        result = re.sub(
            r'(<meta property="og:title" content=")[^"]+(")',
            f'\\1{translated_texts["_og_title"]}\\2',
            result,
            flags=re.IGNORECASE
        )

    # og:description 교체
    if '_og_description' in original_texts and '_og_description' in translated_texts:
        result = re.sub(
            r'(<meta property="og:description" content=")[^"]+(")',
            f'\\1{translated_texts["_og_description"]}\\2',
            result,
            flags=re.IGNORECASE
        )

    # 본문 텍스트 교체 (역순으로 하면 인덱스 꼬임 방지)
    body_keys = sorted([k for k in original_texts.keys() if k.startswith('_body_')],
                      key=lambda x: int(x.split('_')[-1]), reverse=True)

    for key in body_keys:
        if key in translated_texts:
            # 원본 텍스트를 정규식으로 검색해서 교체 (최대 1회)
            original = re.escape(original_texts[key])
            result = re.sub(
                f'(>[\\s\\n]*)({original})([\\s\\n]*<)',
                f'\\1{translated_texts[key]}\\3',
                result,
                count=1
            )

    return result

def process_html_file(file_path, target_lang):
    """HTML 파일을 대상 언어로 번역"""
    with open(file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 한국어 버전에서 번역 가능한 텍스트 추출
    original_texts = extract_translatable_texts(html_content)

    # 각 텍스트를 번역
    translated_texts = {}
    for key, text in original_texts.items():
        translated_texts[key] = translate_text(text, target_lang)

    # HTML에서 텍스트 교체
    translated_html = replace_text_in_html(html_content, original_texts, translated_texts)

    # lang 속성 업데이트
    lang_code = LANG_MAPPING.get(target_lang, target_lang)
    translated_html = re.sub(
        r'<html lang="[^"]*"',
        f'<html lang="{lang_code}"',
        translated_html,
        flags=re.IGNORECASE
    )

    return translated_html

def main():
    root_dir = Path('/home/hyuckjoolee/marketMBTI')

    # 루트 HTML 파일들
    html_files = [f for f in root_dir.glob('*.html') if f.is_file()]

    print(f"🌐 HTML 파일 자동 번역 시작")
    print(f"📁 찾은 파일 수: {len(html_files)}")
    print(f"🗣️  대상 언어: {len(LANGUAGES)}개")
    print()

    for target_lang, lang_name in LANGUAGES.items():
        print(f"\n{'='*60}")
        print(f"🔄 {lang_name} ({target_lang}) 번역 중...")
        print(f"{'='*60}")

        # 언어 폴더 생성
        lang_dir = root_dir / target_lang
        lang_dir.mkdir(exist_ok=True)

        for html_file in html_files:
            file_name = html_file.name
            print(f"  📄 {file_name}...", end=' ')

            try:
                # HTML 번역
                translated_html = process_html_file(str(html_file), target_lang)

                # 번역된 파일 저장
                output_file = lang_dir / file_name
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(translated_html)

                print("✅")
            except Exception as e:
                print(f"❌ 오류: {e}")

    print(f"\n{'='*60}")
    print(f"✨ 번역 완료!")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
