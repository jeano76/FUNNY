---
name: market-mbti-maintenance
description: marketMBTI 프로젝트의 유지보수 및 배포 워크플로우 (AdSense, 다국어, Cloudflare Pages)
---

# marketMBTI 유지보수 가이드 (2026-03-15)

성격 유형 동물 테스트(marketMBTI) 프로젝트의 유지보수, 배포, 최적화 작업을 위한 완전한 워크플로우 문서입니다.

## 📋 프로젝트 현황

| 항목 | 상태 |
|------|------|
| 기본 구조 | ✅ 완료 |
| 다국어 지원 | ✅ 19개 언어 |
| AdSense 통합 | ✅ 완료 (심사 대기) |
| Kakao 연동 | ✅ 완료 |
| Cloudflare 배포 | ✅ 완료 |
| 도메인 설정 | ✅ stockinvestonline.com |
| 코드 정리 | ✅ MBTI → 성격 유형 |

## 🔄 배포 프로세스

### Step 1: 코드 변경사항 확인
```bash
git status
git diff
```

### Step 2: 변경사항 검증
```bash
# MBTI 참조 확인 (함수명, 상표명 제외)
grep -rn "MBTI\|mbti" --include="*.html" --include="*.js" . \
  | grep -v "getMBTIData\|saveMBTIResult\|MBTI®\|mbti_data"

# 링크 검증 (상대 경로 확인)
grep -rn "http://\|https://" --include="*.html" --include="*.js" . \
  | grep -v "https://stockinvestonline.com\|developers.kakao\|twitter.com\|facebook.com"
```

### Step 3: Commit & Push
```bash
git add -A
git commit -m "feat: [설명]"

# Personal Access Token으로 인증
git remote set-url origin "https://ghp_<TOKEN>@github.com/jeano76/FUNNY.git"
git push origin main

# 토큰 제거 (보안)
git remote set-url origin "https://github.com/jeano76/FUNNY.git"
```

### Step 4: Cloudflare 배포 (자동)
- GitHub 푸시 후 Cloudflare Pages가 자동으로 배포 시작
- 약 2-3분 소요

### Step 5: 캐시 정리 (필수!)
```bash
# Cloudflare Dashboard
1. Caching → Purge Cache
2. Purge All 클릭

# 브라우저
Ctrl+Shift+Delete (또는 ⌘+Shift+Delete)
→ "캐시된 이미지 및 파일" 선택
```

## 🔐 AdSense 규정 준수

### 브랜딩 가이드라인

✅ **사용 권장:**
- "성격 유형 테스트"
- "16가지 동물 성격 유형"
- "Personality Type Test"
- "Animal Personality Quiz"

❌ **사용 금지:**
- "공식 MBTI 테스트"
- "MBTI 검사"
- "MBTI 분석"

### 필수 면책 조항 (모든 페이지)
```html
<div class="disclaimer">
  본 서비스는 공식 성격 유형 검사와 무관하며, 결과는 재미로만 즐겨주세요.<br>
  MBTI®는 The Myers & Briggs Foundation의 등록 상표이며, 본 서비스는 해당 재단과 관련이 없습니다.
</div>
```

### AdSense 스크립트 (모든 HTML 파일)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9698578259562384"
     crossorigin="anonymous"></script>
```

## 🌐 도메인 & 배포 설정

### Primary Domain
```
stockinvestonline.com
↓
Cloudflare Pages (funny.pages.dev)
```

### DNS 레코드 (Cloudflare)
```
@ (Root)  → CNAME → funny.pages.dev
www       → CNAME → funny.pages.dev
```

### 공유 링크 (share.js)
```javascript
var SITE_URL = 'https://stockinvestonline.com/';
```

## 🔑 연동 서비스

### Kakao Developers
```
App Key: 2850ea2fde730ed80b6f932c8e05d709
Domain: stockinvestonline.com
SDK: https://developers.kakao.com/sdk/js/kakao.min.js
```

### Google AdSense
```
Publisher ID: pub-9698578259562384
Status: 심사 대기
ads.txt: /ads.txt (루트)
```

### Cloudflare Pages
```
Project: funny
Repository: jeano76/FUNNY
Branch: main
Build: Static (no build command)
```

## ⚠️ 주의사항

### 변경하면 안 되는 것들
1. **함수명**: `getMBTIData()`, `saveMBTIResult()`, `clearMBTIData()`
2. **상표명**: `MBTI®` (항상 ® 포함)
3. **변수명**: `STORAGE_KEY = 'mbti_data'`
4. **스토리지 키**: 사용자 데이터 손실 방지

### 도메인 변경 시 수정 파일
1. `js/share.js` - SITE_URL
2. `js/canvas-card.js` - 도메인 텍스트
3. `result.html` - og:url, og:image
4. `Kakao Developers` - 도메인 등록

## 📊 최근 커밋 이력 (2026-03)

| 커밋 | 내용 |
|------|------|
| b6f7672 | Kakao 앱 키 업데이트 |
| 11fe84e | 공유 링크 고정 (stockinvestonline.com) |
| 10c10f7 | 모든 MBTI 참조 제거 |
| f4b8193 | 남은 MBTI 텍스트 정리 |
| 167aa4e | result.js MBTI 텍스트 수정 |
| e80d462 | 다국어 MBTI 번역 |
| 436a6e2 | Kakao Share OG 이미지 수정 |

## 🧪 배포 후 검증 체크리스트

### 카카오톡 공유
- [ ] https://stockinvestonline.com/quiz.html 접속
- [ ] 테스트 완료
- [ ] 카카오톡 공유 버튼 클릭
- [ ] 공유 메시지에 올바른 도메인 표시 확인
- [ ] "성격 유형은?" 텍스트 확인
- [ ] "MBTIMBTI" 없음 확인
- [ ] 링크 클릭 후 결과 페이지 로드 확인

### Google AdSense
- [ ] 모든 페이지에 광고 스크립트 존재
- [ ] /ads.txt 파일 접근 가능
- [ ] 광고 표시 여부 확인
- [ ] 면책 조항 표시 확인

### 다국어
- [ ] 자동 언어 감지 작동
- [ ] 각 언어 페이지 로드 확인
- [ ] 번역 완성도 확인

### 성능
- [ ] 페이지 로드 시간 < 2초
- [ ] 모바일 반응성 확인
- [ ] 이미지 최적화 확인

## 🚀 주요 명령어

```bash
# 로컬 서버 실행
python -m http.server 8000

# 파일 일괄 변경
find . -name "*.html" -exec sed -i 's/old/new/g' {} \;

# 모든 변경사항 제거 (신중하게!)
git checkout .

# 원격 브랜치 동기화
git fetch origin
git reset --hard origin/main

# 특정 파일만 원상복구
git checkout -- file.html
```

---

**최종 업데이트**: 2026년 3월 15일
**유지보수자**: Claude AI (Sonnet 4.6)
