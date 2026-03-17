// 전체 기능 자동화 테스트 - Playwright 기반
const { chromium } = require('playwright');

const BASE = 'http://localhost:8001';

// 테스트 결과 저장
const results = {
  quiz: [],
  languages: [],
  sharing: [],
  storage: [],
  navigation: [],
  summary: {}
};

async function testQuiz(browser) {
  console.log('\n========== 1️⃣ 퀴즈 기능 테스트 ==========');

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    // 퀴즈 페이지 방문
    await page.goto(`${BASE}/quiz.html`, { waitUntil: 'networkidle' });
    console.log('✅ 퀴즈 페이지 로드');

    // 모든 문항이 로드되었는지 확인
    const questionCount = await page.evaluate(() => {
      return document.querySelectorAll('[data-question-id]').length ||
             document.querySelectorAll('input[type="radio"]').length / 4;
    });
    console.log(`✅ 문항 로드: ${questionCount}개`);

    // 20개 문항 자동 풀이
    console.log('🤖 퀴즈 자동 풀이 시작...');

    // 각 문항마다 첫 번째 선택지 클릭
    for (let i = 1; i <= 20; i++) {
      try {
        // 라디오 버튼 또는 버튼으로 선택
        const selector = `input[name="q${i}"]`;
        const inputs = await page.$$(selector);

        if (inputs.length > 0) {
          await inputs[0].click();
          console.log(`  ✓ Q${i} 선택`);
        } else {
          // 버튼 방식일 수도 있음
          const buttons = await page.$$(`button[data-answer]`);
          if (buttons.length > 0) await buttons[0].click();
        }
      } catch (e) {
        console.log(`  ⚠️ Q${i} 선택 실패`);
      }
    }

    // 제출 버튼 클릭
    const submitBtn = await page.$('button:has-text("제출"), button:has-text("완료"), button:has-text("Submit")');
    if (submitBtn) {
      await submitBtn.click();
      console.log('✅ 퀴즈 제출');
      await page.waitForNavigation({ timeout: 5000 }).catch(() => {});
    }

    // 결과 페이지 확인
    const currentUrl = page.url();
    const isResultPage = currentUrl.includes('result') || currentUrl.includes('type=');
    console.log(currentUrl.includes('result') ? '✅ 결과 페이지 이동' : '⚠️ 결과 페이지 이동 확인 불가');

    results.quiz.push({ status: isResultPage ? 'PASS' : 'FAIL', details: currentUrl });

  } catch (e) {
    console.log(`❌ 퀴즈 테스트 실패: ${e.message}`);
    results.quiz.push({ status: 'ERROR', error: e.message });
  } finally {
    await ctx.close();
  }
}

async function testResult(browser) {
  console.log('\n========== 2️⃣ 결과 페이지 테스트 ==========');

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    // INTJ 결과 페이지 방문
    await page.goto(`${BASE}/result.html?type=INTJ`, { waitUntil: 'networkidle' });
    console.log('✅ 결과 페이지 로드');

    // 성격 유형 표시 확인
    const personalityText = await page.textContent('body');
    const hasType = personalityText.includes('INTJ') || personalityText.includes('전략가');
    console.log(hasType ? '✅ 성격 유형 표시' : '⚠️ 성격 유형 표시 확인 불가');

    // i18n 확인
    const i18nOk = await page.evaluate(() => {
      return typeof window.i18n !== 'undefined' && typeof window.TRANSLATIONS !== 'undefined';
    });
    console.log(i18nOk ? '✅ i18n 시스템 로드' : '⚠️ i18n 미로드');

    // 공유 버튼 확인
    const shareButtons = await page.$$('button[data-share], a[data-share], [class*="share"]');
    console.log(`✅ 공유 버튼 발견: ${shareButtons.length}개`);

    // localStorage 저장 여부 확인
    const hasStorage = await page.evaluate(() => {
      return localStorage.getItem('mbti_result') || localStorage.getItem('mbti_result_type');
    });
    console.log(hasStorage ? '✅ localStorage 저장됨' : '⚠️ localStorage 미저장');

    results.result = { status: hasType ? 'PASS' : 'FAIL' };

  } catch (e) {
    console.log(`❌ 결과 페이지 테스트 실패: ${e.message}`);
    results.result = { status: 'ERROR', error: e.message };
  } finally {
    await ctx.close();
  }
}

async function testMultiLanguage(browser) {
  console.log('\n========== 3️⃣ 다국어 지원 테스트 ==========');

  const languages = ['ko', 'en', 'ja', 'zh', 'es', 'de', 'fr', 'ru'];

  for (const lang of languages) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    try {
      const path = lang === 'ko' ? '/' : `/${lang}/`;
      await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });

      // 페이지 언어 속성 확인
      const htmlLang = await page.getAttribute('html', 'lang');
      const expectedLang = lang === 'ja' ? 'ja' : lang;

      if (htmlLang === expectedLang) {
        console.log(`✅ ${lang.padEnd(5)} - lang="${htmlLang}"`);
        results.languages.push({ lang, status: 'PASS' });
      } else {
        console.log(`⚠️ ${lang.padEnd(5)} - lang="${htmlLang}" (expected: ${expectedLang})`);
        results.languages.push({ lang, status: 'WARN', actual: htmlLang });
      }
    } catch (e) {
      console.log(`❌ ${lang} - ${e.message}`);
      results.languages.push({ lang, status: 'FAIL', error: e.message });
    } finally {
      await ctx.close();
    }
  }
}

