(function () {
  const LANG_KEY = 'mbti_site_lang';
  // Maps lang code (stored in localStorage) → folder directory
  const langCodeToDir = {
    'ko': '', 'en': 'en', 'ja': 'jp', 'jp': 'jp', 'zh': 'zh',
    'es': 'es', 'de': 'de', 'fr': 'fr', 'ru': 'ru', 'pt': 'pt',
    'id': 'id', 'hi': 'hi', 'vi': 'vi', 'th': 'th', 'tr': 'tr',
    'it': 'it', 'nl': 'nl', 'ar': 'ar', 'mn': 'mn', 'la': 'la'
  };
  let allButtons = [];
  let allContents = [];

  // 언어 선택 드롭다운 초기화
  function initDropdown() {
    document.querySelectorAll('.nav-lang-dropdown, .lang-dropdown').forEach(function (dropdown) {
      const btn = dropdown.querySelector('.lang-btn');
      const content = dropdown.querySelector('.lang-content');
      if (!btn || !content) return;

      allButtons.push(btn);
      allContents.push(content);

      // 언어 링크에 직접 클릭 핸들러 등록 (이벤트 위임보다 안정적)
      content.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var href = link.getAttribute('href') || '';
          // href에서 언어 디렉토리 추출
          // ../en/index.html → 'en', en/index.html → 'en', ../index.html → 'ko'
          var targetDir = 'ko';
          var match = href.match(/(?:^|\/)(en|jp|zh|es|de|fr|ru|pt|id|hi|vi|th|tr|it|nl|ar|mn|la)\/[^/]+\.html$/);
          if (match) {
            targetDir = match[1];
          }
          closeAll();
          if (window.switchLanguage) {
            window.switchLanguage(targetDir);
          } else {
            localStorage.setItem(LANG_KEY, targetDir);
            window.location.href = href;
          }
        });
      });

      // Move content to body for fixed positioning
      document.body.appendChild(content);

      // Button click handler
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = content.style.display === 'block';
        closeAll();
        if (!isOpen) {
          var rect = btn.getBoundingClientRect();
          content.style.top = (rect.bottom + 5) + 'px';
          // 오른쪽 화면 밖으로 나가지 않도록 조정
          var left = rect.left;
          var dropWidth = content.offsetWidth || 160;
          if (left + dropWidth > window.innerWidth) {
            left = window.innerWidth - dropWidth - 8;
          }
          content.style.left = Math.max(8, left) + 'px';
          content.style.display = 'block';
        }
      });
    });

    // Global click handler to close dropdown
    document.addEventListener('click', function (e) {
      var isInButton = allButtons.some(function(btn) { return btn.contains(e.target); });
      var isInContent = allContents.some(function(content) { return content.contains(e.target); });

      if (!isInButton && !isInContent) {
        closeAll();
      }
    });
  }

  function closeAll() {
    allContents.forEach(function (c) {
      c.style.display = 'none';
    });
  }

  // 일반 내부 링크 클릭 시 언어 컨텍스트 유지 (절대경로만)
  document.addEventListener('click', function(e) {
    var link = e.target.closest ? e.target.closest('a') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:')) return;

    // 언어 드롭다운 링크는 위에서 직접 처리됨 - 여기서는 스킵
    if (link.closest('.lang-content')) return;

    // 상대경로는 브라우저 기본 동작 유지
    if (href.startsWith('..') || href.startsWith('.')) return;

    // 절대경로(/로 시작)만 현재 언어로 변환
    var savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang && savedLang !== 'ko' && href.startsWith('/')) {
      var langDir = langCodeToDir[savedLang];
      if (langDir) {
        e.preventDefault();
        var pageName = href.split('/').pop() || 'index.html';
        var targetPath = '/' + langDir + '/' + (pageName.indexOf('.html') !== -1 ? pageName : 'index.html');
        window.location.href = targetPath;
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
