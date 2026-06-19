/**
 * typer.js  –  Typing animation for hero role text
 *
 * Types and deletes an array of texts with a blinking cursor.
 * Target: #hero-typed
 */
(function () {
  'use strict';

  var el = document.getElementById('hero-typed');
  if (!el) return;

  // Texts to cycle through – edit to match your roles
  var texts = [
    '一名全栈开发者',
    '一名 AI 应用开发者',
    '一名开源爱好者'
  ];

  var typeSpeed = 100;      // ms per character when typing
  var deleteSpeed = 55;     // ms per character when deleting
  var holdAfterType = 2000; // ms to wait after full text is typed
  var holdAfterDelete = 400; // ms to wait after deleting

  var textIndex = 0;
  var charIndex = 0;
  var deleting = false;
  var timeout = null;

  function type() {
    var current = texts[textIndex];

    if (!deleting) {
      // Typing forward
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing – hold, then start deleting
        deleting = true;
        timeout = setTimeout(type, holdAfterType);
        return;
      }
      timeout = setTimeout(type, typeSpeed);
      return;
    }

    // Deleting
    charIndex--;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      // Finished deleting – move to next text
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
      timeout = setTimeout(type, holdAfterDelete);
      return;
    }
    timeout = setTimeout(type, deleteSpeed);
  }

  // Start after hero reveal animation has played (roughly 0.8s)
  setTimeout(function () {
    type();
  }, 900);
}());
