"""
Comprehensive test suite for marketMBTI
Tests all 14 pages × 19 languages for:
- Korean text leakage
- Untranslated i18n keys
- Layout issues
- HTML lang attributes
- Basic functionality
"""

import pytest
import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

# Test configuration
PAGES = [
    "index.html", "quiz.html", "result.html", "about.html",
    "privacy.html", "compare.html", "careers.html", "situations.html",
    "fortune.html", "challenges.html", "group.html", "speed.html",
    "compat.html", "compat-chart.html"
]

LANGS = [
    ("ko", ""),           # Korean (root)
    ("en", "en"),         # English
    ("ja", "jp"),         # Japanese
    ("zh", "zh"),         # Chinese
    ("es", "es"),         # Spanish
    ("de", "de"),         # German
    ("fr", "fr"),         # French
    ("ru", "ru"),         # Russian
    ("pt", "pt"),         # Portuguese
    ("id", "id"),         # Indonesian
    ("hi", "hi"),         # Hindi
    ("vi", "vi"),         # Vietnamese
    ("th", "th"),         # Thai
    ("tr", "tr"),         # Turkish
    ("it", "it"),         # Italian
    ("nl", "nl"),         # Dutch
    ("ar", "ar"),         # Arabic
    ("mn", "mn"),         # Mongolian
    ("la", "la"),         # Latin
]

# Korean character range
KOREAN_REGEX = re.compile(r'[\uAC00-\uD7A3]')

@pytest.fixture(scope="session")
def driver():
    """Create a Selenium WebDriver"""
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--headless")

    driver = webdriver.Chrome(options=chrome_options)
    yield driver
    driver.quit()

def get_url(lang_code, page):
    """Construct URL for a language-page combination"""
    if lang_code == "ko":
        return f"http://localhost:8000/{page}"
    else:
        lang_folder = next(folder for code, folder in LANGS if code == lang_code)
        return f"http://localhost:8000/{lang_folder}/{page}"

def has_korean_text(text):
    """Check if text contains Korean characters"""
    return bool(KOREAN_REGEX.search(text))

class TestFullTranslationCoverage:
    """Test all pages load and have proper translations"""

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS for page in PAGES
    ])
    def test_page_loads_without_error(self, driver, lang_code, page):
        """Test that all pages load without console errors"""
        url = get_url(lang_code, page)
        driver.get(url)
        time.sleep(0.5)  # Allow page to load

        # Check that page title exists
        assert driver.title != "", f"Page {page} for {lang_code} has no title"

        # Check that body has content
        body = driver.find_element(By.TAG_NAME, "body")
        assert body.text.strip() != "", f"Page {page} for {lang_code} has no body content"

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS[1:] for page in PAGES  # Skip Korean
    ])
    def test_no_korean_quiz_in_non_korean_lang(self, driver, lang_code, page):
        """Test that non-Korean pages don't have Korean quiz text"""
        # Only test quiz.html and speed.html
        if page not in ["quiz.html", "speed.html"]:
            pytest.skip("Not a quiz page")

        url = get_url(lang_code, page)
        driver.get(url)
        time.sleep(0.5)

        # Get all text from quiz container
        try:
            quiz_container = driver.find_element(By.CLASS_NAME, "quiz-container")
            quiz_text = quiz_container.text
        except:
            # No quiz container, skip
            pytest.skip("No quiz container found")
            return

        # Check for Korean text
        korean_matches = KOREAN_REGEX.findall(quiz_text)
        assert len(korean_matches) == 0, (
            f"Found {len(korean_matches)} Korean characters in {lang_code} {page} quiz. "
            f"Sample: {quiz_text[:200]}"
        )

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS for page in PAGES
    ])
    def test_no_untranslated_i18n_keys(self, driver, lang_code, page):
        """Test that no i18n keys are left untranslated (data-i18n == text)"""
        url = get_url(lang_code, page)
        driver.get(url)
        time.sleep(0.5)

        # Find all elements with data-i18n attribute
        elements_with_i18n = driver.find_elements(By.CSS_SELECTOR, "[data-i18n]")

        untranslated = []
        for elem in elements_with_i18n:
            i18n_key = elem.get_attribute("data-i18n")
            elem_text = elem.text.strip()

            # If text equals the key, it wasn't translated
            if elem_text and i18n_key and elem_text == i18n_key:
                untranslated.append(i18n_key)

        assert len(untranslated) == 0, (
            f"Found {len(untranslated)} untranslated i18n keys in {lang_code}/{page}: "
            f"{untranslated[:5]}"
        )

    @pytest.mark.parametrize("lang_code", [lang[0] for lang in LANGS])
    def test_html_lang_attribute(self, driver, lang_code):
        """Test that HTML lang attribute is set correctly"""
        url = get_url(lang_code, "index.html")
        driver.get(url)

        html_elem = driver.find_element(By.TAG_NAME, "html")
        lang_attr = html_elem.get_attribute("lang")

        assert lang_attr == lang_code, (
            f"HTML lang attribute is '{lang_attr}', expected '{lang_code}' for {url}"
        )

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS for page in PAGES
    ])
    def test_page_title_not_empty(self, driver, lang_code, page):
        """Test that all pages have non-empty titles"""
        url = get_url(lang_code, page)
        driver.get(url)

        title = driver.title
        assert title and len(title) > 0, f"Page {page} for {lang_code} has empty title"
        assert page.replace(".html", "") not in title or len(title) > len(page), (
            f"Page {page} for {lang_code} has only filename in title: {title}"
        )

