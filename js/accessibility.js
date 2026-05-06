/**
 * Accessibility Widget for Avator Pro
 * Compliant with Israeli Standard 5568 / WCAG 2.1 AA
 * Floating button on the RIGHT side with accessibility panel
 */
(function () {
  'use strict';

  // ===== Default State =====
  var defaultState = {
    fontSize: 0,
    contrast: false,
    grayscale: false,
    links: false,
    cursor: false,
    animations: false,
    lineHeight: false,
    readableFont: false,
    readingGuide: false
  };

  var state = {};
  // Deep copy defaults
  for (var k in defaultState) state[k] = defaultState[k];

  // Load saved state
  try {
    var saved = JSON.parse(localStorage.getItem('a11yState'));
    if (saved) {
      for (var key in defaultState) {
        if (saved.hasOwnProperty(key)) state[key] = saved[key];
      }
    }
  } catch (e) { }

  // ===== Build Widget =====
  var widget = document.createElement('div');
  widget.id = 'a11y-widget';
  widget.setAttribute('role', 'complementary');
  widget.setAttribute('aria-label', 'תפריט נגישות');

  widget.innerHTML =
    '<button id="a11y-toggle" aria-label="פתח תפריט נגישות" title="נגישות" aria-expanded="false">' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" fill="currentColor">' +
        '<path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm9 7h-6l-1.41 7.41L16 22h-2l-2-5-2 5H8l2.41-5.59L9 9H3V7h18v2z"/>' +
      '</svg>' +
    '</button>' +
    '<div id="a11y-panel" class="a11y-panel" role="dialog" aria-label="הגדרות נגישות">' +
      '<div class="a11y-panel__header">' +
        '<span class="a11y-panel__title">הגדרות נגישות</span>' +
        '<button id="a11y-close" class="a11y-panel__close" aria-label="סגור">&times;</button>' +
      '</div>' +
      '<div class="a11y-panel__body">' +
        '<button class="a11y-btn" data-action="font-up">' +
          '<span class="a11y-btn__icon">A+</span>' +
          '<span class="a11y-btn__label">הגדל טקסט</span>' +
          '<span class="a11y-btn__value" id="a11y-font-val"></span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="font-down">' +
          '<span class="a11y-btn__icon">A-</span>' +
          '<span class="a11y-btn__label">הקטן טקסט</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="contrast">' +
          '<span class="a11y-btn__icon">◐</span>' +
          '<span class="a11y-btn__label">ניגודיות גבוהה</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="grayscale">' +
          '<span class="a11y-btn__icon">◉</span>' +
          '<span class="a11y-btn__label">גווני אפור</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="links">' +
          '<span class="a11y-btn__icon">🔗</span>' +
          '<span class="a11y-btn__label">הדגש קישורים</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="readableFont">' +
          '<span class="a11y-btn__icon">Aa</span>' +
          '<span class="a11y-btn__label">גופן קריא</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="lineHeight">' +
          '<span class="a11y-btn__icon">≡</span>' +
          '<span class="a11y-btn__label">מרווח שורות</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="cursor">' +
          '<span class="a11y-btn__icon">⊕</span>' +
          '<span class="a11y-btn__label">סמן גדול</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="readingGuide">' +
          '<span class="a11y-btn__icon">—</span>' +
          '<span class="a11y-btn__label">סרגל קריאה</span>' +
        '</button>' +
        '<button class="a11y-btn" data-action="animations">' +
          '<span class="a11y-btn__icon">▣</span>' +
          '<span class="a11y-btn__label">עצור אנימציות</span>' +
        '</button>' +
        '<div class="a11y-panel__divider"></div>' +
        '<button class="a11y-btn a11y-btn--reset" data-action="reset">' +
          '<span class="a11y-btn__icon">↺</span>' +
          '<span class="a11y-btn__label">איפוס הגדרות</span>' +
        '</button>' +
        '<a href="./support.html" class="a11y-btn a11y-btn--link">' +
          '<span class="a11y-btn__icon">📋</span>' +
          '<span class="a11y-btn__label">הצהרת נגישות</span>' +
        '</a>' +
      '</div>' +
    '</div>';

  // ===== Reading Guide Element =====
  var readingGuide = document.createElement('div');
  readingGuide.id = 'a11y-reading-guide';

  // ===== Styles =====
  var css = document.createElement('style');
  css.id = 'a11y-styles';
  css.textContent =
    /* Widget container - RIGHT side, above WhatsApp */
    '#a11y-widget{position:fixed;z-index:999999;right:20px;bottom:20px;' +
    'font-family:"Noto Sans Hebrew",Discovery_Fs,Arial,sans-serif;direction:rtl}' +

    /* Toggle button */
    '#a11y-toggle{width:52px;height:52px;border-radius:50%;border:none;' +
    'background:linear-gradient(135deg,#2563eb,#1e40af);color:#fff;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;' +
    'box-shadow:0 4px 20px rgba(37,99,235,.4);' +
    'transition:transform .2s ease,box-shadow .2s ease}' +
    '#a11y-toggle:hover{transform:scale(1.08);box-shadow:0 6px 25px rgba(37,99,235,.55)}' +
    '#a11y-toggle:focus-visible{outline:3px solid #FFC510;outline-offset:3px}' +

    /* Panel */
    '#a11y-panel{display:none;position:absolute;bottom:62px;right:0;width:280px;' +
    'background:#1a1f2e;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.5);' +
    'overflow:hidden;max-height:80vh;overflow-y:auto}' +
    '#a11y-panel.open{display:block;animation:a11yUp .3s ease}' +
    '@keyframes a11yUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}' +

    /* Scrollbar */
    '#a11y-panel::-webkit-scrollbar{width:5px}' +
    '#a11y-panel::-webkit-scrollbar-track{background:transparent}' +
    '#a11y-panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:10px}' +

    /* Header */
    '.a11y-panel__header{display:flex;align-items:center;justify-content:space-between;' +
    'padding:16px 20px 12px;border-bottom:1px solid rgba(255,255,255,.08);' +
    'background:rgba(255,255,255,.03)}' +
    '.a11y-panel__title{color:#FFC510;font-size:17px;font-weight:700}' +
    '.a11y-panel__close{background:none;border:none;color:rgba(255,255,255,.4);' +
    'font-size:26px;cursor:pointer;padding:0;line-height:1;transition:color .2s}' +
    '.a11y-panel__close:hover{color:#fff}' +

    /* Body */
    '.a11y-panel__body{padding:12px 14px 16px;display:flex;flex-direction:column;gap:6px}' +
    '.a11y-panel__divider{height:1px;background:rgba(255,255,255,.08);margin:6px 0}' +

    /* Buttons */
    '.a11y-btn{display:flex;align-items:center;gap:10px;width:100%;' +
    'padding:11px 14px;border:1px solid rgba(255,255,255,.08);border-radius:10px;' +
    'background:rgba(255,255,255,.04);color:#e0e0e0;font-size:14px;' +
    'font-family:inherit;cursor:pointer;transition:all .2s ease;text-decoration:none;box-sizing:border-box}' +
    '.a11y-btn:hover{background:rgba(255,255,255,.09);border-color:rgba(255,197,16,.25)}' +
    '.a11y-btn.active{background:rgba(255,197,16,.12);border-color:rgba(255,197,16,.5);color:#FFC510}' +
    '.a11y-btn__icon{font-size:17px;width:26px;text-align:center;flex-shrink:0;line-height:1}' +
    '.a11y-btn__label{flex:1;text-align:right;white-space:nowrap}' +
    '.a11y-btn__value{font-size:12px;color:#FFC510;margin-right:auto;margin-left:4px;min-width:20px;text-align:center}' +
    '.a11y-btn--reset{border-color:rgba(255,80,80,.15);color:rgba(255,255,255,.5)}' +
    '.a11y-btn--reset:hover{background:rgba(255,80,80,.1);border-color:rgba(255,80,80,.3);color:#ff8080}' +
    '.a11y-btn--link{color:rgba(255,255,255,.5)}' +
    '.a11y-btn--link:hover{color:#FFC510;text-decoration:none}' +

    /* ======= Accessibility Effect Classes ======= */

    /* High Contrast - uses filter inversion (professional approach) */
    'html.a11y-contrast{filter:invert(1) hue-rotate(180deg)!important;-webkit-filter:invert(1) hue-rotate(180deg)!important}' +
    'html.a11y-contrast img,html.a11y-contrast video,html.a11y-contrast picture,html.a11y-contrast [style*="background-image"]{filter:invert(1) hue-rotate(180deg)!important}' +
    'html.a11y-contrast #a11y-widget{filter:invert(1) hue-rotate(180deg)!important}' +

    /* Grayscale */
    'html.a11y-grayscale{filter:grayscale(1)!important;-webkit-filter:grayscale(1)!important}' +
    'html.a11y-grayscale #a11y-widget{filter:none!important}' +

    /* Highlight Links */
    'html.a11y-links body a:not(#a11y-widget a){' +
    'outline:2px solid #FFC510!important;outline-offset:2px!important;' +
    'text-decoration:underline!important;text-decoration-color:#FFC510!important}' +

    /* Readable Font */
    'html.a11y-readable-font body *:not(#a11y-widget):not(#a11y-widget *){' +
    'font-family:Arial,Helvetica,"Noto Sans Hebrew",sans-serif!important;' +
    'letter-spacing:0.5px!important;word-spacing:2px!important}' +

    /* Line Height */
    'html.a11y-line-height body *:not(#a11y-widget):not(#a11y-widget *){' +
    'line-height:2!important}' +

    /* Big Cursor */
    'html.a11y-cursor body,html.a11y-cursor body *:not(#a11y-widget):not(#a11y-widget *){' +
    'cursor:url("data:image/svg+xml,' +
    '%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2732%27 height=%2732%27%3E' +
    '%3Ccircle cx=%2716%27 cy=%2716%27 r=%2712%27 fill=%27none%27 stroke=%27%23FFC510%27 stroke-width=%273%27/%3E' +
    '%3Ccircle cx=%2716%27 cy=%2716%27 r=%273%27 fill=%27%23FFC510%27/%3E' +
    '%3C/svg%3E") 16 16, auto!important}' +

    /* Stop Animations */
    'html.a11y-no-anim body *:not(#a11y-widget):not(#a11y-widget *){' +
    'animation:none!important;transition:none!important;scroll-behavior:auto!important}' +
    'html.a11y-no-anim video{animation-play-state:paused!important}' +

    /* Reading Guide */
    '#a11y-reading-guide{display:none;position:fixed;left:0;right:0;height:12px;' +
    'pointer-events:none;z-index:999998;' +
    'box-shadow:0 0 0 9999px rgba(0,0,0,.35);' +
    'border-top:2px solid #FFC510;border-bottom:2px solid #FFC510;' +
    'transition:top 0.05s linear}' +
    'html.a11y-reading-guide #a11y-reading-guide{display:block}' +

    /* Font Size Scale - handled via JS */

    /* Mobile */
    '@media(max-width:600px){' +
    '#a11y-widget{right:12px;bottom:15px}' +
    '#a11y-toggle{width:46px;height:46px}' +
    '#a11y-panel{width:260px;right:0;max-height:70vh}' +
    '}';

  // ===== Init =====
  document.addEventListener('DOMContentLoaded', function () {
    document.head.appendChild(css);
    document.body.appendChild(widget);
    document.body.appendChild(readingGuide);

    var toggle = document.getElementById('a11y-toggle');
    var panel = document.getElementById('a11y-panel');
    var closeBtn = document.getElementById('a11y-close');

    // Toggle panel
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = panel.classList.contains('open');
      panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        // Focus the first button in the panel for keyboard users
        setTimeout(function () {
          var firstBtn = panel.querySelector('.a11y-btn');
          if (firstBtn) firstBtn.focus();
        }, 100);
      }
    });

    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!widget.contains(e.target)) {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Reading guide follows mouse
    document.addEventListener('mousemove', function (e) {
      if (state.readingGuide) {
        readingGuide.style.top = (e.clientY - 6) + 'px';
      }
    });

    // Button actions
    var buttons = widget.querySelectorAll('.a11y-btn[data-action]');
    for (var i = 0; i < buttons.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          handleAction(btn.getAttribute('data-action'));
        });
      })(buttons[i]);
    }

    // Apply saved state on load
    applyState();
    updateUI();
  });

  // ===== Handle Action =====
  function handleAction(action) {
    switch (action) {
      case 'font-up':
        if (state.fontSize < 4) state.fontSize++;
        break;
      case 'font-down':
        if (state.fontSize > -2) state.fontSize--;
        break;
      case 'contrast':
        state.contrast = !state.contrast;
        if (state.contrast) state.grayscale = false; // mutually exclusive
        break;
      case 'grayscale':
        state.grayscale = !state.grayscale;
        if (state.grayscale) state.contrast = false; // mutually exclusive
        break;
      case 'links':
        state.links = !state.links;
        break;
      case 'readableFont':
        state.readableFont = !state.readableFont;
        break;
      case 'lineHeight':
        state.lineHeight = !state.lineHeight;
        break;
      case 'cursor':
        state.cursor = !state.cursor;
        break;
      case 'readingGuide':
        state.readingGuide = !state.readingGuide;
        break;
      case 'animations':
        state.animations = !state.animations;
        break;
      case 'reset':
        for (var rk in defaultState) state[rk] = defaultState[rk];
        break;
    }
    applyState();
    updateUI();
    saveState();
  }

  // ===== Apply State to DOM =====
  function applyState() {
    var html = document.documentElement;

    // Font size via JS scaling
    applyFontScale();

    // Toggle classes on html (effects target body children, excluding widget)
    html.classList.toggle('a11y-contrast', state.contrast);
    html.classList.toggle('a11y-grayscale', state.grayscale);
    html.classList.toggle('a11y-links', state.links);
    html.classList.toggle('a11y-readable-font', state.readableFont);
    html.classList.toggle('a11y-line-height', state.lineHeight);
    html.classList.toggle('a11y-cursor', state.cursor);
    html.classList.toggle('a11y-reading-guide', state.readingGuide);
    html.classList.toggle('a11y-no-anim', state.animations);
  }

  // Font scaling - applies percentage adjustment to all text elements
  function applyFontScale() {
    var scale = 1 + (state.fontSize * 0.15); // each step = 15%
    var elements = document.body.querySelectorAll('*:not(#a11y-widget):not(#a11y-widget *)');

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      // Skip non-text elements
      var tag = el.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'BR' || tag === 'HR' || 
          tag === 'IMG' || tag === 'VIDEO' || tag === 'SOURCE' || tag === 'SVG' || tag === 'PATH') continue;

      if (state.fontSize === 0) {
        // Reset to original
        el.style.removeProperty('font-size');
      } else {
        // Get the computed size and apply scale
        if (!el.getAttribute('data-a11y-ofs')) {
          var computed = window.getComputedStyle(el).fontSize;
          el.setAttribute('data-a11y-ofs', computed);
        }
        var original = parseFloat(el.getAttribute('data-a11y-ofs'));
        if (original && !isNaN(original)) {
          el.style.fontSize = Math.round(original * scale) + 'px';
        }
      }
    }
  }

  // ===== Update Button Active States =====
  function updateUI() {
    var btns = document.querySelectorAll('#a11y-widget .a11y-btn[data-action]');
    for (var i = 0; i < btns.length; i++) {
      var action = btns[i].getAttribute('data-action');
      var isActive = false;
      switch (action) {
        case 'contrast': isActive = state.contrast; break;
        case 'grayscale': isActive = state.grayscale; break;
        case 'links': isActive = state.links; break;
        case 'readableFont': isActive = state.readableFont; break;
        case 'lineHeight': isActive = state.lineHeight; break;
        case 'cursor': isActive = state.cursor; break;
        case 'readingGuide': isActive = state.readingGuide; break;
        case 'animations': isActive = state.animations; break;
        case 'font-up': isActive = state.fontSize > 0; break;
        case 'font-down': isActive = state.fontSize < 0; break;
      }
      btns[i].classList.toggle('active', isActive);
    }

    // Show font size indicator
    var fontVal = document.getElementById('a11y-font-val');
    if (fontVal) {
      fontVal.textContent = state.fontSize !== 0 ? (state.fontSize > 0 ? '+' : '') + state.fontSize : '';
    }
  }

  // ===== Save State =====
  function saveState() {
    try {
      localStorage.setItem('a11yState', JSON.stringify(state));
    } catch (e) { }
  }

})();
