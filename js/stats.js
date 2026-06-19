/**
 * stats.js  –  Animated counter for .stats__number elements
 *
 * Each .stats__number must have a data-target attribute with the target number.
 * Animation triggers when the element scrolls into view (IntersectionObserver).
 */
(function () {
  'use strict';

  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';

    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var duration = 1800;                 // ms
    var start = 0;
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      // ease-out quad
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);

      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    // Make visible (CSS transition)
    el.classList.add('is-visible');
    requestAnimationFrame(step);
  }

  function init() {
    var nums = document.querySelectorAll('.stats__number');
    if (!nums.length) return;

    // Animate immediately if already visible, otherwise use IntersectionObserver
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      nums.forEach(function (n) { observer.observe(n); });
    } else {
      // Fallback: animate after a short delay
      setTimeout(function () {
        nums.forEach(animateCounter);
      }, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
