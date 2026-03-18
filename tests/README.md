# Selenium Automation Tests for marketMBTI

Automated test suite for verifying navigation, translations (i18n), layout, and end-to-end flows on the marketMBTI website.

## Setup

### 1. Install Dependencies

```bash
pip install -r tests/requirements.txt
```

### 2. Start Local Server

The test suite automatically starts a local HTTP server on port 8000. If you want to run the server manually:

```bash
python3 -m http.server 8000
```

## Running Tests

### Run All Tests

```bash
pytest tests/ -v
```

### Run Specific Test Category

```bash
# Navigation tests
pytest tests/test_navigation.py -v

# Translation (i18n) tests (CRITICAL)
pytest tests/test_i18n.py -v

# Layout and responsive tests
pytest tests/test_layout.py -v

# End-to-end quiz flow tests
pytest tests/test_quiz_flow.py -v
```

### Run Specific Language Tests

```bash
# Test English translation
pytest tests/test_i18n.py::TestI18n::test_all_lang_index[en] -v

# Test all 19 languages at once
pytest tests/test_i18n.py::TestI18n::test_all_lang_index -v
```

### Generate HTML Report

```bash
pytest tests/ -v --html=tests/report.html --self-contained-html
```

## Test Files Overview

### conftest.py
- **Chrome WebDriver fixture** (session scope)
- **Local HTTP server startup** (auto-started in subprocess)
- **Automatic screenshot capture** on test failures
- **LocalStorage clearing fixture** for test isolation

### pages/base_page.py
- **Page Object pattern** base class
- **Common utilities:**
  - `wait_for_element()` - WebDriverWait wrappers
  - `safe_click()` - Click with scroll and visibility check
  - `get_i18n_elements()` - Get all data-i18n elements
  - `get_untranslated_keys()` - Find elements where text == key (untranslated)
  - `has_horizontal_scroll()` - Detect layout issues

### test_navigation.py
**14 test methods** covering:
- Root page nav link clicks → URL verification
- Language switching (Korean + 19 languages)
- Quiz start button → quiz.html navigation
- Speed mode and compare page interactions
- Nav/footer visibility on all 14 pages

**Coverage:** 14 pages × 5 nav links = 70+ navigation paths tested

### test_i18n.py (CRITICAL)
**12 parametrized test methods** covering:
- Korean translations (all 14 pages)
- All 19 languages × index.html
- All 19 languages × quiz.html
- All 19 languages × result.html
- All 19 languages × compare.html
- HTML `lang` attribute verification (jp→ja, etc.)
- Comprehensive untranslated key detection

**Coverage:** 19 languages × 4 critical pages = 76+ translation validations

**Key validation:** `data-i18n="key"` elements must have text ≠ key (indicates translated)

### test_layout.py
**16 test methods** covering:
- Nav/main/footer visibility (all 14 pages)
- Horizontal scroll detection
- Responsive design (375×812, 768×1024, 1280×800)
- Screenshot capture for visual regression
- CSS variable loading
- Interactive elements (quiz, result, compare pages)
- AdSense script presence

### test_quiz_flow.py
**13 test methods** covering:
- Full quiz completion → result page (Korean + English)
- Result page structure validation
- Share buttons presence
- LocalStorage result persistence
- Compare page MBTI selection
- Speed mode flow
- Quiz progress indication
- Feature pages (fortune, challenges, group)

## Test Data & Constants

### Pages Under Test (14 total)
```
index, quiz, result, about, privacy, compare, careers, situations,
fortune, challenges, group, speed, compat, compat-chart
```

### Languages Tested (19 total)
```
ko, en, ja, zh, es, de, fr, ru, pt, id, hi, vi, th, tr, it, nl, ar, mn, la
```

### Viewports Tested
- Desktop: 1280×800
- Tablet: 768×1024
- Mobile: 375×812

## Key Testing Patterns

### Page Object Pattern
All tests use `BasePage` for common operations:
```python
page_obj = BasePage(driver)
page_obj.safe_click(By.CSS_SELECTOR, "button[data-i18n='nav.home']")
page_obj.wait_for_url("index.html")
```

### Translation Validation
Detect untranslated elements automatically:
```python
untranslated = page_obj.get_untranslated_keys()
# Returns list of {key, element, url} for debugging
```

### Automatic Failure Screenshots
Tests failing → screenshot automatically saved to `tests/screenshots/`

## Important Notes

1. **LocalStorage Isolation**: Each test uses `clear_localStorage` fixture to ensure tests don't affect each other
2. **Headless Chrome**: Tests run headless for CI/CD (set in conftest.py)
3. **10-second Wait Timeout**: WebDriverWait timeout in conftest.py (can adjust if needed)
4. **Language jp Folder**:
   - Folder is `jp/` but `<html lang="ja">` is correct
   - Test verifies this mapping
5. **Result Page**: Pre-filled sample data for quick verification

## Troubleshooting

### Tests Timeout
- Increase timeout in `conftest.py` or `pytest.ini`
- Check if server is running: `curl http://localhost:8000`

### Screenshot Not Found
- Screenshot directory is auto-created at `tests/screenshots/`
- Check permissions in test directory

### Language Tests Fail
- Verify all language folders exist: `ls -la [lang]/index.html` for each of 19 languages
- Check `translations.js` has no syntax errors: `node --check js/translations.js`

### i18n Keys Still Show Translated
- Clear browser cache or use incognito mode
- Add `?v=X.X` cache buster to script tags (see CLAUDE.md)

## CI/CD Integration

For GitHub Actions or similar:
```yaml
- name: Run Tests
  run: |
    pip install -r tests/requirements.txt
    pytest tests/ -v --html=tests/report.html --self-contained-html
```

The local server is started automatically by conftest.py, so no manual server setup is needed in CI.

## Test Reports

After running:
```bash
pytest tests/ -v --html=tests/report.html
```

Open `tests/report.html` in a browser to see:
- Test results with pass/fail status
- Execution time
- Screenshots from failures
- Detailed error messages
