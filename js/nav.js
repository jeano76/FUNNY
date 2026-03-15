(function () {
  function initDropdown() {
    var dropdowns = document.querySelectorAll('.nav-lang-dropdown, .lang-dropdown');
    dropdowns.forEach(function (dropdown) {
      var btn = dropdown.querySelector('.lang-btn');
      var content = dropdown.querySelector('.lang-content');
      if (!btn || !content) return;

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = content.classList.contains('open');
        closeAll();
        if (!isOpen) {
          content.classList.add('open');
          content.style.display = 'block';
        }
      });
    });

    document.addEventListener('click', closeAll);
    document.addEventListener('touchstart', closeAll);
  }

  function closeAll() {
    document.querySelectorAll('.lang-content').forEach(function (c) {
      c.classList.remove('open');
      c.style.display = '';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
