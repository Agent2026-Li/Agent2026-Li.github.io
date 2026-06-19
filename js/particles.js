/**
 * particles.js  –  Canvas particle network background for hero section
 *
 * Draws floating particles that connect with lines when close to each other.
 * Uses requestAnimationFrame for smooth 60fps animation.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('hero-particles');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var PARTICLE_COUNT = 55;
  var CONNECT_DIST = 140;       // max distance to draw connecting line
  var dpr = window.devicePixelRatio || 1;

  function resize() {
    var hero = canvas.parentElement;
    var w = hero.offsetWidth;
    var h = hero.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: w, h: h };
  }

  function Particle(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.r = Math.random() * 2 + 1;           // radius 1-3
  }

  Particle.prototype.update = function (w, h) {
    this.x += this.vx;
    this.y += this.vy;
    // wrap around
    if (this.x < -10) this.x = w + 10;
    if (this.x > w + 10) this.x = -10;
    if (this.y < -10) this.y = h + 10;
    if (this.y > h + 10) this.y = -10;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(17, 17, 17, 0.25)';
    ctx.fill();
  };

  function initParticles(w, h) {
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(w, h));
    }
  }

  function drawLines() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          var alpha = 1 - dist / CONNECT_DIST;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(17, 17, 17,' + (alpha * 0.12) + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    var w = canvas.width / dpr;
    var h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);

    drawLines();

    for (var i = 0; i < particles.length; i++) {
      particles[i].update(w, h);
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  function boot() {
    var size = resize();
    initParticles(size.w, size.h);
    animate();
  }

  // Resize handler with debounce
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var size = resize();
      // Re-scatter particles on resize for consistency
      initParticles(size.w, size.h);
    }, 200);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}());
