/**
 * tilt.js  –  3D tilt effect on portfolio cards (mouse-follow)
 *
 * Applies a subtle perspective tilt to .portfolio-card elements
 * based on mouse position relative to the card center.
 */
(function () {
  'use strict';

  var MAX_TILT = 8;   // max degrees of rotation
  var SCALE_BOOST = 1.02;

  function initCard(card) {
    var bounds = null;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transformStyle = 'preserve-3d';
    }

    function onMouseMove(e) {
      if (!bounds) return;
      var x = e.clientX - bounds.left;
      var y = e.clientY - bounds.top;
      var pctX = (x / bounds.width  - 0.5) * 2;   // -1 to 1
      var pctY = (y / bounds.height - 0.5) * 2;

      var rotY =  pctX * MAX_TILT;
      var rotX = -pctY * MAX_TILT;

      card.style.transform =
        'perspective(800px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale(' + SCALE_BOOST + ')';
    }

    function onMouseLeave() {
      card.style.transition = 'transform 0.5s ease-out';
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      bounds = null;
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove',  onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  }

  function init() {
    var cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(initCard);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
