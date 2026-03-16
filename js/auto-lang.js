/**
 * Auto Language Detection & Redirection Script
 *
 * This script handles language persistence across pages.
 *
 * 1.  It determines the current page's language and file name from the URL.
 * 2.  It checks localStorage for a user-selected language.
 * 3.  If the stored language doesn't match the current page's language, it redirects to the correct language version of the same page.
 * 4.  If no language is stored, it attempts to auto-detect based on browser settings.
 * 5.  Provides a global `window.switchLanguage` function for manual language changes.
 */
(function() {
    // --- Configuration ---
    const langMap = {
        'ko': 'ko', 'en': 'en', 'ja': 'jp', 'zh': 'zh', 'zh-hans': 'zh', 'zh-hant': 'zh',
        'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
        'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it', 'nl': 'nl',
        'ar': 'ar', 'mn': 'mn', 'la': 'la'
    };
    const supportedLangs = Object.keys(langMap);

    // --- Core Functions ---

    /**
     * Parses the window location to determine the current language and page file.
     * @returns {{lang: string, page: string}}
     */
    function parseLocation() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);

        let currentLang = 'ko'; // Default language is Korean (at root)
        let pageName = 'index.html';

        if (segments.length > 0) {
            // Check if the first segment is a known language code
            if (supportedLangs.includes(segments[0])) {
                currentLang = segments.shift(); // e.g., 'en'. Segments is now the rest of the path.
            }
        }

        if (segments.length > 0) {
            // After potentially removing lang, the last part should be the page
            const lastSegment = segments[segments.length - 1];
            if (lastSegment.includes('.html')) {
                pageName = lastSegment;
            }
        }
        // If segments is empty, it means we are at a root like / or /en/, so index.html is correct.
        
        return { lang: currentLang, page: pageName };
    }

    /**
     * Redirects the browser to the correct language version of a given page.
     * @param {string} targetLang - The language code to redirect to (e.g., 'en').
     * @param {string} targetPage - The page file to redirect to (e.g., 'about.html').
     */
    function redirectTo(targetLang, targetPage) {
        const targetPath = targetLang === 'ko'
            ? `/${targetPage}`
            : `/${targetLang}/${targetPage}`;
        
        // Avoid redundant redirects, especially for / vs /index.html
        if (window.location.pathname !== targetPath) {
            // Handle root index case
            if (targetPath === '/index.html' && window.location.pathname === '/') {
                return;
            }
            window.location.href = targetPath;
        }
    }

    /**
     * Main logic run on every page load.
     */
    function initialize() {
        const { lang: currentLang, page: currentPage } = parseLocation();
        const savedLang = localStorage.getItem('selectedLang');

        if (savedLang) {
            // User has a saved preference. Enforce it.
            if (savedLang !== currentLang) {
                redirectTo(savedLang, currentPage);
            }
        } else {
            // No saved preference, try to auto-detect from browser.
            const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
            const browserLangCode = browserLang.split('-')[0];
            const detectedLang = langMap[browserLang] || langMap[browserLangCode];

            if (detectedLang && detectedLang !== currentLang) {
                // We have a detected language that is different.
                // We'll redirect, but also save it so we don't need to detect next time.
                localStorage.setItem('selectedLang', detectedLang);
                redirectTo(detectedLang, currentPage);
            }
        }
    }

    // --- Global Function ---

    /**
     * Sets the language preference and triggers a redirection.
     * Exposed on the window object for nav.js to use.
     * @param {string} langCode - The language code to switch to.
     */
    window.switchLanguage = function(langCode) {
        if (!langCode || !supportedLangs.includes(langCode)) {
            console.error('Invalid language code provided to switchLanguage:', langCode);
            return;
        }
        
        localStorage.setItem('selectedLang', langCode);

        // We need to know which page we are on to redirect correctly.
        const { page: currentPage } = parseLocation();
        redirectTo(langCode, currentPage);
    };

    // --- Execution ---
    initialize();

})();
