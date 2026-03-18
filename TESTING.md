# marketMBTI Selenium Test Suite

## Status: ✅ COMPLETE

Full Selenium automation testing framework implemented for marketMBTI. See `tests/README.md` for detailed documentation.

## Quick Start

```bash
# Install dependencies
pip install -r tests/requirements.txt

# Run all tests
pytest tests/ -v

# Run i18n tests (most critical)
pytest tests/test_i18n.py -v

# Generate report
pytest tests/ -v --html=tests/report.html
```

## Files Structure

```
tests/
├── conftest.py              # Fixtures: driver, server, screenshots
├── requirements.txt         # Dependencies
├── pytest.ini              # Test configuration
├── README.md               # Full documentation
├── __init__.py
├── test_navigation.py      # Menu/button navigation tests (14 pages × 5 links)
├── test_i18n.py           # Translation validation tests (19 langs × 4 pages)
├── test_layout.py         # Layout & responsive tests
├── test_quiz_flow.py      # End-to-end quiz flow
├── pages/
│   ├── __init__.py
│   └── base_page.py       # Page Object base class
├── screenshots/           # Auto-generated (gitignored)
└── .gitignore

pytest.ini                  # Root level pytest config
```

## Test Coverage

| Module | Coverage |
|--------|----------|
| **test_navigation.py** | 14 pages, menu links, language switching |
| **test_i18n.py** | 19 languages, 4+ pages, untranslated key detection |
| **test_layout.py** | Visibility, responsive (3 viewports), screenshots |
| **test_quiz_flow.py** | E2E flows, result storage, share buttons |

## Key Features

✅ **Automatic local server startup** via conftest.py
✅ **Page Object pattern** for maintainability
✅ **Headless Chrome** for CI/CD
✅ **Automatic failure screenshots**
✅ **Translation validation** - detects untranslated data-i18n elements
✅ **Parametrized tests** for 19 languages
✅ **10-second WebDriver waits**
✅ **LocalStorage isolation** between tests

## Critical Test: i18n Validation

The `test_i18n.py` suite validates that all translation keys are actually translated:

```python
# Automatically finds elements where text == data-i18n key
# If element shows "nav.home" instead of translated text, test fails
untranslated = page_obj.get_untranslated_keys()
```

This catches the most common issue: data-i18n attributes not getting translated due to missing translations.js or i18n-complete.js initialization.

## Running in CI/CD

No special setup needed - local server starts automatically:

```yaml
- run: pip install -r tests/requirements.txt
- run: pytest tests/ -v --html=report.html
```

## Test Execution Time

- **Full suite:** ~5-8 minutes (depending on system)
- **Navigation tests:** ~2 minutes
- **i18n tests:** ~2-3 minutes
- **Layout tests:** ~1-2 minutes
- **Quiz flow tests:** ~2-3 minutes

## Debugging Tips

1. **Check screenshots:** Failed tests save screenshots to `tests/screenshots/`
2. **View HTML report:** `pytest --html=report.html` creates detailed report
3. **Run single test:** `pytest tests/test_i18n.py::TestI18n::test_ko_translations[index.html] -v -s`
4. **Check server:** `curl http://localhost:8000` to verify local server is running
5. **Cache busting:** If translations not loading, check `?v=X.X` cache busters in HTML

## Maintenance

When updating the site:

1. **Add new page?** → Add to `ROOT_PAGES` constant in test files
2. **Add new language?** → Add to `LANGUAGES` constant, update `LANG_TO_HTML_LANG` mapping
3. **Update HTML structure?** → Update selectors in test files
4. **Fix translations?** → Run `pytest tests/test_i18n.py -v` to verify

## Known Issues & Solutions

| Issue | Solution |
|-------|----------|
| Tests timeout | Increase timeout in conftest.py: `driver.implicitly_wait(15)` |
| Language jp folder | Test accounts for jp→ja mapping automatically |
| Screenshots not saving | Check `tests/screenshots/` directory exists and is writable |
| Untranslated keys appear | Run `pytest tests/test_i18n.py -v` to identify which keys/pages |
| Local server won't start | Ensure port 8000 is free: `lsof -i :8000` |

## Future Enhancements

Possible additions:
- Visual regression testing (screenshot comparison)
- Performance profiling (page load times)
- Accessibility testing (WCAG compliance)
- Cross-browser testing (Firefox, Safari)
- API mocking for external services
