/* ── FITTRACK v10: Global Safety Proxy ─────────────────────
   Wraps getElementById with a Proxy so that calling .property
   on a null element never throws — it silently no-ops instead.
   Also suppresses repeated identical console errors.
─────────────────────────────────────────────────────────── */
(function installSafeProxy() {
  'use strict';
  // Safe no-op element: any property access or method call silently does nothing
  function makeSafeEl() {
    var styleProxy = new Proxy({}, { get:function(){return '';}, set:function(){return true;} });
    var clProxy = { add:function(){}, remove:function(){}, toggle:function(){}, contains:function(){return false;}, replace:function(){} };
    var el = {
      style: styleProxy,
      classList: clProxy,
      dataset: {},
      textContent: '',
      innerHTML: '',
      value: '',
      checked: false,
      disabled: false,
      hidden: false,
      parentNode: null,
      nextElementSibling: null,
      querySelector: function(){return null;},
      querySelectorAll: function(){return [];},
      addEventListener: function(){},
      removeEventListener: function(){},
      setAttribute: function(){},
      getAttribute: function(){return null;},
      removeAttribute: function(){},
      appendChild: function(){},
      insertBefore: function(){},
      remove: function(){},
      focus: function(){},
      blur: function(){},
      click: function(){},
      closest: function(){return null;},
      contains: function(){return false;},
      insertAdjacentElement: function(){},
      getBoundingClientRect: function(){return{top:0,left:0,width:0,height:0,bottom:0,right:0};}
    };
    return el;
  }
  var _safeEl = makeSafeEl();
  var _origGetEl = document.getElementById.bind(document);
  document.getElementById = function(id) {
    return _origGetEl(id) || _safeEl;
  };
  // Suppress repeated identical errors
  var _seenErrors = {};
  window.onerror = function(msg, src, line) {
    var key = String(msg).slice(0,80) + ':' + line;
    if (_seenErrors[key]) return true;
    _seenErrors[key] = true;
    return false;
  };
})();

