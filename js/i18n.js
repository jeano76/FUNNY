/**
 * i18n.js - 다국어 번역 시스템
 * data-i18n 속성으로 마크업된 요소들을 현재 언어로 번역
 */

window.i18n = (function() {
  const LANG_KEY = 'mbti_site_lang';
  let currentLang = 'ko';
  let translations = {};

  // 현재 언어 감지 및 설정
  function detectLanguage() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved) {
      currentLang = saved;
      return;
    }

    // URL에서 언어 감지
    const path = window.location.pathname;
    const match = path.match(/\/(en|jp|zh|es|de|fr|ru|pt|id|hi|vi|th|tr|it|nl|ar|mn|la)\//);
    if (match) {
      currentLang = match[1];
    }
  }

  // 번역 데이터 설정
  function setTranslations(data) {
    translations = data;
  }

  // 주어진 키로 번역 가져오기 (예: "compat.title")
  function t(key, defaultValue = '') {
    const keys = key.split('.');
    let value = translations[currentLang] || translations['ko'];

    for (let k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return value || defaultValue || key;
  }

  // 모든 data-i18n 속성을 가진 요소 번역
  function translatePage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translated = t(key);

      // textContent로 업데이트 (HTML 주입 방지)
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translated;
      } else {
        element.textContent = translated;
      }
    });

    // meta 태그 번역
    translateMetaTags();

    // HTML lang 속성 업데이트
    document.documentElement.lang = currentLang;
  }

  // Meta 태그 번역 (title, description 등)
  function translateMetaTags() {
    // title
    const titleKey = document.querySelector('head').getAttribute('data-i18n-title');
    if (titleKey) {
      document.title = t(titleKey);
    }

    // meta description
    const descMeta = document.querySelector('meta[name="description"]');
    const descKey = descMeta?.getAttribute('data-i18n');
    if (descKey) {
      descMeta.setAttribute('content', t(descKey));
    }

    // og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogTitleKey = ogTitle?.getAttribute('data-i18n');
    if (ogTitleKey) {
      ogTitle.setAttribute('content', t(ogTitleKey));
    }

    // og:description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogDescKey = ogDesc?.getAttribute('data-i18n');
    if (ogDescKey) {
      ogDesc.setAttribute('content', t(ogDescKey));
    }
  }

  // 언어 변경
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    translatePage();
  }

  // 현재 언어 가져오기
  function getLanguage() {
    return currentLang;
  }

  // 페이지 로드 시 번역 초기화
  function init() {
    detectLanguage();

    // 페이지가 로드된 후 번역 수행
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
    translatePage
  };
})();
