/**
 * main.js  –  Application entry point
 *
 * Responsibilities:
 *   - Read window.portfolioData from data.js
 *   - Build and inject portfolio card HTML into #portfolio-grid
 *   - Initialize all Carousel instances (via carousel.js)
 *   - Trigger hero reveal animations
 *
 * Dependencies: window.portfolioData (data.js), window.Carousel (carousel.js)
 */

(function () {
  'use strict';

  /* ============================================================
     1. BUILD CAROUSEL HTML
     Carousel component is fully driven by class names.
     Carousel.js picks up [data-carousel] elements after inject.
     ============================================================ */

  function buildCarouselHTML(images) {
    if (!images || images.length === 0) return '';

    var slidesHTML = images.map(function (src, i) {
      var activeClass = i === 0 ? ' is-active' : '';
      return (
        '<div class="carousel__slide' + activeClass + '">' +
          '<img src="' + escHtml(src) + '" alt="项目截图 ' + (i + 1) + '" loading="lazy">' +
        '</div>'
      );
    }).join('');

    var arrowsHTML = images.length > 1
      ? '<button class="carousel__btn carousel__btn--prev" aria-label="上一张">' +
          '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>' +
        '</button>' +
        '<button class="carousel__btn carousel__btn--next" aria-label="下一张">' +
          '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>' +
        '</button>'
      : '';

    var dotsHTML = images.length > 1
      ? '<div class="carousel__dots" role="tablist" aria-label="幻灯片导航"></div>'
      : '';

    return (
      '<div class="carousel" data-carousel>' +
        arrowsHTML +
        '<div class="carousel__track">' + slidesHTML + '</div>' +
        dotsHTML +
      '</div>'
    );
  }

  /* ============================================================
     2. BUILD CARD HTML
     ============================================================ */

  function buildCardHTML(project) {
    var tagsHTML = (project.tags || []).map(function (t) {
      return '<span class="portfolio-card__tag">' + escHtml(t) + '</span>';
    }).join('');

    var linksHTML = (project.links || []).map(function (lnk) {
      var cls = 'portfolio-card__link' +
        (lnk.primary ? ' portfolio-card__link--primary' : '');
      return (
        '<a href="' + escHtml(lnk.href) + '"' +
          ' class="' + cls + '"' +
          ' target="_blank" rel="noopener noreferrer">' +
          '<i class="' + escHtml(lnk.icon) + '" aria-hidden="true"></i> ' +
          escHtml(lnk.label) +
        '</a>'
      );
    }).join('');

    return (
      '<article class="portfolio-card" role="listitem">' +
        '<div class="portfolio-card__carousel">' +
          buildCarouselHTML(project.images) +
        '</div>' +
        '<div class="portfolio-card__body">' +
          '<div class="portfolio-card__tags">' + tagsHTML + '</div>' +
          '<h3 class="portfolio-card__name">' + escHtml(project.name) + '</h3>' +
          '<p class="portfolio-card__desc">'  + escHtml(project.desc) + '</p>' +
          '<div class="portfolio-card__links">' + linksHTML + '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ============================================================
     3. RENDER PORTFOLIO
     ============================================================ */

  function renderPortfolio() {
    var grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    var data = window.portfolioData;
    if (!data || !data.length) {
      grid.innerHTML =
        '<p style="color:rgba(255,255,255,.35);text-align:center;grid-column:1/-1;padding:60px 0">' +
        '暂无项目数据，请编辑 js/data.js</p>';
      return;
    }

    grid.innerHTML = data.map(buildCardHTML).join('');

    // Hand off carousel containers to the Carousel module
    Carousel.initAll('[data-carousel]', { autoplay: true, interval: 3500 });
  }

  /* ============================================================
     4. HERO REVEAL ANIMATION
     Adds .is-visible to every [data-reveal] element.
     CSS transitions handle the actual animation.
     ============================================================ */

  function revealHero() {
    var targets = Array.from(document.querySelectorAll('[data-reveal]'));
    // Slight delay lets the first paint complete so transitions fire
    setTimeout(function () {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }, 80);
  }

  /* ============================================================
     5. UTILITY – minimal HTML escaping for dynamic content
     ============================================================ */

  function escHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ============================================================
     6. SKILL BAR ANIMATION
     Animate .skill-bar__fill when scrolled into view.
     ============================================================ */

  function animateSkillBars() {
    var fills = document.querySelectorAll('.skill-bar__fill');
    if (!fills.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var pct = el.getAttribute('data-pct') || '0';
          el.style.width = pct + '%';
          el.classList.add('is-animated');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    fills.forEach(function (f) { observer.observe(f); });
  }

  /* ============================================================
     7. INIT TILT on dynamically created cards
     Re-initialise tilt after portfolio cards are rendered.
     ============================================================ */

  function initTiltOnCards() {
    var cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(function (card) {
      var bounds = null;

      card.addEventListener('mouseenter', function () {
        bounds = card.getBoundingClientRect();
        card.style.transition = 'transform 0.1s ease-out';
        card.style.transformStyle = 'preserve-3d';
      });

      card.addEventListener('mousemove', function (e) {
        if (!bounds) return;
        var x = (e.clientX - bounds.left) / bounds.width  - 0.5;
        var y = (e.clientY - bounds.top)  / bounds.height - 0.5;
        var rotY =  x * 8;
        var rotX = -y * 8;
        card.style.transform =
          'perspective(800px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale(1.02)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.5s ease-out';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
        bounds = null;
      });
    });
  }

  /* ============================================================
     8. BOOT
     ============================================================ */

  function init() {
    renderPortfolio();
    animateSkillBars();
    initTiltOnCards();
    revealHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
