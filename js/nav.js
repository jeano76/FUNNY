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
