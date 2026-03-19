import pytest
import subprocess
import time
import os
import sys
import socket
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait

# Add tests directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Directory for screenshots
SCREENSHOTS_DIR = Path(__file__).parent / "screenshots"


def is_port_in_use(port=8000):
    """Check if a port is in use."""
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(("127.0.0.1", port))
        return False
    except OSError:
        return True


@pytest.fixture(scope="session", autouse=True)
def start_local_server():
    """Start local HTTP server on port 8000 for tests, or use existing server."""
    cwd = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    print("\n" + "="*70)
    print("Setting up local HTTP server on port 8000")
    print(f"Working directory: {cwd}")
    print("="*70)

    server_process = None

    # Check if server is already running
    if is_port_in_use(8000):
        print("✓ HTTP server already running on http://127.0.0.1:8000")
        print("="*70 + "\n")
        yield
        return

    # Start new server
    print("Starting new HTTP server...")
    server_process = subprocess.Popen(
        ["python3", "-m", "http.server", "8000", "--bind", "127.0.0.1"],
        cwd=cwd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setpgrp if hasattr(os, 'setpgrp') else None,
    )

    # Wait for server to be ready
    time.sleep(3)

    # Check if process is still running
    if server_process.poll() is not None:
        stdout, stderr = server_process.communicate()
        print(f"✗ Server failed to start!")
        print(f"  stdout: {stdout.decode()}")
        print(f"  stderr: {stderr.decode()}")
        raise RuntimeError("Failed to start HTTP server")

    print("✓ HTTP server started successfully on http://127.0.0.1:8000")
    print("="*70 + "\n")

    yield

    # Cleanup (only if we started the server)
    if server_process:
        try:
            server_process.terminate()
            server_process.wait(timeout=5)
            print("\n✓ HTTP server stopped")
        except subprocess.TimeoutExpired:
            server_process.kill()
            print("\n✓ HTTP server killed")


@pytest.fixture(scope="session")
def driver():
    """Create and yield Chrome WebDriver using system Chrome binary."""
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1280,800")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)

    # Set Chrome binary path
    chrome_options.binary_location = "/usr/bin/google-chrome-stable"

    # Set browser language preference to match test language
    # This prevents auto-lang.js from redirecting to English
    chrome_options.add_argument("--lang=ko_KR")
    chrome_options.add_argument("--accept-lang=ko-KR,ko")

    print("\n" + "="*70)
    print("WebDriver Initialization")
    print("="*70)
    print("Using Chrome binary: /usr/bin/google-chrome-stable")
    print("Attempting to initialize WebDriver...")

    driver = None
    try:
        driver = webdriver.Chrome(options=chrome_options)

        print("✓ WebDriver initialized successfully!")
        print("="*70 + "\n")

        driver.implicitly_wait(10)
        yield driver

    except Exception as e:
        print(f"\n✗ WebDriver initialization FAILED!")
        print(f"Error: {str(e)[:150]}")
        print("="*70 + "\n")

        raise RuntimeError(
            f"Failed to initialize WebDriver.\n"
            f"Error: {str(e)}"
        )

    finally:
        if driver:
            try:
                driver.quit()
            except:
                pass


@pytest.fixture(autouse=True)
def take_screenshot_on_failure(driver, request):
    """Automatically capture screenshot on test failure."""
    yield

    # Only run if test actually executed (has rep_call attribute)
    if hasattr(request.node, 'rep_call') and request.node.rep_call.failed:
        screenshot_path = SCREENSHOTS_DIR / f"{request.node.name}_failure.png"
        try:
            driver.save_screenshot(str(screenshot_path))
            print(f"\nScreenshot saved: {screenshot_path}")
        except:
            pass


@pytest.fixture
def clear_localStorage(driver):
    """Clear localStorage before each test."""
    try:
        driver.execute_script("localStorage.clear();")
    except:
        pass  # localStorage might not be available on some pages
    yield
    try:
        driver.execute_script("localStorage.clear();")
    except:
        pass


@pytest.fixture
def wait(driver):
    """Provide WebDriverWait utility for tests."""
    return WebDriverWait(driver, 10)


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """Provide test result information to fixtures."""
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)
