/**
 * i18n-complete.js - 완전한 다국어 번역 시스템
 * HTML + JavaScript 모두 지원
 *
 * 사용 방법:
 * HTML: <h1 data-i18n="compat.title">한국어 텍스트</h1>
 * JS:   i18n.t('compat.title')
 */

window.i18n = (function() {
  const LANG_KEY = 'mbti_site_lang';
  let currentLang = 'ko';
  let translations = {};
  let supportedLangs = ['ko', 'en', 'ja', 'zh', 'es', 'de', 'fr', 'ru', 'pt', 'id', 'hi', 'vi', 'th', 'tr', 'it', 'nl', 'ar', 'mn', 'la'];

  // 현재 언어 감지 및 설정
  function detectLanguage() {
    // 저장된 언어 확인
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && supportedLangs.includes(saved)) {
      currentLang = saved;
      return;
    }

    // URL에서 언어 감지
    const path = window.location.pathname;
    const match = path.match(/\/(en|jp|ja|zh|es|de|fr|ru|pt|id|hi|vi|th|tr|it|nl|ar|mn|la)\//);
    if (match) {
      let lang = match[1];
      if (lang === 'jp') lang = 'ja'; // jp -> ja 변환
      if (supportedLangs.includes(lang)) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        return;
      }
    }

    // 브라우저 언어 감지
    const browserLang = navigator.language?.split('-')[0];
    if (browserLang && supportedLangs.includes(browserLang)) {
      currentLang = browserLang;
      localStorage.setItem(LANG_KEY, browserLang);
    }
  }

  // 번역 데이터 설정
  function setTranslations(data) {
    translations = data;
  }

  // 번역 가져오기 (중첩 키 지원)
  // 예: "compat.mainTitle" -> TRANSLATIONS.en.compat.mainTitle
  function t(key, defaultValue = '') {
    if (!key) return defaultValue;

    const keys = key.split('.');
    let value = translations[currentLang];

    if (!value) {
      // 현재 언어의 번역이 없으면 한국어로
      value = translations['ko'];
    }

    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return value || defaultValue || key;
  }

  // HTML의 모든 data-i18n 요소 번역
  function translatePage() {
    // 일반 요소들
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translated = t(key);

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translated;
      } else if (element.tagName === 'OPTION') {
        element.textContent = translated;
      } else {
        element.textContent = translated;
      }
    });

    // data-i18n-html (HTML 콘텐츠 포함)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translated = t(key);
      element.innerHTML = translated;
    });

    // Meta 태그들
    translateMetaTags();

    // HTML lang 속성 업데이트
    const langCode = currentLang === 'ja' ? 'ja' : currentLang;
    document.documentElement.lang = langCode;
  }

  // Meta 태그 번역
  function translateMetaTags() {
    // title
    const titleKey = document.documentElement.getAttribute('data-i18n-title');
    if (titleKey) {
      document.title = t(titleKey);
    }

    // meta[name="description"]
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      const descKey = descMeta.getAttribute('data-i18n');
      if (descKey) {
        descMeta.setAttribute('content', t(descKey));
      }
    }

    // meta[property="og:title"]
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const ogTitleKey = ogTitle.getAttribute('data-i18n');
      if (ogTitleKey) {
        ogTitle.setAttribute('content', t(ogTitleKey));
      }
    }

    // meta[property="og:description"]
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      const ogDescKey = ogDesc.getAttribute('data-i18n');
      if (ogDescKey) {
        ogDesc.setAttribute('content', t(ogDescKey));
      }
    }
  }

  // 언어 변경
  function setLanguage(lang) {
    if (!supportedLangs.includes(lang)) {
      console.warn(`Unsupported language: ${lang}`);
      return;
    }

    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    translatePage();

    // 언어 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  // 현재 언어 가져오기
  function getLanguage() {
    return currentLang;
  }

  // 지원하는 언어 목록
  function getSupportedLanguages() {
    return [...supportedLangs];
  }

  // 페이지 초기화
  function init() {
    detectLanguage();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', translatePage);
    } else {
      translatePage();
    }
  }

  return {
    init,
    t,
    setTranslations,
    setLanguage,
    getLanguage,
    getSupportedLanguages,
    translatePage,
    getCurrentLang: getLanguage
  };
})();

// 자동 초기화 (필요시)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.TRANSLATIONS !== 'undefined') {
      window.i18n.setTranslations(window.TRANSLATIONS);
      window.i18n.init();
    }
  });
} else if (typeof window.TRANSLATIONS !== 'undefined') {
  window.i18n.setTranslations(window.TRANSLATIONS);
  window.i18n.init();
}
