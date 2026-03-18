import pytest
from pathlib import Path
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


BASE_URL = "http://localhost:8000"

PAGES = [
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

VIEWPORTS = {
    "desktop": (1280, 800),
    "mobile": (375, 812),
}

# Screenshot directory
SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"


class TestLayout:
    """Layout visibility and responsive design tests."""

    @pytest.mark.parametrize("page", PAGES)
    def test_nav_visible(self, driver, page):
        """Verify navbar is visible on all pages."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "nav")

        nav = page_obj.find_element(By.TAG_NAME, "nav")
        assert nav.is_displayed(), f"Nav not visible on {page}"

    @pytest.mark.parametrize("page", PAGES)
    def test_main_content_visible(self, driver, page):
        """Verify main content area is visible on all pages."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check for main or section element
        main_elem = None
        try:
            main_elem = page_obj.find_element(By.TAG_NAME, "main")
        except:
            try:
                main_elem = page_obj.find_element(By.TAG_NAME, "section")
            except:
                pytest.skip(f"No main or section element found on {page}")

        if main_elem:
            assert main_elem.is_displayed(), f"Main content not visible on {page}"

    @pytest.mark.parametrize("page", PAGES)
    def test_footer_visible(self, driver, page):
        """Verify footer is visible on all pages."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "footer")

        footer = page_obj.find_element(By.TAG_NAME, "footer")
        assert footer.is_displayed(), f"Footer not visible on {page}"

    @pytest.mark.parametrize("page", PAGES)
    def test_no_horizontal_scroll(self, driver, page):
        """Verify no horizontal scrollbar on desktop viewport."""
        page_obj = BasePage(driver)

        driver.set_window_size(1280, 800)
        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        has_h_scroll = page_obj.has_horizontal_scroll()
        assert (
            not has_h_scroll
        ), f"Horizontal scroll detected on {page} at 1280px width"

    def test_responsive_mobile_viewport(self, driver):
        """Test layout on mobile viewport (375x812)."""
        page_obj = BasePage(driver)

        driver.set_window_size(375, 812)
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "nav")

        nav = page_obj.find_element(By.TAG_NAME, "nav")
        assert nav.is_displayed(), "Nav not visible on mobile"

    def test_responsive_tablet_viewport(self, driver):
        """Test layout on tablet viewport (768x1024)."""
        page_obj = BasePage(driver)

        driver.set_window_size(768, 1024)
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "nav")

        nav = page_obj.find_element(By.TAG_NAME, "nav")
        assert nav.is_displayed(), "Nav not visible on tablet"

    @pytest.mark.parametrize("page", PAGES)
    @pytest.mark.parametrize("viewport_name", ["desktop", "mobile"])
    def test_screenshots(self, driver, page, viewport_name):
        """Capture screenshots for all pages and viewports."""
        page_obj = BasePage(driver)

        # Set viewport
        width, height = VIEWPORTS[viewport_name]
        driver.set_window_size(width, height)

        # Navigate to page
        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Create screenshot filename
        page_name = page.replace(".html", "")
        screenshot_name = f"{page_name}_{viewport_name}.png"
        screenshot_path = SCREENSHOTS_DIR / screenshot_name

        # Take screenshot
        page_obj.take_screenshot(str(screenshot_path))

    def test_addsense_script_present(self, driver):
        """Verify AdSense script is present on pages."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Check for AdSense script
        scripts = page_obj.find_elements(By.TAG_NAME, "script")
        adsense_found = any(
            "pagead2.googlesyndication.com" in (script.get_attribute("src") or "")
            for script in scripts
        )

        assert adsense_found, "AdSense script not found on page"

    def test_language_dropdown_accessible(self, driver):
        """Verify language dropdown button is accessible."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(
            By.CSS_SELECTOR, "button[data-i18n='nav.language']"
        )

        lang_btn = page_obj.find_element(By.CSS_SELECTOR, "button[data-i18n='nav.language']")
        assert lang_btn.is_displayed(), "Language button not visible"

        # Try clicking it
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='nav.language']")

        # Check if dropdown appears
        dropdown = page_obj.is_element_present(By.CSS_SELECTOR, ".lang-content")
        assert dropdown, "Language dropdown not visible after click"

    def test_footer_links_present(self, driver):
        """Verify footer has navigation links."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "footer")

        footer = page_obj.find_element(By.TAG_NAME, "footer")
        links = footer.find_elements(By.TAG_NAME, "a")

        assert len(links) > 0, "No links found in footer"

    def test_css_variables_loaded(self, driver):
        """Verify CSS variables are properly set."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        # Get CSS variable values
        primary_color = driver.execute_script(
            "return getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();"
        )

        assert primary_color, "CSS variable --primary not set"
        assert len(primary_color) > 0, "CSS variable --primary is empty"

    @pytest.mark.parametrize("page", ["quiz.html", "speed.html"])
    def test_quiz_interactive_elements(self, driver, page):
        """Verify quiz pages have interactive elements."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Check for question options or buttons
        options = page_obj.find_elements(By.CSS_SELECTOR, "button, input[type='radio'], input[type='checkbox']")

        assert len(options) > 0, f"No interactive elements found on {page}"

    def test_result_page_elements(self, driver):
        """Verify result page has expected elements."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/result.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Check for personality type display
        personality_display = page_obj.is_element_present(By.CSS_SELECTOR, "[data-i18n]")
        assert personality_display, "No personality info found on result page"

        # Check for share buttons or links
        buttons = page_obj.find_elements(By.TAG_NAME, "button")
        assert len(buttons) > 0, "No buttons found on result page"

    def test_compare_page_selects(self, driver):
        """Verify compare page has select elements."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/compare.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        selects = page_obj.find_elements(By.TAG_NAME, "select")
        assert len(selects) > 0, "No select elements found on compare page"

    def test_careers_page_content(self, driver):
        """Verify careers page has job listings or recommendations."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/careers.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Should have some content
        main = page_obj.find_element(By.TAG_NAME, "main")
        assert main.text, "No content found on careers page"
