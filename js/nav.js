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

  // 모든 링크 클릭 감시 (이벤트 위임)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return;

    // 1. 언어 변경 메뉴 클릭 시
    if (link.closest('.lang-content')) {
      e.preventDefault();
      // href에서 언어 폴더명 추출
      const parts = href.split('/').filter(p => p && p !== '..');
      let targetDir = 'ko';
      if (parts.length >= 2 && parts[parts.length - 1].includes('.html')) {
        targetDir = parts[parts.length - 2];
      }
      
      if (window.switchLanguage) {
        window.switchLanguage(targetDir);
      } else {
        localStorage.setItem(LANG_KEY, targetDir);
        window.location.href = href;
      }
      return;
    }

    // 2. 일반 내부 링크 클릭 시: 상대경로는 그대로, 절대경로만 현재 언어로 유지
    const savedLang = localStorage.getItem(LANG_KEY);

    // 상대경로(../, ./)는 브라우저 기본 동작 유지
    if (href.startsWith('..') || href.startsWith('.')) {
      return;
    }

    // 절대경로(/로 시작)만 언어 변환 적용
    if (savedLang && savedLang !== 'ko' && href.startsWith('/')) {
      e.preventDefault();
      // 순수 파일명만 추출
      const pageName = href.split('/').pop() || 'index.html';
      const targetPath = '/' + savedLang + '/' + (pageName.includes('.html') ? pageName : 'index.html');
      window.location.href = targetPath;
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
