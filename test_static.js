// 정적 HTML 분석 테스트 (브라우저 없이)
const http = require('http');
const path = require('path');

const BASE = 'http://localhost:8001';

const pages = [
  { name: '홈', path: '/' },
  { name: '퀴즈', path: '/quiz.html' },
  { name: '결과', path: '/result.html' },
  { name: '어바웃', path: '/about.html' },
  { name: '비교', path: '/compare.html' },
  { name: '직업', path: '/careers.html' },
  { name: '스피드', path: '/speed.html' },
  { name: '포춘', path: '/fortune.html' },
  { name: '챌린지', path: '/challenges.html' },
  { name: '그룹', path: '/group.html' },
  { name: '호환성', path: '/compat.html' },
  { name: '프라이버시', path: '/privacy.html' },
];

const langPages = ['en', 'ja', 'zh', 'es', 'de', 'fr', 'ru', 'ar', 'hi', 'id', 'it', 'mn', 'nl', 'pt', 'th', 'tr', 'vi'].map(l => ({
  name: l + '/index',
  path: '/' + l + '/'
}));

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const url = BASE + urlPath;
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', (e) => resolve({ status: 0, body: '', error: e.message }));
  });
}

function analyzeHtml(html, pageName) {
  const issues = [];

  // 1. translations.js 포함 여부
  if (!html.includes('translations.js')) issues.push('translations.js 없음');
  // 2. i18n-complete.js 포함 여부
  if (!html.includes('i18n-complete.js')) issues.push('i18n-complete.js 없음');
  // 3. auto-lang.js 포함 여부
  if (!html.includes('auto-lang.js')) issues.push('auto-lang.js 없음');
  // 4. html lang 속성
  const langMatch = html.match(/<html[^>]+lang="([^"]+)"/);
  const lang = langMatch ? langMatch[1] : '없음';
  // 5. title 태그
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1].slice(0, 35) : '없음';
  // 6. OG 태그
  if (!html.includes('og:title')) issues.push('og:title 없음');
  // 7. AdSense 스크립트
  const hasAdsense = html.includes('googlesyndication') || html.includes('adsbygoogle');
  // 8. nav 포함
  if (!html.includes('nav') && !html.includes('menu')) issues.push('nav 없음');

  return { lang, title, issues, hasAdsense };
}

async function run() {
  const allPages = [...pages, ...langPages];
  let passed = 0, failed = 0;

  console.log('=== 루트 페이지 테스트 ===');
  for (const p of pages) {
    const { status, body, error } = await fetchPage(p.path);
    if (status !== 200) {
      console.log(`❌ [${status}] ${p.name} ${error || ''}`);
      failed++;
      continue;
    }
    const { lang, title, issues, hasAdsense } = analyzeHtml(body, p.name);
    const ok = issues.length === 0;
    const icon = ok ? '✅' : '⚠️ ';
    const adsIcon = hasAdsense ? '💰' : '  ';
    const issueStr = issues.length > 0 ? `| ⚠️  ${issues.join(', ')}` : '';
    console.log(`${icon} [${status}] ${adsIcon} ${p.name.padEnd(10)} lang=${lang.padEnd(5)} "${title}" ${issueStr}`);
    if (ok) passed++; else failed++;
  }

  console.log('\n=== 언어별 홈페이지 테스트 ===');
  for (const p of langPages) {
    const { status, body, error } = await fetchPage(p.path);
    if (status !== 200) {
      console.log(`❌ [${status}] ${p.name} ${error || ''}`);
      failed++;
      continue;
    }
    const { lang, title, issues, hasAdsense } = analyzeHtml(body, p.name);
    const ok = issues.length === 0;
    const icon = ok ? '✅' : '⚠️ ';
    const issueStr = issues.length > 0 ? `| ⚠️  ${issues.join(', ')}` : '';
    console.log(`${icon} [${status}] ${p.name.padEnd(10)} lang=${lang.padEnd(5)} "${title}" ${issueStr}`);
    if (ok) passed++; else failed++;
  }

  const total = passed + failed;
  console.log(`\n=============================`);
  console.log(`결과: ${passed}/${total} 통과 | ${failed}개 문제`);
}

run();