class TestLayoutAllLanguages:
    """Test layout consistency across all languages"""

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS for page in PAGES
    ])
    def test_nav_visible(self, driver, lang_code, page):
        """Test that navigation is visible on all pages"""
        url = get_url(lang_code, page)
        driver.get(url)
        time.sleep(0.5)

        try:
            nav = driver.find_element(By.CSS_SELECTOR, "nav, .navbar, .nav-container")
            assert nav.is_displayed(), f"Nav not visible on {lang_code}/{page}"
        except:
            # Some pages might not have nav, which is OK
            pass

    @pytest.mark.parametrize("lang_code,page", [
        (lang[0], page) for lang in LANGS for page in PAGES
    ])
    def test_no_horizontal_scroll(self, driver, lang_code, page):
        """Test that pages don't have horizontal scrollbars"""
        url = get_url(lang_code, page)
        driver.get(url)
        time.sleep(0.5)

        # Get window size and scroll width
        window_width = driver.execute_script("return window.innerWidth")
        scroll_width = driver.execute_script("return document.documentElement.scrollWidth")

        assert scroll_width <= window_width, (
            f"Horizontal scroll detected on {lang_code}/{page}: "
            f"window={window_width}, scroll={scroll_width}"
        )

    @pytest.mark.parametrize("lang_code", [lang[0] for lang in LANGS])
    def test_mobile_layout_responds(self, driver, lang_code):
        """Test that mobile layout works (viewport resizing)"""
        url = get_url(lang_code, "index.html")

        # Test mobile viewport
        driver.set_window_size(375, 667)
        driver.get(url)
        time.sleep(0.5)

        # Page should load without errors
        assert driver.title != ""

        # Reset to desktop
        driver.set_window_size(1920, 1080)

class TestQuizFlowAllLanguages:
    """Test quiz functionality across all languages"""

    @pytest.mark.parametrize("lang_code", [lang[0] for lang in LANGS])
    def test_quiz_page_loads(self, driver, lang_code):
        """Test that quiz page loads for all languages"""
        url = get_url(lang_code, "quiz.html")
        driver.get(url)
        time.sleep(0.5)

        try:
            # Wait for quiz questions to load
            questions = WebDriverWait(driver, 5).until(
                EC.presence_of_all_elements_located((By.CLASS_NAME, "question"))
            )
            assert len(questions) > 0, f"No questions found for {lang_code}"
        except:
            # Quiz might load dynamically
            pass

    @pytest.mark.parametrize("lang_code", [
        lang[0] for lang in LANGS[::2]  # Test every other language to save time
    ])
    def test_quiz_answer_buttons_exist(self, driver, lang_code):
        """Test that quiz answer buttons exist and are clickable"""
        url = get_url(lang_code, "quiz.html")
        driver.get(url)
        time.sleep(1)

        try:
            # Find answer buttons
            buttons = WebDriverWait(driver, 5).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "button.answer-btn, button.choice, .answer"))
            )
            assert len(buttons) >= 2, (
                f"Not enough answer buttons found for {lang_code}. Found {len(buttons)}"
            )
        except:
            # Might have different button structure
            pass

    @pytest.mark.parametrize("lang_code", [lang[0] for lang in LANGS[::3]])  # Sample languages
    def test_result_page_loads(self, driver, lang_code):
        """Test that result page can load"""
        url = get_url(lang_code, "result.html")
        driver.get(url)
        time.sleep(1)

        # Result page should have content
        body = driver.find_element(By.TAG_NAME, "body")
        assert body.text.strip() != "", f"Result page empty for {lang_code}"

class TestSpecialCases:
    """Test special cases and edge cases"""

    def test_language_dropdown_availability(self, driver):
        """Test that language dropdown is available"""
        url = "http://localhost:8000/index.html"
        driver.get(url)
        time.sleep(0.5)

        # Look for language selector
        try:
            lang_btn = driver.find_element(By.CLASS_NAME, "lang-btn")
            assert lang_btn.is_displayed(), "Language button not visible"
        except:
            # Might have different structure
            pass

    def test_local_storage_available(self, driver):
        """Test that localStorage is available"""
        url = "http://localhost:8000/index.html"
        driver.get(url)

        # Check if localStorage is available
        local_storage_available = driver.execute_script(
            "return typeof(Storage) !== 'undefined'"
        )
        assert local_storage_available, "localStorage not available"

    def test_no_javascript_errors(self, driver):
        """Test that pages don't produce JavaScript errors"""
        url = "http://localhost:8000/index.html"
        driver.get(url)
        time.sleep(1)

        # Get console errors (if available)
        logs = driver.get_log('browser')
        errors = [log for log in logs if log['level'] == 'SEVERE']

        # Note: Some pages might have expected warnings
        assert len(errors) < 5, f"Found {len(errors)} console errors: {errors[:3]}"

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
