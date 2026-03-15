#!/usr/bin/env python3
"""
Fix advertising guidelines for all language files:
1. Add auto-lang.js script
2. Update MBTI references (except in disclaimer)
"""

import os
import re

LANGUAGES = ['id', 'hi', 'vi', 'th', 'tr', 'it', 'nl']
PAGES = [
    'index.html', 'quiz.html', 'about.html', 'privacy.html',
    'careers.html', 'compat.html', 'compat-chart.html', 'fortune.html',
    'group.html', 'result.html', 'situations.html', 'speed.html'
]

def fix_file(filepath):
    """Fix a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Add auto-lang.js if not already present
    if 'auto-lang.js' not in content:
        # Find AdSense script and add auto-lang.js after it
        pattern = r'(<script async src="https://pagead2\.googlesyndication\.com/.*?</script>)'
        replacement = r'\1\n\n  <!-- Auto Language Detection -->\n  <script src="../js/auto-lang.js"></script>'
        content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # 2. Find disclaimer location to avoid replacing there
    disclaimer_match = re.search(r'<div class="disclaimer"', content)
    if disclaimer_match:
        disclaimer_start = disclaimer_match.start()
        before_disclaimer = content[:disclaimer_start]
        disclaimer_section = content[disclaimer_start:]
    else:
        before_disclaimer = content
        disclaimer_section = ''

    # Apply MBTI replacements only to before_disclaimer section
    replacements = [
        (r'MBTI テスト', '性格テスト'),
        (r'MBTI 테스트', '성격 유형 테스트'),
        (r'나의 MBTI', '나의 성격 유형'),
        (r'발견.*MBTI', '성격 유형 발견'),
        (r'MBTI Test', 'Personality Test'),
        (r'MBTI Animal', 'Animal Personality'),
        (r'your MBTI', 'your personality type'),
        (r'discover your MBTI', 'discover your personality type'),
        (r'\(MBTI\)', ''),  # Remove (MBTI) from text
        (r'MBTI Personalities', '16 Personalities'),
        (r'MBTI 동물', '동물 성격'),
        (r'MBTI', '성격 유형'),  # Fallback replacement
    ]

    for old, new in replacements:
        before_disclaimer = re.sub(old, new, before_disclaimer, flags=re.IGNORECASE)

    # Reconstruct content
    content = before_disclaimer + disclaimer_section

    # Write back if changed
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    count = 0
    updated = 0

    for lang in LANGUAGES:
        print(f"Processing language: {lang}")

        for page in PAGES:
            filepath = os.path.join(lang, page)

            if not os.path.exists(filepath):
                print(f"  ⊘ {page} (not found)")
                continue

            if fix_file(filepath):
                print(f"  ✓ {page} (updated)")
                updated += 1
            else:
                print(f"  • {page} (no changes)")

            count += 1

    print(f"\n✅ Completed!")
    print(f"   Processed: {count} files")
    print(f"   Updated: {updated} files")

if __name__ == '__main__':
    main()
