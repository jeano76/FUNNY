#!/usr/bin/env python3
import re

# Read the file
with open('./js/translations.js', 'r', encoding='utf-8') as f:
    content = f.read()

# These are the compatChart translations for each language
translations = {
    'ko': "mainTitle: '성격 유형 16×16 전체 궁합표', subtitle: '셀을 클릭하면 상세 궁합을 확인할 수 있어요!', highlightLabel: '내 유형 하이라이트:', noSelection: '-- 선택 없음 --', scoreLabel: '궁합 점수:', legend90: '90+ 천생연분', legend80: '80-89 환상 궁합', legend70: '70-79 좋은 인연', legend60: '60-69 보통', legend50: '50-59 노력 필요', legendBelow50: '50 미만 도전적', clickHint: '* 셀 클릭 시 상세 궁합 페이지로 이동합니다.', compatButton: '1:1 궁합 보기 💕', startButton: '테스트 시작하기'",
    'en': "mainTitle: 'Personality Type 16×16 Full Compatibility Chart', subtitle: 'Click on a cell to see detailed compatibility!', highlightLabel: 'Highlight My Type:', noSelection: '-- Select --', scoreLabel: 'Compatibility Score:', legend90: '90+ Perfect Match', legend80: '80-89 Excellent Match', legend70: '70-79 Good Connection', legend60: '60-69 Average', legend50: '50-59 Needs Effort', legendBelow50: 'Below 50 Challenging', clickHint: '* Click a cell to see detailed compatibility.', compatButton: 'See 1:1 Compatibility 💕', startButton: 'Start Test'",
}

# Find each language section and add compatChart before challenges
# Pattern: look for "challenges: {" and insert compatChart before it

for lang, trans_content in translations.items():
    # Find the section for this language
    pattern = rf'({lang}: \{{[^]*?)(challenges: \{{)'
    replacement = rf'\1compatChart: {{ {trans_content} }},\n\n    \2'
    
    # Try to make the replacement
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content != content:
        content = new_content
        print(f"✅ Added compatChart for {lang}")
    else:
        print(f"⚠️ Could not add compatChart for {lang}")

# Write back
with open('./js/translations.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Done!")