async function testNavigation(browser) {
  console.log('\n========== 4️⃣ 네비게이션 테스트 ==========');

  const pages = [
    { name: '홈', path: '/' },
    { name: '퀴즈', path: '/quiz.html' },
    { name: '비교', path: '/compare.html' },
    { name: '직업', path: '/careers.html' },
    { name: '어바웃', path: '/about.html' },
  ];

  for (const p of pages) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();

    try {
      await page.goto(`${BASE}${p.path}`, { waitUntil: 'networkidle' });

      // 네비게이션 메뉴 확인
      const hasNav = await page.$('nav, [role="navigation"], [class*="nav"]') !== null;

      // 언어 선택기 확인
      const hasLangSwitch = await page.$('[data-lang], [class*="lang"], button[class*="lang"]') !== null;

      console.log(`${hasNav ? '✅' : '⚠️'} ${p.name.padEnd(8)} - nav: ${hasNav ? 'O' : 'X'}, lang-switch: ${hasLangSwitch ? 'O' : 'X'}`);

      results.navigation.push({ page: p.name, hasNav, hasLangSwitch });
    } catch (e) {
      console.log(`❌ ${p.name} - ${e.message}`);
    } finally {
      await ctx.close();
    }
  }
}

async function testStorage(browser) {
  console.log('\n========== 5️⃣ localStorage 기능 테스트 ==========');

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    await page.goto(`${BASE}/result.html?type=ISFJ`, { waitUntil: 'networkidle' });

    // localStorage에 데이터 저장
    await page.evaluate(() => {
      localStorage.setItem('mbti_result', 'ISFJ');
      localStorage.setItem('mbti_result_type', 'ISFJ');
      localStorage.setItem('test_timestamp', Date.now());
    });
    console.log('✅ localStorage 저장 시도');

    // 새 페이지에서 데이터 확인
    const newCtx = await browser.newContext();
    const newPage = await newCtx.newPage();
    await newPage.goto(`${BASE}/result.html?type=ISFJ`, { waitUntil: 'networkidle' });

    const storedData = await newPage.evaluate(() => {
      return {
        result: localStorage.getItem('mbti_result'),
        type: localStorage.getItem('mbti_result_type'),
        timestamp: localStorage.getItem('test_timestamp')
      };
    });

    console.log(`✅ localStorage 조회:`, storedData.result ? `${storedData.result} (O)` : 'X');
    results.storage.push({ status: storedData.result ? 'PASS' : 'FAIL', data: storedData });

    await newCtx.close();
  } catch (e) {
    console.log(`❌ localStorage 테스트 실패: ${e.message}`);
    results.storage.push({ status: 'ERROR', error: e.message });
  } finally {
    await ctx.close();
  }
}

async function testPerformance(browser) {
  console.log('\n========== 6️⃣ 성능 테스트 ==========');

  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    const startTime = Date.now();
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;

    console.log(`⏱️ 홈페이지 로드 시간: ${loadTime}ms`);

    // 리소스 크기 확인
    const resources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      return resources.map(r => ({
        name: r.name.split('/').pop(),
        size: r.transferSize,
        duration: r.duration
      })).slice(0, 5);
    });

    console.log('📦 주요 리소스 (상위 5개):');
    resources.forEach(r => {
      const sizeKB = (r.size / 1024).toFixed(1);
      console.log(`  ${r.name.padEnd(30)} ${sizeKB}KB (${Math.round(r.duration)}ms)`);
    });

  } catch (e) {
    console.log(`⚠️ 성능 테스트 오류: ${e.message}`);
  } finally {
    await ctx.close();
  }
}

async function runAllTests() {
  console.log('🚀 마켓MBTI 전체 기능 테스트 시작');
  console.log('═'.repeat(50));

  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  try {
    await testQuiz(browser);
    await testResult(browser);
    await testMultiLanguage(browser);
    await testNavigation(browser);
    await testStorage(browser);
    await testPerformance(browser);
  } catch (e) {
    console.error('테스트 실행 중 오류:', e);
  } finally {
    await browser.close();
  }

  // 최종 결과 출력
  console.log('\n' + '═'.repeat(50));
  console.log('📊 최종 테스트 결과');
  console.log('═'.repeat(50));

  const quizStatus = results.quiz[0]?.status || 'UNKNOWN';
  const langPass = results.languages.filter(l => l.status === 'PASS').length;
  const storageStatus = results.storage[0]?.status || 'UNKNOWN';

  console.log(`✅ 퀴즈 기능: ${quizStatus}`);
  console.log(`✅ 다국어 지원: ${langPass}/${results.languages.length}`);
  console.log(`✅ 네비게이션: ${results.navigation.length} 페이지 확인`);
  console.log(`✅ localStorage: ${storageStatus}`);

  console.log('\n🎉 테스트 완료!');
}

runAllTests().catch(console.error);
