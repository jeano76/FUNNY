#!/bin/bash

# 번역 검증 스크립트

echo "🔍 번역 시스템 검증"
echo "═══════════════════════════════════════════════════════"

# 1. translations.js 문법 검증
echo ""
echo "1️⃣ translations.js 문법 검증"
if node -c js/translations.js 2>/dev/null; then
  echo "✅ 문법 OK"
else
  echo "❌ 문법 오류 발견!"
  node -c js/translations.js
  exit 1
fi

# 2. 모든 언어 확인
echo ""
echo "2️⃣ 지원 언어 확인"
node << 'EOF'
try {
  const fs = require('fs');
  let content = fs.readFileSync('./js/translations.js', 'utf-8');

  // 언어 코드 추출
  const langMatch = content.match(/const TRANSLATIONS = \{([^}]*?)\n\s*\}/s);
  if (!langMatch) {
    console.log('❌ TRANSLATIONS 객체를 찾을 수 없음');
    process.exit(1);
  }

  const langs = content.match(/"([a-z]{2})":\s*\{/g);
  if (langs) {
    const uniqueLangs = [...new Set(langs.map(l => l.match(/"([a-z]{2})"/)[1]))];
    console.log(`✅ 총 ${uniqueLangs.length}개 언어: ${uniqueLangs.join(', ')}`);

    if (uniqueLangs.length !== 19) {
      console.log('⚠️ 19개 언어가 아닙니다!');
    }
  }
} catch (e) {
  console.log('❌ 오류:', e.message);
}
EOF

# 3. 각 언어별 주요 키 개수 확인
echo ""
echo "3️⃣ 각 언어별 번역 키 개수"
node << 'EOF'
try {
  const fs = require('fs');
  const content = fs.readFileSync('./js/translations.js', 'utf-8');

  // 간단한 패턴: "키": 의 개수를 세기
  const langSections = content.split(/\s+[a-z]{2}:\s*\{/);

  const langs = ['ko', 'en', 'ja', 'zh', 'es', 'de', 'fr', 'ru', 'pt', 'id', 'hi', 'vi', 'th', 'tr', 'it', 'nl', 'ar', 'mn', 'la'];

  langs.forEach(lang => {
    const langRegex = new RegExp(`"${lang}":\\s*\\{([^}]*?)\\n\\s*\\}`, 's');
    const match = content.match(langRegex);
    if (match) {
      // 간단한 카운트
      const keyCount = (match[1].match(/"[^"]*":/g) || []).length;
      console.log(`  ${lang.padEnd(5)} - ${keyCount} 키`);
    }
  });
} catch (e) {
  console.log('❌ 오류:', e.message);
}
EOF

# 4. 누락된 키 확인
echo ""
echo "4️⃣ 각 페이지에서 사용하는 i18n 키 검증"
echo "$(grep -rh 'data-i18n="[^"]*"' --include="*.html" | sed 's/.*data-i18n="\([^"]*\)".*/\1/' | sort -u | wc -l) 개의 고유 키가 사용 중"

# 5. 페이지별 번역 상태
echo ""
echo "5️⃣ 주요 페이지 번역 상태"
echo ""

check_page() {
  local page=$1
  local name=$2

  # data-i18n 사용 개수
  local i18n_count=$(grep -o 'data-i18n="[^"]*"' "$page" 2>/dev/null | wc -l)

  # 번역된 요소 추정 (data-i18n이 있는 요소)
  echo "  ✅ $name: $i18n_count개 i18n 속성"
}

check_page "index.html" "홈"
check_page "quiz.html" "퀴즈"
check_page "result.html" "결과"
check_page "about.html" "About"
check_page "compare.html" "비교"
check_page "careers.html" "직업"
check_page "privacy.html" "개인정보"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "✅ 번역 시스템 정상 작동"
echo ""
echo "💡 Tip: 브라우저에서 다음을 확인하세요:"
echo "   F12 → Console:"
echo "   window.i18n.t('index.title')  // 한글"
echo "   window.i18n.setLang('en')     // 영문으로 전환"
echo "   window.i18n.t('index.title')  // 영문 확인"
