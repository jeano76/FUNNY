/**
 * translations.js - 모든 언어의 번역 데이터
 * i18n.js와 함께 사용
 *
 * 사용법:
 *   window.i18n.setTranslations(TRANSLATIONS);
 *   window.i18n.init();
 */

const TRANSLATIONS = {
  ko: {
    // ========== 공통 (전체 페이지) ==========
    nav: {
      logo: '🐾 성격 유형 동물 테스트',
      home: '홈',
      test: '테스트 시작',
      compare: '비교',
      compat: '궁합',
      compatChart: '궁합표',
      challenges: '도전',
      about: '소개',
      language: '🌐 Language ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 성격 유형 동물 테스트. All rights reserved.',
      disclaimer: '본 서비스는 공식 성격 유형 검사와 무관하며, 결과는 재미로만 즐겨주세요. MBTI®는 The Myers & Briggs Foundation의 등록 상표이며, 본 서비스는 해당 재단과 관련이 없습니다.',
      about: '사이트 소개',
      privacy: '개인정보 처리방침'
    },

    // ========== index.html ==========
    index: {
      metaDescription: '마트 쇼핑, 여행, 카톡 답장... 일상 속 나의 행동으로 성격 유형을 알아보세요! 16가지 동물 캐릭터로 결과를 확인하고 친구와 공유하세요.',
      title: '나의 성격 유형은? 재미있는 16가지 동물 테스트 🐾',
      ogTitle: '나의 성격 유형은? 재미있는 16가지 동물 테스트 🐾',
      ogDescription: '일상 속 행동으로 알아보는 나의 성격 유형! 16가지 동물 캐릭터 결과를 친구와 공유해보세요.',
      heroTitle: '나는 어떤 동물일까?',
      heroSubtitleText: '마트 쇼핑, 여행 계획, 카톡 답장 속도...',
      heroSubtitleBold: '일상 속 나의 행동',
      heroSubtitleEnd: '으로 당신의 성격 유형을 알아보세요!',
      badgeTime: '⏱ 약 3분',
      badgeMobile: '📱 모바일 최적화',
      badgeFree: '🆓 무료',
      startButton: '테스트 시작하기 →',
      retestButton: '다시 테스트',
      viewResultButton: '내 결과 보기',
      popularTitle: '🔥 인기 기능',
      compat1Title: '궁합 매칭',
      compat1Desc: '두 성격 유형의 궁합 점수를 확인해보세요!',
      speedTitle: '속도 본능 모드',
      speedDesc: '3초 타이머! 본능으로 선택하는 성격 유형',
      fortuneTitle: '오늘의 운세',
      fortuneDesc: '총운·대인운·업무운·재물운 매일 업데이트',
      careersTitle: '직업 궁합',
      careersDesc: '내 성격 유형에 맞는 추천 직업 Top 5',
      situationsTitle: '상황 카드',
      situationsDesc: '이 상황에서 유형별 반응은? 공감 100%!',
      compatChartTitle: '16×16 궁합표',
      compatChartDesc: '모든 성격 조합의 궁합을 한눈에 확인!',
      groupTitle: '그룹 테스트',
      groupDesc: '친구들과 결과를 공유하고 분포를 확인!',
      quizTitle: '성격 테스트 시작',
      quizDesc: '나는 어떤 동물? 지금 바로 알아보세요!',
      badgePopular: '인기',
      badgeNew: '신규',
      badgeDaily: '매일',
      badgeRecommend: '추천',
      badgeFun: '재미',
      badgeAll: '전체',
      badgeStart: '시작 →',
      featuresTitle: '이런 게 궁금하다면?',
      feature1Title: '마트에서 나의 모습',
      feature1Desc: '리스트파 vs 충동구매파, 당신은 어느 쪽?',
      feature2Title: '여행 스타일',
      feature2Desc: '철저한 계획파 vs 즉흥 여행파, 내 유형은?',
      feature3Title: '카톡 답장 스타일',
      feature3Desc: '즉답파 vs 읽씹파, 성격 유형으로 알아보는 소통 방식',
      feature4Title: '16가지 동물 결과',
      feature4Desc: '호랑이, 돌고래, 골든리트리버... 나는 어떤 동물?',
      typesTitle: '16가지 성격 동물 유형',
      discoverButton: '내 유형 알아보기 →'
    },

    // ========== quiz.html ==========
    quiz: {
      metaDescription: '20가지 일상 상황으로 알아보는 나의 성격 유형. 지금 바로 테스트를 시작해보세요!',
      title: '성격 유형 테스트 진행 중 | 성격 유형 동물 테스트',
      ogTitle: '성격 유형 테스트 진행 중',
      ogDescription: '20가지 상황별 문항으로 당신의 성격을 분석합니다.',
      loading: '로딩 중...',
      previousButton: '← 이전'
    },

    // ========== result.html ==========
    result: {
      title: '나의 성격 유형 결과 | 성격 유형 동물 테스트',
      metaDescription: '당신의 성격 유형 결과를 확인하세요. 상세한 설명, 강점, 약점, 유명인 사례를 알아보세요.',
      ogTitle: '나의 성격 유형 결과',
      ogDescription: '당신의 성격 유형이 나왔어요! 궁합, 직업 추천까지 확인해보세요.'
    },

    // ========== compat.html ==========
    compat: {
      title: '성격 유형 궁합 매칭 | 성격 유형 동물 테스트',
      metaDescription: '두 성격 유형 유형의 궁합을 알아보세요! 점수와 함께 상세한 궁합 설명을 확인할 수 있습니다.',
      ogTitle: '성격 유형 궁합 매칭 | 성격 유형 동물 테스트',
      ogDescription: '두 성격 유형 유형의 궁합 점수와 상세 설명을 확인해보세요!',
      mainTitle: '💕 성격 유형 궁합 매칭',
      mainDesc: '두 유형의 궁합 점수와 상세 설명을 확인해보세요',
      shareBannerMsg: '친구에게 링크를 공유하면 자동으로 궁합 결과가 나와요!',
      shareButton: '🔗 친구 링크 공유하기',
      compatScore: '궁합 점수',
      relationAdvice: '💡 관계 조언',
      retestButton: '테스트 다시 하기 🔄',
      compatChartButton: '전체 궁합표 보기',
      selectTitle: '직접 유형 선택하기',
      myType: '나의 유형',
      partnerType: '상대방 유형',
      selectOption: '-- 선택 --',
      vs: 'VS',
      checkButton: '궁합 확인하기 💕',
      selectBothTypes: '두 유형을 모두 선택해주세요!',
      shareLink: '친구에게 보낼 링크가 복사됐어요! 📋'
    },

    // ========== careers.html ==========
    careers: {
      title: '직업 추천 | 성격 유형별 추천 직업',
      metaDescription: '당신의 성격 유형에 어울리는 직업을 찾아보세요. 각 유형별 추천 직업과 설명입니다.',
      ogTitle: '직업 추천 | 성격 유형별 추천 직업',
      ogDescription: '당신의 성격 유형에 맞는 직업은 무엇일까요?'
    },

    // ========== compare.html ==========
    compare: {
      title: '성격 유형 비교 | 두 성격을 비교해보세요',
      metaDescription: '두 성격 유형을 자세히 비교해보세요. 성격 특성, 강점, 약점을 한눈에 비교할 수 있습니다.',
      ogTitle: '성격 유형 비교',
      ogDescription: '두 성격 유형을 상세하게 비교합니다.'
    },

    // ========== situations.html ==========
    situations: {
      title: '상황별 반응 분석 | 성격 유형별 행동 패턴',
      metaDescription: '일상의 다양한 상황에서 각 성격 유형이 어떻게 반응하는지 알아보세요.',
      ogTitle: '상황별 반응 분석',
      ogDescription: '각 성격 유형의 행동 패턴을 분석합니다.'
    },

    // ========== challenges.html ==========
    challenges: {
      title: '일일 도전 및 배지 | 매일의 작은 도전',
      metaDescription: '매일 새로운 도전을 받고 배지를 모아보세요!',
      ogTitle: '일일 도전 및 배지',
      ogDescription: '매일 새로운 도전을 즐겨보세요.'
    },

    // ========== about.html ==========
    about: {
      title: '사이트 소개 | 성격 유형 동물 테스트',
      metaDescription: '성격 유형 동물 테스트 서비스에 대해 알아보세요.',
      ogTitle: '사이트 소개',
      ogDescription: '성격 유형 동물 테스트에 대해 알아보세요.'
    },

    // ========== privacy.html ==========
    privacy: {
      title: '개인정보 처리방침 | 성격 유형 동물 테스트',
      metaDescription: '개인정보 처리 및 보호 정책을 확인하세요.',
      ogTitle: '개인정보 처리방침',
      ogDescription: '개인정보 처리방침'
    },

    // ========== fortune.html ==========
    fortune: {
      title: '일일 운세 | 성격 유형별 오늘의 운세',
      metaDescription: '당신의 성격 유형별 오늘의 운세를 확인해보세요!',
      ogTitle: '일일 운세',
      ogDescription: '오늘의 운세를 확인하세요.'
    },

    // ========== speed.html ==========
    speed: {
      title: '스피드 모드 | 빠른 성격 테스트',
      metaDescription: '1분만에 끝내는 빠른 성격 테스트!',
      ogTitle: '스피드 모드',
      ogDescription: '빠르게 성격 유형을 알아보세요.'
    },

    // ========== group.html ==========
    group: {
      title: '그룹 테스트 | 친구들과 함께하는 테스트',
      metaDescription: '친구들과 함께 성격 테스트를 해보세요!',
      ogTitle: '그룹 테스트',
      ogDescription: '친구들과 함께 즐기는 성격 테스트'
    },

    // ========== compat-chart.html ==========
    compatChart: {
      title: '성격 유형 궁합표 | 모든 조합 보기',
      metaDescription: '모든 성격 유형의 궁합을 한눈에 보는 궁합표입니다.',
      ogTitle: '성격 유형 궁합표',
      ogDescription: '모든 성격 유형의 궁합을 확인하세요.'
    },

    // ========== Additional pages (stub entries for complete i18n support) ==========
    careers: {
      title: '직업 추천 | 성격 유형별 추천 직업',
      metaDescription: '당신의 성격 유형에 어울리는 직업을 찾아보세요.',
      ogTitle: '직업 추천',
      ogDescription: '당신의 성격 유형에 맞는 직업은 무엇일까요?'
    },
    compare: {
      title: '성격 유형 비교 | 두 성격을 비교해보세요',
      metaDescription: '두 성격 유형을 자세히 비교해보세요.',
      ogTitle: '성격 유형 비교',
      ogDescription: '두 성격 유형을 상세하게 비교합니다.'
    },
    situations: {
      title: '상황별 반응 분석 | 성격 유형별 행동 패턴',
      metaDescription: '일상의 다양한 상황에서 각 성격 유형이 어떻게 반응하는지 알아보세요.',
      ogTitle: '상황별 반응 분석',
      ogDescription: '각 성격 유형의 행동 패턴을 분석합니다.'
    },
    challenges: {
      title: '일일 도전 및 배지 | 매일의 작은 도전',
      metaDescription: '매일 새로운 도전을 받고 배지를 모아보세요!',
      ogTitle: '일일 도전 및 배지',
      ogDescription: '매일 새로운 도전을 즐겨보세요.'
    },
    fortune: {
      title: '일일 운세 | 성격 유형별 오늘의 운세',
      metaDescription: '당신의 성격 유형별 오늘의 운세를 확인해보세요!',
      ogTitle: '일일 운세',
      ogDescription: '오늘의 운세를 확인하세요.'
    },
    speed: {
      title: '스피드 모드 | 빠른 성격 테스트',
      metaDescription: '1분만에 끝내는 빠른 성격 테스트!',
      ogTitle: '스피드 모드',
      ogDescription: '빠르게 성격 유형을 알아보세요.'
    },
    group: {
      title: '그룹 테스트 | 친구들과 함께하는 테스트',
      metaDescription: '친구들과 함께 성격 테스트를 해보세요!',
      ogTitle: '그룹 테스트',
      ogDescription: '친구들과 함께 즐기는 성격 테스트'
    }
  },

  en: {
    nav: {
      logo: '🐾 Personality Animal Test',
      home: 'Home',
      test: 'Start Test',
      compare: 'Compare',
      compat: 'Compatibility',
      compatChart: 'Compatibility Chart',
      challenges: 'Challenges',
      about: 'About',
      language: '🌐 Language ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Personality Animal Test. All rights reserved.',
      disclaimer: 'This service is independent and for entertainment only. MBTI® is a registered trademark of The Myers & Briggs Foundation and this service is not affiliated with them.',
      about: 'About Us',
      privacy: 'Privacy Policy'
    },
    index: {
      metaDescription: 'Discover your personality type through everyday situations! Get your animal character and share with friends.',
      title: 'What\'s My Personality? Fun 16 Animal Personality Test 🐾',
      ogTitle: 'What\'s My Personality? Fun 16 Animal Personality Test 🐾',
      ogDescription: 'Find your personality type and share it with friends!',
      heroTitle: 'What Kind of Animal Am I?',
      heroSubtitleText: 'Shopping styles, travel plans, texting speed...',
      heroSubtitleBold: 'Your everyday behavior',
      heroSubtitleEnd: 'reveals your personality type!',
      badgeTime: '⏱ About 3 minutes',
      badgeMobile: '📱 Mobile optimized',
      badgeFree: '🆓 Free',
      startButton: 'Start Test →',
      retestButton: 'Retake Test',
      viewResultButton: 'View My Result',
      popularTitle: '🔥 Popular Features',
      compat1Title: 'Compatibility Matching',
      compat1Desc: 'Check compatibility scores between two personality types!',
      speedTitle: 'Speed Instinct Mode',
      speedDesc: '3-second timer! Choose by instinct for your personality type',
      fortuneTitle: 'Daily Fortune',
      fortuneDesc: 'Overall fortune·Love·Work·Money updated daily',
      careersTitle: 'Job Compatibility',
      careersDesc: 'Top 5 job recommendations for your personality type',
      situationsTitle: 'Situation Cards',
      situationsDesc: 'How each type reacts to situations? 100% relatable!',
      compatChartTitle: '16×16 Compatibility Chart',
      compatChartDesc: 'View all personality combination compatibility at a glance!',
      groupTitle: 'Group Test',
      groupDesc: 'Share results with friends and check the distribution!',
      quizTitle: 'Start Personality Test',
      quizDesc: 'What animal am I? Find out now!',
      badgePopular: 'Popular',
      badgeNew: 'New',
      badgeDaily: 'Daily',
      badgeRecommend: 'Recommended',
      badgeFun: 'Fun',
      badgeAll: 'All',
      badgeStart: 'Start →',
      featuresTitle: 'Curious About This?',
      feature1Title: 'My Shopping Style',
      feature1Desc: 'List person vs impulse buyer, which are you?',
      feature2Title: 'Travel Style',
      feature2Desc: 'Planner vs spontaneous, what\'s your type?',
      feature3Title: 'Texting Style',
      feature3Desc: 'Quick responder vs read-not-reply, learn your communication style',
      feature4Title: '16 Animal Results',
      feature4Desc: 'Tiger, Dolphin, Golden Retriever... What animal are you?',
      typesTitle: '16 Personality Animal Types',
      discoverButton: 'Discover My Type →'
    },
    quiz: {
      metaDescription: 'Take the personality test with 20 real-life scenarios. Discover your personality type now!',
      title: 'Personality Test in Progress | Personality Animal Test',
      ogTitle: 'Personality Test in Progress',
      ogDescription: 'Analyze your personality with 20 situational questions.',
      loading: 'Loading...',
      previousButton: '← Previous'
    },
    result: {
      title: 'Your Personality Result | Personality Animal Test',
      metaDescription: 'See your personality type result with detailed explanation, strengths, and famous examples.',
      ogTitle: 'Your Personality Result',
      ogDescription: 'Check your personality type! See compatibility and job recommendations.'
    },
    compat: {
      title: 'Personality Compatibility Matching | Personality Animal Test',
      metaDescription: 'Check the compatibility between two personality types with detailed explanation and score.',
      ogTitle: 'Personality Compatibility Matching | Personality Animal Test',
      ogDescription: 'See the compatibility score and detailed explanation between two personality types!',
      mainTitle: '💕 Personality Compatibility Matching',
      mainDesc: 'Check the compatibility score and detailed explanation between two types',
      shareBannerMsg: 'Share the link with a friend to automatically get compatibility results!',
      shareButton: '🔗 Share Friend Link',
      compatScore: 'Compatibility Score',
      relationAdvice: '💡 Relationship Advice',
      retestButton: 'Retake Test 🔄',
      compatChartButton: 'View Full Compatibility Chart',
      selectTitle: 'Select Types Directly',
      myType: 'My Type',
      partnerType: 'Partner Type',
      selectOption: '-- Select --',
      vs: 'VS',
      checkButton: 'Check Compatibility 💕',
      selectBothTypes: 'Please select both types!',
      shareLink: 'Link copied! Share with friends! 📋'
    },
    careers: {
      title: 'Job Recommendations | Jobs for Your Personality',
      metaDescription: 'Find the best jobs for your personality type.',
      ogTitle: 'Job Recommendations',
      ogDescription: 'What career matches your personality?'
    },
    compare: {
      title: 'Compare Personalities | Compare Two Types',
      metaDescription: 'Compare two personality types in detail. See traits, strengths, and weaknesses side by side.',
      ogTitle: 'Compare Personalities',
      ogDescription: 'Detailed comparison of two personality types.'
    },
    situations: {
      title: 'Situational Reactions | Behavior Patterns by Type',
      metaDescription: 'See how each personality type reacts in different everyday situations.',
      ogTitle: 'Situational Reactions',
      ogDescription: 'Analyze behavior patterns for each personality type.'
    },
    challenges: {
      title: 'Daily Challenges & Badges | Your Daily Challenge',
      metaDescription: 'Take new challenges every day and collect badges!',
      ogTitle: 'Daily Challenges & Badges',
      ogDescription: 'Enjoy new daily challenges.'
    },
    about: {
      title: 'About | Personality Animal Test',
      metaDescription: 'Learn more about the Personality Animal Test service.',
      ogTitle: 'About Us',
      ogDescription: 'About the Personality Animal Test.'
    },
    privacy: {
      title: 'Privacy Policy | Personality Animal Test',
      metaDescription: 'Review our privacy and data protection policy.',
      ogTitle: 'Privacy Policy',
      ogDescription: 'Privacy Policy'
    },
    fortune: {
      title: 'Daily Fortune | Your Personality\'s Daily Fortune',
      metaDescription: 'Check your daily fortune based on your personality type!',
      ogTitle: 'Daily Fortune',
      ogDescription: 'Check your daily fortune.'
    },
    speed: {
      title: 'Speed Mode | Quick Personality Test',
      metaDescription: 'Finish a quick personality test in just 1 minute!',
      ogTitle: 'Speed Mode',
      ogDescription: 'Discover your personality quickly.'
    },
    group: {
      title: 'Group Test | Test with Friends',
      metaDescription: 'Take the personality test together with your friends!',
      ogTitle: 'Group Test',
      ogDescription: 'Fun personality test with friends'
    },
    compatChart: {
      title: 'Compatibility Chart | View All Combinations',
      metaDescription: 'See the compatibility of all personality types at a glance.',
      ogTitle: 'Compatibility Chart',
      ogDescription: 'Check compatibility for all personality types.'
    },

    careers: {
      title: 'Job Recommendations | Jobs for Your Personality',
      metaDescription: 'Find the best jobs for your personality type.',
      ogTitle: 'Job Recommendations',
      ogDescription: 'What career matches your personality?'
    },
    compare: {
      title: 'Compare Personalities | Compare Two Types',
      metaDescription: 'Compare two personality types in detail.',
      ogTitle: 'Compare Personalities',
      ogDescription: 'Detailed comparison of two personality types.'
    },
    situations: {
      title: 'Situational Reactions | Behavior Patterns by Type',
      metaDescription: 'See how each personality type reacts in different everyday situations.',
      ogTitle: 'Situational Reactions',
      ogDescription: 'Analyze behavior patterns for each personality type.'
    },
    challenges: {
      title: 'Daily Challenges & Badges | Your Daily Challenge',
      metaDescription: 'Take new challenges every day and collect badges!',
      ogTitle: 'Daily Challenges & Badges',
      ogDescription: 'Enjoy new daily challenges.'
    },
    fortune: {
      title: 'Daily Fortune | Your Personality\'s Daily Fortune',
      metaDescription: 'Check your daily fortune based on your personality type!',
      ogTitle: 'Daily Fortune',
      ogDescription: 'Check your daily fortune.'
    },
    speed: {
      title: 'Speed Mode | Quick Personality Test',
      metaDescription: 'Finish a quick personality test in just 1 minute!',
      ogTitle: 'Speed Mode',
      ogDescription: 'Discover your personality quickly.'
    },
    group: {
      title: 'Group Test | Test with Friends',
      metaDescription: 'Take the personality test together with your friends!',
      ogTitle: 'Group Test',
      ogDescription: 'Fun personality test with friends'
    }
  },

  ja: {
    nav: {
      logo: '🐾 性格動物テスト',
      home: 'ホーム',
      test: 'テストを始める',
      compare: '比較',
      compat: '相性',
      compatChart: '相性表',
      challenges: 'チャレンジ',
      about: 'について',
      language: '🌐 言語 ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 性格動物テスト. All rights reserved.',
      disclaimer: 'このサービスは公式な性格診断とは異なり、エンターテインメント目的です。MBTI®はThe Myers & Briggs Foundationの登録商標であり、本サービスはその財団と関係ありません。',
      about: '私たちについて',
      privacy: 'プライバシーポリシー'
    },
    index: {
      metaDescription: '日常の場面から性格タイプを発見！動物キャラクターの結果を友達とシェアしましょう。',
      title: '私の性格は？楽しい16動物性格テスト 🐾',
      ogTitle: '私の性格は？楽しい16動物性格テスト 🐾',
      ogDescription: '性格タイプを発見して友達とシェアしよう！',
      heroTitle: '私はどんな動物？',
      heroSubtitleText: 'ショッピングスタイル、旅行計画、テキストの速度...',
      heroSubtitleBold: '日常の行動',
      heroSubtitleEnd: 'であなたの性格タイプがわかります！',
      badgeTime: '⏱ 約3分',
      badgeMobile: '📱 モバイル最適化',
      badgeFree: '🆓 無料',
      startButton: 'テストを開始 →',
      retestButton: 'テストをやり直す',
      viewResultButton: '結果を見る',
      popularTitle: '🔥 人気機能',
      compat1Title: '相性マッチング',
      compat1Desc: '2つの性格タイプの相性スコアをチェック！',
      speedTitle: 'スピード本能モード',
      speedDesc: '3秒タイマー！本能で選ぶ性格タイプ',
      fortuneTitle: '今日の運勢',
      fortuneDesc: '総運·恋愛運·仕事運·金運 毎日更新',
      careersTitle: '職業相性',
      careersDesc: 'あなたの性格タイプに合う職業トップ5',
      situationsTitle: '状況カード',
      situationsDesc: 'この状況で各タイプの反応は？共感度100%！',
      compatChartTitle: '16×16相性表',
      compatChartDesc: 'すべての性格タイプの相性を一目で確認！',
      groupTitle: 'グループテスト',
      groupDesc: '友達と結果をシェアして分布を確認！',
      quizTitle: '性格テスト開始',
      quizDesc: '私はどんな動物？今すぐ発見！',
      badgePopular: '人気',
      badgeNew: '新規',
      badgeDaily: '毎日',
      badgeRecommend: 'おすすめ',
      badgeFun: '楽しい',
      badgeAll: 'すべて',
      badgeStart: '開始 →',
      featuresTitle: 'このことが気になりますか？',
      feature1Title: '買い物スタイル',
      feature1Desc: 'リスト派 vs 衝動買い派、あなたはどっち？',
      feature2Title: '旅行スタイル',
      feature2Desc: '綿密な計画派 vs 即興旅行派、あなたのタイプは？',
      feature3Title: 'テキストスタイル',
      feature3Desc: '素早い返信派 vs 既読スルー派、性格タイプで分かるコミュニケーション方法',
      feature4Title: '16動物結果',
      feature4Desc: 'トラ、イルカ、ゴールデンレトリバー... あなたはどんな動物？',
      typesTitle: '16性格動物タイプ',
      discoverButton: '私のタイプを発見 →'
    },
    quiz: {
      metaDescription: '20のリアルな場面でテスト。あなたの性格タイプを発見しましょう！',
      title: '性格テスト進行中 | 性格動物テスト',
      ogTitle: '性格テスト進行中',
      ogDescription: '20の状況別質問であなたの性格を分析します。',
      loading: '読み込み中...',
      previousButton: '← 前へ'
    },
    result: {
      title: 'あなたの性格結果 | 性格動物テスト',
      metaDescription: '性格タイプの結果を詳しく確認。強み、弱み、有名人の例を見てみましょう。',
      ogTitle: 'あなたの性格結果',
      ogDescription: '相性や職業推奨も確認できます！'
    },
    compat: {
      title: '性格相性マッチング | 性格動物テスト',
      metaDescription: '2つの性格タイプの相性を確認。スコアと詳しい説明があります。',
      ogTitle: '性格相性マッチング | 性格動物テスト',
      ogDescription: '2つの性格タイプの相性スコアと詳しい説明を確認しましょう！',
      mainTitle: '💕 性格相性マッチング',
      mainDesc: '2つのタイプの相性スコアと詳しい説明を確認',
      shareBannerMsg: '友達とリンクをシェアすると自動的に相性結果が表示されます！',
      shareButton: '🔗 友達リンクをシェア',
      compatScore: '相性スコア',
      relationAdvice: '💡 関係のアドバイス',
      retestButton: 'テストをやり直す 🔄',
      compatChartButton: '完全な相性表を表示',
      selectTitle: 'タイプを直接選択',
      myType: '私のタイプ',
      partnerType: 'パートナーのタイプ',
      selectOption: '-- 選択 --',
      vs: 'VS',
      checkButton: '相性を確認 💕',
      selectBothTypes: '両方のタイプを選択してください！',
      shareLink: 'リンクがコピーされました！ 📋'
    },
    careers: {
      title: '職業推奨 | あなたの性格に合う職業',
      metaDescription: 'あなたの性格タイプに合う職業を見つけましょう。',
      ogTitle: '職業推奨',
      ogDescription: 'あなたの性格に合う職業は？'
    },
    compare: {
      title: '性格比較 | 2つのタイプを比較',
      metaDescription: '2つの性格タイプを詳しく比較。特性、強み、弱みを一目で見比べられます。',
      ogTitle: '性格比較',
      ogDescription: '2つの性格タイプの詳細比較。'
    },
    situations: {
      title: '状況別反応分析 | タイプ別行動パターン',
      metaDescription: '日常の様々な状況で各性格タイプがどう反応するかを見てみましょう。',
      ogTitle: '状況別反応分析',
      ogDescription: '各性格タイプの行動パターンを分析します。'
    },
    challenges: {
      title: '日々のチャレンジ＆バッジ | 毎日の小さなチャレンジ',
      metaDescription: '毎日新しいチャレンジを受けてバッジを集めよう！',
      ogTitle: '日々のチャレンジ＆バッジ',
      ogDescription: '毎日新しいチャレンジを楽しもう。'
    },
    about: {
      title: 'について | 性格動物テスト',
      metaDescription: '性格動物テストサービスについて学びましょう。',
      ogTitle: 'について',
      ogDescription: '性格動物テストについて。'
    },
    privacy: {
      title: 'プライバシーポリシー | 性格動物テスト',
      metaDescription: 'プライバシーと個人情報保護方針を確認しましょう。',
      ogTitle: 'プライバシーポリシー',
      ogDescription: 'プライバシーポリシー'
    },
    fortune: {
      title: '日の運勢 | 性格別の今日の運勢',
      metaDescription: 'あなたの性格タイプ別の今日の運勢を確認しましょう！',
      ogTitle: '日の運勢',
      ogDescription: '今日の運勢を確認しましょう。'
    },
    speed: {
      title: 'スピードモード | 高速性格テスト',
      metaDescription: 'わずか1分で完了する高速性格テスト！',
      ogTitle: 'スピードモード',
      ogDescription: '素早く性格タイプを発見しましょう。'
    },
    group: {
      title: 'グループテスト | 友達と一緒にテスト',
      metaDescription: '友達と一緒に性格テストをしましょう！',
      ogTitle: 'グループテスト',
      ogDescription: '友達と一緒に楽しむ性格テスト'
    },
    compatChart: {
      title: '相性表 | すべての組み合わせを表示',
      metaDescription: 'すべての性格タイプの相性を一目で見る相性表です。',
      ogTitle: '相性表',
      ogDescription: 'すべての性格タイプの相性を確認しましょう。'
    },

    careers: {
      title: '職業推奨 | あなたの性格に合う職業',
      metaDescription: 'あなたの性格タイプに合う職業を見つけましょう。',
      ogTitle: '職業推奨',
      ogDescription: 'あなたの性格に合う職業は？'
    },
    compare: {
      title: '性格比較 | 2つのタイプを比較',
      metaDescription: '2つの性格タイプを詳しく比較。',
      ogTitle: '性格比較',
      ogDescription: '2つの性格タイプの詳細比較。'
    },
    situations: {
      title: '状況別反応分析 | タイプ別行動パターン',
      metaDescription: '日常の様々な状況で各性格タイプがどう反応するかを見てみましょう。',
      ogTitle: '状況別反応分析',
      ogDescription: '各性格タイプの行動パターンを分析します。'
    },
    challenges: {
      title: '日々のチャレンジ＆バッジ | 毎日の小さなチャレンジ',
      metaDescription: '毎日新しいチャレンジを受けてバッジを集めよう！',
      ogTitle: '日々のチャレンジ＆バッジ',
      ogDescription: '毎日新しいチャレンジを楽しもう。'
    },
    fortune: {
      title: '日の運勢 | 性格別の今日の運勢',
      metaDescription: 'あなたの性格タイプ別の今日の運勢を確認しましょう！',
      ogTitle: '日の運勢',
      ogDescription: '今日の運勢を確認しましょう。'
    },
    speed: {
      title: 'スピードモード | 高速性格テスト',
      metaDescription: 'わずか1分で完了する高速性格テスト！',
      ogTitle: 'スピードモード',
      ogDescription: '素早く性格タイプを発見しましょう。'
    },
    group: {
      title: 'グループテスト | 友達と一緒にテスト',
      metaDescription: '友達と一緒に性格テストをしましょう！',
      ogTitle: 'グループテスト',
      ogDescription: '友達と一緒に楽しむ性格テスト'
    }
  },

  zh: {
    nav: {
      logo: '🐾 个性动物测试',
      home: '首页',
      test: '开始测试',
      compare: '比较',
      compat: '兼容性',
      compatChart: '兼容性图表',
      challenges: '挑战',
      about: '关于',
      language: '🌐 语言 ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 个性动物测试。保留所有权利。',
      disclaimer: '本服务是独立的，仅供娱乐使用。MBTI®是The Myers & Briggs Foundation的注册商标。',
      about: '关于我们',
      privacy: '隐私政策'
    },

    // ========== index.html ==========
    index: {
      metaDescription: '通过日常情况发现你的性格类型！获得你的动物角色并与朋友分享。',
      title: '我的性格是什么？有趣的16种动物性格测试 🐾',
      ogTitle: '我的性格是什么？有趣的16种动物性格测试 🐾',
      ogDescription: '通过日常行为发现你的性格类型！与朋友分享16种动物角色结果。',
      heroTitle: '我是什么动物？',
      heroSubtitleText: '购物风格、旅行计划、短信速度...',
      heroSubtitleBold: '你的日常行为',
      heroSubtitleEnd: '揭示了你的性格类型！',
      badgeTime: '⏱ 约3分钟',
      badgeMobile: '📱 移动优化',
      badgeFree: '🆓 免费',
      startButton: '开始测试 →',
      retestButton: '重新测试',
      viewResultButton: '查看我的结果',
      popularTitle: '🔥 热门功能',
      compat1Title: '相性匹配',
      compat1Desc: '检查两种性格类型的相性分数！',
      speedTitle: '速度本能模式',
      speedDesc: '3秒计时器！凭直觉选择你的性格类型',
      fortuneTitle: '每日运势',
      fortuneDesc: '总运·爱情运·工作运·财运 每日更新',
      careersTitle: '职业相性',
      careersDesc: '适合你性格类型的职业推荐前5名',
      situationsTitle: '情境卡',
      situationsDesc: '各种类型在这种情况下的反应是什么？100%共鸣！',
      compatChartTitle: '16×16相性表',
      compatChartDesc: '一目了然地查看所有性格组合的相性！',
      groupTitle: '小组测试',
      groupDesc: '与朋友分享结果并检查分布！',
      quizTitle: '开始性格测试',
      quizDesc: '我是什么动物？立即发现！',
      badgePopular: '热门',
      badgeNew: '新增',
      badgeDaily: '每日',
      badgeRecommend: '推荐',
      badgeFun: '有趣',
      badgeAll: '全部',
      badgeStart: '开始 →',
      featuresTitle: '对此感兴趣？',
      feature1Title: '我的购物风格',
      feature1Desc: '列表派vs冲动购物派，你是哪一种？',
      feature2Title: '旅行风格',
      feature2Desc: '计划派vs即兴旅行派，你的类型是什么？',
      feature3Title: '短信风格',
      feature3Desc: '快速回复派vs已读不回派，性格类型揭示的交流方式',
      feature4Title: '16种动物结果',
      feature4Desc: '老虎、海豚、金毛猎犬...你是什么动物？',
      typesTitle: '16种性格动物类型',
      discoverButton: '发现我的类型 →'
    },

    // ========== quiz.html ==========
    quiz: {
      metaDescription: '通过20个真实场景进行性格测试。立即发现你的性格类型！',
      title: '性格测试进行中 | 个性动物测试',
      ogTitle: '性格测试进行中',
      ogDescription: '通过20个情景问题分析你的性格。',
      loading: '加载中...',
      previousButton: '← 上一个'
    },

    // ========== result.html ==========
    result: {
      title: '你的性格结果 | 个性动物测试',
      metaDescription: '查看你的性格类型结果。详细的解释、优点和名人例子。',
      ogTitle: '你的性格结果',
      ogDescription: '检查你的性格类型！查看相性和职业建议。'
    },

    // ========== other pages ==========
    about: {
      title: '关于 | 个性动物测试',
      metaDescription: '了解个性动物测试服务。',
      ogTitle: '关于',
      ogDescription: '关于个性动物测试。'
    },

    privacy: {
      title: '隐私政策 | 个性动物测试',
      metaDescription: '查看我们的隐私和个人数据保护政策。',
      ogTitle: '隐私政策',
      ogDescription: '隐私政策'
    },

    careers: {
      title: '职业建议 | 适合你的职业',
      metaDescription: '找到适合你性格类型的最佳职业。',
      ogTitle: '职业建议',
      ogDescription: '什么职业适合你的性格？'
    },
    compare: {
      title: '比较个性 | 比较两种类型',
      metaDescription: '详细比较两种性格类型。',
      ogTitle: '比较个性',
      ogDescription: '两种性格类型的详细比较。'
    },
    situations: {
      title: '情景反应分析 | 按类型的行为模式',
      metaDescription: '查看每种性格类型在不同日常情况下的反应方式。',
      ogTitle: '情景反应分析',
      ogDescription: '分析每种性格类型的行为模式。'
    },
    challenges: {
      title: '每日挑战和徽章 | 你的每日挑战',
      metaDescription: '每天接受新的挑战并收集徽章！',
      ogTitle: '每日挑战和徽章',
      ogDescription: '享受新的每日挑战。'
    },
    fortune: {
      title: '每日运势 | 你的性格每日运势',
      metaDescription: '根据你的性格类型查看每日运势！',
      ogTitle: '每日运势',
      ogDescription: '查看你的每日运势。'
    },
    speed: {
      title: '速度模式 | 快速性格测试',
      metaDescription: '仅需1分钟即可完成快速性格测试！',
      ogTitle: '速度模式',
      ogDescription: '快速发现你的性格。'
    },
    group: {
      title: '小组测试 | 与朋友一起测试',
      metaDescription: '与你的朋友一起进行性格测试！',
      ogTitle: '小组测试',
      ogDescription: '与朋友一起享受有趣的性格测试'
    },

    compat: {
      title: '性格相性匹配 | 个性动物测试',
      metaDescription: '检查两个性格类型之间的相性，附带详细说明和分数。',
      ogTitle: '性格相性匹配 | 个性动物测试',
      ogDescription: '查看两个性格类型之间的相性分数和详细说明！',
      mainTitle: '💕 性格相性匹配',
      mainDesc: '检查两个类型之间的相性分数和详细说明',
      shareBannerMsg: '与朋友分享链接，自动获得相性结果！',
      shareButton: '🔗 分享朋友链接',
      compatScore: '相性分数',
      relationAdvice: '💡 关系建议',
      retestButton: '重新测试 🔄',
      compatChartButton: '查看完整相性表',
      selectTitle: '直接选择类型',
      myType: '我的类型',
      partnerType: '伴侣类型',
      selectOption: '-- 选择 --',
      vs: 'VS',
      checkButton: '检查相性 💕',
      selectBothTypes: '请选择两个类型！',
      shareLink: '链接已复制！📋'
    }
  },

  es: {
    nav: {
      logo: '🐾 Prueba de Personalidad Animal',
      home: 'Inicio',
      test: 'Comenzar prueba',
      compare: 'Comparar',
      compat: 'Compatibilidad',
      compatChart: 'Tabla de compatibilidad',
      challenges: 'Desafíos',
      about: 'Acerca de',
      language: '🌐 Idioma ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Prueba de Personalidad Animal. Todos los derechos reservados.',
      disclaimer: 'Este servicio es independiente y únicamente para entretenimiento. MBTI® es una marca registrada de The Myers & Briggs Foundation.',
      about: 'Acerca de',
      privacy: 'Política de privacidad'
    },
    compat: {
      title: 'Compatibilidad de Personalidad | Prueba de Personalidad Animal',
      metaDescription: 'Verifica la compatibilidad entre dos tipos de personalidad con explicación detallada y puntuación.',
      ogTitle: 'Compatibilidad de Personalidad | Prueba de Personalidad Animal',
      ogDescription: '¡Ve la puntuación de compatibilidad y explicación detallada entre dos tipos!',
      mainTitle: '💕 Compatibilidad de Personalidad',
      mainDesc: 'Verifica la puntuación de compatibilidad y explicación detallada entre dos tipos',
      shareBannerMsg: '¡Comparte el enlace con un amigo para obtener automáticamente los resultados de compatibilidad!',
      shareButton: '🔗 Compartir enlace de amigo',
      compatScore: 'Puntuación de compatibilidad',
      relationAdvice: '💡 Consejo de relación',
      retestButton: 'Repetir prueba 🔄',
      compatChartButton: 'Ver tabla de compatibilidad completa',
      selectTitle: 'Seleccionar tipos directamente',
      myType: 'Mi tipo',
      partnerType: 'Tipo de pareja',
      selectOption: '-- Seleccionar --',
      vs: 'VS',
      checkButton: 'Verificar compatibilidad 💕',
      selectBothTypes: '¡Por favor selecciona ambos tipos!',
      shareLink: '¡Enlace copiado! 📋'
    }
  },

  de: {
    nav: {
      logo: '🐾 Persönlichkeits-Tiertest',
      home: 'Startseite',
      test: 'Test starten',
      compare: 'Vergleichen',
      compat: 'Kompatibilität',
      compatChart: 'Kompatibilitätstabelle',
      challenges: 'Herausforderungen',
      about: 'Über uns',
      language: '🌐 Sprache ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Persönlichkeits-Tiertest. Alle Rechte vorbehalten.',
      disclaimer: 'Dieser Service ist unabhängig und nur zu Unterhaltungszwecken. MBTI® ist eine registrierte Marke von The Myers & Briggs Foundation.',
      about: 'Über uns',
      privacy: 'Datenschutzrichtlinie'
    },
    compat: {
      title: 'Persönlichkeitskompatibilität | Persönlichkeits-Tiertest',
      metaDescription: 'Überprüfen Sie die Kompatibilität zwischen zwei Persönlichkeitstypen mit detaillierter Erklärung und Punktzahl.',
      ogTitle: 'Persönlichkeitskompatibilität | Persönlichkeits-Tiertest',
      ogDescription: 'Sehen Sie die Kompatibilitätspunktzahl und detaillierte Erklärung zwischen zwei Typen!',
      mainTitle: '💕 Persönlichkeitskompatibilität',
      mainDesc: 'Überprüfen Sie die Kompatibilitätspunktzahl und detaillierte Erklärung zwischen zwei Typen',
      shareBannerMsg: 'Teilen Sie den Link mit einem Freund, um automatisch Kompatibilitätsergebnisse zu erhalten!',
      shareButton: '🔗 Freundeslink teilen',
      compatScore: 'Kompatibilitätspunktzahl',
      relationAdvice: '💡 Beziehungsratschlag',
      retestButton: 'Test wiederholen 🔄',
      compatChartButton: 'Vollständige Kompatibilitätstabelle anzeigen',
      selectTitle: 'Typen direkt auswählen',
      myType: 'Mein Typ',
      partnerType: 'Partnertyp',
      selectOption: '-- Auswählen --',
      vs: 'VS',
      checkButton: 'Kompatibilität überprüfen 💕',
      selectBothTypes: 'Bitte wählen Sie beide Typen aus!',
      shareLink: 'Link kopiert! 📋'
    }
  },

  fr: {
    nav: {
      logo: '🐾 Test de Personnalité Animale',
      home: 'Accueil',
      test: 'Commencer le test',
      compare: 'Comparer',
      compat: 'Compatibilité',
      compatChart: 'Tableau de compatibilité',
      challenges: 'Défis',
      about: 'À propos',
      language: '🌐 Langue ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Test de Personnalité Animale. Tous droits réservés.',
      disclaimer: 'Ce service est indépendant et fourni à titre informatif. MBTI® est une marque déposée de The Myers & Briggs Foundation.',
      about: 'À propos',
      privacy: 'Politique de confidentialité'
    },
    compat: {
      title: 'Compatibilité des Personnalités | Test de Personnalité Animale',
      metaDescription: 'Vérifiez la compatibilité entre deux types de personnalité avec explication détaillée et score.',
      ogTitle: 'Compatibilité des Personnalités | Test de Personnalité Animale',
      ogDescription: 'Consultez le score de compatibilité et l\'explication détaillée entre deux types !',
      mainTitle: '💕 Compatibilité des Personnalités',
      mainDesc: 'Vérifiez le score de compatibilité et l\'explication détaillée entre deux types',
      shareBannerMsg: 'Partagez le lien avec un ami pour obtenir automatiquement les résultats de compatibilité !',
      shareButton: '🔗 Partager le lien ami',
      compatScore: 'Score de compatibilité',
      relationAdvice: '💡 Conseil de relation',
      retestButton: 'Recommencer le test 🔄',
      compatChartButton: 'Afficher le tableau de compatibilité complet',
      selectTitle: 'Sélectionner les types directement',
      myType: 'Mon type',
      partnerType: 'Type de partenaire',
      selectOption: '-- Sélectionner --',
      vs: 'VS',
      checkButton: 'Vérifier la compatibilité 💕',
      selectBothTypes: 'Veuillez sélectionner les deux types !',
      shareLink: 'Lien copié ! 📋'
    }
  },

  ru: {
    nav: {
      logo: '🐾 Тест личности животных',
      home: 'Главная',
      test: 'Начать тест',
      compare: 'Сравнить',
      compat: 'Совместимость',
      compatChart: 'Таблица совместимости',
      challenges: 'Вызовы',
      about: 'О нас',
      language: '🌐 Язык ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Тест личности животных. Все права защищены.',
      disclaimer: 'Этот сервис независим и предназначен только для развлечения. MBTI® является зарегистрированной торговой маркой.',
      about: 'О нас',
      privacy: 'Политика конфиденциальности'
    },
    compat: {
      title: 'Совместимость личности | Тест личности животных',
      metaDescription: 'Проверьте совместимость между двумя типами личности с подробным объяснением и оценкой.',
      ogTitle: 'Совместимость личности | Тест личности животных',
      ogDescription: 'Посмотрите оценку совместимости и подробное объяснение между двумя типами!',
      mainTitle: '💕 Совместимость личности',
      mainDesc: 'Проверьте оценку совместимости и подробное объяснение между двумя типами',
      shareBannerMsg: 'Поделитесь ссылкой с другом, чтобы автоматически получить результаты совместимости!',
      shareButton: '🔗 Поделиться ссылкой друга',
      compatScore: 'Оценка совместимости',
      relationAdvice: '💡 Совет по отношениям',
      retestButton: 'Повторить тест 🔄',
      compatChartButton: 'Посмотреть полную таблицу совместимости',
      selectTitle: 'Выберите типы напрямую',
      myType: 'Мой тип',
      partnerType: 'Тип партнера',
      selectOption: '-- Выберите --',
      vs: 'VS',
      checkButton: 'Проверить совместимость 💕',
      selectBothTypes: 'Пожалуйста, выберите оба типа!',
      shareLink: 'Ссылка скопирована! 📋'
    }
  },

  pt: {
    nav: {
      logo: '🐾 Teste de Personalidade Animal',
      home: 'Início',
      test: 'Começar teste',
      compare: 'Comparar',
      compat: 'Compatibilidade',
      compatChart: 'Tabela de compatibilidade',
      challenges: 'Desafios',
      about: 'Sobre',
      language: '🌐 Idioma ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Teste de Personalidade Animal. Todos os direitos reservados.',
      disclaimer: 'Este serviço é independente e apenas para entretenimento. MBTI® é uma marca registrada.',
      about: 'Sobre',
      privacy: 'Política de privacidade'
    },
    compat: {
      title: 'Compatibilidade de Personalidade | Teste de Personalidade Animal',
      metaDescription: 'Verifique a compatibilidade entre dois tipos de personalidade com explicação detalhada e pontuação.',
      ogTitle: 'Compatibilidade de Personalidade | Teste de Personalidade Animal',
      ogDescription: 'Veja a pontuação de compatibilidade e explicação detalhada entre dois tipos!',
      mainTitle: '💕 Compatibilidade de Personalidade',
      mainDesc: 'Verifique a pontuação de compatibilidade e explicação detalhada entre dois tipos',
      shareBannerMsg: 'Compartilhe o link com um amigo para obter automaticamente resultados de compatibilidade!',
      shareButton: '🔗 Compartilhar link de amigo',
      compatScore: 'Pontuação de compatibilidade',
      relationAdvice: '💡 Conselho de relacionamento',
      retestButton: 'Fazer teste novamente 🔄',
      compatChartButton: 'Visualizar tabela de compatibilidade completa',
      selectTitle: 'Selecionar tipos diretamente',
      myType: 'Meu tipo',
      partnerType: 'Tipo de parceiro',
      selectOption: '-- Selecionar --',
      vs: 'VS',
      checkButton: 'Verificar compatibilidade 💕',
      selectBothTypes: 'Por favor, selecione ambos os tipos!',
      shareLink: 'Link copiado! 📋'
    }
  },

  id: {
    nav: {
      logo: '🐾 Tes Kepribadian Hewan',
      home: 'Beranda',
      test: 'Mulai tes',
      compare: 'Bandingkan',
      compat: 'Kompatibilitas',
      compatChart: 'Tabel kompatibilitas',
      challenges: 'Tantangan',
      about: 'Tentang',
      language: '🌐 Bahasa ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Tes Kepribadian Hewan. Semua hak dilindungi.',
      disclaimer: 'Layanan ini independen dan hanya untuk hiburan. MBTI® adalah merek dagang terdaftar.',
      about: 'Tentang',
      privacy: 'Kebijakan privasi'
    },
    compat: {
      title: 'Kompatibilitas Kepribadian | Tes Kepribadian Hewan',
      metaDescription: 'Periksa kompatibilitas antara dua jenis kepribadian dengan penjelasan rinci dan skor.',
      ogTitle: 'Kompatibilitas Kepribadian | Tes Kepribadian Hewan',
      ogDescription: 'Lihat skor kompatibilitas dan penjelasan rinci antara dua jenis!',
      mainTitle: '💕 Kompatibilitas Kepribadian',
      mainDesc: 'Periksa skor kompatibilitas dan penjelasan rinci antara dua jenis',
      shareBannerMsg: 'Bagikan tautan dengan teman untuk secara otomatis mendapatkan hasil kompatibilitas!',
      shareButton: '🔗 Bagikan tautan teman',
      compatScore: 'Skor kompatibilitas',
      relationAdvice: '💡 Nasihat hubungan',
      retestButton: 'Ulangi tes 🔄',
      compatChartButton: 'Lihat tabel kompatibilitas lengkap',
      selectTitle: 'Pilih jenis secara langsung',
      myType: 'Jenis saya',
      partnerType: 'Jenis pasangan',
      selectOption: '-- Pilih --',
      vs: 'VS',
      checkButton: 'Periksa kompatibilitas 💕',
      selectBothTypes: 'Silakan pilih kedua jenis!',
      shareLink: 'Tautan disalin! 📋'
    }
  },

  hi: {
    nav: {
      logo: '🐾 व्यक्तित्व पशु परीक्षण',
      home: 'मुख्य पृष्ठ',
      test: 'परीक्षण शुरू करें',
      compare: 'तुलना करें',
      compat: 'अनुकूलता',
      compatChart: 'अनुकूलता चार्ट',
      challenges: 'चुनौतियाँ',
      about: 'परिचय',
      language: '🌐 भाषा ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 व्यक्तित्व पशु परीक्षण। सर्वाधिकार सुरक्षित।',
      disclaimer: 'यह सेवा स्वतंत्र है और केवल मनोरंजन के लिए है। MBTI® एक पंजीकृत ट्रेडमार्क है।',
      about: 'परिचय',
      privacy: 'गोपनीयता नीति'
    },
    compat: {
      title: 'व्यक्तित्व अनुकूलता | व्यक्तित्व पशु परीक्षण',
      metaDescription: 'विस्तृत व्याख्या और स्कोर के साथ दो व्यक्तित्व प्रकारों के बीच अनुकूलता जांचें।',
      ogTitle: 'व्यक्तित्व अनुकूलता | व्यक्तित्व पशु परीक्षण',
      ogDescription: 'दो प्रकारों के बीच अनुकूलता स्कोर और विस्तृत व्याख्या देखें!',
      mainTitle: '💕 व्यक्तित्व अनुकूलता',
      mainDesc: 'दो प्रकारों के बीच अनुकूलता स्कोर और विस्तृत व्याख्या जांचें',
      shareBannerMsg: 'अनुकूलता परिणाम स्वचालित रूप से प्राप्त करने के लिए किसी मित्र के साथ लिंक साझा करें!',
      shareButton: '🔗 मित्र लिंक साझा करें',
      compatScore: 'अनुकूलता स्कोर',
      relationAdvice: '💡 संबंध सलाह',
      retestButton: 'परीक्षा दोबारा लें 🔄',
      compatChartButton: 'पूर्ण अनुकूलता चार्ट देखें',
      selectTitle: 'सीधे प्रकार चुनें',
      myType: 'मेरा प्रकार',
      partnerType: 'साथी प्रकार',
      selectOption: '-- चुनें --',
      vs: 'VS',
      checkButton: 'अनुकूलता जांचें 💕',
      selectBothTypes: 'कृपया दोनों प्रकार चुनें!',
      shareLink: 'लिंक कॉपी हो गया! 📋'
    }
  },

  vi: {
    nav: {
      logo: '🐾 Bài kiểm tra tính cách động vật',
      home: 'Trang chủ',
      test: 'Bắt đầu bài kiểm tra',
      compare: 'So sánh',
      compat: 'Tương thích',
      compatChart: 'Bảng tương thích',
      challenges: 'Thách thức',
      about: 'Giới thiệu',
      language: '🌐 Ngôn ngữ ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Bài kiểm tra tính cách động vật. Bảo lưu tất cả quyền.',
      disclaimer: 'Dịch vụ này độc lập và chỉ để giải trí. MBTI® là một thương hiệu được đăng ký.',
      about: 'Giới thiệu',
      privacy: 'Chính sách bảo mật'
    },
    compat: {
      title: 'Sự tương thích tính cách | Bài kiểm tra tính cách động vật',
      metaDescription: 'Kiểm tra sự tương thích giữa hai loại tính cách với giải thích chi tiết và điểm số.',
      ogTitle: 'Sự tương thích tính cách | Bài kiểm tra tính cách động vật',
      ogDescription: 'Xem điểm số tương thích và giải thích chi tiết giữa hai loại!',
      mainTitle: '💕 Sự tương thích tính cách',
      mainDesc: 'Kiểm tra điểm số tương thích và giải thích chi tiết giữa hai loại',
      shareBannerMsg: 'Chia sẻ liên kết với bạn để tự động nhận được kết quả tương thích!',
      shareButton: '🔗 Chia sẻ liên kết bạn bè',
      compatScore: 'Điểm tương thích',
      relationAdvice: '💡 Lời khuyên về quan hệ',
      retestButton: 'Làm lại bài kiểm tra 🔄',
      compatChartButton: 'Xem bảng tương thích đầy đủ',
      selectTitle: 'Chọn loại trực tiếp',
      myType: 'Loại của tôi',
      partnerType: 'Loại đối tác',
      selectOption: '-- Chọn --',
      vs: 'VS',
      checkButton: 'Kiểm tra tương thích 💕',
      selectBothTypes: 'Vui lòng chọn cả hai loại!',
      shareLink: 'Đã sao chép liên kết! 📋'
    }
  },

  th: {
    nav: {
      logo: '🐾 ทดสอบบุคลิกภาพสัตว์',
      home: 'หน้าแรก',
      test: 'เริ่มทดสอบ',
      compare: 'เปรียบเทียบ',
      compat: 'ความเข้ากันได้',
      compatChart: 'ตารางความเข้ากันได้',
      challenges: 'ท้าทาย',
      about: 'เกี่ยวกับ',
      language: '🌐 ภาษา ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 ทดสอบบุคลิกภาพสัตว์ สงวนสิทธิ์ทั้งหมด',
      disclaimer: 'บริการนี้เป็นอิสระและสำหรับความบันเทิงเท่านั้น MBTI® เป็นเครื่องหมายการค้าที่จดทะเบียน',
      about: 'เกี่ยวกับ',
      privacy: 'นโยบายความเป็นส่วนตัว'
    },
    compat: {
      title: 'ความเข้ากันได้ของบุคลิกภาพ | ทดสอบบุคลิกภาพสัตว์',
      metaDescription: 'ตรวจสอบความเข้ากันได้ระหว่างสองประเภทบุคลิกภาพพร้อมคำอธิบายรายละเอียดและคะแนน',
      ogTitle: 'ความเข้ากันได้ของบุคลิกภาพ | ทดสอบบุคลิกภาพสัตว์',
      ogDescription: 'ดูคะแนนความเข้ากันได้และคำอธิบายรายละเอียดระหว่างสองประเภท!',
      mainTitle: '💕 ความเข้ากันได้ของบุคลิกภาพ',
      mainDesc: 'ตรวจสอบคะแนนความเข้ากันได้และคำอธิบายรายละเอียดระหว่างสองประเภท',
      shareBannerMsg: 'แบ่งปันลิงก์กับเพื่อนเพื่อรับผลลัพธ์ความเข้ากันได้โดยอัตโนมัติ!',
      shareButton: '🔗 แบ่งปันลิงก์เพื่อน',
      compatScore: 'คะแนนความเข้ากันได้',
      relationAdvice: '💡 คำแนะนำเกี่ยวกับความสัมพันธ์',
      retestButton: 'ทดสอบใหม่ 🔄',
      compatChartButton: 'ดูตารางความเข้ากันได้แบบเต็ม',
      selectTitle: 'เลือกประเภทโดยตรง',
      myType: 'ประเภทของฉัน',
      partnerType: 'ประเภทของพาร์ทเนอร์',
      selectOption: '-- เลือก --',
      vs: 'VS',
      checkButton: 'ตรวจสอบความเข้ากันได้ 💕',
      selectBothTypes: 'โปรดเลือกทั้งสองประเภท!',
      shareLink: 'คัดลอกลิงก์แล้ว! 📋'
    }
  },

  tr: {
    nav: {
      logo: '🐾 Kişilik Hayvan Testi',
      home: 'Anasayfa',
      test: 'Teste başla',
      compare: 'Karşılaştır',
      compat: 'Uyumluluk',
      compatChart: 'Uyumluluk Tablosu',
      challenges: 'Zorluklar',
      about: 'Hakkında',
      language: '🌐 Dil ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Kişilik Hayvan Testi. Tüm hakları saklıdır.',
      disclaimer: 'Bu hizmet bağımsız ve sadece eğlence amaçlıdır. MBTI® tescilli bir ticari marktır.',
      about: 'Hakkında',
      privacy: 'Gizlilik Politikası'
    },
    compat: {
      title: 'Kişilik Uyumluluğu | Kişilik Hayvan Testi',
      metaDescription: 'Ayrıntılı açıklama ve puan ile iki kişilik türü arasındaki uyumluluğu kontrol edin.',
      ogTitle: 'Kişilik Uyumluluğu | Kişilik Hayvan Testi',
      ogDescription: 'İki tür arasındaki uyumluluk puanını ve ayrıntılı açıklamayı görün!',
      mainTitle: '💕 Kişilik Uyumluluğu',
      mainDesc: 'İki tür arasındaki uyumluluk puanını ve ayrıntılı açıklamayı kontrol edin',
      shareBannerMsg: 'Uyumluluk sonuçlarını otomatik olarak almak için bir arkadaşla bağlantıyı paylaşın!',
      shareButton: '🔗 Arkadaş Bağlantısını Paylaş',
      compatScore: 'Uyumluluk Puanı',
      relationAdvice: '💡 İlişki Tavsiyesi',
      retestButton: 'Testi Yeniden Yap 🔄',
      compatChartButton: 'Tam Uyumluluk Tablosunu Görüntüle',
      selectTitle: 'Türleri Doğrudan Seçin',
      myType: 'Benim Tipi',
      partnerType: 'Partner Türü',
      selectOption: '-- Seçin --',
      vs: 'VS',
      checkButton: 'Uyumluluğu Kontrol Et 💕',
      selectBothTypes: 'Lütfen her iki türü de seçin!',
      shareLink: 'Bağlantı kopyalandı! 📋'
    }
  },

  it: {
    nav: {
      logo: '🐾 Test della Personalità Animale',
      home: 'Home',
      test: 'Inizia il test',
      compare: 'Confronta',
      compat: 'Compatibilità',
      compatChart: 'Tabella compatibilità',
      challenges: 'Sfide',
      about: 'Chi siamo',
      language: '🌐 Lingua ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Test della Personalità Animale. Tutti i diritti riservati.',
      disclaimer: 'Questo servizio è indipendente e solo a scopo di intrattenimento. MBTI® è un marchio registrato.',
      about: 'Chi siamo',
      privacy: 'Politica sulla privacy'
    },
    compat: {
      title: 'Compatibilità Personalità | Test della Personalità Animale',
      metaDescription: 'Verifica la compatibilità tra due tipi di personalità con spiegazione dettagliata e punteggio.',
      ogTitle: 'Compatibilità Personalità | Test della Personalità Animale',
      ogDescription: 'Visualizza il punteggio di compatibilità e la spiegazione dettagliata tra due tipi!',
      mainTitle: '💕 Compatibilità Personalità',
      mainDesc: 'Verifica il punteggio di compatibilità e la spiegazione dettagliata tra due tipi',
      shareBannerMsg: 'Condividi il link con un amico per ottenere automaticamente i risultati di compatibilità!',
      shareButton: '🔗 Condividi link amico',
      compatScore: 'Punteggio compatibilità',
      relationAdvice: '💡 Consiglio di relazione',
      retestButton: 'Ripeti il test 🔄',
      compatChartButton: 'Visualizza tabella compatibilità completa',
      selectTitle: 'Seleziona tipi direttamente',
      myType: 'Mio tipo',
      partnerType: 'Tipo di partner',
      selectOption: '-- Seleziona --',
      vs: 'VS',
      checkButton: 'Verifica compatibilità 💕',
      selectBothTypes: 'Per favore seleziona entrambi i tipi!',
      shareLink: 'Link copiato! 📋'
    }
  },

  nl: {
    nav: {
      logo: '🐾 Persoonlijkheid Dierentest',
      home: 'Startpagina',
      test: 'Test starten',
      compare: 'Vergelijken',
      compat: 'Compatibiliteit',
      compatChart: 'Compatibiliteitstabel',
      challenges: 'Uitdagingen',
      about: 'Over',
      language: '🌐 Taal ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Persoonlijkheid Dierentest. Alle rechten voorbehouden.',
      disclaimer: 'Deze service is onafhankelijk en alleen voor vermaak. MBTI® is een geregistreerd handelsmerk.',
      about: 'Over',
      privacy: 'Privacybeleid'
    },
    compat: {
      title: 'Persoonlijkheidscompatibiliteit | Persoonlijkheid Dierentest',
      metaDescription: 'Controleer de compatibiliteit tussen twee persoonlijkheidstypes met gedetailleerde uitleg en score.',
      ogTitle: 'Persoonlijkheidscompatibiliteit | Persoonlijkheid Dierentest',
      ogDescription: 'Bekijk de compatibiliteitsscore en gedetailleerde uitleg tussen twee typen!',
      mainTitle: '💕 Persoonlijkheidscompatibiliteit',
      mainDesc: 'Controleer de compatibiliteitsscore en gedetailleerde uitleg tussen twee typen',
      shareBannerMsg: 'Deel de link met een vriend om automatisch compatibiliteitsresultaten te krijgen!',
      shareButton: '🔗 Vriendenlink delen',
      compatScore: 'Compatibiliteitsscore',
      relationAdvice: '💡 Relatieadvies',
      retestButton: 'Test opnieuw 🔄',
      compatChartButton: 'Volledige compatibiliteitstabel weergeven',
      selectTitle: 'Selecteer typen direct',
      myType: 'Mijn type',
      partnerType: 'Partnertype',
      selectOption: '-- Selecteer --',
      vs: 'VS',
      checkButton: 'Compatibiliteit controleren 💕',
      selectBothTypes: 'Selecteer alstublieft beide typen!',
      shareLink: 'Link gekopieerd! 📋'
    }
  },

  ar: {
    nav: {
      logo: '🐾 اختبار الشخصية الحيوانية',
      home: 'الرئيسية',
      test: 'ابدأ الاختبار',
      compare: 'مقارنة',
      compat: 'التوافق',
      compatChart: 'جدول التوافق',
      challenges: 'تحديات',
      about: 'حول',
      language: '🌐 اللغة ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 اختبار الشخصية الحيوانية. جميع الحقوق محفوظة.',
      disclaimer: 'هذه الخدمة مستقلة وللترفيه فقط. MBTI® علامة تجارية مسجلة.',
      about: 'حول',
      privacy: 'سياسة الخصوصية'
    },
    compat: {
      title: 'توافق الشخصية | اختبار الشخصية الحيوانية',
      metaDescription: 'تحقق من توافق النوع بين نوعي شخصية مع شرح مفصل ودرجة.',
      ogTitle: 'توافق الشخصية | اختبار الشخصية الحيوانية',
      ogDescription: 'اطلع على درجة التوافق والشرح التفصيلي بين نوعين!',
      mainTitle: '💕 توافق الشخصية',
      mainDesc: 'تحقق من درجة التوافق والشرح التفصيلي بين نوعين',
      shareBannerMsg: 'شارك الرابط مع صديق للحصول على نتائج التوافق تلقائياً!',
      shareButton: '🔗 شارك رابط صديق',
      compatScore: 'درجة التوافق',
      relationAdvice: '💡 نصيحة العلاقة',
      retestButton: 'أعد الاختبار 🔄',
      compatChartButton: 'اعرض جدول التوافق الكامل',
      selectTitle: 'حدد الأنواع مباشرة',
      myType: 'نوعي',
      partnerType: 'نوع الشريك',
      selectOption: '-- حدد --',
      vs: 'VS',
      checkButton: 'تحقق من التوافق 💕',
      selectBothTypes: 'يرجى تحديد كلا النوعين!',
      shareLink: 'تم نسخ الرابط! 📋'
    }
  },

  mn: {
    nav: {
      logo: '🐾 Хүний зан төрөл амьтан тест',
      home: 'Нүүр',
      test: 'Тестийг эхлүүлэх',
      compare: 'Харьцуулах',
      compat: 'Нийцтэй байдал',
      compatChart: 'Нийцтэй байдлын хүснэгт',
      challenges: 'Сорилт',
      about: 'Тухай',
      language: '🌐 Хэл ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Хүний зан төрөл амьтан тест. Бүх эрхүүд хамгаалагдсан.',
      disclaimer: 'Энэ үйлчилгээ бие даасан бөгөөд зөвхөн娱乐 зорилгоор ашигладаг. MBTI® бүртгүүлсэн арга хэмжээ.',
      about: 'Тухай',
      privacy: 'Нууцлалын бодлого'
    },
    compat: {
      title: 'Хүний зан төрөл нийцтэй байдал | Хүний зан төрөл амьтан тест',
      metaDescription: 'Хоёр хүний зан төрлийн нийцтэй байдлыг нарийвчилсан тайлбар, оноогоор шалгаарай.',
      ogTitle: 'Хүний зан төрөл нийцтэй байдал | Хүний зан төрөл амьтан тест',
      ogDescription: 'Хоёр төрлийн нийцтэй байдлын оноо, нарийвчилсан тайлбарыг үзнэ үү!',
      mainTitle: '💕 Хүний зан төрөл нийцтэй байдал',
      mainDesc: 'Хоёр төрлийн нийцтэй байдлын оноо, нарийвчилсан тайлбарыг шалгана уу',
      shareBannerMsg: 'Найзтайгаа холбоос хуваалцан нийцтэй байдлын үр дүнг автоматаар авна уу!',
      shareButton: '🔗 Найзын холбоос хуваалцах',
      compatScore: 'Нийцтэй байдлын оноо',
      relationAdvice: '💡 Харилцааны зөвлөгөө',
      retestButton: 'Тестийг дахин хийх 🔄',
      compatChartButton: 'Бүрэн нийцтэй байдлын хүснэгтийг үзэх',
      selectTitle: 'Төрлүүдийг шууд сонгоно уу',
      myType: 'Миний төрөл',
      partnerType: 'Түнш төрөл',
      selectOption: '-- Сонгоно уу --',
      vs: 'VS',
      checkButton: 'Нийцтэй байдлыг шалгана уу 💕',
      selectBothTypes: 'Хоёр төрлийг сонгоно уу!',
      shareLink: 'Холбоос хуулсан! 📋'
    }
  },

  la: {
    nav: {
      logo: '🐾 Personalitatis Animalis Probatio',
      home: 'Domus',
      test: 'Probare',
      compare: 'Comparare',
      compat: 'Concordantia',
      compatChart: 'Tabula Concordantiae',
      challenges: 'Certamina',
      about: 'De',
      language: '🌐 Lingua ▾',
      korean: '한국어 (KO)',
      english: 'English (EN)',
      japanese: '日本語 (JP)',
      chinese: '简体中文 (ZH)',
      spanish: 'Español (ES)',
      german: 'Deutsch (DE)',
      french: 'Français (FR)',
      russian: 'Русский (RU)',
      portuguese: 'Português (PT)',
      indonesian: 'Indonesia (ID)',
      hindi: 'हिन्दी (HI)',
      vietnamese: 'Tiếng Việt (VI)',
      thai: 'ภาษาไทย (TH)',
      turkish: 'Türkçe (TR)',
      italian: 'Italiano (IT)',
      dutch: 'Nederlands (NL)',
      arabic: 'العربية (AR)',
      mongolian: 'Монгол (MN)',
      latin: 'Latina (LA)'
    },
    footer: {
      copyright: '© 2026 Personalitatis Animalis Probatio. Omnia iura reservata.',
      disclaimer: 'Hoc ministerium independens est et solos ad entertainmentum. MBTI® signum registratum est.',
      about: 'De',
      privacy: 'Politica Privacitatis'
    },
    compat: {
      title: 'Concordantia Personalitatis | Personalitatis Animalis Probatio',
      metaDescription: 'Concordantiam inter duos personalitatis tipos cum explicatione detenta et puncto controla.',
      ogTitle: 'Concordantia Personalitatis | Personalitatis Animalis Probatio',
      ogDescription: 'Vide punctum concordantiae et explicatio detenta inter duos tipos!',
      mainTitle: '💕 Concordantia Personalitatis',
      mainDesc: 'Punctum concordantiae et explicatio detenta inter duos tipos controla',
      shareBannerMsg: 'Nexum cum amico communica ut eventus concordantiae automatice accipias!',
      shareButton: '🔗 Nexum amici communica',
      compatScore: 'Punctum concordantiae',
      relationAdvice: '💡 Consilium relationis',
      retestButton: 'Probare iterum 🔄',
      compatChartButton: 'Tabulam concordantiae plenam vide',
      selectTitle: 'Tipos directe elige',
      myType: 'Meus typus',
      partnerType: 'Typus sodalicii',
      selectOption: '-- Elige --',
      vs: 'VS',
      checkButton: 'Concordantiam controla 💕',
      selectBothTypes: 'Ambos tipos elige!',
      shareLink: 'Nexum copia! 📋'
    }
  }
}
};

// 초기화
if (typeof window !== 'undefined' && window.i18n) {
  window.i18n.setTranslations(TRANSLATIONS);
}
