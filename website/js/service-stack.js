(function () {
  var stacks = document.querySelectorAll('[data-service-stack]');
  if (!stacks.length) return;

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PEEK = 56;
  var ticking = false;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function getNavHeight() {
    var nav = document.querySelector('.nav');
    return nav ? nav.getBoundingClientRect().height : 68;
  }

  function arrivalProgress(progress, index, count) {
    if (index === 0) return 1;
    var segments = count - 1;
    var seg = 1 / segments;
    return easeOutCubic(clamp((progress - (index - 1) * seg) / seg, 0, 1));
  }

  function getFront(progress, count) {
    var front = 0;
    var f;
    for (f = count - 1; f >= 0; f--) {
      if (arrivalProgress(progress, f, count) > 0.001) {
        front = f;
        break;
      }
    }
    return front;
  }

  function peekOffset(index, front, progress, count) {
    if (index >= front) return 0;
    var depth = front - index;
    var offset = -depth * PEEK;
    var frontArrival = front === 0 ? 1 : arrivalProgress(progress, front, count);
    if (frontArrival < 1) offset *= frontArrival;
    return offset;
  }

  function isStackVisible(stack) {
    return stack.offsetHeight > 0 && stack.getClientRects().length > 0;
  }

  function measureStack(stack) {
    var cards = stack.querySelectorAll('.service-stack-card');
    var count = cards.length;
    var deck = stack.querySelector('.services__stack-deck');
    stack.style.setProperty('--stack-count', String(count));
    stack.style.setProperty('--stack-peek-total', String((count - 1) * PEEK) + 'px');
    if (!isStackVisible(stack) || !deck || !count) return;

    var maxH = 0;
    cards.forEach(function (card) {
      var prevHeight = card.style.height;
      card.style.height = 'auto';
      maxH = Math.max(maxH, card.offsetHeight);
      card.style.height = prevHeight;
    });

    if (maxH > 0) {
      deck.style.height = maxH + 'px';
      stack.style.setProperty('--stack-card-h', maxH + 'px');
    }
  }

  function resetHiddenStacks() {
    stacks.forEach(function (stack) {
      if (isStackVisible(stack)) return;
      stack.querySelectorAll('.service-stack-card').forEach(function (card, index) {
        if (index === 0) {
          card.style.transform = '';
          card.style.visibility = '';
          card.style.pointerEvents = '';
        } else {
          card.style.transform = '';
          card.style.visibility = 'hidden';
          card.style.pointerEvents = 'none';
        }
        card.style.opacity = '';
        card.style.clipPath = '';
        card.style.zIndex = '';
      });
    });
  }

  function getStackProgress(stack, navH) {
    var stage = stack.querySelector('.services__stack-stage');
    if (!stage) return 0;
    var rect = stack.getBoundingClientRect();
    var range = stack.offsetHeight - stage.offsetHeight;
    var cards = stack.querySelectorAll('.service-stack-card');
    var count = cards.length;
    if (range <= 0 && count > 1) {
      range = Math.max(range, (count - 1) * 320);
    }
    if (range <= 0) return 0;
    return clamp((navH - rect.top) / range, 0, 1);
  }

  function getEntryY(stage, deck) {
    var stageH = stage.offsetHeight;
    var deckH = deck.offsetHeight;
    var deckTop = (stageH - deckH) / 2;
    return deckTop + deckH + 48;
  }

  function hideBelow(card, entryY) {
    card.style.transform = 'translate3d(0,' + entryY + 'px,0)';
    card.style.visibility = 'hidden';
    card.style.pointerEvents = 'none';
  }

  function updateStack(stack) {
    var deck = stack.querySelector('.services__stack-deck');
    var stage = stack.querySelector('.services__stack-stage');
    var cards = stack.querySelectorAll('.service-stack-card');
    var count = cards.length;
    if (!deck || !stage || !count || stack.offsetHeight < 1) return;

    var navH = getNavHeight();
    var progress = getStackProgress(stack, navH);
    var entryY = getEntryY(stage, deck);
    var pinned = stack.getBoundingClientRect().top <= navH + 0.5;
    var front = getFront(progress, count);

    cards.forEach(function (card, index) {
      var arrival = index === 0 ? 1 : arrivalProgress(progress, index, count);
      card.style.zIndex = String(index + 1);
      card.style.opacity = '1';
      card.style.clipPath = '';

      if (!pinned && progress <= 0) {
        if (index === 0) {
          card.style.transform = 'translate3d(0,0,0)';
          card.style.visibility = 'visible';
          card.style.pointerEvents = 'auto';
        } else {
          hideBelow(card, entryY);
        }
        return;
      }

      if (index > 0 && arrival <= 0) {
        hideBelow(card, entryY);
        return;
      }

      if (index > 0 && arrival < 1) {
        var eased = easeOutCubic(arrival);
        var targetY = peekOffset(index, front, progress, count);
        var y = entryY + (targetY - entryY) * eased;
        card.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
        card.style.visibility = 'visible';
        card.style.pointerEvents = 'none';
        return;
      }

      var y = peekOffset(index, front, progress, count);
      card.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
      card.style.visibility = 'visible';
      card.style.pointerEvents = index === front ? 'auto' : 'none';
    });
  }

  function updateAll() {
    stacks.forEach(function (stack) {
      if (isStackVisible(stack)) updateStack(stack);
    });
    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateAll);
  }

  function remeasureAll() {
    resetHiddenStacks();
    stacks.forEach(measureStack);
    requestUpdate();
  }

  function onPathChange() {
    resetHiddenStacks();
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        remeasureAll();
      });
    });
  }

  stacks.forEach(measureStack);

  if (reducedMotion) {
    stacks.forEach(function (stack) {
      var deck = stack.querySelector('.services__stack-deck');
      if (deck) deck.style.height = 'auto';
      stack.querySelectorAll('.service-stack-card').forEach(function (card, i, list) {
        card.style.position = 'relative';
        card.style.transform = 'none';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.marginBottom = i < list.length - 1 ? '1rem' : '0';
      });
    });
    return;
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', remeasureAll);
  window.addEventListener('hashchange', function () {
    setTimeout(remeasureAll, 150);
  });

  window.addEventListener('df-path-change', onPathChange);

  if (document.body) {
    new MutationObserver(onPathChange).observe(document.body, {
      attributes: true,
      attributeFilter: ['data-path']
    });
  }

  requestUpdate();
  window.addEventListener('load', remeasureAll);
})();
