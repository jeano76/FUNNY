"""
Language dropdown navigation tests.
Tests actual click-through of the language switcher and verifies:
- URL navigates to correct language folder
- html[lang] attribute is correct after navigation
- localStorage is set correctly
"""
import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from pages.base_page import BasePage


BASE_URL = "http://localhost:8000"

# lang_code → folder directory (ko maps to root '')
LANG_TO_DIR = {
    'ko': '',
    'en': 'en',
    'ja': 'jp',
    'zh': 'zh',
    'es': 'es',
    'de': 'de',
    'fr': 'fr',
    'ru': 'ru',
    'pt': 'pt',
    'id': 'id',
    'hi': 'hi',
    'vi': 'vi',
    'th': 'th',
    'tr': 'tr',
    'it': 'it',
    'nl': 'nl',
    'ar': 'ar',
    'mn': 'mn',
    'la': 'la',
}

# Text visible in the dropdown for each language
LANG_DROPDOWN_TEXT = {
    'ko': '한국어 (KO)',
    'en': 'English (EN)',
    'ja': '日本語 (JP)',
    'zh': '简体中文 (ZH)',
    'es': 'Español (ES)',
    'de': 'Deutsch (DE)',
    'fr': 'Français (FR)',
    'ru': 'Русский (RU)',
    'pt': 'Português (PT)',
    'id': 'Indonesia (ID)',
    'hi': 'हिन्दी (HI)',
    'vi': 'Tiếng Việt (VI)',
    'th': 'ภาษาไทย (TH)',
    'tr': 'Türkçe (TR)',
    'it': 'Italiano (IT)',
    'nl': 'Nederlands (NL)',
    'ar': 'العربية (AR)',
    'mn': 'Монгол (MN)',
    'la': 'Latina (LA)',
}


def get_page_url(lang_code, page='index.html'):
    d = LANG_TO_DIR[lang_code]
    return f"{BASE_URL}/{d}/{page}" if d else f"{BASE_URL}/{page}"


def get_expected_url_fragment(to_lang, page='index.html'):
    d = LANG_TO_DIR[to_lang]
    return f"/{d}/{page}" if d else f"/{page}"


def get_expected_html_lang(lang_code):
    """ja uses folder 'jp' but html lang should be 'ja'."""
    return lang_code  # all lang codes match html lang attrs


def get_expected_localstorage(lang_code):
    """Expected localStorage value after navigating to target language page.
    i18n-complete.js detectLanguage() normalizes jp folder → 'ja' lang code,
    so all language codes are stored as-is (lang_code, not folder name).
    """
    return lang_code  # 'ko', 'en', 'ja', 'zh', ... stored as language codes


def setup_page(driver, lang_code):
    """
    Navigate to the given language's index page with clean localStorage state.
    Handles auto-lang.js redirect by clearing localStorage first.
    """
    from_dir = LANG_TO_DIR[lang_code]
    url = f"{BASE_URL}/{from_dir}/index.html" if from_dir else f"{BASE_URL}/index.html"
    expected_ls = get_expected_localstorage(lang_code)

    # Step 1: Navigate anywhere to get a valid JS context
    driver.get(f"{BASE_URL}/index.html")
    # Step 2: Clear localStorage to prevent auto-lang redirect
    try:
        driver.execute_script("localStorage.clear();")
    except Exception:
        pass
    # Step 3: Navigate to target URL — no redirect since localStorage is clean
    driver.get(url)
    # Step 4: Set localStorage to correct value for this language
    try:
        driver.execute_script(f"localStorage.setItem('mbti_site_lang', '{expected_ls}');")
    except Exception:
        pass
    # Step 5: Reload to confirm no redirect
    driver.get(url)
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )


def switch_language_via_dropdown(driver, to_lang):
    """
    Click the language dropdown button, then click the target language link.
    Returns True if successful.
    """
    page_obj = BasePage(driver)

    # Click dropdown button (use JS click to avoid visibility issues)
    try:
        btn = page_obj.wait_for_element_visible(By.CSS_SELECTOR, ".lang-btn", timeout=5)
        driver.execute_script("arguments[0].click();", btn)
    except Exception as e:
        return False, f"Could not click .lang-btn: {e}"

    # Wait for lang-content to appear (it's moved to body by nav.js)
    try:
        WebDriverWait(driver, 5).until(
            lambda d: any(
                el.value_of_css_property('display') == 'block'
                for el in d.find_elements(By.CSS_SELECTOR, ".lang-content")
            )
        )
    except Exception:
        return False, ".lang-content did not become visible after clicking .lang-btn"

    # Find target language link
    target_text = LANG_DROPDOWN_TEXT[to_lang]
    lang_links = driver.find_elements(By.CSS_SELECTOR, ".lang-content a")
    target_link = None
    for link in lang_links:
        if link.text.strip() == target_text:
            target_link = link
            break

    if target_link is None:
        found_texts = [l.text.strip() for l in lang_links[:5]]
        return False, f"Could not find lang link '{target_text}'. Found: {found_texts}"

    # Click the target language
    driver.execute_script("arguments[0].click();", target_link)
    return True, "ok"


