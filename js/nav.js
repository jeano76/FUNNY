(function () {
  function initDropdown() {
    var dropdowns = document.querySelectorAll('.nav-lang-dropdown, .lang-dropdown');
    dropdowns.forEach(function (dropdown) {
      var btn = dropdown.querySelector('.lang-btn');
      var content = dropdown.querySelector('.lang-content');
      if (!btn || !content) return;

      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = content.style.display === 'block';
        closeAll();
        if (!isOpen) {
          content.style.display = 'block';
        }
      });
    });

    // 바깥 클릭 시 닫기 (click만 사용 - touchstart 제거)
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-lang-dropdown, .lang-dropdown')) {
        closeAll();
      }
    });
  }

  function closeAll() {
    document.querySelectorAll('.lang-content').forEach(function (c) {
      c.style.display = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
