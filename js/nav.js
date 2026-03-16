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

      // 언어 링크 클릭 이벤트 핸들러 추가
      content.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var href = this.getAttribute('href');
          var langCode = '';

          // href에서 언어 코드 추출 (예: "en/index.html" -> "en", "../jp/index.html" -> "jp", "index.html" -> "ko")
          if (href.indexOf('index.html') !== -1) {
            var parts = href.split('/');
            if (parts.length >= 2) {
              // "en/index.html" 또는 "../en/index.html"
              langCode = parts[parts.length - 2];
              if (langCode === '..') langCode = 'ko'; // root case
            } else {
              // "index.html"
              langCode = 'ko';
            }
          }

          if (langCode && typeof window.switchLanguage === 'function') {
            window.switchLanguage(langCode);
          } else {
            // fallback
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
