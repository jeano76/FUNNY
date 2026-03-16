/**
 * Auto Language Detection & Redirection Script (v4)
 *
 * Final attempt to fix language persistence.
 * This version includes a more robust path parser and reverts localStorage key.
 */
(function() {
    // --- Configuration ---
    const langToDir = {
        'ko': 'ko', 'en': 'en', 'ja': 'jp', 'jp': 'jp', 'zh': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh',
        'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
        'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it', 'nl': 'nl',
        'ar': 'ar', 'mn': 'mn', 'la': 'la'
    };
    const validDirs = [...new Set(Object.values(langToDir))];

    /**
     * Parses the window location to determine the current language directory and page file.
     */
    function parseLocation() {
        const path = window.location.pathname;
        let segments = path.split('/').filter(Boolean);

        let currentDir = 'ko'; // Root
        let pageName = 'index.html';

        if (segments.length > 0) {
            // First segment might be a language dir
            if (validDirs.includes(segments[0])) {
                currentDir = segments[0];
                segments.shift(); // Remove the lang dir segment
            }
        }

        // The last segment should be the page
        if (segments.length > 0) {
            const last = segments[segments.length - 1];
            if (last.includes('.html')) {
                pageName = last;
            }
        }

        return { dir: currentDir, page: pageName };
    }

    /**
     * Redirects the browser to the correct language version of a given page.
     */
    function redirectTo(targetDir, targetPage) {
        const targetPath = (targetDir === 'ko') 
            ? '/' + targetPage 
            : '/' + targetDir + '/' + targetPage;
        
        const currentPath = window.location.pathname;
        
        // Normalize paths for comparison
        const normCurrent = currentPath === '/' ? '/index.html' : currentPath;
        const normTarget = targetPath === '/' ? '/index.html' : targetPath;

        if (normCurrent !== normTarget) {
            window.location.href = targetPath;
        }
    }

    /**
     * Main logic run on every page load.
     */
    function initialize() {
        const { dir: currentDir, page: currentPage } = parseLocation();
        const savedDir = localStorage.getItem('selectedLang'); // Reverted key name

        if (savedDir) {
            if (savedDir !== currentDir) {
                redirectTo(savedDir, currentPage);
                return; // Stop further execution after redirect
            }
        } else {
            const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
            const detectedDir = langToDir[browserLang] || langToDir[browserLang.split('-')[0]];

            if (detectedDir && detectedDir !== currentDir) {
                localStorage.setItem('selectedLang', detectedDir);
                redirectTo(detectedDir, currentPage);
                return; // Stop further execution after redirect
            }
        }
    }

    /**
     * Sets the language preference and triggers a redirection.
     */
    window.switchLanguage = function(langDir) {
        if (!langDir || !validDirs.includes(langDir)) {
            return;
        }
        
        localStorage.setItem('selectedLang', langDir);
        const { page: currentPage } = parseLocation();
        redirectTo(langDir, currentPage);
    };

    // --- Execution ---
    initialize();

})();
