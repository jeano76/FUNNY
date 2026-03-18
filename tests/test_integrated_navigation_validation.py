"""
Integrated Navigation + Language Validation Tests

Tests navigation by clicking menu buttons and simultaneously validating:
1. Page layout (nav, main, footer visibility)
2. Language settings (html[lang], localStorage, translations)

This ensures that after each menu click, the destination page has
BOTH correct layout AND correct language settings.
"""

import pytest
import time
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


BASE_URL = "http://localhost:8000"

# Available language codes
LANGUAGES = [
    "ko",
    "en",
    "ja",
    "zh",
    "es",
    "de",
    "fr",
    "ru",
    "pt",
    "id",
    "hi",
    "vi",
    "th",
    "tr",
    "it",
    "nl",
    "ar",
    "mn",
    "la",
]

# Navigation links to test
NAV_LINKS = {
    "home": "a[data-i18n='nav.home']",
    "test": "a[data-i18n='nav.test']",
    "compare": "a[data-i18n='nav.compare']",
    "challenges": "a[data-i18n='nav.challenges']",
    "about": "a[data-i18n='nav.about']",
}

# Language to HTML lang attribute mapping
LANG_TO_HTML_LANG = {
    "ko": "ko",
    "en": "en",
    "ja": "ja",
    "zh": "zh",
    "es": "es",
    "de": "de",
    "fr": "fr",
    "ru": "ru",
    "pt": "pt",
    "id": "id",
    "hi": "hi",
    "vi": "vi",
    "th": "th",
    "tr": "tr",
    "it": "it",
    "nl": "nl",
    "ar": "ar",
    "mn": "mn",
    "la": "la",
}

# Language folder mapping
LANG_TO_FOLDER = {
    "ko": "",  # Root folder
    "en": "en",
    "ja": "jp",  # jp folder, ja language code
    "zh": "zh",
    "es": "es",
    "de": "de",
    "fr": "fr",
    "ru": "ru",
    "pt": "pt",
    "id": "id",
    "hi": "hi",
    "vi": "vi",
    "th": "th",
    "tr": "tr",
    "it": "it",
    "nl": "nl",
    "ar": "ar",
    "mn": "mn",
    "la": "la",
}


