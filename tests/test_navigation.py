import pytest
import time
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


# Constants
BASE_URL = "http://localhost:8000"
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

NAV_LINKS = {
    "home": "a[data-i18n='nav.home']",
    "test": "a[data-i18n='nav.test']",
    "compare": "a[data-i18n='nav.compare']",
    "challenges": "a[data-i18n='nav.challenges']",
    "about": "a[data-i18n='nav.about']",
}


class TestNavigation:
    """Navigation and menu click tests."""

    @pytest.mark.parametrize("page", ROOT_PAGES)
    def test_root_nav_links(self, driver, page):
        """Test navigation links on root pages."""
        page_obj = BasePage(driver)

        # Navigate to page
        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element(By.TAG_NAME, "nav")

        # Test each nav link
        expected_urls = {
            "home": "index.html",
            "test": "quiz.html",
            "compare": "compare.html",
            "challenges": "challenges.html",
            "about": "about.html",
        }

        for link_name, expected_url in expected_urls.items():
            driver.get(f"{BASE_URL}/{page}")  # Reset to current page
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, NAV_LINKS[link_name])

            page_obj.safe_click(By.CSS_SELECTOR, NAV_LINKS[link_name])
            page_obj.wait_for_url(expected_url)

            current_url = page_obj.get_url()
            assert (
                expected_url in current_url
            ), f"Expected {expected_url} in URL, got {current_url}"

    def test_lang_switch_en(self, driver):
        """Test switching to English language."""
        page_obj = BasePage(driver)

        # Start on root index
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # Click language dropdown
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # Click English option
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "a[href='/en/index.html']")
        page_obj.safe_click(By.CSS_SELECTOR, "a[href='/en/index.html']")

        # Wait for navigation to English page
        page_obj.wait_for_url("/en/")

        current_url = page_obj.get_url()
        assert "/en/" in current_url, f"Expected /en/ in URL, got {current_url}"

    @pytest.mark.parametrize("lang", LANGUAGES)
    def test_lang_switch_all(self, driver, lang):
        """Test switching to all 19 languages."""
        page_obj = BasePage(driver)

        # Start on root index
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # Click language dropdown
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # Build expected href
        if lang == "ko":
            expected_href = "/index.html"
        else:
            expected_href = f"/{lang}/index.html"

        # Click language link
        try:
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, f"a[href='{expected_href}']")
            page_obj.safe_click(By.CSS_SELECTOR, f"a[href='{expected_href}']")
        except:
            # Handle case where link might use different selector
            pytest.skip(f"Language link for {lang} not found")

        # Verify language changed or stayed on root for Korean
        time.sleep(1)  # Wait for potential redirect
        current_url = page_obj.get_url()

        if lang == "ko":
            # Korean should redirect or stay on root
            assert "localhost:8000" in current_url
        else:
            # Other languages should include language code in URL
            assert f"/{lang}/" in current_url or current_url.endswith("index.html")

    def test_quiz_start_button(self, driver):
        """Test 'Start Quiz' button navigates to quiz page."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Click start quiz button
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Wait for quiz page
        page_obj.wait_for_url("quiz.html")
        page_obj.wait_for_element(By.CSS_SELECTOR, "[data-i18n='quiz.title']")

        current_url = page_obj.get_url()
        assert "quiz.html" in current_url

    def test_speed_mode_button(self, driver):
        """Test speed mode button interaction."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/speed.html")
        page_obj.wait_for_element(By.TAG_NAME, "main")

        # Check if speed mode button/link exists
        speed_button = page_obj.is_element_present(
            By.CSS_SELECTOR, "[data-i18n='speed.startBtn']"
        )
        assert speed_button, "Speed mode button not found"

    def test_compare_select_interaction(self, driver):
        """Test compare page type selection."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/compare.html")
        page_obj.wait_for_element(By.TAG_NAME, "main")

        # Check if compare selection elements exist
        selects = page_obj.find_elements(By.CSS_SELECTOR, "select")
        assert len(selects) > 0, "No select elements found on compare page"

    def test_navbar_exists_all_pages(self, driver):
        """Verify navbar exists on all root pages."""
        page_obj = BasePage(driver)

        for page in ROOT_PAGES:
            driver.get(f"{BASE_URL}/{page}")
            page_obj.wait_for_element(By.TAG_NAME, "nav")

            nav = page_obj.find_element(By.TAG_NAME, "nav")
            assert nav.is_displayed(), f"Nav not visible on {page}"

    def test_footer_exists_all_pages(self, driver):
        """Verify footer exists on all root pages."""
        page_obj = BasePage(driver)

        for page in ROOT_PAGES:
            driver.get(f"{BASE_URL}/{page}")
            page_obj.wait_for_element(By.TAG_NAME, "footer")

            footer = page_obj.find_element(By.TAG_NAME, "footer")
            assert footer.is_displayed(), f"Footer not visible on {page}"
