/**
 * Auto Language Detection & Redirection Script
 *
 * This script handles language persistence across pages.
 *
 * 1.  It determines the current page's language directory from the URL.
 * 2.  It checks localStorage for a user-selected language directory (e.g., 'en', 'jp').
 * 3.  If the stored directory doesn't match the current one, it redirects to the correct language version of the same page.
 * 4.  If no language is stored, it attempts to auto-detect from browser settings.
 * 5.  Provides a global `window.switchLanguage` function for manual language changes.
 */
(function() {
    // --- Configuration ---
    // Maps browser language codes to the website's directory names.
    const langToDir = {
        'ko': 'ko', 'en': 'en', 'ja': 'jp', 'zh': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh',
        'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
        'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it', 'nl': 'nl',
        'ar': 'ar', 'mn': 'mn', 'la': 'la'
    };
    // Create a definitive list of valid language directory names from the map.
    const validDirs = [...new Set(Object.values(langToDir))];

    // --- Core Functions ---

    /**
     * Parses the window location to determine the current language directory and page file.
     * @returns {{dir: string, page: string}}
     */
    function parseLocation() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);

        let currentDir = 'ko'; // Default directory is 'ko' (root)
        let pageName = 'index.html';

        if (segments.length > 0) {
            // Check if the first segment is a known language directory.
            if (validDirs.includes(segments[0])) {
                currentDir = segments.shift(); // It is. Set dir and remove it from segments.
            }
        }

        if (segments.length > 0) {
            // After potentially removing the lang dir, the last part is the page.
            const lastSegment = segments[segments.length - 1];
            if (lastSegment.includes('.html')) {
                pageName = lastSegment;
            }
        }
        // If segments is empty, we are at a root like / or /en/, so index.html is the correct pageName.
        return { dir: currentDir, page: pageName };
    }

    /**
     * Redirects the browser to the correct language version of a given page.
     * @param {string} targetDir - The language directory to redirect to (e.g., 'jp').
     * @param {string} targetPage - The page file to redirect to (e.g., 'about.html').
     */
    function redirectTo(targetDir, targetPage) {
        const targetPath = targetDir === 'ko'
            ? `/${targetPage}`
            : `/${targetDir}/${targetPage}`;
        
        const currentPath = window.location.pathname;

        // Avoid redundant redirects, e.g. from / to /index.html
        if (currentPath === targetPath || (targetPath === '/index.html' && currentPath === '/')) {
            return;
        }
        window.location.href = targetPath;
    }

    /**
     * Main logic run on every page load.
     */
    function initialize() {
        const { dir: currentDir, page: currentPage } = parseLocation();
        const savedDir = localStorage.getItem('selectedLangDir');

        if (savedDir) {
            // A language has been explicitly selected before. Enforce it.
            if (savedDir !== currentDir) {
                redirectTo(savedDir, currentPage);
            }
        } else {
            // No selection exists. Try to auto-detect from browser settings.
            const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
            const detectedDir = langToDir[browserLang] || langToDir[browserLang.split('-')[0]];

            if (detectedDir && detectedDir !== currentDir) {
                // We have a detected language that is different from the current page's language.
                // Redirect and save the preference so we don't need to detect next time.
                localStorage.setItem('selectedLangDir', detectedDir);
                redirectTo(detectedDir, currentPage);
            }
        }
    }

    // --- Global Function ---

    /**
     * Sets the language preference and triggers a redirection.
     * The code passed to this function must be a valid directory name ('en', 'jp', etc.).
     * @param {string} langDir - The language directory to switch to.
     */
    window.switchLanguage = function(langDir) {
        if (!langDir || !validDirs.includes(langDir)) {
            console.error('Invalid language directory provided to switchLanguage:', langDir);
            return;
        }
        
        localStorage.setItem('selectedLangDir', langDir);

        const { page: currentPage } = parseLocation();
        redirectTo(langDir, currentPage);
    };

    // --- Execution ---
    initialize();

})();
