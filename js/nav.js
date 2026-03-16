(function () {
  const LANG_KEY = 'mbti_site_lang';

  // 언어 선택 드롭다운 초기화
  function initDropdown() {
    document.querySelectorAll('.nav-lang-dropdown, .lang-dropdown').forEach(function (dropdown) {
      const btn = dropdown.querySelector('.lang-btn');
      const content = dropdown.querySelector('.lang-content');
      if (!btn || !content) return;

      document.body.appendChild(content);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = content.style.display === 'block';
        closeAll();
        if (!isOpen) {
          const rect = btn.getBoundingClientRect();
          content.style.top = (rect.bottom + 5) + 'px';
          content.style.right = Math.max(5, window.innerWidth - rect.right) + 'px';
          content.style.display = 'block';
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-lang-dropdown, .lang-dropdown, .lang-content')) {
        closeAll();
      }
    });
  }

  function closeAll() {
    document.querySelectorAll('.lang-content').forEach(function (c) {
      c.style.display = '';
    });
  }

  // 모든 링크 클릭을 가로채는 이벤트 위임
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return;

    // 1. 언어 메뉴 링크 클릭 시
    if (link.closest('.lang-content')) {
      e.preventDefault();
      let langDir = 'ko';
      // href에서 디렉토리 추출 (예: 'en/index.html' -> 'en', 'jp/index.html' -> 'jp', '../en/index.html' -> 'en')
      const parts = href.split('/').filter(p => p && p !== '..');
      if (parts.length >= 2 && parts[parts.length - 1].includes('.html')) {
        langDir = parts[parts.length - 2];
      } else if (href === 'index.html' || href === '/index.html') {
        langDir = 'ko';
      }

      if (window.switchLanguage) {
        window.switchLanguage(langDir);
      } else {
        localStorage.setItem(LANG_KEY, langDir);
        window.location.href = href;
      }
      return;
    }

    // 2. 일반 메뉴 링크 클릭 시 (언어 유지)
    const savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang && savedLang !== 'ko') {
      // 절대 경로가 아닌 경우에만 현재 언어 경로를 강제
      if (!href.startsWith('/')) {
        e.preventDefault();
        const pageName = href.split('/').pop();
        window.location.href = '/' + savedLang + '/' + (pageName.includes('.html') ? pageName : 'index.html');
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
