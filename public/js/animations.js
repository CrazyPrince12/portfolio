/* ═══════════════════════════════════════
   animations.js — GSAP + ScrollTrigger
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.initAnimations = function () {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP non chargé');
      return;
    }

    if (prefersReducedMotion) {
      // Tout afficher sans animations
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // ─── Hero name letter-by-letter ───
    const heroName = document.getElementById('hero-name');
    if (heroName) {
      // Wrap each character in a span
      const splitText = (el) => {
        const html = el.innerHTML;
        // Conserver les <br> et <span class="text-accent italic">
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        const walk = (node) => {
          if (node.nodeType === 3) { // text node
            const text = node.textContent;
            const frag = document.createDocumentFragment();
            for (const ch of text) {
              if (ch === ' ') {
                frag.appendChild(document.createTextNode(' '));
              } else {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = ch;
                frag.appendChild(span);
              }
            }
            node.parentNode.replaceChild(frag, node);
          } else if (node.nodeType === 1 && node.tagName !== 'BR') {
            Array.from(node.childNodes).forEach(walk);
          }
        };

        Array.from(tempDiv.childNodes).forEach(walk);
        el.innerHTML = tempDiv.innerHTML;
      };

      splitText(heroName);

      gsap.to('#hero-name .char', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.3
      });
    }

    // ─── Reveal on scroll ───
    document.querySelectorAll('.reveal').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('is-visible'),
        once: true
      });
    });

    // ─── Timeline line draw effect ───
    document.querySelectorAll('#timeline .border-l').forEach((line) => {
      gsap.from(line, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: line,
          start: 'top 75%',
        }
      });
    });

    // ─── Timeline items stagger ───
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        }
      });
    });

    // ─── Skill cards stagger ───
    document.querySelectorAll('.skill-panel.active .skill-card').forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
        }
      });
    });

    // ─── Sidebar magnetic hover ───
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { x: 6, duration: 0.3, ease: 'power2.out' });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
  };

  // Re-trigger skill animations when tab changes
  window.animateSkillPanel = function (panel) {
    if (prefersReducedMotion || typeof gsap === 'undefined') return;
    const cards = panel.querySelectorAll('.skill-card');
    gsap.from(cards, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      stagger: 0.06,
      ease: 'power2.out'
    });
  };

})();
