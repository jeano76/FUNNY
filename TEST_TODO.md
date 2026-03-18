# marketMBTI 다국어 테스트 체크리스트

## 테스트 환경 준비
- [ ] Chrome DevTools → Application → Local Storage → `mbti_site_lang` 삭제 후 테스트
- [ ] 시크릿 창(Incognito) 사용 권장
- [ ] 테스트 URL: https://stockinvestonline.com

---

## 1. 언어 감지 엣지 케이스

### 1-1. localStorage 상태별 동작
- [ ] localStorage 없음 → 루트(/) 접속 → 한국어 표시 확인
- [ ] localStorage 없음 → `/fr/` 접속 → 프랑스어 표시 확인
- [ ] localStorage = `ko` 설정 후 → `/fr/` 접속 → **프랑스어** 표시 확인 (기존 버그)
- [ ] localStorage = `fr` 설정 후 → `/de/` 접속 → **독일어** 표시 확인
- [ ] localStorage = `ko` 설정 후 → 루트(/) 접속 → 한국어 유지 확인

### 1-2. 언어 스위처 버튼 동작
- [ ] 루트에서 언어 선택 → 해당 언어 폴더로 이동 + 번역 적용 확인
- [ ] `/fr/quiz.html`에서 언어 스위처로 DE 선택 → `/de/quiz.html`로 이동 + 독일어 확인
- [ ] 언어 선택 후 다른 페이지(quiz → result) 이동 시 언어 유지 확인
- [ ] 한국어 선택 시 루트(/)로 이동 확인

### 1-3. URL 직접 접근
- [ ] `https://stockinvestonline.com/en/` → 영어
- [ ] `https://stockinvestonline.com/jp/` → 일본어 (코드 `ja`)
- [ ] `https://stockinvestonline.com/zh/` → 중국어
- [ ] `https://stockinvestonline.com/ar/` → 아랍어
- [ ] `https://stockinvestonline.com/` → 한국어

---

## 2. 정적 HTML 번역 (data-i18n 요소)

각 언어에서 아래 요소들이 **한국어가 아닌 해당 언어**로 표시되는지 확인.

### 2-1. 네비게이션 (모든 언어)
- [ ] 로고 텍스트 (`nav.logo`)
- [ ] 홈 / 테스트 / 비교 / 도전 / 소개 메뉴
- [ ] 언어 선택 버튼 `🌐 Language ▾`

### 2-2. index.html (랜딩 페이지)
| 요소 | data-i18n 키 | 확인 |
|------|-------------|------|
| 히어로 타이틀 | `index.heroTitle` | - |
| 서브타이틀 | `index.heroSubtitleText` | - |
| 시작 버튼 | `index.startButton` | - |
| 인기 기능 타이틀 | `index.popularTitle` | - |
| 궁합 매칭 카드 | `index.compat1Title` | - |
| 재방문 메시지 | `index.returningMessage` | - |
| 다시 테스트 버튼 | `index.retestButton` | - |
| 내 결과 보기 버튼 | `index.viewResultButton` | - |

### 2-3. quiz.html
- [ ] 질문 텍스트 번역 확인
- [ ] 답변 옵션 번역 확인
- [ ] 진행바 레이블 번역

### 2-4. result.html
- [ ] 동물 이름 (한국어 아닌 해당 언어로 표시)
- [ ] 성격 설명 번역
- [ ] 강점/약점 항목
- [ ] 공유 버튼 텍스트

### 2-5. compat-chart.html (기존 버그 페이지)
- [ ] `compatChart.mainTitle` 번역 확인
- [ ] `compatChart.subtitle` 번역 확인
- [ ] `compatChart.highlightLabel` 번역 확인
- [ ] 범례(legend90~legendBelow50) 번역 확인
- [ ] 셀 클릭 힌트 번역 확인

### 2-6. 기타 페이지
- [ ] compare.html — 비교 페이지 번역
- [ ] careers.html — 직업 추천 번역
- [ ] situations.html — 상황 카드 번역
- [ ] fortune.html — 운세 페이지 번역
- [ ] challenges.html — 도전 페이지 번역
- [ ] speed.html — 속도 모드 번역
- [ ] compat.html — 궁합 페이지 번역
- [ ] about.html — 소개 번역
- [ ] privacy.html — 개인정보 번역

---

## 3. 동적 JS 번역

### 3-1. result.js (16가지 동물 이름)
각 언어 폴더의 `js/result.js`에서 한국어 동물명 잔존 여부 확인:

| 한국어 | 확인 대상 언어 |
|--------|---------------|
| 호랑이 | en, fr, de, pt, jp, zh, es, ru, id, hi, vi, th, tr, it, nl, ar, mn, la |
| 올빼미 | (동일) |
| 사자, 앵무새, 판다, 해마, 골든리트리버 | (동일) |
| 돌고래, 비버, 사슴, 늑대, 코끼리 | (동일) |
| 고양이, 나무늘보, 치타, 공작새 | (동일) |

```bash
# 확인 명령어 (한국어 잔존 체크)
grep -r "호랑이\|올빼미\|사자\|앵무새\|판다\|해마\|골든리트리버\|돌고래\|비버\|사슴\|늑대\|코끼리\|고양이\|나무늘보\|치타\|공작새" en/ fr/ de/ pt/ jp/
```

### 3-2. quiz.js (질문/답변)
- [ ] 각 언어 폴더의 `js/quiz.js` — 질문이 해당 언어로 번역되었는지 확인

### 3-3. i18n.t() 동적 호출 (JS에서 번역 키 사용)
- [ ] result.html의 `shareText` 동적 생성 — 해당 언어로 출력
- [ ] fortune.html의 운세 텍스트 — JS로 동적 생성되는 부분 번역 확인
- [ ] challenges.html의 배지/도전 텍스트 번역 확인

---

## 4. 19개 언어 전수 확인

### 언어별 체크 (index.html 기준)
| 언어 | URL | 히어로 번역 | 버튼 번역 | 동물명 번역 | 확인 |
|------|-----|------------|---------|------------|------|
| 한국어 (ko) | / | - | - | - | - |
| English (en) | /en/ | - | - | - | - |
| 日本語 (ja) | /jp/ | - | - | - | - |
| 简体中文 (zh) | /zh/ | - | - | - | - |
| Español (es) | /es/ | - | - | - | - |
| Deutsch (de) | /de/ | - | - | - | - |
| Français (fr) | /fr/ | - | - | - | - |
| Русский (ru) | /ru/ | - | - | - | - |
| Português (pt) | /pt/ | - | - | - | - |
| Indonesia (id) | /id/ | - | - | - | - |
| हिन्दी (hi) | /hi/ | - | - | - | - |
| Tiếng Việt (vi) | /vi/ | - | - | - | - |
| ภาษาไทย (th) | /th/ | - | - | - | - |
| Türkçe (tr) | /tr/ | - | - | - | - |
| Italiano (it) | /it/ | - | - | - | - |
| Nederlands (nl) | /nl/ | - | - | - | - |
| العربية (ar) | /ar/ | - | - | - | - |
| Монгол (mn) | /mn/ | - | - | - | - |
| Latina (la) | /la/ | - | - | - | - |

---

## 5. 페이지 기능 동작 (언어 무관)

### 5-1. 퀴즈 플로우
- [ ] 퀴즈 시작 → 20문항 진행 → 결과 도출
- [ ] 결과 localStorage 저장 확인
- [ ] 재방문 시 이전 결과 배너 표시

### 5-2. 공유 기능
- [ ] 카카오톡 공유 버튼 동작
- [ ] 트위터/X 공유 버튼 동작
- [ ] 링크 복사 버튼 동작

### 5-3. 궁합/비교 페이지
- [ ] compat-chart.html — 16×16 표 클릭 동작
- [ ] compare.html — 두 유형 선택 후 궁합 표시

---

## 6. 누락 번역 키 확인 방법

브라우저 콘솔에서 raw 키(번역 안 된 키)가 보이면 누락:
```javascript
// 콘솔에서 실행 — 페이지에 표시된 raw 키 감지
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.getAttribute('data-i18n');
  if (el.textContent.trim() === key) console.warn('MISSING KEY:', key);
});
```

---

## 7. 발견된 버그 기록

| 날짜 | 버그 | 원인 | 수정 |
|------|------|------|------|
| 2026-03-18 | 언어폴더 접속 시 한국어 표시 | localStorage가 URL보다 우선 | i18n-complete.js URL 우선 감지로 수정 |
| 2026-03-18 | compat-chart.html 한국어 고정 | data-i18n 속성 없음 + translations.js compatChart 키 누락 | 양쪽 모두 추가 |
| 2026-03-17 | 동물 이름 한국어 잔존 | 각 언어 result.js 미번역 | apply_animal_translations.sh 적용 |
