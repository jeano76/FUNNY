const { chromium } = require('playwright');

const BASE = 'http://localhost:8001';

const pages = [
  { name: '홈(루트)', path: '/' },
  { name: '퀴즈', path: '/quiz.html' },
  { name: '결과', path: '/result.html?type=INTJ' },
  { name: '어바웃', path: '/about.html' },
  { name: '비교', path: '/compare.html' },
  { name: '직업', path: '/careers.html' },
  { name: '스피드', path: '/speed.html' },
  { name: '포춘', path: '/fortune.html' },
  { name: '챌린지', path: '/challenges.html' },
  { name: '그룹', path: '/group.html' },
  { name: '호환성', path: '/compat.html' },
];

const langPaths = ['en', 'ja', 'zh', 'es', 'de', 'fr', 'ru'];

async function testPage(page, url, name) {
  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
    const status = res ? res.status() : 0;

    // i18n 적용 확인
    const i18nOk = await page.evaluate(() => {
      return typeof window.i18n !== 'undefined' && typeof window.TRANSLATIONS !== 'undefined';
    });

    // 빈 data-i18n 키 확인 (번역 안된 채 키 그대로 남은 것)
    const untranslated = await page.evaluate(() => {
      const els = document.querySelectorAll('[data-i18n]');
      const bad = [];
      els.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = el.textContent.trim();
        if (text === key) bad.push(key);
      });
      return bad.slice(0, 3);
    });

    const title = await page.title();

    return {
      name,
      url,
      status,
      title: title.slice(0, 40),
      i18nOk,
      untranslated,
      errors: errors.slice(0, 2),
      ok: status === 200 && errors.length === 0
    };
  } catch (e) {
    return { name, url, status: 0, title: '', i18nOk: false, untranslated: [], errors: [e.message], ok: false };
  }
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const results = [];

  // 루트 페이지 테스트
  for (const p of pages) {
    const ctx = await browser.newContext();
    const tab = await ctx.newPage();
    const r = await testPage(tab, BASE + p.path, p.name);
    results.push(r);
    await ctx.close();

    const icon = r.ok ? '✅' : '❌';
    const i18n = r.i18nOk ? '🌐' : '⚠️ i18n없음';
    const untrans = r.untranslated.length > 0 ? `⚠️ 미번역: ${r.untranslated.join(',')}` : '';
    const errs = r.errors.length > 0 ? `| ERR: ${r.errors[0].slice(0,60)}` : '';
    console.log(`${icon} [${r.status}] ${r.name.padEnd(10)} ${i18n} ${untrans} ${errs}`);
  }

  // 언어별 index.html 테스트
  console.log('\n--- 언어별 홈페이지 ---');
  for (const lang of langPaths) {
    const ctx = await browser.newContext();
    const tab = await ctx.newPage();
    const r = await testPage(tab, `${BASE}/${lang}/`, lang + '/index');
    results.push(r);
    await ctx.close();
    const icon = r.ok ? '✅' : '❌';
    const errs = r.errors.length > 0 ? `| ERR: ${r.errors[0].slice(0,60)}` : '';
    console.log(`${icon} [${r.status}] ${lang.padEnd(5)} "${r.title}" ${errs}`);
  }

  const total = results.length;
  const passed = results.filter(r => r.ok).length;
  console.log(`\n결과: ${passed}/${total} 통과`);

  await browser.close();
  process.exit(passed === total ? 0 : 1);
})();
