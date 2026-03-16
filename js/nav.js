(function () {
  // 현재 저장된 언어 가져오기
  function getSavedLang() {
    return localStorage.getItem('selectedLang') || 'ko';
  }

  // 모든 내부 링크가 현재 언어 설정을 따르도록 수정
  function updateAllLinks() {
    const savedLang = getSavedLang();
    if (savedLang === 'ko') return; // 한국어는 기본이므로 처리 불필요

    document.querySelectorAll('a').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('/')) return;
      
      // 언어 선택 드롭다운 내부의 링크는 제외
      if (link.closest('.lang-content')) return;

      // 이미 해당 언어 경로가 포함되어 있다면 중복 방지
      if (href.startsWith(savedLang + '/') || href.startsWith('../' + savedLang + '/')) return;

      // 상대 경로 링크를 현재 언어 경로에 맞게 수정
      // 예: 'about.html' -> '/en/about.html'
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const pageName = href.split('/').pop();
        window.location.href = '/' + savedLang + '/' + pageName;
      });
    });
  }

  function initDropdown() {
    var dropdowns = document.querySelectorAll('.nav-lang-dropdown, .lang-dropdown');
    dropdowns.forEach(function (dropdown) {
      var btn = dropdown.querySelector('.lang-btn');
      var content = dropdown.querySelector('.lang-content');
      if (!btn || !content) return;

      // 포탈: body에 직접 붙여 nav의 backdrop-filter/stacking context에서 탈출
      document.body.appendChild(content);

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = content.style.display === 'block';
        closeAll();
        if (!isOpen) {
          var rect = btn.getBoundingClientRect();
          content.style.top = (rect.bottom + 5) + 'px';
          content.style.right = Math.max(5, window.innerWidth - rect.right) + 'px';
          content.style.display = 'block';
        }
      });

      // 언어 링크 클릭 이벤트 핸들러
      content.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              const href = this.getAttribute('href');
              let langCode = 'ko';

              // href에서 언어 코드를 찾습니다. (예: 'en/index.html' -> 'en', 'jp/index.html' -> 'jp')
              // '..'을 포함한 경로에서도 정확한 언어 폴더명을 추출합니다.
              const segments = href.split('/').filter(function(s) { return s && s !== '..'; });
              if (segments.length >= 2 && segments[segments.length - 1].includes('.html')) {
                  langCode = segments[segments.length - 2];
              } else if (href.indexOf('index.html') === 0 || href === 'index.html') {
                  langCode = 'ko';
              }

              if (typeof window.switchLanguage === 'function') {
                  window.switchLanguage(langCode);
              } else {
                  window.location.href = href;
              }
          });
      });
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-lang-dropdown, .lang-dropdown, .lang-content')) {
        closeAll();
      }
    });
  }

  function closeAll() {
    document.querySelectorAll('.lang-content').forEach(function (c) {
      c.style.display = '';
      c.style.top = '';
      c.style.right = '';
    });
  }

  function init() {
    initDropdown();
    updateAllLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
