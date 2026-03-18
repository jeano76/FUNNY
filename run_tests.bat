@echo off
REM Integrated Navigation Validation Tests 실행 스크립트 (Windows)
REM 사용: run_tests.bat

setlocal enabledelayedexpansion

echo.
echo ========================================================================
echo  marketMBTI 통합 검증 테스트 실행
echo ========================================================================

REM 1. 의존성 확인
echo.
echo [1/4] Python 및 pip 확인...
python --version
python -m pip --version

REM 2. 의존성 설치
echo.
echo [2/4] 테스트 의존성 설치...
python -m pip install -r tests/requirements.txt -q
echo ✅ 의존성 설치 완료

REM 3. 테스트 실행
echo.
echo [3/4] 테스트 실행 중... ^(약 4-6분 소요^)
echo ========================================================================

python -m pytest tests/test_integrated_navigation_validation.py -v --tb=short

REM 4. 결과 리포트
echo.
echo ========================================================================
echo [4/4] HTML 리포트 생성...
python -m pytest tests/test_integrated_navigation_validation.py -v --html=tests/report.html --self-contained-html
echo ✅ HTML 리포트 생성 완료: tests/report.html

echo.
echo ========================================================================
echo ✅ 테스트 완료!
echo ========================================================================
echo.

pause
