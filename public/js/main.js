/* ═══════════════════════════════════════
   main.js — Init, loader, nav, sound, tabs
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── LOADING SCREEN ───
  function runLoader() {
    const loader = document.getElementById('loader');
    const counter = document.getElementById('loader-counter');
    const nameSpans = document.querySelectorAll('#loader-name span');

    if (!loader) return Promise.resolve();

    if (prefersReducedMotion) {
      loader.style.display = 'none';
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      let progress = 0;
      const duration = 1800;
      const start = performance.now();

      // Reveal letters progressively
      nameSpans.forEach((span, i) => {
        setTimeout(() => {
          span.style.transition = 'opacity 0.4s ease';
          span.style.opacity = '1';
        }, 100 + i * 60);
      });

      const tick = (now) => {
        const elapsed = now - start;
        progress = Math.min(100, Math.floor((elapsed / duration) * 100));
        counter.textContent = String(progress).padStart(2, '0') + '%';

        if (progress < 100) {
          requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            loader.style.transition = 'opacity 0.6s ease';
            loader.style.opacity = '0';
            setTimeout(() => {
              loader.style.display = 'none';
              resolve();
            }, 600);
          }, 200);
        }
      };

      requestAnimationFrame(tick);
    });
  }

  // ─── MOBILE MENU ───
  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    const toggleMenu = (force) => {
      const isOpen = force !== undefined ? force : !menu.classList.contains('is-open');
      if (isOpen) {
        menu.classList.add('is-open');
        menu.classList.remove('hidden');
        btn.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        menu.classList.remove('is-open');
        menu.classList.add('hidden');
        btn.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    };

    btn.addEventListener('click', () => toggleMenu());

    // Close on nav click
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') toggleMenu(false);
    });
  }

  // ─── SKILL TABS ───
  function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const panels = document.querySelectorAll('.skill-panel');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');

        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        panels.forEach((p) => {
          if (p.getAttribute('data-panel') === target) {
            p.classList.remove('hidden');
            p.classList.add('active');
            if (window.animateSkillPanel) window.animateSkillPanel(p);
          } else {
            p.classList.add('hidden');
            p.classList.remove('active');
          }
        });

        playClick();
      });
    });
  }

  // ─── CLICK SOUND ───
  let clickAudio = null;
  let audioFailed = false;
  function playClick() {
    if (prefersReducedMotion || audioFailed) return;
    try {
      if (!clickAudio) {
        clickAudio = document.getElementById('click-sound');
      }
      if (clickAudio) {
        clickAudio.currentTime = 0;
        clickAudio.volume = 0.25;
        const p = clickAudio.play();
        if (p && p.catch) p.catch(() => { audioFailed = true; });
      }
    } catch (_) {
      audioFailed = true;
    }
  }

  function initClickSounds() {
    document.querySelectorAll('button, .nav-link, .mobile-nav-link, .bottom-nav').forEach((el) => {
      el.addEventListener('click', playClick, { passive: true });
    });
  }

  // ─── ACTIVE NAV LINK ON SCROLL ───
  function initScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .bottom-nav');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((s) => observer.observe(s));
  }

  // ─── DUPLICATE MARQUEE FOR SEAMLESS LOOP ───
  function initMarquee() {
    const marquee = document.querySelector('.marquee');
    if (!marquee) return;
    marquee.innerHTML += marquee.innerHTML;
  }

  // ─── INIT ───
  document.addEventListener('DOMContentLoaded', async () => {
    initMarquee();
    initMobileMenu();
    initSkillTabs();
    initClickSounds();
    initScrollSpy();

    await runLoader();

    if (window.initAnimations) window.initAnimations();
  });

})();
