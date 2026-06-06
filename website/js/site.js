(function () {
  var bookingMeta = document.querySelector('meta[name="booking-url"]');
  var bookingUrl = bookingMeta && bookingMeta.content;
  if (bookingUrl) {
    document.querySelectorAll('.booking-link').forEach(function (link) {
      link.href = bookingUrl;
    });
  }
})();

(function () {
  var subjectMeta = document.querySelector('meta[name="email-subject"]');
  var subject = subjectMeta && subjectMeta.content;
  if (subject) {
    document.querySelectorAll('.email-link').forEach(function (link) {
      var base = link.getAttribute('href').split('?')[0];
      link.href = base + '?subject=' + encodeURIComponent(subject);
    });
  }
})();

(function () {
  var nav = document.querySelector('.nav');
  if (!nav) {
    return;
  }

  var fadeEnd = 120;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateNav() {
    var progress = Math.min(Math.max(window.scrollY / fadeEnd, 0), 1);
    if (reducedMotion) {
      progress = window.scrollY > 0 ? 1 : 0;
    }
    nav.style.setProperty('--nav-opacity', progress);
    nav.classList.toggle('nav--ready', progress > 0.05);
    nav.classList.toggle('nav--scrolled', progress >= 1);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');
  if (!nav || !toggle || !menu) {
    return;
  }

  function setMenuOpen(open) {
    nav.classList.toggle('nav--open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenuOpen(!nav.classList.contains('nav--open'));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');
      if (href && href.charAt(0) === '#') {
        event.preventDefault();
        setMenuOpen(false);
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        if (history.pushState) {
          history.pushState(null, '', href);
        } else {
          location.hash = href;
        }
        return;
      }
      setMenuOpen(false);
    });
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });
})();

(function () {
  var section = document.getElementById('auto-services');
  if (!section) {
    return;
  }

  var buttons = section.querySelectorAll('.auto-mode-toggle__btn');
  var storageKey = 'df-auto-mode';

  function setMode(mode) {
    if (mode !== 'smb' && mode !== 'enterprise') {
      mode = 'smb';
    }
    section.setAttribute('data-auto-mode', mode);
    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-auto-mode') === mode;
      btn.classList.toggle('auto-mode-toggle__btn--active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    try {
      sessionStorage.setItem(storageKey, mode);
    } catch (e) {
      /* ignore */
    }
  }

  var storedMode = null;
  try {
    storedMode = sessionStorage.getItem(storageKey);
  } catch (e) {
    /* ignore */
  }
  if (storedMode === 'smb' || storedMode === 'enterprise') {
    setMode(storedMode);
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMode(btn.getAttribute('data-auto-mode'));
    });
  });
})();
