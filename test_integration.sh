#!/bin/bash

# 마켓MBTI 통합 기능 테스트 - curl 기반
# 로컬 서버: http://localhost:8001

BASE="http://localhost:8001"

echo "🚀 마켓MBTI 통합 기능 테스트"
echo "════════════════════════════════════════════════════"

# 색상
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

passed=0
failed=0

# 테스트 함수
test_endpoint() {
  local name=$1
  local url=$2
  local expected_status=$3

  response=$(curl -s -o /dev/null -w "%{http_code}" "$url" -m 5)

  if [ "$response" = "$expected_status" ]; then
    echo -e "${GREEN}✅${NC} [$response] $name"
    ((passed++))
  else
    echo -e "${RED}❌${NC} [$response] $name (expected: $expected_status)"
    ((failed++))
  fi
}

# 1️⃣ 기본 페이지 로드 테스트
echo -e "\n${YELLOW}1️⃣ 기본 페이지 로드 테스트${NC}"
test_endpoint "홈" "$BASE/" "200"
test_endpoint "퀴즈" "$BASE/quiz.html" "200"
test_endpoint "결과" "$BASE/result.html" "200"
test_endpoint "어바웃" "$BASE/about.html" "200"
test_endpoint "비교" "$BASE/compare.html" "200"
test_endpoint "직업" "$BASE/careers.html" "200"
test_endpoint "포춘" "$BASE/fortune.html" "200"
test_endpoint "챌린지" "$BASE/challenges.html" "200"
test_endpoint "스피드" "$BASE/speed.html" "200"
test_endpoint "그룹" "$BASE/group.html" "200"
test_endpoint "호환성" "$BASE/compat.html" "200"
test_endpoint "프라이버시" "$BASE/privacy.html" "200"

# 2️⃣ 다국어 페이지 테스트
echo -e "\n${YELLOW}2️⃣ 다국어 페이지 테스트${NC}"
for lang in en jp zh es de fr ru ar hi id it la mn nl pt th tr vi; do
  test_endpoint "$lang/홈" "$BASE/$lang/" "200"
done

# 3️⃣ HTML 메타 태그 검증
echo -e "\n${YELLOW}3️⃣ HTML 메타 태그 검증${NC}"

check_meta_tag() {
  local page=$1
  local name=$2
  local tag=$3

  content=$(curl -s "$BASE$page" | grep -o "$tag" | head -1)

  if [ -n "$content" ]; then
    echo -e "${GREEN}✅${NC} $name - $tag 포함"
    ((passed++))
  else
    echo -e "${YELLOW}⚠️${NC} $name - $tag 미발견"
    ((failed++))
  fi
}

check_meta_tag "/" "홈" 'og:title'
check_meta_tag "/quiz.html" "퀴즈" 'og:image'
check_meta_tag "/" "홈" 'meta name="description"'

# 4️⃣ JavaScript 리소스 확인
echo -e "\n${YELLOW}4️⃣ JavaScript 리소스 확인${NC}"

check_script() {
  local page=$1
  local name=$2
  local script=$3

  content=$(curl -s "$BASE$page" | grep -o "$script" | head -1)

  if [ -n "$content" ]; then
    echo -e "${GREEN}✅${NC} $name - $script 포함"
    ((passed++))
  else
    echo -e "${YELLOW}⚠️${NC} $name - $script 미발견"
    ((failed++))
  fi
}

check_script "/quiz.html" "퀴즈" "quiz\.js"
check_script "/quiz.html" "퀴즈" "i18n-complete\.js"
check_script "/result.html" "결과" "result\.js"
check_script "/" "홈" "auto-lang\.js"

# 5️⃣ 언어 속성 (lang) 검증
echo -e "\n${YELLOW}5️⃣ HTML lang 속성 검증${NC}"

check_lang_attr() {
  local path=$1
  local expected_lang=$2
  local display_name=$3

  lang_attr=$(curl -s "$BASE$path" | grep -o 'html lang="[^"]*"' | sed 's/html lang="//;s/"//')

  if [ "$lang_attr" = "$expected_lang" ]; then
    echo -e "${GREEN}✅${NC} $display_name - lang=\"$lang_attr\""
    ((passed++))
  else
    echo -e "${YELLOW}⚠️${NC} $display_name - lang=\"$lang_attr\" (expected: $expected_lang)"
    ((failed++))
  fi
}

check_lang_attr "/" "ko" "루트 (한글)"
check_lang_attr "/en/" "en" "영문"
check_lang_attr "/jp/" "ja" "일본어"
check_lang_attr "/zh/" "zh" "중국어"

# 6️⃣ AdSense 광고 코드 확인
echo -e "\n${YELLOW}6️⃣ AdSense 광고 코드 확인${NC}"

check_adsense() {
  local page=$1
  local name=$2

  adsense=$(curl -s "$BASE$page" | grep -o "googlesyndication\|adsbygoogle\|pub-9698578259562384" | head -1)

  if [ -n "$adsense" ]; then
    echo -e "${GREEN}✅${NC} $name - AdSense 코드 포함"
    ((passed++))
  else
    echo -e "${YELLOW}⚠️${NC} $name - AdSense 코드 미발견"
    ((failed++))
  fi
}

check_adsense "/careers.html" "직업 페이지"
check_adsense "/quiz.html" "퀴즈 페이지"
check_adsense "/" "홈페이지"

# 최종 결과
echo -e "\n════════════════════════════════════════════════════"
echo -e "${GREEN}✅ 통과: $passed${NC}"
echo -e "${RED}❌ 실패: $failed${NC}"

total=$((passed + failed))
percentage=$((passed * 100 / total))
echo -e "\n📊 결과: ${GREEN}${percentage}%${NC} ($passed/$total)"

if [ $failed -eq 0 ]; then
  echo -e "${GREEN}🎉 모든 테스트 통과!${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️ $failed개 항목 확인 필요${NC}"
  exit 1
fi
