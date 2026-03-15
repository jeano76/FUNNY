#!/usr/bin/env python3
"""Fix root HTML pages with advertising guidelines"""

import os
import re

ROOT_PAGES = [
    'about.html', 'careers.html', 'compat.html', 'compat-chart.html',
    'fortune.html', 'group.html', 'privacy.html', 'result.html',
    'situations.html', 'speed.html'
]

def fix_file(filepath):
    """Fix a single HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # 1. Add auto-lang.js if not already present
    if 'auto-lang.js' not in content:
        pattern = r'(<script async src="https://pagead2\.googlesyndication\.com/.*?</script>)'
        replacement = r'\1\n\n  <!-- Auto Language Detection -->\n  <script src="js/auto-lang.js"></script>'
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
        (r'MBTI Test', 'Personality Test'),
        (r'MBTI Animal', 'Animal Personality'),
        (r'your MBTI', 'your personality type'),
        (r'discover your MBTI', 'discover your personality type'),
        (r'\(MBTI\)', ''),
        (r'MBTI Personalities', '16 Personalities'),
        (r'MBTI 동물', '동물 성격'),
        (r'MBTI', '성격 유형'),
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

    print("Processing root HTML pages...")

    for page in ROOT_PAGES:
        if not os.path.exists(page):
            print(f"  ⊘ {page} (not found)")
            continue

        if fix_file(page):
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
