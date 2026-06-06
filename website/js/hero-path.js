(function () {
  var STORAGE_KEY = 'df-path';
  var PATH_TARGETS = { data: 'schema', automation: 'auto-vision' };

  var hero = document.querySelector('.hero--split');
  if (!hero) return;

  var paths = hero.querySelectorAll('.hero__path');
  var ctaButtons = document.querySelectorAll('[data-path-cta]');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var activePath = null;

  /* ── Cloud ─────────────────────────────────────────────────── */
  var cloudData = document.createElement('div');
  cloudData.className = 'hero__cloud hero__cloud--data';
  cloudData.setAttribute('aria-hidden', 'true');
  hero.appendChild(cloudData);

  var cloudPlat = document.createElement('div');
  cloudPlat.className = 'hero__cloud hero__cloud--plat';
  cloudPlat.setAttribute('aria-hidden', 'true');
  hero.appendChild(cloudPlat);

  function settleCloud(pathName) {
    cloudData.classList.toggle('hero__cloud--active', pathName === 'data');
    cloudPlat.classList.toggle('hero__cloud--active', pathName === 'automation');
  }

  function hideCloud() {
    cloudData.classList.remove('hero__cloud--active');
    cloudPlat.classList.remove('hero__cloud--active');
  }

  if (!reducedMotion) {
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      settleCloud(e.clientX - r.left > r.width / 2 ? 'automation' : 'data');
    });

    hero.addEventListener('mouseleave', function () {
      if (activePath) settleCloud(activePath);
      else hideCloud();
    });
  }
  /* ── end cloud ──────────────────────────────────────────────── */

  function setChosenPanel(pathName) {
    paths.forEach(function (panel) {
      var chosen = panel.getAttribute('data-path') === pathName;
      panel.classList.toggle('hero__path--chosen', chosen);
      panel.classList.toggle('hero__path--dim', Boolean(pathName) && !chosen);
    });
  }

  function lockPage() {
    document.documentElement.classList.add('is-hero-locked');
    window.scrollTo(0, 0);
  }

  function unlockPage() {
    document.documentElement.classList.remove('is-hero-locked');
  }

  function applyPath(pathName) {
    activePath = pathName;
    document.body.dataset.path = pathName;
    unlockPage();

    try {
      sessionStorage.setItem(STORAGE_KEY, pathName);
    } catch (err) { /* ignore */ }

    setChosenPanel(pathName);

    if (!reducedMotion) settleCloud(pathName);

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
    applyPath(pathName);
    if (shouldScroll !== false) {
      requestAnimationFrame(function () { scrollToTrack(pathName); });
    }
    var hash = '#' + PATH_TARGETS[pathName];
    if (window.location.hash !== hash) history.replaceState(null, '', hash);
  }

  function isLocked() {
    return document.documentElement.classList.contains('is-hero-locked');
  }

  function preventScrollWhileLocked(event) {
    if (!isLocked()) return;
    event.preventDefault();
  }

  window.addEventListener('wheel', preventScrollWhileLocked, { passive: false });
  window.addEventListener('touchmove', preventScrollWhileLocked, { passive: false });

  window.addEventListener('keydown', function (event) {
    if (!isLocked()) return;
    var keys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
    if (keys.indexOf(event.key) !== -1) event.preventDefault();
  });

  ctaButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var pathName = button.getAttribute('data-path-cta');
      if (!pathName) return;
      selectPath(pathName, true);
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var hash = (link.getAttribute('href') || '').slice(1);
      if (isLocked() && hash && hash !== 'about') event.preventDefault();
    });
  });

  function initFromHashOrStorage() {
    var hash = window.location.hash.replace('#', '');
    var stored = null;
    try { stored = sessionStorage.getItem(STORAGE_KEY); } catch (err) { /* ignore */ }

    var pathName = null;
    var shouldScroll = false;

    if (hash === 'schema') { pathName = 'data'; shouldScroll = true; }
    else if (hash === 'auto-vision') { pathName = 'automation'; shouldScroll = true; }
    else if (stored === 'data' || stored === 'automation') { pathName = stored; }

    if (pathName) selectPath(pathName, shouldScroll);
    else lockPage();
  }

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash === 'schema') selectPath('data', true);
    else if (hash === 'auto-vision') selectPath('automation', true);
  });

  initFromHashOrStorage();
})();
