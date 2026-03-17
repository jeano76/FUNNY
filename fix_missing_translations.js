#!/usr/bin/env node

/**
 * 언어 폴더의 HTML 파일들을 스캔하여
 * data-i18n 요소의 기본값을 해당 언어의 번역으로 업데이트
 */

const fs = require('fs');
const path = require('path');

// translations.js 로드
const translationsContent = fs.readFileSync('./js/translations.js', 'utf-8');

// TRANSLATIONS 객체 추출 (간단한 방법)
function extractTranslations() {
  const translations = {};

  // 각 언어별 섹션 추출
  const langs = ['ko', 'en', 'ja', 'zh', 'es', 'de', 'fr', 'ru', 'pt', 'id', 'hi', 'vi', 'th', 'tr', 'it', 'nl', 'ar', 'mn', 'la'];

  langs.forEach(lang => {
    // 정규식으로 해당 언어 섹션 추출 (대략적)
    const pattern = new RegExp(`"${lang}":\\s*\\{([^]*?)\\n  \\}(?=,|\\n)`, 's');
    const match = translationsContent.match(pattern);

    if (match) {
      translations[lang] = {};

      // 간단한 파싱: "key": "value" 형식
      const keyValuePattern = /"([^"]+)":\s*"([^"]*(?:\\.[^"]*)*)"|\n\s*"([^"]+)":\s*\{/g;
      let m;
      let currentSection = '';

      while ((m = keyValuePattern.exec(match[1])) !== null) {
        if (m[3]) {
          currentSection = m[3];
          translations[lang][currentSection] = {};
        } else if (m[1] && m[2]) {
          const key = m[1];
          let value = m[2].replace(/\\"/g, '"').replace(/\\\\/g, '\\');

          if (currentSection) {
            if (!translations[lang][currentSection]) translations[lang][currentSection] = {};
            translations[lang][currentSection][key] = value;
          } else {
            translations[lang][key] = value;
          }
        }
      }
    }
  });

  return translations;
}

console.log('🔄 번역 데이터 추출 중...');
const translations = extractTranslations();

// 언어별 폴더와 파일 매핑
const langMap = {
  en: 'en',
  ja: 'jp',
  'zh-CN': 'zh', 'zh-TW': 'zh',
  es: 'es',
  de: 'de',
  fr: 'fr',
  ru: 'ru',
  pt: 'pt',
  id: 'id',
  hi: 'hi',
  vi: 'vi',
  th: 'th',
  tr: 'tr',
  it: 'it',
  nl: 'nl',
  ar: 'ar',
  mn: 'mn',
  la: 'la'
};

const langFolders = ['en', 'jp', 'zh', 'es', 'de', 'fr', 'ru', 'pt', 'id', 'hi', 'vi', 'th', 'tr', 'it', 'nl', 'ar', 'mn', 'la'];
const pages = ['result.html', 'quiz.html', 'index.html', 'about.html', 'careers.html', 'compare.html', 'compat.html'];

let fixedCount = 0;
const fixes = [];

// 재귀적으로 data-i18n 찾기
function findMissingTranslations(content, lang) {
  const missing = [];

  // data-i18n="key.subkey" 패턴 찾기
  const pattern = /data-i18n="([^"]+)"/g;
  let match;

  while ((match = pattern.exec(content)) !== null) {
    const key = match[1];
    const parts = key.split('.');

    let value = translations[lang];
    for (let part of parts) {
      if (value) value = value[part];
    }

    if (value) {
      missing.push({ key, value });
    }
  }

  return missing;
}

console.log('\n📝 각 언어 폴더 확인 중...\n');

langFolders.forEach(langFolder => {
  const folderPath = path.join('.', langFolder);

  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️ ${langFolder}/: 폴더 없음`);
    return;
  }

  // HTML 파일 확인
  pages.forEach(page => {
    const filePath = path.join(folderPath, page);

    if (!fs.existsSync(filePath)) {
      return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    const original = content;

    // data-i18n 찾기
    const pattern = /data-i18n="([^"]+)">([^<]*)</g;
    let m;
    let updateCount = 0;

    while ((m = pattern.exec(original)) !== null) {
      const key = m[1];
      const defaultText = m[2];
      const parts = key.split('.');

      // 번역 찾기
      let translation = translations[langFolder];
      for (let part of parts) {
        if (translation) translation = translation[part];
      }

      // 번역이 있고 기본값이 한글이면 업데이트
      if (translation && defaultText && defaultText.match(/[가-힣]/)) {
        const oldSnippet = `data-i18n="${key}">${defaultText}<`;
        const newSnippet = `data-i18n="${key}">${translation}<`;
        content = content.replace(oldSnippet, newSnippet);
        updateCount++;
      }
    }

    // 파일 업데이트
    if (updateCount > 0) {
      fs.writeFileSync(filePath, content);
      fixedCount += updateCount;
      fixes.push(`  ${langFolder}/${page}: ${updateCount}개 수정`);
      console.log(`✅ ${langFolder}/${page}: ${updateCount}개 수정`);
    }
  });
});

console.log('\n' + '═'.repeat(50));
console.log(`📊 총 ${fixedCount}개 미번역 요소 수정 완료!`);
console.log('═'.repeat(50));
