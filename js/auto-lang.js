/**
 * Auto Language Detection & Redirection Script (v2.0)
 * Executed IMMEDIATELY to prevent flash of unlocalized content.
 */
(function() {
    const LANG_KEY = 'mbti_site_lang';
    const langToDir = {
        'ko': 'ko', 'en': 'en', 'ja': 'jp', 'jp': 'jp', 'zh': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh',
        'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
        'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it', 'nl': 'nl',
        'ar': 'ar', 'mn': 'mn', 'la': 'la'
    };
    const validDirs = [...new Set(Object.values(langToDir))];

    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    let currentDir = 'ko';
    let pageName = 'index.html';

    if (segments.length > 0 && validDirs.includes(segments[0])) {
        currentDir = segments.shift();
    }
    if (segments.length > 0) {
        const last = segments[segments.length - 1];
        if (last.includes('.html')) pageName = last;
    }

    const savedDir = localStorage.getItem(LANG_KEY);
    
    // 리다이렉트 로직: 저장된 언어와 현재 디렉토리가 다르면 즉시 이동
    if (savedDir && validDirs.includes(savedDir) && savedDir !== currentDir) {
        const targetPath = (savedDir === 'ko') ? '/' + pageName : '/' + savedDir + '/' + pageName;
        window.location.replace(targetPath); // history에 남기지 않고 즉시 교체
    }

    // 전역 함수 등록
    window.switchLanguage = function(langDir) {
        if (langDir && validDirs.includes(langDir)) {
            localStorage.setItem(LANG_KEY, langDir);
            const targetPath = (langDir === 'ko') ? '/' + pageName : '/' + langDir + '/' + pageName;
            window.location.href = targetPath;
        }
    };
})();
