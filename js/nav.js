(function () {
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

      // 언어 링크 클릭 이벤트 핸들러를 더 단순하고 명확하게 수정
      content.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function(e) {
              e.preventDefault();
              const href = this.getAttribute('href');
              let langCode = 'ko'; // 기본값은 한국어

              // href에서 언어 코드를 찾습니다. (e.g., 'en/', 'jp/')
              const match = href.match(/\b(en|jp|zh|es|de|fr|ru|pt|id|hi|vi|th|tr|it|nl|ar|mn|la)\b/);

              if (match) {
                  langCode = match[1];
              }

              if (typeof window.switchLanguage === 'function') {
                  window.switchLanguage(langCode);
              } else {
                  // Fallback in case switchLanguage is not defined
                  console.error('switchLanguage function not found.');
                  window.location.href = href;
              }
          });
      });
    });

    // 바깥 클릭 시 닫기 (.lang-content 클릭은 닫지 않음 - 링크 클릭 허용)
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
