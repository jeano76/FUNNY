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
    // Check if language is already selected by user
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
      return null; // User has already selected a language
    }

    // Step 1: Try browser language
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const browserLangCode = browserLang.split('-')[0];

    if (langMap[browserLang]) {
      return langMap[browserLang];
    }

    if (langMap[browserLangCode]) {
      return langMap[browserLangCode];
    }

    // Step 2: Try IP-based country detection
    return getIPBasedLang();
  }

  function getIPBasedLang() {
    // Use ip-api.com (free tier available)
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        const country = data.country_code;
        const detectedLang = countryLangMap[country] || 'en';

        // Only redirect if not Korean (default)
        if (detectedLang !== 'ko' && detectedLang !== 'en') {
          performRedirect(detectedLang);
        }
      })
      .catch(error => {
        console.log('Could not detect language from IP:', error);
        // Fallback - continue with page as is
      });

    return null;
  }

  function performRedirect(langCode) {
    // Get current page path
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    // Check if we're already in a language folder
    const supportedLangs = Object.values(langMap);
    const currentLang = pathSegments[0];

    if (supportedLangs.includes(currentLang)) {
      // Already in a language folder, don't redirect
      return;
    }

    // Determine the page name
    let pageName = 'index.html';
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment.includes('.html')) {
        pageName = lastSegment;
      }
    }

    // For root index page
    if (currentPath === '/' || currentPath === '' || currentPath.endsWith('index.html')) {
      pageName = 'index.html';
    }

    // Redirect to language-specific page
    const newPath = `/${langCode}/${pageName}`;
    window.location.href = newPath;
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

    // Get current page
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    let pageName = 'index.html';
    const supportedLangs = Object.values(langMap);

    // Extract page name
    if (pathSegments.length > 0) {
      const lastSegment = pathSegments[pathSegments.length - 1];
      if (lastSegment.includes('.html')) {
        pageName = lastSegment;
      } else if (pathSegments.length > 1) {
        pageName = pathSegments[pathSegments.length - 1];
      }
    }

    // Handle language switching
    if (langCode === 'ko') {
      // Korean is root
      window.location.href = `/${pageName}`;
    } else {
      window.location.href = `/${langCode}/${pageName}`;
    }
  };
})();
