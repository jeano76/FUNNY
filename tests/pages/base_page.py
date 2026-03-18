from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BasePage:
    """Base Page Object with common utilities for all pages."""

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def get_url(self):
        """Return current URL."""
        return self.driver.current_url

    def wait_for_url(self, expected_url_part, timeout=10):
        """Wait for URL to contain expected part."""
        WebDriverWait(self.driver, timeout).until(
            lambda driver: expected_url_part in driver.current_url
        )

    def wait_for_element(self, by, value, timeout=10):
        """Wait for element to be present."""
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )

    def wait_for_element_visible(self, by, value, timeout=10):
        """Wait for element to be visible."""
        return WebDriverWait(self.driver, timeout).until(
            EC.visibility_of_element_located((by, value))
        )

    def find_element(self, by, value):
        """Find single element."""
        return self.driver.find_element(by, value)

    def find_elements(self, by, value):
        """Find multiple elements."""
        return self.driver.find_elements(by, value)

    def safe_click(self, by, value, timeout=10):
        """Wait for element and click it safely."""
        element = self.wait_for_element_visible(by, value, timeout)
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)
        element.click()

    def get_text(self, by, value):
        """Get element text."""
        element = self.find_element(by, value)
        return element.text

    def get_attribute(self, by, value, attribute):
        """Get element attribute value."""
        element = self.find_element(by, value)
        return element.get_attribute(attribute)

    def is_element_visible(self, by, value):
        """Check if element is visible."""
        try:
            element = self.find_element(by, value)
            return element.is_displayed()
        except:
            return False

    def is_element_present(self, by, value):
        """Check if element exists."""
        try:
            self.find_element(by, value)
            return True
        except:
            return False

    def clear_local_storage(self):
        """Clear browser localStorage."""
        self.driver.execute_script("localStorage.clear();")

    def set_local_storage(self, key, value):
        """Set value in localStorage."""
        self.driver.execute_script(f"localStorage.setItem('{key}', '{value}');")

    def get_local_storage(self, key):
        """Get value from localStorage."""
        return self.driver.execute_script(f"return localStorage.getItem('{key}');")

    def get_page_title(self):
        """Get page title from title tag."""
        return self.driver.title

    # i18n-specific methods
    def get_i18n_elements(self):
        """Get all elements with data-i18n attribute."""
        return self.find_elements(By.CSS_SELECTOR, "[data-i18n]")

    def get_untranslated_keys(self):
        """Find elements where text content equals the i18n key (not translated)."""
        untranslated = []
        elements = self.get_i18n_elements()

        for element in elements:
            try:
                key = element.get_attribute("data-i18n")
                text = element.text.strip()

                # Check if text equals the key (indicates untranslated)
                if text == key:
                    untranslated.append({
                        "key": key,
                        "element": element.tag_name,
                        "url": self.get_url()
                    })
            except:
                pass

        return untranslated

    def get_html_lang(self):
        """Get the lang attribute of html element."""
        return self.driver.find_element(By.TAG_NAME, "html").get_attribute("lang")

    def set_viewport(self, width, height):
        """Set viewport size."""
        self.driver.set_window_size(width, height)

    def take_screenshot(self, filename):
        """Take screenshot and save to file."""
        self.driver.save_screenshot(filename)

    def scroll_to_top(self):
        """Scroll to top of page."""
        self.driver.execute_script("window.scrollTo(0, 0);")

    def scroll_to_bottom(self):
        """Scroll to bottom of page."""
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    def get_window_width(self):
        """Get window inner width."""
        return self.driver.execute_script("return window.innerWidth;")

    def get_document_width(self):
        """Get document body scroll width."""
        return self.driver.execute_script("return document.body.scrollWidth;")

    def has_horizontal_scroll(self):
        """Check if page has horizontal scrollbar."""
        return self.get_document_width() > self.get_window_width()

    def validate_language_consistency(self, expected_lang):
        """
        Validate language consistency across multiple dimensions after page navigation.

        Checks:
        1. html[lang] attribute matches expected language
        2. localStorage.mbti_site_lang matches expected language
        3. All data-i18n elements have translated text (not showing keys)
        4. Layout elements (nav, main/section, footer) are visible
        5. No horizontal scroll detected

        Args:
            expected_lang (str): Expected language code (e.g., 'ko', 'en', 'ja')

        Returns:
            dict: {
                "html_lang_valid": bool,
                "html_lang_actual": str,
                "localStorage_valid": bool,
                "localStorage_actual": str,
                "untranslated_count": int,
                "untranslated_keys": [list of keys],
                "nav_visible": bool,
                "main_visible": bool,
                "footer_visible": bool,
                "layout_valid": bool,
                "horizontal_scroll": bool,
                "all_valid": bool,
                "url": str,
                "errors": [list of error messages]
            }
        """
        errors = []

        # 1. Check html[lang] attribute
        actual_lang = self.get_html_lang()
        html_lang_valid = (actual_lang == expected_lang)
        if not html_lang_valid:
            errors.append(f"html[lang]='{actual_lang}' (expected '{expected_lang}')")

        # 2. Check localStorage.mbti_site_lang
        stored_lang = self.get_local_storage('mbti_site_lang')
        localStorage_valid = (stored_lang == expected_lang)
        if not localStorage_valid:
            errors.append(f"localStorage.mbti_site_lang='{stored_lang}' (expected '{expected_lang}')")

        # 3. Check for untranslated keys
        untranslated = self.get_untranslated_keys()
        untranslated_count = len(untranslated)
        untranslated_keys = [item["key"] for item in untranslated[:5]]  # First 5
        if untranslated_count > 0:
            errors.append(f"Found {untranslated_count} untranslated elements (keys: {untranslated_keys})")

        # 4. Check layout visibility
        nav_visible = self.is_element_visible(By.TAG_NAME, "nav")
        main_visible = (self.is_element_present(By.TAG_NAME, "main") and
                       self.is_element_visible(By.TAG_NAME, "main")) or \
                      (self.is_element_present(By.TAG_NAME, "section") and
                       self.is_element_visible(By.TAG_NAME, "section"))
        footer_visible = self.is_element_visible(By.TAG_NAME, "footer")
        layout_valid = nav_visible and main_visible and footer_visible

        if not nav_visible:
            errors.append("nav element not visible")
        if not main_visible:
            errors.append("main/section content not visible")
        if not footer_visible:
            errors.append("footer element not visible")

        # 5. Check horizontal scroll
        has_h_scroll = self.has_horizontal_scroll()
        if has_h_scroll:
            errors.append(f"Horizontal scroll detected (document width: {self.get_document_width()}px, window: {self.get_window_width()}px)")

        # Overall validation
        all_valid = (html_lang_valid and localStorage_valid and
                    untranslated_count == 0 and layout_valid and not has_h_scroll)

        return {
            "html_lang_valid": html_lang_valid,
            "html_lang_actual": actual_lang,
            "localStorage_valid": localStorage_valid,
            "localStorage_actual": stored_lang,
            "untranslated_count": untranslated_count,
            "untranslated_keys": untranslated_keys,
            "nav_visible": nav_visible,
            "main_visible": main_visible,
            "footer_visible": footer_visible,
            "layout_valid": layout_valid,
            "horizontal_scroll": has_h_scroll,
            "all_valid": all_valid,
            "url": self.get_url(),
            "errors": errors
        }
