/**
 * Auto Language Detection & Redirection Script (v5 - Final)
 * Uses a new localStorage key to avoid conflicts.
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

    function parseLocation() {
        const path = window.location.pathname;
        let segments = path.split('/').filter(Boolean);
        let currentDir = 'ko';
        let pageName = 'index.html';

        if (segments.length > 0 && validDirs.includes(segments[0])) {
            currentDir = segments.shift();
        }
        if (segments.length > 0) {
            const last = segments[segments.length - 1];
            if (last.includes('.html')) pageName = last;
        }
        return { dir: currentDir, page: pageName };
    }

    function redirectTo(targetDir, targetPage) {
        const targetPath = (targetDir === 'ko') ? '/' + targetPage : '/' + targetDir + '/' + targetPage;
        const currentPath = window.location.pathname;
        const normCurrent = (currentPath === '/' || currentPath === '') ? '/index.html' : currentPath;
        const normTarget = (targetPath === '/' || targetPath === '') ? '/index.html' : targetPath;

        if (normCurrent !== normTarget) {
            window.location.href = targetPath;
        }
    }

    // 초기화 및 리다이렉트 체크
    const { dir: currentDir, page: currentPage } = parseLocation();
    const savedDir = localStorage.getItem(LANG_KEY);

    if (savedDir && validDirs.includes(savedDir)) {
        if (savedDir !== currentDir) {
            redirectTo(savedDir, currentPage);
            return;
        }
    } else {
        // 자동 감지 (최초 방문 시)
        const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
        const detectedDir = langToDir[browserLang] || langToDir[browserLang.split('-')[0]];
        if (detectedDir && detectedDir !== currentDir) {
            localStorage.setItem(LANG_KEY, detectedDir);
            redirectTo(detectedDir, currentPage);
        }
    }

    // 전역 함수 등록
    window.switchLanguage = function(langDir) {
        if (langDir && validDirs.includes(langDir)) {
            localStorage.setItem(LANG_KEY, langDir);
            redirectTo(langDir, parseLocation().page);
        }
    };
})();
