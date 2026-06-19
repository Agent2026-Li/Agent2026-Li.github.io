/**
 * carousel.js  –  Self-contained carousel component
 *
 * Responsibilities:
 *   - Slide transitions (CSS transform)
 *   - Auto-play with pause-on-hover
 *   - Prev / Next buttons
 *   - Dot indicators
 *   - Touch swipe support
 *
 * Dependencies: NONE (no jQuery, no framework)
 * Usage: new Carousel(containerEl, options)
 *        Carousel.initAll('[data-carousel]', options)
 */

(function (root) {
  'use strict';

  var TRANSITION_MS = 520;   // slide transition speed (should match CSS)

  /**
   * @param {HTMLElement} container - Element with class .carousel
   * @param {Object}      [opts]    - { autoplay, interval }
   */
  function Carousel(container, opts) {
    this.container = container;
    this.opts = Object.assign(
      { autoplay: true, interval: 3400 },
      opts || {}
    );

    this.track      = container.querySelector('.carousel__track');
    this.slides     = Array.from(container.querySelectorAll('.carousel__slide'));
    this.dotsWrap   = container.querySelector('.carousel__dots');
    this.btnPrev    = container.querySelector('.carousel__btn--prev');
    this.btnNext    = container.querySelector('.carousel__btn--next');

    this.total      = this.slides.length;
    this.current    = 0;
    this.isMoving   = false;
    this._timer     = null;
    this._touchX    = 0;

    if (this.total === 0) return;

    this._setTransition(TRANSITION_MS + 'ms');
    this._buildDots();
    this._bindEvents();
    this._activate(0, /* skipTransition */ true);

    if (this.opts.autoplay && this.total > 1) {
      this._startAutoplay();
    }
  }

  /* ---- Internal helpers ---- */

  Carousel.prototype._setTransition = function (value) {
    this.track.style.transition = 'transform ' + value + ' cubic-bezier(0.25,0.46,0.45,0.94)';
  };

  Carousel.prototype._buildDots = function () {
    if (!this.dotsWrap || this.total <= 1) {
      this.dots = [];
      return;
    }
    this.dotsWrap.innerHTML = '';
    this.dots = this.slides.map(function (_, i) {
      var btn = document.createElement('button');
      btn.className = 'carousel__dot';
      btn.setAttribute('aria-label', '幻灯片 ' + (i + 1));
      this.dotsWrap.appendChild(btn);
      return btn;
    }, this);
  };

  Carousel.prototype._activate = function (index, skipTransition) {
    var prev = this.current;

    if (skipTransition) {
      this._setTransition('0ms');
    }

    // Move track
    this.track.style.transform = 'translateX(-' + (100 * index) + '%)';

    // Swap active class
    this.slides[prev].classList.remove('is-active');
    this.slides[index].classList.add('is-active');

    // Update dots
    if (this.dots && this.dots.length) {
      this.dots[prev] && this.dots[prev].classList.remove('is-active');
      this.dots[index] && this.dots[index].classList.add('is-active');
    }

    this.current = index;

    if (skipTransition) {
      // Re-enable transition after a microtask
      var self = this;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          self._setTransition(TRANSITION_MS + 'ms');
        });
      });
    }
  };

  Carousel.prototype._goTo = function (index) {
    if (index === this.current) return;
    this._activate(index);
  };

  Carousel.prototype._prev = function () {
    this._goTo((this.current - 1 + this.total) % this.total);
  };

  Carousel.prototype._next = function () {
    this._goTo((this.current + 1) % this.total);
  };

  /* ---- Auto-play ---- */

  Carousel.prototype._startAutoplay = function () {
    this._stopAutoplay();
    var self = this;
    this._timer = setInterval(function () { self._next(); }, this.opts.interval);
  };

  Carousel.prototype._stopAutoplay = function () {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  };

  /* ---- Event binding ---- */

  Carousel.prototype._bindEvents = function () {
    var self = this;

    // Arrow buttons
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', function () { self._prev(); });
    }
    if (this.btnNext) {
      this.btnNext.addEventListener('click', function () { self._next(); });
    }

    // Dot buttons
    if (this.dots) {
      this.dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () { self._goTo(i); });
      });
    }

    // Touch swipe
    this.container.addEventListener('touchstart', function (e) {
      self._touchX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', function (e) {
      var delta = self._touchX - e.changedTouches[0].clientX;
      if (Math.abs(delta) > 42) {
        delta > 0 ? self._next() : self._prev();
      }
    }, { passive: true });

    // Pause autoplay on hover / resume on leave
    this.container.addEventListener('mouseenter', function () {
      self._stopAutoplay();
    });
    this.container.addEventListener('mouseleave', function () {
      if (self.opts.autoplay && self.total > 1) {
        self._startAutoplay();
      }
    });
  };

  /* ---- Static factory ---- */

  /**
   * Initialize every element matching selector as a Carousel.
   * @param  {string} selector  CSS selector (default: '[data-carousel]')
   * @param  {Object} opts
   * @return {Carousel[]}
   */
  Carousel.initAll = function (selector, opts) {
    selector = selector || '[data-carousel]';
    return Array.from(document.querySelectorAll(selector)).map(function (el) {
      return new Carousel(el, opts);
    });
  };

  // Expose globally
  root.Carousel = Carousel;

}(window));