class TestLangSwitchNavigation:
    """Test language dropdown navigation end-to-end."""

    @pytest.mark.parametrize("from_lang,to_lang", [
        # From Korean root → other languages
        ('ko', 'en'),
        ('ko', 'ja'),
        ('ko', 'zh'),
        ('ko', 'de'),
        ('ko', 'fr'),
        # From other language → Korean
        ('en', 'ko'),
        ('ja', 'ko'),
        ('de', 'ko'),
        ('fr', 'ko'),
        # Cross-language switches
        ('en', 'ja'),
        ('en', 'de'),
        ('ja', 'en'),
        ('de', 'fr'),
        ('fr', 'es'),
    ])
    def test_lang_switch_url(self, driver, from_lang, to_lang):
        """Click language dropdown and verify URL navigates to correct page."""
        page_obj = BasePage(driver)
        setup_page(driver, from_lang)

        # Switch language via dropdown
        success, msg = switch_language_via_dropdown(driver, to_lang)
        assert success, f"[{from_lang}→{to_lang}] Dropdown interaction failed: {msg}"

        # Wait for navigation
        expected_fragment = get_expected_url_fragment(to_lang)
        try:
            WebDriverWait(driver, 5).until(
                lambda d: expected_fragment in d.current_url
            )
        except Exception:
            pass

        current_url = driver.current_url
        assert expected_fragment in current_url, (
            f"[{from_lang}→{to_lang}] Expected URL to contain '{expected_fragment}', got '{current_url}'"
        )

    @pytest.mark.parametrize("from_lang,to_lang", [
        ('ko', 'en'),
        ('ko', 'ja'),
        ('en', 'ko'),
        ('en', 'ja'),
        ('ja', 'ko'),
        ('ja', 'en'),
        ('de', 'ko'),
        ('fr', 'en'),
    ])
    def test_lang_switch_html_lang(self, driver, from_lang, to_lang):
        """After language switch, verify html[lang] attribute is correct."""
        page_obj = BasePage(driver)
        setup_page(driver, from_lang)

        success, msg = switch_language_via_dropdown(driver, to_lang)
        assert success, f"[{from_lang}→{to_lang}] Dropdown interaction failed: {msg}"

        # Wait for navigation
        expected_fragment = get_expected_url_fragment(to_lang)
        try:
            WebDriverWait(driver, 5).until(
                lambda d: expected_fragment in d.current_url
            )
        except Exception:
            pass

        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        actual_lang = page_obj.get_html_lang()
        expected_lang = get_expected_html_lang(to_lang)
        assert actual_lang == expected_lang, (
            f"[{from_lang}→{to_lang}] Expected html[lang]='{expected_lang}', got '{actual_lang}'"
        )

    @pytest.mark.parametrize("from_lang,to_lang", [
        ('ko', 'en'),
        ('ko', 'ja'),
        ('en', 'ko'),
        ('en', 'ja'),
        ('ja', 'ko'),
    ])
    def test_lang_switch_localstorage(self, driver, from_lang, to_lang):
        """After language switch, verify localStorage.mbti_site_lang is set correctly."""
        page_obj = BasePage(driver)
        setup_page(driver, from_lang)

        success, msg = switch_language_via_dropdown(driver, to_lang)
        assert success, f"[{from_lang}→{to_lang}] Dropdown interaction failed: {msg}"

        expected_fragment = get_expected_url_fragment(to_lang)
        try:
            WebDriverWait(driver, 5).until(
                lambda d: expected_fragment in d.current_url
            )
        except Exception:
            pass

        stored = page_obj.get_local_storage('mbti_site_lang')
        expected_stored = get_expected_localstorage(to_lang)
        assert stored == expected_stored, (
            f"[{from_lang}→{to_lang}] Expected localStorage='{expected_stored}', got '{stored}'"
        )

    def test_lang_dropdown_opens(self, driver):
        """Basic test: language dropdown button opens the menu."""
        page_obj = BasePage(driver)
        setup_page(driver, 'ko')

        btn = page_obj.wait_for_element_visible(By.CSS_SELECTOR, ".lang-btn")
        driver.execute_script("arguments[0].click();", btn)

        # lang-content should be visible
        try:
            WebDriverWait(driver, 5).until(
                lambda d: any(
                    el.value_of_css_property('display') == 'block'
                    for el in d.find_elements(By.CSS_SELECTOR, ".lang-content")
                )
            )
            visible = True
        except Exception:
            visible = False

        assert visible, ".lang-content did not become visible after clicking .lang-btn"

    def test_all_lang_links_present_in_dropdown(self, driver):
        """Verify all 19 language options are in the dropdown."""
        page_obj = BasePage(driver)
        setup_page(driver, 'ko')

        btn = page_obj.wait_for_element_visible(By.CSS_SELECTOR, ".lang-btn")
        driver.execute_script("arguments[0].click();", btn)
        time.sleep(0.5)

        lang_links = driver.find_elements(By.CSS_SELECTOR, ".lang-content a")
        link_texts = {link.text.strip() for link in lang_links}

        missing = []
        for lang, text in LANG_DROPDOWN_TEXT.items():
            if text not in link_texts:
                missing.append(f"{lang}: '{text}'")

        assert not missing, f"Missing language options in dropdown: {missing}"

    @pytest.mark.parametrize("page", ["index.html", "quiz.html", "about.html", "privacy.html"])
    def test_lang_switch_preserves_page(self, driver, page):
        """Switching language on a specific page stays on same page (not index.html)."""
        page_obj = BasePage(driver)

        # Clear localStorage to prevent auto-lang redirect
        driver.get(f"{BASE_URL}/index.html")
        driver.execute_script("localStorage.clear();")
        driver.execute_script("localStorage.setItem('mbti_site_lang', 'ko');")
        driver.get(f"{BASE_URL}/{page}")
        page_obj.wait_for_element_visible(By.TAG_NAME, "body")

        success, msg = switch_language_via_dropdown(driver, 'en')
        assert success, f"[ko→en on {page}] Dropdown interaction failed: {msg}"

        try:
            WebDriverWait(driver, 5).until(
                lambda d: '/en/' in d.current_url
            )
        except Exception:
            pass

        current_url = driver.current_url
        assert f"/en/{page}" in current_url, (
            f"Expected URL to contain '/en/{page}', got '{current_url}'"
        )
