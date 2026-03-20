"""
Comprehensive navigation tests for all 18 non-Korean languages.
Tests two scenarios for each language:
  A) After switching language via dropdown from Korean root → click all nav links
  B) Directly on language index page → click all nav links
Verifies URL ends up in the correct language folder.
"""
import pytest
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://localhost:8000"

# lang_code → folder dir
LANG_TO_DIR = {
    'ko': '',  'en': 'en', 'ja': 'jp', 'zh': 'zh', 'es': 'es',
    'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt', 'id': 'id',
    'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr', 'it': 'it',
    'nl': 'nl', 'ar': 'ar', 'mn': 'mn', 'la': 'la',
}

# All non-Korean languages to test
NON_KO_LANGS = [k for k in LANG_TO_DIR if k != 'ko']

# Nav pages to test per language
NAV_PAGES = [
    ('nav.home',       'index.html'),
    ('nav.test',       'quiz.html'),
    ('nav.compare',    'compare.html'),
    ('nav.challenges', 'challenges.html'),
    ('nav.about',      'about.html'),
]

# Lang code → dropdown text (to find it in dropdown)
LANG_DROPDOWN_TEXT = {
    'en': 'English (EN)',    'ja': '日本語 (JP)',       'zh': '简体中文 (ZH)',
    'es': 'Español (ES)',    'de': 'Deutsch (DE)',      'fr': 'Français (FR)',
    'ru': 'Русский (RU)',    'pt': 'Português (PT)',    'id': 'Indonesia (ID)',
    'hi': 'हिन्दी (HI)',    'vi': 'Tiếng Việt (VI)',  'th': 'ภาษาไทย (TH)',
    'tr': 'Türkçe (TR)',     'it': 'Italiano (IT)',     'nl': 'Nederlands (NL)',
    'ar': 'العربية (AR)',   'mn': 'Монгол (MN)',       'la': 'Latina (LA)',
}


def go_to_lang_index(driver, lang_code):
    """Navigate to the language index page with clean state."""
    folder = LANG_TO_DIR[lang_code]
    url = f"{BASE_URL}/{folder}/index.html" if folder else f"{BASE_URL}/index.html"

    # Start at root to get valid JS context
    driver.get(f"{BASE_URL}/index.html")
    driver.execute_script("localStorage.clear();")
    # Set correct localStorage for this lang so auto-lang won't redirect away
    ls_value = lang_code  # i18n-complete normalizes to lang_code
    driver.execute_script(f"localStorage.setItem('mbti_site_lang', '{ls_value}');")
    driver.get(url)
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))


def switch_lang_via_dropdown(driver, to_lang):
    """From Korean root, switch language via dropdown. Returns True/msg."""
    driver.get(f"{BASE_URL}/index.html")
    driver.execute_script("localStorage.clear(); localStorage.setItem('mbti_site_lang','ko');")
    driver.get(f"{BASE_URL}/index.html")
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

    try:
        btn = driver.find_element(By.CSS_SELECTOR, ".lang-btn")
        driver.execute_script("arguments[0].click();", btn)
    except Exception as e:
        return False, f"lang-btn not found: {e}"

    try:
        WebDriverWait(driver, 5).until(
            lambda d: any(
                el.value_of_css_property('display') == 'block'
                for el in d.find_elements(By.CSS_SELECTOR, ".lang-content")
            )
        )
    except Exception:
        return False, ".lang-content did not open"

    target_text = LANG_DROPDOWN_TEXT[to_lang]
    links = driver.find_elements(By.CSS_SELECTOR, ".lang-content a")
    target = next((l for l in links if l.text.strip() == target_text), None)
    if not target:
        found = [l.text.strip() for l in links[:5]]
        return False, f"Link '{target_text}' not found. Found: {found}"

    driver.execute_script("arguments[0].click();", target)

    folder = LANG_TO_DIR[to_lang]
    expected_path = f"/{folder}/" if folder else "/"
    try:
        WebDriverWait(driver, 5).until(lambda d: expected_path in d.current_url)
    except Exception:
        pass

    return True, driver.current_url


def click_nav_and_verify(driver, lang_code, i18n_key, page_file):
    """
    From current page, click nav link and verify URL lands in correct lang folder.
    Returns (ok: bool, detail: str).
    """
    folder = LANG_TO_DIR[lang_code]
    expected = f"/{folder}/{page_file}" if folder else f"/{page_file}"

    try:
        link = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, f"a[data-i18n='{i18n_key}']"))
        )
    except Exception:
        return False, f"Link [{i18n_key}] not found on page {driver.current_url}"

    driver.execute_script("arguments[0].click();", link)

    # Wait for navigation to settle
    try:
        WebDriverWait(driver, 6).until(lambda d: expected in d.current_url)
    except Exception:
        pass

    final_url = driver.current_url
    if expected in final_url:
        return True, final_url
    return False, f"Expected *{expected}*, got {final_url}"


class TestNavAllLangs:
    """Test nav link navigation for all 18 non-Korean languages."""

    @pytest.mark.parametrize("lang_code", NON_KO_LANGS)
    def test_nav_from_lang_index_all_pages(self, driver, lang_code):
        """
        Directly on /[lang]/index.html, click each nav link and verify
        the URL navigates to the correct language folder page.
        """
        failures = []

        for i18n_key, page_file in NAV_PAGES:
            go_to_lang_index(driver, lang_code)
            ok, detail = click_nav_and_verify(driver, lang_code, i18n_key, page_file)
            if not ok:
                failures.append(f"  [{i18n_key}→{page_file}]: {detail}")

        assert not failures, (
            f"[{lang_code}] Nav failures from /{LANG_TO_DIR[lang_code]}/index.html:\n"
            + "\n".join(failures)
        )

    @pytest.mark.parametrize("lang_code", NON_KO_LANGS)
    def test_nav_after_dropdown_switch(self, driver, lang_code):
        """
        Switch language via dropdown from Korean root, then click each nav link
        and verify URL navigates to the correct language folder page.
        """
        ok, detail = switch_lang_via_dropdown(driver, lang_code)
        assert ok, f"[{lang_code}] Dropdown switch failed: {detail}"

        failures = []
        for i18n_key, page_file in NAV_PAGES:
            # Go back to lang index each time
            go_to_lang_index(driver, lang_code)
            ok2, detail2 = click_nav_and_verify(driver, lang_code, i18n_key, page_file)
            if not ok2:
                failures.append(f"  [{i18n_key}→{page_file}]: {detail2}")

        assert not failures, (
            f"[{lang_code}] Nav failures after dropdown switch:\n"
            + "\n".join(failures)
        )

    @pytest.mark.parametrize("lang_code,page_file", [
        (lang, page)
        for lang in NON_KO_LANGS
        for _, page in NAV_PAGES
    ])
    def test_page_loads_without_redirect(self, driver, lang_code, page_file):
        """
        Directly load /[lang]/[page].html and verify it does NOT redirect away
        (e.g. challenges.html should NOT redirect to quiz.html).
        """
        folder = LANG_TO_DIR[lang_code]
        url = f"{BASE_URL}/{folder}/{page_file}"
        expected_fragment = f"/{folder}/{page_file}"

        driver.get(f"{BASE_URL}/index.html")
        driver.execute_script("localStorage.clear();")
        driver.execute_script(f"localStorage.setItem('mbti_site_lang', '{lang_code}');")
        driver.get(url)
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(0.4)

        current = driver.current_url
        assert expected_fragment in current, (
            f"[{lang_code}] {page_file} unexpectedly redirected to: {current}"
        )
