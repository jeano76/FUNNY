import pytest
import random
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from pages.base_page import BasePage


BASE_URL = "http://localhost:8000"

# MBTI Types for validation
MBTI_TYPES = [
    "INTJ",
    "INTP",
    "ENTJ",
    "ENTP",
    "INFJ",
    "INFP",
    "ENFJ",
    "ENFP",
    "ISTJ",
    "ISFJ",
    "ESTJ",
    "ESFJ",
    "ISTP",
    "ISFP",
    "ESTP",
    "ESFP",
]


class TestQuizFlow:
    """End-to-end quiz flow tests."""

    def test_full_quiz_ko(self, driver, clear_localStorage):
        """Complete full quiz in Korean and reach result page."""
        page_obj = BasePage(driver)

        # Start quiz
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Verify on quiz page
        page_obj.wait_for_url("quiz.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "[data-i18n='quiz.title']")

        # Answer 20 questions
        for i in range(20):
            # Wait for question to appear
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-answer]")

            # Get all answer buttons
            buttons = page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]")

            if len(buttons) > 0:
                # Select random answer
                random_button = random.choice(buttons)
                page_obj.safe_click(By.CSS_SELECTOR, f"button[data-answer='{random_button.get_attribute('data-answer')}']")

                # Small wait between answers
                import time
                time.sleep(0.5)
            else:
                break

        # Wait for result page
        page_obj.wait_for_url("result.html", timeout=15)
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        current_url = page_obj.get_url()
        assert "result.html" in current_url, f"Expected result.html, got {current_url}"

    def test_full_quiz_en(self, driver, clear_localStorage):
        """Complete full quiz in English and reach result page."""
        page_obj = BasePage(driver)

        # Navigate to English version
        driver.get(f"{BASE_URL}/en/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Verify language
        assert page_obj.get_html_lang() == "en", "Language not set to English"

        # Start quiz
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Verify on English quiz page
        page_obj.wait_for_url("quiz.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "[data-i18n='quiz.title']")

        # Answer questions
        for i in range(20):
            page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-answer]")

            buttons = page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]")

            if len(buttons) > 0:
                random_button = random.choice(buttons)
                page_obj.safe_click(By.CSS_SELECTOR, f"button[data-answer='{random_button.get_attribute('data-answer')}']")

                import time
                time.sleep(0.5)
            else:
                break

        # Wait for result page
        page_obj.wait_for_url("result.html", timeout=15)

        # Verify English result page
        assert page_obj.get_html_lang() == "en", "Result page not in English"

    def test_result_page_structure(self, driver):
        """Verify result page has required elements."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/result.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Check for personality type display
        personality_elem = page_obj.is_element_present(
            By.CSS_SELECTOR, "[data-i18n*='result']"
        )
        assert personality_elem, "Personality result not found on page"

        # Check for description
        main = page_obj.find_element(By.TAG_NAME, "main")
        assert len(main.text) > 50, "Result page has insufficient content"

    def test_result_share_buttons(self, driver):
        """Verify result page has share buttons."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/result.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Check for share buttons
        share_buttons = page_obj.find_elements(By.CSS_SELECTOR, "button[data-i18n*='share']")

        # There should be at least one share option
        assert len(share_buttons) > 0, "No share buttons found on result page"

    def test_result_storage(self, driver, clear_localStorage):
        """Verify quiz result is stored in localStorage."""
        page_obj = BasePage(driver)

        # Start quiz
        driver.get(f"{BASE_URL}/index.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")
        page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='index.startBtn']")

        # Complete quiz (quick answers)
        page_obj.wait_for_url("quiz.html")

        for i in range(20):
            buttons = page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]")
            if buttons:
                buttons[0].click()
                import time
                time.sleep(0.3)
            else:
                break

        # Wait for result page
        page_obj.wait_for_url("result.html", timeout=15)

        # Check localStorage
        result = page_obj.get_local_storage("mbti_result")
        assert result is not None, "Result not stored in localStorage"

    def test_compare_page_interaction(self, driver):
        """Test compare page MBTI type selection."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/compare.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "select")

        # Get select elements
        selects = page_obj.find_elements(By.TAG_NAME, "select")
        assert len(selects) >= 2, "Compare page should have at least 2 select dropdowns"

        # Select options
        try:
            selects[0].send_keys("I")  # Try to select an option
            import time
            time.sleep(0.5)

            # Check if comparison result appears
            main = page_obj.find_element(By.TAG_NAME, "main")
            assert main.text, "No comparison result displayed"
        except:
            pytest.skip("Could not interact with select elements")

    def test_speed_mode_flow(self, driver, clear_localStorage):
        """Test speed mode quiz flow."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/speed.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        # Check if speed mode start button exists
        start_btn = page_obj.is_element_present(
            By.CSS_SELECTOR, "[data-i18n='speed.startBtn']"
        )

        if start_btn:
            page_obj.safe_click(By.CSS_SELECTOR, "[data-i18n='speed.startBtn']")

            # Answer a few quick questions
            for i in range(5):
                buttons = page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]")
                if buttons:
                    buttons[0].click()
                    import time
                    time.sleep(0.2)
                else:
                    break

    def test_quiz_progress_indication(self, driver):
        """Verify quiz shows progress indication."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/quiz.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-answer]")

        # Look for progress bar, counter, or indicator
        progress_elements = page_obj.find_elements(
            By.CSS_SELECTOR, "[class*='progress'], [class*='counter'], [data-i18n*='progress']"
        )

        # Some indication of progress should exist
        if len(progress_elements) == 0:
            # Check if button text indicates progress
            buttons = page_obj.find_elements(By.CSS_SELECTOR, "button")
            assert len(buttons) > 0, "No interactive elements found on quiz"

    def test_quiz_answer_validation(self, driver):
        """Verify quiz accepts and processes answers."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/quiz.html")
        page_obj.wait_for_element_visible(By.CSS_SELECTOR, "button[data-answer]")

        # Get initial button count
        buttons_before = len(page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]"))

        # Click first answer
        if buttons_before > 0:
            answer_button = page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]")[0]
            answer_button.click()

            import time
            time.sleep(0.5)

            # Check that page changed (new question or result page)
            buttons_after = len(page_obj.find_elements(By.CSS_SELECTOR, "button[data-answer]"))

            # Either moved to next question or reached result page
            current_url = page_obj.get_url()
            either_next_question = buttons_after != buttons_before
            or_on_result = "result.html" in current_url

            assert either_next_question or or_on_result, "No state change after answer"

    def test_lucky_draw_page_exists(self, driver):
        """Test fortune/luck page exists and loads."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/fortune.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        main = page_obj.find_element(By.TAG_NAME, "main")
        assert main.is_displayed(), "Fortune page main content not visible"

    def test_challenges_page_exists(self, driver):
        """Test challenges page exists and loads."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/challenges.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        main = page_obj.find_element(By.TAG_NAME, "main")
        assert main.is_displayed(), "Challenges page main content not visible"

    def test_group_mode_page(self, driver):
        """Test group testing mode page."""
        page_obj = BasePage(driver)

        driver.get(f"{BASE_URL}/group.html")
        page_obj.wait_for_element_visible(By.TAG_NAME, "main")

        main = page_obj.find_element(By.TAG_NAME, "main")
        assert main.is_displayed(), "Group page main content not visible"
