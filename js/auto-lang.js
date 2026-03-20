/**
 * Auto Language Detection & Redirection Script (v2.0)
 * Executed IMMEDIATELY to prevent flash of unlocalized content.
 */
(function() {
    const LANG_KEY = 'mbti_site_lang';
    const langToDir = {
        'ko': '', 'en': 'en', 'ja': 'jp', 'jp': 'jp', 'zh': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh',
        'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
        'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it', 'nl': 'nl',
        'ar': 'ar', 'mn': 'mn', 'la': 'la'
    };
    const validDirs = [...new Set(Object.values(langToDir).filter(d => d !== ''))];

    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    let currentDir = '';  // Empty string for root (Korean)
    let pageName = 'index.html';

    if (segments.length > 0 && validDirs.includes(segments[0])) {
        currentDir = segments.shift();
    }
    if (segments.length > 0) {
        const last = segments[segments.length - 1];
        if (last.includes('.html')) pageName = last;
    }

    const savedLang = localStorage.getItem(LANG_KEY);
    const savedDir = savedLang ? langToDir[savedLang] : null;

    // 리다이렉트 로직: 저장된 언어와 현재 디렉토리가 다르면 즉시 이동
    if (savedDir && savedDir !== currentDir) {
        const targetPath = (savedDir === 'ko') ? '/' + pageName : '/' + savedDir + '/' + pageName;
        // Use href for more reliable redirect
        window.location.href = targetPath;
    }

    // 전역 함수 등록
    window.switchLanguage = function(langDir) {
        if (langDir === 'ko' || langDir === '') {
            localStorage.setItem(LANG_KEY, 'ko');
            window.location.href = '/' + pageName;
            return;
        }
        if (langDir && validDirs.includes(langDir)) {
            localStorage.setItem(LANG_KEY, langDir);
            window.location.href = '/' + langDir + '/' + pageName;
        }
    };
})();
