(function () {
  var STORAGE_KEY = 'df-path';
  var PATH_TARGETS = { data: 'schema', automation: 'auto-vision' };
  var DEFAULT_PATH = 'data';

  var toggleButtons = document.querySelectorAll('[data-path-toggle]');
  if (!toggleButtons.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var activePath = null;

  function setToggleState(pathName) {
    toggleButtons.forEach(function (button) {
      var active = button.getAttribute('data-path-toggle') === pathName;
      button.classList.toggle('path-toggle__btn--active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyPath(pathName) {
    activePath = pathName;
    document.body.dataset.path = pathName;
    document.documentElement.dataset.pathInit = pathName;

    try {
      sessionStorage.setItem(STORAGE_KEY, pathName);
    } catch (err) { /* ignore */ }

    setToggleState(pathName);
    window.dispatchEvent(new CustomEvent('df-path-change'));

    document.querySelectorAll('[data-nav-data]').forEach(function (link) {
      var attr = pathName === 'automation' ? 'data-nav-automation' : 'data-nav-data';
      var target = link.getAttribute(attr);
      if (target) link.setAttribute('href', target);
    });
  }

  function scrollToTrack(pathName) {
    var target = document.getElementById(PATH_TARGETS[pathName]);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  }

  function selectPath(pathName, shouldScroll) {
    var changed = activePath !== pathName;
    var scrollY = window.scrollY;

    applyPath(pathName);

    if (shouldScroll) {
      requestAnimationFrame(function () { scrollToTrack(pathName); });
      var hash = '#' + PATH_TARGETS[pathName];
      if (window.location.hash !== hash) history.replaceState(null, '', hash);
    } else if (changed) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          window.scrollTo(0, scrollY);
        });
      });
    }
  }

  toggleButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var pathName = button.getAttribute('data-path-toggle');
      if (!pathName || pathName === activePath) return;
      selectPath(pathName, false);
    });
  });

  function initFromHashOrStorage() {
    var hash = window.location.hash.replace('#', '');
    var stored = null;
    try { stored = sessionStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }

    var pathName = DEFAULT_PATH;
    var shouldScroll = false;

    if (hash === 'schema') { pathName = 'data'; shouldScroll = true; }
    else if (hash === 'auto-vision') { pathName = 'automation'; shouldScroll = true; }
    else if (stored === 'data' || stored === 'automation') { pathName = stored; }

    selectPath(pathName, shouldScroll);
  }

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'schema') selectPath('data', true);
    else if (hash === 'auto-vision') selectPath('automation', true);
  });

  initFromHashOrStorage();
})();
