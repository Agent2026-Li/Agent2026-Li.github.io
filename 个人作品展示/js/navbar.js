/**
 * navbar.js  –  Navbar scroll behavior & smooth links
 *
 * Responsibilities:
 *   - Add/remove .is-shadow class on scroll
 *   - Smooth-scroll anchor links inside the navbar
 *
 * Dependencies: NONE
 */

(function () {
  'use strict';

  function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    /* ---- Shadow on scroll ---- */
    var THRESHOLD = 12;

    function onScroll() {
      if (window.scrollY > THRESHOLD) {
        navbar.classList.add('is-shadow');
      } else {
        navbar.classList.remove('is-shadow');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // evaluate once immediately

    /* ---- Smooth-scroll anchor links ---- */
    var links = navbar.querySelectorAll('a[href^="#"]');
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href   = link.getAttribute('href');
        var target = href && href.length > 1 && document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Safe boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }

}());
