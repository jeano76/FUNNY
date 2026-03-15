# 🐾 marketMBTI - 성격 유형 동물 테스트

**16가지 성격 유형을 동물로 표현하는 재미있는 성격 테스트 플랫폼**

## 📋 프로젝트 개요

- **도메인**: https://stockinvestonline.com/
- **배포**: Cloudflare Pages (funny.pages.dev)
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript
- **언어 지원**: 19개 (한국어, 영어, 일본어, 중국어, 스페인어, 독일어, 프랑스어, 러시아어, 포르투갈어, 인도네시아어, 힌디어, 베트남어, 태국어, 터키어, 이탈리아어, 네덜란드어, 아랍어, 몽골어, 라틴어)

## 🎯 핵심 기능

### 1. 성격 유형 퀴즈
- 20개 상황별 문항으로 성격 분석
- 약 3분 소요
- 모바일 최적화

### 2. 16가지 동물 결과
- 각 성격 유형을 동물 캐릭터로 표현
- 상세한 성격 설명 및 강점/약점
- 유명인 사례
- 한국인 비율

### 3. 공유 기능 (카카오톡, 트위터, 페이스북)
- 결과를 SNS로 쉽게 공유
- 카카오톡 메시지 카드 공유
- OG 태그 최적화

### 4. 추가 기능
- 호환성 매칭 (유형별 궁합)
- 스피드 모드 (빠른 테스트)
- 그룹 테스트 (친구들과 함께)
- 직업 추천
- 상황별 반응 분석
- localStorage 히스토리 저장

### 5. 광고 수익화
- Google AdSense 통합
- ads.txt 설정 완료
- 배포 도메인 최적화

## 📁 프로젝트 구조

```
marketMBTI/
├── index.html              # 메인 페이지
├── quiz.html               # 퀴즈 페이지
├── result.html             # 결과 페이지
├── about.html              # 소개 페이지
├── privacy.html            # 개인정보 처리방침
├── group.html              # 그룹 테스트
├── speed.html              # 스피드 모드
├── compat.html             # 호환성 매칭
├── careers.html            # 직업 추천
├── situations.html         # 상황별 반응
├── fortune.html            # 일일 운세
├── css/
│   └── style.css           # 통합 스타일시트 (모바일 우선)
├── js/
│   ├── quiz.js             # 퀴즈 로직
│   ├── result.js           # 결과 데이터 및 계산
│   ├── storage.js          # localStorage 관리
│   ├── share.js            # SNS 공유 기능
│   ├── auto-lang.js        # 자동 언어 감지
│   └── canvas-card.js      # 결과 카드 이미지 생성
├── assets/
│   └── og-image.png        # OG 공유 이미지
├── [lang]/                 # 다국어 폴더 (ar, de, en, es, fr, hi, id, it, jp, la, mn, nl, pt, ru, th, tr, vi, zh)
├── ads.txt                 # Google AdSense 검증 파일
├── _headers                # Cloudflare 보안 헤더
└── README.md               # 이 파일
```

## 🔧 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Hosting | Cloudflare Pages |
| Analytics | Google Analytics (placeholder) |
| Ads | Google AdSense |
| Social | Kakao SDK |
| Storage | Browser localStorage |

## 🚀 시작하기

### 필수 요구사항
- 최신 브라우저 (Chrome, Firefox, Safari, Edge)
- 인터넷 연결

### 로컬 개발

```bash
# 1. 저장소 클론
git clone https://github.com/jeano76/FUNNY.git
cd marketMBTI

# 2. 로컬 서버 실행
python -m http.server 8000
# 또는
npx http-server

# 3. 브라우저에서 접속
http://localhost:8000
```

## 📊 완료된 작업

### Phase 1: 기본 구조 ✅
- [x] HTML/CSS 기본 구조
- [x] 퀴즈 로직 구현
- [x] 16가지 성격 유형 데이터
- [x] 결과 페이지 & 공유 기능
- [x] localStorage 히스토리

### Phase 2: 다국어 & SEO ✅
- [x] 19개 언어 지원
- [x] 자동 언어 감지
- [x] OG 태그 최적화
- [x] Meta 태그 설정
- [x] 모바일 반응형 디자인

### Phase 3: 광고 & 배포 ✅
- [x] Google AdSense 통합
- [x] ads.txt 파일 생성
- [x] Cloudflare Pages 배포
- [x] 커스텀 도메인 설정
- [x] 보안 헤더 설정

### Phase 4: 공유 & 연동 ✅
- [x] 카카오톡 공유 (Kakao SDK)
- [x] 트위터/X 공유
- [x] 페이스북 공유
- [x] 링크 복사 기능
- [x] SNS OG 태그 최적화

### Phase 5: 코드 정리 ✅
- [x] "MBTI" → "성격 유형" 용어 통일
- [x] 함수명/변수명 유지 (getMBTIData 등)
- [x] 다국어 번역 완료
- [x] 불필요한 참조 제거
- [x] Kakao 앱 키 업데이트
- [x] 공유 링크 고정 (stockinvestonline.com)

## 🔐 보안 설정

### Cloudflare 헤더 (_headers)
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### DNS 설정
- Root (@) → CNAME: funny.pages.dev
- www → CNAME: funny.pages.dev
- SSL/TLS: Automatic

## 📱 모바일 최적화

- ✅ Viewport 메타 태그
- ✅ 터치 친화적 UI
- ✅ 반응형 이미지
- ✅ 모바일 네비게이션
- ✅ 빠른 로드 시간

## 💰 광고 수익화

### Google AdSense
- **Publisher ID**: pub-9698578259562384
- **Status**: 심사 대기 중
- **Integration**: Head 태그의 스크립트 태그
- **ad.txt**: 루트 디렉터리

## 🔗 연동 서비스

### Kakao Developers
- **App Key**: 2850ea2fde730ed80b6f932c8e05d709
- **Status**: 활성화
- **Platforms**: Web
- **Domains**: stockinvestonline.com

## 📝 라이센스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여

현재는 개인 프로젝트이며 추후 공개할 예정입니다.

## 📞 연락처

- **이메일**: (미정)
- **GitHub**: https://github.com/jeano76/FUNNY

---

**마지막 업데이트**: 2026년 3월 15일
**버전**: 1.0.0
