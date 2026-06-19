/**
 * Phase 1 animations for the AESI rebuild.
 * Loaded once via <script> in Base.astro. Astro bundles & dedupes.
 *
 * Modules:
 *   - InView: IntersectionObserver, fade-in elements on scroll
 *   - Counter: animate number from 0 to target on view
 *   - Carousel: hero slide auto-advance with dots + arrows
 *   - Parallax: background translates at scroll rate
 *   - Progress: top scroll-progress bar
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== InView ===== */
const inViewEls = document.querySelectorAll<HTMLElement>('[data-in-view]');
if (inViewEls.length && 'IntersectionObserver' in window) {
  const inView = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          inView.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  inViewEls.forEach((el) => inView.observe(el));
} else {
  inViewEls.forEach((el) => el.classList.add('in-view'));
}

/* ===== Counter (count-up) ===== */
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
if (counters.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || '0', 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1600;
          const start = performance.now();
          const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(target * ease(p)).toLocaleString('id-ID') + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target.toLocaleString('id-ID') + suffix;
          };
          requestAnimationFrame(tick);
          counterObs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObs.observe(el));
}

/* ===== Hero Carousel ===== */
const carousel = document.querySelector<HTMLElement>('[data-carousel]');
if (carousel) {
  const slides = carousel.querySelectorAll<HTMLElement>('[data-slide]');
  const dots = carousel.querySelectorAll<HTMLElement>('[data-dot]');
  const prevBtn = carousel.querySelector<HTMLElement>('[data-prev]');
  const nextBtn = carousel.querySelector<HTMLElement>('[data-next]');
  let i = 0;
  let timer: number | null = null;
  const total = slides.length;
  if (total > 1) {
    const go = (n: number) => {
      i = (n + total) % total;
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    };
    const start = () => {
      if (timer != null) return;
      timer = window.setInterval(() => go(i + 1), 5500);
    };
    const stop = () => {
      if (timer != null) {
        clearInterval(timer);
        timer = null;
      }
    };
    start();
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    dots.forEach((d, idx) =>
      d.addEventListener('click', () => {
        go(idx);
        stop();
        start();
      })
    );
    prevBtn?.addEventListener('click', () => {
      go(i - 1);
      stop();
      start();
    });
    nextBtn?.addEventListener('click', () => {
      go(i + 1);
      stop();
      start();
    });

    // Keyboard nav
    carousel.tabIndex = 0;
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        go(i - 1);
        stop();
        start();
      } else if (e.key === 'ArrowRight') {
        go(i + 1);
        stop();
        start();
      }
    });
  }
}

/* ===== Parallax (backgrounds that move at scroll rate) ===== */
const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
if (parallaxEls.length && !prefersReducedMotion) {
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.3');
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

/* ===== Scroll progress bar ===== */
const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
if (progress) {
  let ticking = false;
  const update = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();
}
