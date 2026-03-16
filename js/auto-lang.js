/**
 * Auto Language Detection & Redirect
 * Priority: Browser Language > IP-based Country > Default (English)
 */

(function() {
  // Language mappings
  const langMap = {
    'ko': 'ko',
    'en': 'en',
    'ja': 'jp',
    'zh': 'zh',
    'zh-hans': 'zh',
    'zh-hant': 'zh',
    'es': 'es',
    'de': 'de',
    'fr': 'fr',
    'ru': 'ru',
    'pt': 'pt',
    'id': 'id',
    'hi': 'hi',
    'vi': 'vi',
    'th': 'th',
    'tr': 'tr',
    'it': 'it',
    'nl': 'nl',
    'ar': 'ar',
    'mn': 'mn',
    'la': 'la'
  };

  // Country to language mapping (GeoIP based)
  const countryLangMap = {
    'KR': 'ko',
    'US': 'en',
    'GB': 'en',
    'AU': 'en',
    'CA': 'en',
    'IE': 'en',
    'NZ': 'en',
    'SG': 'en',
    'JP': 'jp',
    'CN': 'zh',
    'TW': 'zh',
    'HK': 'zh',
    'MO': 'zh',
    'ES': 'es',
    'MX': 'es',
    'AR': 'es',
    'CO': 'es',
    'PE': 'es',
    'VE': 'es',
    'CL': 'es',
    'DE': 'de',
    'AT': 'de',
    'CH': 'de',
    'FR': 'fr',
    'BE': 'fr',
    'LU': 'fr',
    'RU': 'ru',
    'PT': 'pt',
    'BR': 'pt',
    'ID': 'id',
    'IN': 'hi',
    'VN': 'vi',
    'TH': 'th',
    'TR': 'tr',
    'IT': 'it',
    'NL': 'nl',
    'AE': 'ar',
    'SA': 'ar',
    'EG': 'ar',
    'MN': 'mn'
  };

  function getDetectedLang() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const supportedLangs = Object.values(langMap);
    let currentLang = 'ko'; // Default

    if (pathSegments.length > 0 && supportedLangs.includes(pathSegments[0])) {
      currentLang = pathSegments[0];
    }

    // Check if language is already selected by user
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      if (savedLang !== currentLang) {
        performRedirect(savedLang);
      }
      return null;
    }

    // Step 1: Try browser language
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const browserLangCode = browserLang.split('-')[0];

    let detected = null;
    if (langMap[browserLang]) {
      detected = langMap[browserLang];
    } else if (langMap[browserLangCode]) {
      detected = langMap[browserLangCode];
    }

    if (detected && detected !== currentLang) {
      performRedirect(detected);
      return detected;
    }

    // Step 2: Try IP-based country detection
    return getIPBasedLang();
  }

  function getIPBasedLang() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const supportedLangs = Object.values(langMap);
    let currentLang = 'ko';
    if (pathSegments.length > 0 && supportedLangs.includes(pathSegments[0])) {
      currentLang = pathSegments[0];
    }

    // Use ip-api.com (free tier available)
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const country = data.country_code;
        const detectedLang = countryLangMap[country] || 'en';

        // Only redirect if different from current and not Korean (if we are at root)
        if (detectedLang !== currentLang) {
          if (currentLang === 'ko' && detectedLang === 'en') {
             // If default is Korean and detected is English, maybe don't force if they haven't picked
             return;
          }
          performRedirect(detectedLang);
        }
      })
      .catch(error => {
        console.log('Could not detect language from IP:', error);
      });

    return null;
  }

  function performRedirect(langCode) {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const supportedLangs = Object.values(langMap);
    
    let pageName = 'index.html';
    
    // Extract page name: check the last segment
    if (pathSegments.length > 0) {
        const lastSegment = pathSegments[pathSegments.length - 1];
        if (lastSegment.includes('.html')) {
            pageName = lastSegment;
        }
    }

    let newPath;
    if (langCode === 'ko') {
      newPath = `/${pageName}`;
    } else {
      newPath = `/${langCode}/${pageName}`;
    }
    
    // Normalize index.html to / for root if it's index.html
    const normalizedCurrent = (currentPath === '/' || currentPath === '/index.html') ? '/index.html' : currentPath;
    const normalizedNew = (newPath === '/' || newPath === '/index.html') ? '/index.html' : newPath;

    if (normalizedCurrent !== normalizedNew) {
        window.location.href = newPath;
    }
  }

  // Run detection on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', getDetectedLang);
  } else {
    getDetectedLang();
  }

  // Also expose function for manual language switching
  window.switchLanguage = function(langCode) {
    localStorage.setItem('selectedLang', langCode);
    performRedirect(langCode);
  };
})();
