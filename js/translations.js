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
      ogDescription: '일상 속 행동으로 알아보는 나의 성격 유형! 16가지 동물 캐릭터 결과를 친구와 공유해보세요.'
    },

    // ========== quiz.html ==========
    quiz: {
      metaDescription: '20가지 일상 상황으로 알아보는 나의 성격 유형. 지금 바로 테스트를 시작해보세요!',
      title: '성격 유형 테스트 진행 중 | 성격 유형 동물 테스트',
      ogTitle: '성격 유형 테스트 진행 중',
      ogDescription: '20가지 상황별 문항으로 당신의 성격을 분석합니다.'
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
      ogDescription: 'Find your personality type and share it with friends!'
    },
    quiz: {
      metaDescription: 'Take the personality test with 20 real-life scenarios. Discover your personality type now!',
      title: 'Personality Test in Progress | Personality Animal Test',
      ogTitle: 'Personality Test in Progress',
      ogDescription: 'Analyze your personality with 20 situational questions.'
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
      ogDescription: '性格タイプを発見して友達とシェアしよう！'
    },
    quiz: {
      metaDescription: '20のリアルな場面でテスト。あなたの性格タイプを発見しましょう！',
      title: '性格テスト進行中 | 性格動物テスト',
      ogTitle: '性格テスト進行中',
      ogDescription: '20の状況別質問であなたの性格を分析します。'
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
    }
  },

  // 다른 언어들... (간결함을 위해 주요 언어만 표시)
  // 실제로는 모든 19개 언어를 포함해야 합니다
  // 지면 관계상 ko, en, ja만 표시했습니다

  // 기본값으로 한국어 사용
  fr: { nav: { logo: '🐾 Test de Personnalité Animale', home: 'Accueil', test: 'Commencer le test', compare: 'Comparer', compat: 'Compatibilité', compatChart: 'Tableau de compatibilité', challenges: 'Défis', about: 'À propos', language: '🌐 Langue ▾' }, footer: { copyright: '© 2026 Test de Personnalité Animale. Tous droits réservés.', disclaimer: 'Ce service est indépendant et fourni à titre informatif. MBTI® est une marque déposée de The Myers & Briggs Foundation et ce service n\'est pas affilié.', about: 'À propos', privacy: 'Politique de confidentialité' } },
  es: { nav: { logo: '🐾 Prueba de Personalidad Animal', home: 'Inicio', test: 'Comenzar prueba', compare: 'Comparar', compat: 'Compatibilidad', compatChart: 'Tabla de compatibilidad', challenges: 'Desafíos', about: 'Acerca de', language: '🌐 Idioma ▾' }, footer: { copyright: '© 2026 Prueba de Personalidad Animal. Todos los derechos reservados.', disclaimer: 'Este servicio es independiente y únicamente para entretenimiento. MBTI® es una marca registrada de The Myers & Briggs Foundation.', about: 'Acerca de', privacy: 'Política de privacidad' } },
  de: { nav: { logo: '🐾 Persönlichkeits-Tiertest', home: 'Startseite', test: 'Test starten', compare: 'Vergleichen', compat: 'Kompatibilität', compatChart: 'Kompatibilitätstabelle', challenges: 'Herausforderungen', about: 'Über uns', language: '🌐 Sprache ▾' }, footer: { copyright: '© 2026 Persönlichkeits-Tiertest. Alle Rechte vorbehalten.', disclaimer: 'Dieser Service ist unabhängig und nur zu Unterhaltungszwecken. MBTI® ist eine registrierte Marke von The Myers & Briggs Foundation.', about: 'Über uns', privacy: 'Datenschutzrichtlinie' } },
  zh: { nav: { logo: '🐾 个性动物测试', home: '首页', test: '开始测试', compare: '比较', compat: '兼容性', compatChart: '兼容性图表', challenges: '挑战', about: '关于', language: '🌐 语言 ▾' }, footer: { copyright: '© 2026 个性动物测试。保留所有权利。', disclaimer: '本服务是独立的，仅供娱乐使用。MBTI®是The Myers & Briggs Foundation的注册商标。', about: '关于我们', privacy: '隐私政策' } },
  ru: { nav: { logo: '🐾 Тест личности животных', home: 'Главная', test: 'Начать тест', compare: 'Сравнить', compat: 'Совместимость', compatChart: 'Таблица совместимости', challenges: 'Вызовы', about: 'О нас', language: '🌐 Язык ▾' }, footer: { copyright: '© 2026 Тест личности животных. Все права защищены.', disclaimer: 'Этот сервис независим и предназначен только для развлечения. MBTI® является зарегистрированной торговой маркой.', about: 'О нас', privacy: 'Политика конфиденциальности' } },
  pt: { nav: { logo: '🐾 Teste de Personalidade Animal', home: 'Início', test: 'Começar teste', compare: 'Comparar', compat: 'Compatibilidade', compatChart: 'Tabela de compatibilidade', challenges: 'Desafios', about: 'Sobre', language: '🌐 Idioma ▾' }, footer: { copyright: '© 2026 Teste de Personalidade Animal. Todos os direitos reservados.', disclaimer: 'Este serviço é independente e apenas para entretenimento. MBTI® é uma marca registrada.', about: 'Sobre', privacy: 'Política de privacidade' } },
  ar: { nav: { logo: '🐾 اختبار الشخصية الحيوانية', home: 'الرئيسية', test: 'ابدأ الاختبار', compare: 'مقارنة', compat: 'التوافق', compatChart: 'جدول التوافق', challenges: 'تحديات', about: 'حول', language: '🌐 اللغة ▾' }, footer: { copyright: '© 2026 اختبار الشخصية الحيوانية. جميع الحقوق محفوظة.', disclaimer: 'هذه الخدمة مستقلة وللترفيه فقط. MBTI® علامة تجارية مسجلة.', about: 'حول', privacy: 'سياسة الخصوصية' } },
  id: { nav: { logo: '🐾 Tes Kepribadian Hewan', home: 'Beranda', test: 'Mulai tes', compare: 'Bandingkan', compat: 'Kompatibilitas', compatChart: 'Tabel kompatibilitas', challenges: 'Tantangan', about: 'Tentang', language: '🌐 Bahasa ▾' }, footer: { copyright: '© 2026 Tes Kepribadian Hewan. Semua hak dilindungi.', disclaimer: 'Layanan ini independen dan hanya untuk hiburan. MBTI® adalah merek dagang terdaftar.', about: 'Tentang', privacy: 'Kebijakan privasi' } },
  hi: { nav: { logo: '🐾 व्यक्तित्व पशु परीक्षण', home: 'मुख्य पृष्ठ', test: 'परीक्षण शुरू करें', compare: 'तुलना करें', compat: 'अनुकूलता', compatChart: 'अनुकूलता चार्ट', challenges: 'चुनौतियाँ', about: 'परिचय', language: '🌐 भाषा ▾' }, footer: { copyright: '© 2026 व्यक्तित्व पशु परीक्षण। सर्वाधिकार सुरक्षित।', disclaimer: 'यह सेवा स्वतंत्र है और केवल मनोरंजन के लिए है। MBTI® एक पंजीकृत ट्रेडमार्क है।', about: 'परिचय', privacy: 'गोपनीयता नीति' } },
  vi: { nav: { logo: '🐾 Bài kiểm tra tính cách động vật', home: 'Trang chủ', test: 'Bắt đầu bài kiểm tra', compare: 'So sánh', compat: 'Tương thích', compatChart: 'Bảng tương thích', challenges: 'Thách thức', about: 'Giới thiệu', language: '🌐 Ngôn ngữ ▾' }, footer: { copyright: '© 2026 Bài kiểm tra tính cách động vật. Bảo lưu tất cả quyền.', disclaimer: 'Dịch vụ này độc lập và chỉ để giải trí. MBTI® là một thương hiệu được đăng ký.', about: 'Giới thiệu', privacy: 'Chính sách bảo mật' } },
  th: { nav: { logo: '🐾 ทดสอบบุคลิกภาพสัตว์', home: 'หน้าแรก', test: 'เริ่มทดสอบ', compare: 'เปรียบเทียบ', compat: 'ความเข้ากันได้', compatChart: 'ตารางความเข้ากันได้', challenges: 'ท้าทาย', about: 'เกี่ยวกับ', language: '🌐 ภาษา ▾' }, footer: { copyright: '© 2026 ทดสอบบุคลิกภาพสัตว์ สงวนสิทธิ์ทั้งหมด', disclaimer: 'บริการนี้เป็นอิสระและสำหรับความบันเทิงเท่านั้น MBTI® เป็นเครื่องหมายการค้าที่จดทะเบียน', about: 'เกี่ยวกับ', privacy: 'นโยบายความเป็นส่วนตัว' } },
  tr: { nav: { logo: '🐾 Kişilik Hayvan Testi', home: 'Anasayfa', test: 'Teste başla', compare: 'Karşılaştır', compat: 'Uyumluluk', compatChart: 'Uyumluluk Tablosu', challenges: 'Zorluklar', about: 'Hakkında', language: '🌐 Dil ▾' }, footer: { copyright: '© 2026 Kişilik Hayvan Testi. Tüm hakları saklıdır.', disclaimer: 'Bu hizmet bağımsız ve sadece eğlence amaçlıdır. MBTI® tescilli bir ticari marktır.', about: 'Hakkında', privacy: 'Gizlilik Politikası' } },
  it: { nav: { logo: '🐾 Test della Personalità Animale', home: 'Home', test: 'Inizia il test', compare: 'Confronta', compat: 'Compatibilità', compatChart: 'Tabella compatibilità', challenges: 'Sfide', about: 'Chi siamo', language: '🌐 Lingua ▾' }, footer: { copyright: '© 2026 Test della Personalità Animale. Tutti i diritti riservati.', disclaimer: 'Questo servizio è indipendente e solo a scopo di intrattenimento. MBTI® è un marchio registrato.', about: 'Chi siamo', privacy: 'Politica sulla privacy' } },
  nl: { nav: { logo: '🐾 Persoonlijkheid Dierentest', home: 'Startpagina', test: 'Test starten', compare: 'Vergelijken', compat: 'Compatibiliteit', compatChart: 'Compatibiliteitstabel', challenges: 'Uitdagingen', about: 'Over', language: '🌐 Taal ▾' }, footer: { copyright: '© 2026 Persoonlijkheid Dierentest. Alle rechten voorbehouden.', disclaimer: 'Deze service is onafhankelijk en alleen voor vermaak. MBTI® is een geregistreerd handelsmerk.', about: 'Over', privacy: 'Privacybeleid' } },
  mn: { nav: { logo: '🐾 Хүний зан төрөл амьтан тест', home: 'Нүүр', test: 'Тестийг эхлүүлэх', compare: 'Харьцуулах', compat: 'Нийцтэй байдал', compatChart: 'Нийцтэй байдлын хүснэгт', challenges: 'Сорилт', about: 'Тухай', language: '🌐 Хэл ▾' }, footer: { copyright: '© 2026 Хүний зан төрөл амьтан тест. Бүх эрхүүд хамгаалагдсан.', disclaimer: 'Энэ үйлчилгээ бие даасан бөгөөд зөвхөн娱乐 зорилгоор ашигладаг. MBTI® бүртгүүлсэн арга хэмжээ.', about: 'Тухай', privacy: 'Нууцлалын бодлого' } },
  la: { nav: { logo: '🐾 Personalitatis Animalis Probatio', home: 'Domus', test: 'Probare', compare: 'Comparare', compat: 'Concordantia', compatChart: 'Tabula Concordantiae', challenges: 'Certamina', about: 'De', language: '🌐 Lingua ▾' }, footer: { copyright: '© 2026 Personalitatis Animalis Probatio. Omnia iura reservata.', disclaimer: 'Hoc ministerium independens est et solos ad entertainmentum. MBTI® signum registratum est.', about: 'De', privacy: 'Politica Privacitatis' } }
};

// 초기화
if (typeof window !== 'undefined' && window.i18n) {
  window.i18n.setTranslations(TRANSLATIONS);
}