/* ═══════════════════════════════════════════════════════════════
   FITTRACK V45 — PREMIUM JS ENHANCEMENTS
   Micro-interactions, animations, polish
═══════════════════════════════════════════════════════════════ */
(function PremiumUX() {
  'use strict';

  /* ── 1. HAPTIC on every primary button ── */
  document.addEventListener('click', function(e) {
    var el = e.target.closest('.btn-acc, .pres-btn, .cta-btn-main.accent, .rec-btn, .bni, .ob-card, .wo-set-chk');
    if (el && navigator.vibrate) navigator.vibrate(8);
  }, { passive: true });

  /* ── 2. Smooth page transitions (no delay — evita blocco input) ── */
  var _origGoPage = window.goPage;
  if (_origGoPage) {
    window.goPage = function(p) {
      _origGoPage(p);
    };
  }

  /* ── 3. Toast upgrade — better positioning and style ── */
  var _origShowToast = window.showToast;
  window.showToast = function(msg, duration) {
    var toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, duration || 2400);
  };

  /* ── 4. Card press depth effect ── */
  document.addEventListener('touchstart', function(e) {
    var card = e.target.closest('.sess-card, .pres-card, .coach-card, .glass-card, .meal-card');
    if (!card) return;
    card.style.transition = 'transform 0.12s ease, box-shadow 0.12s ease';
    card.style.transform = 'scale(0.985)';
    card.style.boxShadow = '0 1px 8px rgba(0,0,0,0.4)';
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    var card = e.target.closest('.sess-card, .pres-card, .coach-card, .glass-card, .meal-card');
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
    setTimeout(function() { card.style.transition = ''; }, 200);
  }, { passive: true });

  /* ── 5. Stat tiles — count-up animation ── */
  function animateNumber(el, target, duration) {
    var start = 0;
    var startTime = null;
    var isFloat = String(target).includes('.');
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = start + (target - start) * eased;
      el.textContent = isFloat ? current.toFixed(1) : Math.round(current);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function animateStats() {
    document.querySelectorAll('.stat-v').forEach(function(el) {
      var val = parseFloat(el.textContent);
      if (!isNaN(val) && val > 0) {
        el.textContent = '0';
        animateNumber(el, val, 800);
      }
    });
  }

  /* ── 6. Intersection Observer for card animations ── */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeUpPremium 0.4s cubic-bezier(0.22,1,0.36,1) both';
          io.unobserve(entry.target);
          // Animate numbers inside
          entry.target.querySelectorAll('.stat-v').forEach(function(el) {
            var val = parseFloat(el.textContent);
            if (!isNaN(val) && val > 0) { el.textContent = '0'; animateNumber(el, val, 700); }
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

    function observeCards() {
      document.querySelectorAll('.glass-card, .pres-card, .sess-card, .streak-hero, .chart-card, .pb-card').forEach(function(card) {
        if (!card.dataset.observed) {
          card.dataset.observed = '1';
          io.observe(card);
        }
      });
    }
    setTimeout(observeCards, 400);
    // Re-observe on page change — rimosso setInterval per evitare interferenze con input
  }

  /* ── 7. Progress bar fill animation ── */
  function animateBars() {
    document.querySelectorAll('.nutr-pbar-fill, .nm-bar-fill, .effort-fill, .macro-pill-fill').forEach(function(bar) {
      if (bar.dataset.animated) return;
      bar.dataset.animated = '1';
      var targetW = bar.style.width;
      bar.style.width = '0%';
      setTimeout(function() { bar.style.width = targetW; }, 100);
    });
  }
  setTimeout(animateBars, 500);
  // rimosso setInterval(animateBars) — le barre vengono animate al cambio pagina

  /* ── 8. Smooth scroll to active nav ── */
  document.querySelectorAll('.bni').forEach(function(btn) {
    btn.addEventListener('click', function() {
      // Brief pulse effect on icon
      var ico = btn.querySelector('.bni-ico');
      if (ico) {
        ico.style.transform = 'scale(0.8)';
        setTimeout(function() { ico.style.transform = ''; }, 150);
      }
    });
  });

  /* ── 9. Input focus groups ── */
  document.addEventListener('focusin', function(e) {
    var inp = e.target;
    if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') {
      var wrap = inp.closest('.ob-card, .settings-row, .tdee-field');
      if (wrap) wrap.style.borderColor = 'rgba(200,245,60,0.3)';
    }
  });
  document.addEventListener('focusout', function(e) {
    var inp = e.target;
    if (inp.tagName === 'INPUT' || inp.tagName === 'TEXTAREA') {
      var wrap = inp.closest('.ob-card, .settings-row, .tdee-field');
      if (wrap) wrap.style.borderColor = '';
    }
  });

  /* ── 10. Workout set check animation ── */
  var _origToggleWoSet = window.toggleWoSet;
  if (_origToggleWoSet) {
    window.toggleWoSet = function(ei, si, rs) {
      _origToggleWoSet(ei, si, rs);
      setTimeout(function() {
        var chk = document.querySelector('[onclick*="toggleWoSet(' + ei + ',' + si + ')"] .wo-set-chk, .wo-set-chk.done');
        if (chk && chk.classList.contains('done') && navigator.vibrate) {
          navigator.vibrate([10, 0, 20]);
        }
      }, 50);
    };
  }

  /* ── 11. Bottom nav active indicator glow ── */
  var _origGoPage2 = window.goPage;
  if (_origGoPage2) {
    window.goPage = function(p) {
      _origGoPage2(p);
      // Re-animate stat numbers when switching to progressi
      if (p === 'progressi' || p === 'home') {
        setTimeout(animateStats, 300);
        setTimeout(animateBars, 400);
      }
    };
  }

  /* ── 12. Pull-to-refresh visual ── */
  var _pullStartY = 0;
  var _isPulling = false;
  document.addEventListener('touchstart', function(e) {
    _pullStartY = e.touches[0].clientY;
    _isPulling = false;
  }, { passive: true });
  document.addEventListener('touchmove', function(e) {
    var content = document.querySelector('.app-content');
    if (!content || content.scrollTop > 0) return;
    var delta = e.touches[0].clientY - _pullStartY;
    if (delta > 8 && !_isPulling) {
      _isPulling = true;
      content.style.transition = 'transform 0.1s ease';
      content.style.transform = 'translateY(' + Math.min(delta * 0.25, 20) + 'px)';
    }
  }, { passive: true });
  document.addEventListener('touchend', function() {
    if (_isPulling) {
      var content = document.querySelector('.app-content');
      if (content) {
        content.style.transform = '';
        setTimeout(function() { content.style.transition = ''; }, 300);
      }
      _isPulling = false;
    }
  }, { passive: true });

  
  // Init
  setTimeout(animateStats, 600);
  setTimeout(animateBars, 700);

})();