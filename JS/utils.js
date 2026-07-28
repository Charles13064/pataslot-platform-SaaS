/**
 * PataSlot — utils.js
 * Shared, framework-free interaction helpers for marketing pages.
 * No inline JS anywhere in the HTML — everything is wired up here.
 */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
   * Sticky header state
   * ------------------------------------------------------------------- */
  const header = document.querySelector('[data-site-header]');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
   * Mobile nav drawer
   * ------------------------------------------------------------------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (navToggle && mobileNav) {
    const closeBtn = mobileNav.querySelector('[data-nav-close]');
    const open = () => { mobileNav.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
    const close = () => { mobileNav.classList.remove('is-open'); document.body.style.overflow = ''; };
    navToggle.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }

  /* ---------------------------------------------------------------------
   * Scroll-reveal via IntersectionObserver, with automatic stagger index
   * ------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealTargets.length) {
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------------------------
   * Animated counters — count up when they enter the viewport
   * ------------------------------------------------------------------- */
  const counters = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counters.length) {
    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.counter.includes('.') ? 1 : 0;
      const duration = 1400;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => counterIo.observe(el));
  }

  /* ---------------------------------------------------------------------
   * FAQ accordion
   * ------------------------------------------------------------------- */
  document.querySelectorAll('[data-accordion] .accordion-item').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.closest('[data-accordion]').querySelectorAll('.accordion-item').forEach((sibling) => {
        sibling.classList.remove('is-open');
        sibling.querySelector('.accordion-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('is-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------------------------------------------------------------------
   * Marquee — duplicate track content once so the loop is seamless
   * ------------------------------------------------------------------- */
  document.querySelectorAll('[data-marquee]').forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------------------------------------------------------------------
   * Ripple effect for .btn elements
   * ------------------------------------------------------------------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------------------------------------------------------------
   * Pricing period toggle (Monthly / Annual)
   * ------------------------------------------------------------------- */
  const periodToggle = document.querySelector('[data-period-toggle]');
  if (periodToggle) {
    const priceEls = document.querySelectorAll('[data-monthly][data-annual]');
    periodToggle.addEventListener('change', () => {
      const annual = periodToggle.checked;
      priceEls.forEach((el) => {
        el.textContent = annual ? el.dataset.annual : el.dataset.monthly;
      });
      document.querySelectorAll('[data-period-label]').forEach((el) => {
        el.textContent = annual ? '/mo billed yearly' : '/month';
      });
    });
  }
})();
