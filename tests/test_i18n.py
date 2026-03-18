import pytest
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


BASE_URL = "http://localhost:8000"

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

ROOT_PAGES = [
    "index.html",
    "quiz.html",
    "result.html",
    "about.html",
    "privacy.html",
    "compare.html",
    "careers.html",
    "situations.html",
    "fortune.html",
    "challenges.html",
    "group.html",
    "speed.html",
    "compat.html",
    "compat-chart.html",
]

# Critical i18n keys that must be translated on all pages
CRITICAL_I18N_KEYS = [
    "nav.home",
    "nav.test",
    "nav.compare",
    "nav.language",
    "index.title",
    "quiz.title",
]

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


class TestI18n:
    """Multi-language translation validation tests."""

    @pytest.mark.parametrize("page", ROOT_PAGES)
    def test_ko_translations(self, driver, page):
        """Test Korean translations on root pages."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        untranslated = page_obj.get_untranslated_keys()

        # Report untranslated keys if found
        if untranslated:
            error_msg = f"Untranslated keys on {page} (ko):\n"
            for item in untranslated:
                error_msg += f"  - {item['key']} in <{item['element']}>\n"
            pytest.fail(error_msg)

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_all_lang_index(self, driver, lang):
        """Test index.html translation for all 19 languages."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/index.html"
        else:
            url = f"{BASE_URL}/{lang}/index.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check critical nav keys are translated
        untranslated = page_obj.get_untranslated_keys()

        # Filter to nav keys
        nav_untranslated = [
            item for item in untranslated if item["key"].startswith("nav.")
        ]

        if nav_untranslated:
            error_msg = f"Untranslated nav keys on index.html ({lang}):\n"
            for item in nav_untranslated:
                error_msg += f"  - {item['key']}\n"
            pytest.fail(error_msg)

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_all_lang_quiz(self, driver, lang):
        """Test quiz.html translation for all 19 languages."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/quiz.html"
        else:
            url = f"{BASE_URL}/{lang}/quiz.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check for untranslated elements
        untranslated = page_obj.get_untranslated_keys()

        # Quiz should have translated questions and buttons
        if untranslated:
            error_msg = f"Untranslated keys on quiz.html ({lang}):\n"
            for item in untranslated[:5]:  # Show first 5
                error_msg += f"  - {item['key']}\n"
            if len(untranslated) > 5:
                error_msg += f"  ... and {len(untranslated) - 5} more\n"
            pytest.fail(error_msg)

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_all_lang_nav_links(self, driver, lang):
        """Test nav link text is translated (not showing raw keys)."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/index.html"
        else:
            url = f"{BASE_URL}/{lang}/index.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "a[data-i18n='nav.home']")

        # Check specific nav keys
        nav_keys = ["nav.home", "nav.test", "nav.compare"]

        for key in nav_keys:
            selector = f"[data-i18n='{key}']"
            elements = page_obj.find_elements(By.CSS_SELECTOR, selector)

            for elem in elements:
                text = elem.text.strip()
                # Text should not equal the key itself
                assert (
                    text != key
                ), f"Key '{key}' not translated on {lang} index.html (text='{text}')"

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_html_lang_attr(self, driver, lang):
        """Test <html lang=''> attribute is correct."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/index.html"
        else:
            url = f"{BASE_URL}/{lang}/index.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "html")

        actual_lang = page_obj.get_html_lang()
        expected_lang = LANG_TO_HTML_LANG[lang]

        assert (
            actual_lang == expected_lang
        ), f"Expected html lang='{expected_lang}', got '{actual_lang}' on {lang}/index.html"

    def test_no_untranslated_keys_all_pages_ko(self, driver):
        """Comprehensive check for untranslated keys on all Korean pages."""
        page_obj = BasePage(driver)

        untranslated_summary = {}

        for page in ROOT_PAGES:
            driver.get(f"{BASE_URL}/{page}")
            page_obj.wait_for_element_visible(By.TAG_NAME, "body")

            untranslated = page_obj.get_untranslated_keys()

            if untranslated:
                untranslated_summary[page] = len(untranslated)

        if untranslated_summary:
            error_msg = "Untranslated keys found on Korean pages:\n"
            for page, count in untranslated_summary.items():
                error_msg += f"  - {page}: {count} untranslated elements\n"
            pytest.fail(error_msg)

    def test_data_i18n_attributes_populated(self, driver):
        """Verify data-i18n attributes are present on translation elements."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Find all elements with data-i18n
        i18n_elements = page_obj.get_i18n_elements()

        assert (
            len(i18n_elements) > 0
        ), "No elements with data-i18n attribute found on index.html"

        # Check that each has a non-empty key
        for elem in i18n_elements[:10]:  # Check first 10
            key = elem.get_attribute("data-i18n")
            assert key and len(key) > 0, "Element has empty data-i18n attribute"

    def test_translations_js_syntax(self, driver):
        """Verify translations.js loads without syntax errors."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")

        # Check for JavaScript errors in console
        logs = driver.get_log("browser")
        js_errors = [
            log for log in logs if log["level"] == "SEVERE" and "translations.js" in log.get("message", "")
        ]

        assert (
            len(js_errors) == 0
        ), f"Found {len(js_errors)} JavaScript errors related to translations.js"

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_result_page_translated(self, driver, lang):
        """Test result.html is translated for all languages."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/result.html"
        else:
            url = f"{BASE_URL}/{lang}/result.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check for untranslated keys
        untranslated = page_obj.get_untranslated_keys()

        if untranslated:
            error_msg = f"Untranslated keys on result.html ({lang}):\n"
            for item in untranslated[:3]:
                error_msg += f"  - {item['key']}\n"
            pytest.fail(error_msg)

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_compare_page_translated(self, driver, lang):
        """Test compare.html is translated for all languages."""
        page_obj = BasePage(driver)

        # Build URL
        if lang == "ko":
            url = f"{BASE_URL}/compare.html"
        else:
            url = f"{BASE_URL}/{lang}/compare.html"

        driver.get(url)
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check nav and main content
        untranslated = page_obj.get_untranslated_keys()

        nav_untranslated = [
            item for item in untranslated if item["key"].startswith("nav.")
        ]

        if nav_untranslated:
            error_msg = f"Untranslated nav keys on compare.html ({lang}):\n"
            for item in nav_untranslated:
                error_msg += f"  - {item['key']}\n"
            pytest.fail(error_msg)