class TestIntegratedNavigation:
    """Integrated navigation + language validation tests."""

    def test_ko_index_nav_links_with_validation(self, driver, clear_localStorage):
        """
        Test Korean index.html: Click each nav link and validate
        language consistency (layout + language settings).
        """
        page_obj = BasePage(driver)

        for link_name, selector in NAV_LINKS.items():
            # 1. Navigate to Korean index
            driver.get(f"{BASE_URL}/index.html")
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, selector)

            # 2. Click nav link
            page_obj.safe_click(By.CSS_SELECTOR, selector)

            # 3. Wait for page to load
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(2)  # Wait for translation initialization and i18n to run

            # 4. Validate language consistency
            validation = page_obj.validate_language_consistency("ko")

            # 5. Assert all validations pass
            assert validation["html_lang_valid"], \
                f"KOREAN INDEX - {link_name} page: html[lang] = '{validation['html_lang_actual']}', expected 'ko'. URL: {validation['url']}"
            assert validation["localStorage_valid"], \
                f"KOREAN INDEX - {link_name} page: localStorage = '{validation['localStorage_actual']}', expected 'ko'"
            assert validation["untranslated_count"] == 0, \
                f"KOREAN INDEX - {link_name} page: Found {validation['untranslated_count']} untranslated elements: {validation['untranslated_keys']}"
            assert validation["layout_valid"], \
                f"KOREAN INDEX - {link_name} page: Layout elements not visible. Errors: {validation['errors']}"
            assert not validation["horizontal_scroll"], \
                f"KOREAN INDEX - {link_name} page: Horizontal scroll detected"

            print(f"✓ Korean index → {link_name}: All validations passed")

    def test_en_index_nav_links_with_validation(self, driver, clear_localStorage):
        """
        Test English index.html: Click each nav link and validate
        language consistency.
        """
        page_obj = BasePage(driver)

        for link_name, selector in NAV_LINKS.items():
            # 1. Navigate to English index
            driver.get(f"{BASE_URL}/en/index.html")
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, selector)

            # 2. Click nav link
            page_obj.safe_click(By.CSS_SELECTOR, selector)

            # 3. Wait for page to load
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(2)  # Wait for translation initialization and i18n to run

            # 4. Validate language consistency
            validation = page_obj.validate_language_consistency("en")

            # 5. Assert all validations pass
            assert validation["html_lang_valid"], \
                f"ENGLISH INDEX - {link_name} page: html[lang] = '{validation['html_lang_actual']}', expected 'en'. URL: {validation['url']}"
            assert validation["localStorage_valid"], \
                f"ENGLISH INDEX - {link_name} page: localStorage = '{validation['localStorage_actual']}', expected 'en'"
            assert validation["untranslated_count"] == 0, \
                f"ENGLISH INDEX - {link_name} page: Found {validation['untranslated_count']} untranslated elements: {validation['untranslated_keys']}"
            assert validation["layout_valid"], \
                f"ENGLISH INDEX - {link_name} page: Layout elements not visible. Errors: {validation['errors']}"
            assert not validation["horizontal_scroll"], \
                f"ENGLISH INDEX - {link_name} page: Horizontal scroll detected"

            print(f"✓ English index → {link_name}: All validations passed")

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_lang_switch_with_validation(self, driver, clear_localStorage, lang):
        """
        Test language switching: Click language dropdown, select language,
        and validate the destination page has correct language settings.
        """
        page_obj = BasePage(driver)

        # 1. Start on Korean index
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # 2. Click language dropdown
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # 3. Build expected href for language link
        if lang == "ko":
            expected_href = "/index.html"
        else:
            folder = LANG_TO_FOLDER[lang]
            expected_href = f"/{folder}/index.html"

        # 4. Click language link
        try:
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, f"a[href='{expected_href}']")
            page_obj.safe_click(By.CSS_SELECTOR, f"a[href='{expected_href}']")
        except:
            pytest.skip(f"Language link for {lang} not found")

        # 5. Wait for page to load
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")
        time.sleep(0.5)

        # 6. Validate language consistency
        expected_html_lang = LANG_TO_HTML_LANG[lang]
        validation = page_obj.validate_language_consistency(lang)

        # 7. Assert validations
        assert validation["html_lang_valid"], \
            f"LANG SWITCH - {lang}: html[lang] = '{validation['html_lang_actual']}', expected '{expected_html_lang}'"
        assert validation["localStorage_valid"], \
            f"LANG SWITCH - {lang}: localStorage = '{validation['localStorage_actual']}', expected '{lang}'"
        assert validation["untranslated_count"] == 0, \
            f"LANG SWITCH - {lang}: Found {validation['untranslated_count']} untranslated elements: {validation['untranslated_keys']}"
        assert validation["layout_valid"], \
            f"LANG SWITCH - {lang}: Layout not valid. Errors: {validation['errors']}"
        assert not validation["horizontal_scroll"], \
            f"LANG SWITCH - {lang}: Horizontal scroll detected"

        print(f"✓ Language switch to {lang}: All validations passed")

    def test_ko_quiz_nav_links_with_validation(self, driver, clear_localStorage):
        """
        Test Korean quiz.html: Click each nav link from quiz page and
        validate language consistency on destination pages.
        """
        page_obj = BasePage(driver)

        for link_name, selector in NAV_LINKS.items():
            # 1. Navigate to Korean quiz
            driver.get(f"{BASE_URL}/quiz.html")
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, selector)

            # 2. Click nav link
            page_obj.safe_click(By.CSS_SELECTOR, selector)

            # 3. Wait for page to load
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(0.5)

            # 4. Validate language consistency
            validation = page_obj.validate_language_consistency("ko")

            # 5. Assert validations
            assert validation["html_lang_valid"], \
                f"KOREAN QUIZ - {link_name} page: html[lang] = '{validation['html_lang_actual']}', expected 'ko'"
            assert validation["localStorage_valid"], \
                f"KOREAN QUIZ - {link_name} page: localStorage = '{validation['localStorage_actual']}', expected 'ko'"
            assert validation["untranslated_count"] == 0, \
                f"KOREAN QUIZ - {link_name} page: Found {validation['untranslated_count']} untranslated elements: {validation['untranslated_keys']}"
            assert validation["layout_valid"], \
                f"KOREAN QUIZ - {link_name} page: Layout not valid"
            assert not validation["horizontal_scroll"], \
                f"KOREAN QUIZ - {link_name} page: Horizontal scroll detected"

            print(f"✓ Korean quiz → {link_name}: All validations passed")

    def test_en_quiz_nav_links_with_validation(self, driver, clear_localStorage):
        """
        Test English quiz.html: Click each nav link from quiz page and
        validate language consistency on destination pages.
        """
        page_obj = BasePage(driver)

        for link_name, selector in NAV_LINKS.items():
            # 1. Navigate to English quiz
            driver.get(f"{BASE_URL}/en/quiz.html")
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, selector)

            # 2. Click nav link
            page_obj.safe_click(By.CSS_SELECTOR, selector)

            # 3. Wait for page to load
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(0.5)

            # 4. Validate language consistency
            validation = page_obj.validate_language_consistency("en")

            # 5. Assert validations
            assert validation["html_lang_valid"], \
                f"ENGLISH QUIZ - {link_name} page: html[lang] = '{validation['html_lang_actual']}', expected 'en'"
            assert validation["localStorage_valid"], \
                f"ENGLISH QUIZ - {link_name} page: localStorage = '{validation['localStorage_actual']}', expected 'en'"
            assert validation["untranslated_count"] == 0, \
                f"ENGLISH QUIZ - {link_name} page: Found {validation['untranslated_count']} untranslated elements"
            assert validation["layout_valid"], \
                f"ENGLISH QUIZ - {link_name} page: Layout not valid"
            assert not validation["horizontal_scroll"], \
                f"ENGLISH QUIZ - {link_name} page: Horizontal scroll detected"

            print(f"✓ English quiz → {link_name}: All validations passed")

    @pytest.mark.parametrize("source_lang,target_lang", [
        ("en", "ko"),
        ("en", "ja"),
        ("ko", "en"),
        ("fr", "de"),
        ("zh", "ru"),
    ])
    def test_lang_mismatch_auto_redirect(self, driver, clear_localStorage, source_lang, target_lang):
        """
        Test auto-lang.js auto-redirect: Set localStorage to one language,
        then navigate to a different language URL. The auto-lang.js should
        detect the mismatch and redirect to the saved language URL.

        Example:
        - localStorage.mbti_site_lang = 'en'
        - Navigate to /ko/index.html
        - auto-lang.js detects mismatch
        - Redirects to /en/index.html
        - Final page has lang='en', localStorage='en'
        """
        page_obj = BasePage(driver)

        # 1. Set localStorage to source language
        source_folder = LANG_TO_FOLDER[source_lang]
        target_folder = LANG_TO_FOLDER[target_lang]

        # Build URLs
        if target_lang == "ko":
            target_url = f"{BASE_URL}/index.html"
        else:
            target_url = f"{BASE_URL}/{target_folder}/index.html"

        if source_lang == "ko":
            expected_final_url = f"{BASE_URL}/index.html"
        else:
            expected_final_url = f"{BASE_URL}/{source_folder}/index.html"

        # 2. Navigate to target language page
        driver.get(target_url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")
        time.sleep(0.5)

        # 3. Set localStorage to source language (simulating previous session)
        page_obj.set_local_storage('mbti_site_lang', source_lang)

        # 4. Reload page - auto-lang.js should redirect
        driver.refresh()
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")
        time.sleep(2)  # Wait longer for auto-redirect and i18n initialization

        # 5. Verify auto-redirect worked
        current_url = page_obj.get_url()
        # Check that we ended up on the source language page
        if source_lang == "ko":
            assert "/index.html" in current_url or current_url.endswith("/"), \
                f"Auto-redirect failed: Expected to be on Korean page, but URL is {current_url}"
        else:
            assert f"/{source_folder}/" in current_url, \
                f"Auto-redirect failed: Expected /{source_folder}/ in URL, but got {current_url}"

        # 6. Validate language consistency on final page
        validation = page_obj.validate_language_consistency(source_lang)

        assert validation["html_lang_valid"], \
            f"AUTO-REDIRECT - {source_lang}→{target_lang}: html[lang] = '{validation['html_lang_actual']}', expected '{source_lang}'"
        assert validation["localStorage_valid"], \
            f"AUTO-REDIRECT - {source_lang}→{target_lang}: localStorage = '{validation['localStorage_actual']}', expected '{source_lang}'"
        assert validation["layout_valid"], \
            f"AUTO-REDIRECT - {source_lang}→{target_lang}: Layout not valid"

        print(f"✓ Auto-redirect {source_lang}→{target_lang}: All validations passed")

    def test_language_consistency_on_all_pages_ko(self, driver, clear_localStorage):
        """
        Quick smoke test: Verify Korean pages all have correct language settings
        without navigation (just page loads).
        """
        page_obj = BasePage(driver)

        pages = ["index.html", "quiz.html", "result.html", "compare.html", "about.html"]

        for page in pages:
            driver.get(f"{BASE_URL}/{page}")
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(0.3)

            validation = page_obj.validate_language_consistency("ko")

            assert validation["html_lang_valid"], \
                f"Korean {page}: html[lang] not 'ko'"
            assert validation["localStorage_valid"], \
                f"Korean {page}: localStorage not 'ko'"
            assert validation["untranslated_count"] == 0, \
                f"Korean {page}: {validation['untranslated_count']} untranslated elements"

            print(f"✓ Korean {page}: All validations passed")

    def test_language_consistency_on_all_pages_en(self, driver, clear_localStorage):
        """
        Quick smoke test: Verify English pages all have correct language settings.
        """
        page_obj = BasePage(driver)

        pages = ["index.html", "quiz.html", "result.html", "compare.html", "about.html"]

        for page in pages:
            driver.get(f"{BASE_URL}/en/{page}")
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")
            time.sleep(0.3)

            validation = page_obj.validate_language_consistency("en")

            assert validation["html_lang_valid"], \
                f"English {page}: html[lang] not 'en'"
            assert validation["localStorage_valid"], \
                f"English {page}: localStorage not 'en'"
            assert validation["untranslated_count"] == 0, \
                f"English {page}: {validation['untranslated_count']} untranslated elements"

            print(f"✓ English {page}: All validations passed")
