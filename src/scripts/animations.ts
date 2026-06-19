/**
 * Phase 1+2 animations and interactive components for the AESI rebuild.
 * Loaded once via <script> in Base.astro. Astro bundles and dedupes.
 */

// ----- InView (IntersectionObserver) -----
const inView = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      inView.unobserve(e.target);
    }
  }
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-in-view]').forEach((el) => inView.observe(el));

// ----- Count-up (for stats) -----
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const counterObs = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      const el = e.target as HTMLElement;
      const target = parseInt(el.dataset.count || '0', 10);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(target * ease(p)).toLocaleString('id-ID') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    }
  }
}, { threshold: 0.5 });
counters.forEach((el) => counterObs.observe(el));

// ----- Hero carousel (home page) -----
const carousel = document.querySelector<HTMLElement>('[data-carousel]');
if (carousel) {
  const slides = carousel.querySelectorAll<HTMLElement>('[data-slide]');
  const dots = carousel.querySelectorAll<HTMLElement>('[data-dot]');
  const prev = carousel.querySelector<HTMLElement>('[data-prev]');
  const next = carousel.querySelector<HTMLElement>('[data-next]');
  let i = 0;
  let timer: number | undefined;
  const total = slides.length;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (n: number) => {
    i = (n + total) % total;
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  };
  const start = () => { if (!reduce) timer = window.setInterval(() => go(i + 1), 5500); };
  const stop = () => { if (timer) clearInterval(timer); };

  start();
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  dots.forEach((d, idx) => d.addEventListener('click', () => { go(idx); stop(); start(); }));
  prev?.addEventListener('click', () => { go(i - 1); stop(); start(); });
  next?.addEventListener('click', () => { go(i + 1); stop(); start(); });

  // Keyboard nav when carousel in view
  document.addEventListener('keydown', (e) => {
    if (!carousel.matches(':hover')) return;
    if (e.key === 'ArrowLeft') { go(i - 1); stop(); start(); }
    if (e.key === 'ArrowRight') { go(i + 1); stop(); start(); }
  });
}

// ----- Parallax (hero + CTA blobs) -----
const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
if (parallaxEls.length) {
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.3');
      el.style.transform = `translate3d(0, ${(y * speed).toFixed(2)}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

// ----- Scroll progress bar (top of page) -----
const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
if (progress) {
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ----- Sticky header (transparent -> solid on scroll) -----
const header = document.getElementById('main-header');
if (header) {
  const onScrollHeader = () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();
}

// ----- Search modal -----
const searchModal = document.querySelector<HTMLElement>('[data-search-modal]');
if (searchModal) {
  const open = () => {
    searchModal.classList.remove('hidden');
    searchModal.setAttribute('aria-hidden', 'false');
    const backdrop = searchModal.querySelector<HTMLElement>('[data-search-backdrop]');
    const panel = searchModal.querySelector<HTMLElement>('[data-search-panel]');
    backdrop?.classList.replace('opacity-0', 'opacity-100');
    panel?.classList.replace('opacity-0', '-translate-y-4', 'opacity-100', 'translate-y-0');
    setTimeout(() => (searchModal.querySelector<HTMLInputElement>('[data-search-input]'))?.focus(), 100);
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    searchModal.classList.add('hidden');
    searchModal.setAttribute('aria-hidden', 'true');
    const backdrop = searchModal.querySelector<HTMLElement>('[data-search-backdrop]');
    const panel = searchModal.querySelector<HTMLElement>('[data-search-panel]');
    backdrop?.classList.replace('opacity-100', 'opacity-0');
    panel?.classList.replace('opacity-100', 'translate-y-0', 'opacity-0', '-translate-y-4');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('[data-search-trigger]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); open(); }));
  document.querySelectorAll('[data-search-close], [data-search-backdrop]').forEach((b) => b.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) close(); });

  // Search index + filter
  let searchIndex: Array<{ title: string; url: string; type: string; excerpt?: string }> = [];
  let searchLoaded = false;
  let activeIdx = 0;
  let matches: typeof searchIndex = [];

  const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const typeIcons: Record<string, string> = {
    halaman: 'i-carbon-link',
    artikel: 'i-carbon-document',
    regulasi: 'i-carbon-document-blank',
    program: 'i-carbon-tree-view',
  };

  const resultsEl = document.getElementById('search-results');
  const inputEl = searchModal.querySelector<HTMLInputElement>('[data-search-input]');

  async function loadIndex() {
    if (searchLoaded) return;
    try {
      const res = await fetch('/search-index.json');
      searchIndex = await res.json();
      searchLoaded = true;
    } catch (e) {
      console.error('Search index load failed', e);
    }
  }

  function render(query: string) {
    if (!resultsEl) return;
    if (!query.trim()) {
      resultsEl.innerHTML = '<p class="search-hint">Ketik untuk mencari...</p>';
      matches = [];
      return;
    }
    const q = query.toLowerCase();
    matches = searchIndex
      .filter((i) => i.title.toLowerCase().includes(q) || (i.excerpt && i.excerpt.toLowerCase().includes(q)))
      .slice(0, 10);
    activeIdx = 0;
    if (matches.length === 0) {
      resultsEl.innerHTML = `<p class="search-hint">Tidak ada hasil untuk &quot;${escapeHtml(query)}&quot;</p>`;
      return;
    }
    const re = new RegExp(`(${escapeRegex(query)})`, 'gi');
    resultsEl.innerHTML = matches
      .map(
        (m, i) => `
        <a href="${m.url}" class="search-result ${i === 0 ? 'active' : ''}" data-result-idx="${i}">
          <div class="search-result-icon"><span class="${typeIcons[m.type] || 'i-carbon-link'}"></span></div>
          <div class="search-result-content">
            <p class="search-result-title">${escapeHtml(m.title).replace(re, '<mark>$1</mark>')}</p>
            <span class="search-result-type">${m.type}</span>
            ${m.excerpt ? `<p class="search-result-excerpt">${escapeHtml(m.excerpt).replace(re, '<mark>$1</mark>')}</p>` : ''}
          </div>
        </a>`
      )
      .join('');
  }

  inputEl?.addEventListener('input', (e) => render((e.target as HTMLInputElement).value));
  document.addEventListener('keydown', (e) => {
    if (searchModal.classList.contains('hidden') || matches.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(matches.length - 1, activeIdx + 1);
      updateActive();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(0, activeIdx - 1);
      updateActive();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (matches[activeIdx]) window.location.href = matches[activeIdx].url;
    }
  });
  function updateActive() {
    if (!resultsEl) return;
    resultsEl.querySelectorAll<HTMLElement>('.search-result').forEach((el, i) => {
      el.classList.toggle('active', i === activeIdx);
      if (i === activeIdx) el.scrollIntoView({ block: 'nearest' });
    });
  }

  // Cmd/Ctrl+K to open
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      open();
      loadIndex();
    }
  });
}

// ----- Language switcher trigger -----
document.querySelectorAll<HTMLElement>('[data-lang-trigger]').forEach((trigger) => {
  const wrap = trigger.closest('[data-lang-switcher]');
  const menu = wrap?.querySelector<HTMLElement>('[data-lang-menu]');
  if (!menu) return;
  const toggle = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = menu.classList.contains('open');
    document.querySelectorAll('.lang-menu.open').forEach((m) => m.classList.remove('open'));
    if (!isOpen) menu.classList.add('open');
    trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };
  trigger.addEventListener('click', toggle);
  document.addEventListener('click', (e) => {
    if (!wrap?.contains(e.target as Node)) {
      menu.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
});

// ----- Language switcher (visual placeholder) -----
document.querySelectorAll('[data-lang]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const lang = (el as HTMLElement).dataset.lang;
    document.querySelectorAll('[data-lang-option]').forEach((opt) => {
      const o = opt as HTMLElement;
      o.classList.toggle('font-bold', o.dataset.langOption === lang);
    });
    // Placeholder: would swap translatable content here
    console.info('[AESI] Language preference set to', lang);
  });
});

// ----- Cookie consent -----
const cookieBanner = document.querySelector<HTMLElement>('[data-cookie-consent]');
if (cookieBanner) {
  const choice = localStorage.getItem('aesi-cookie-consent');
  const inner = cookieBanner.querySelector<HTMLElement>(':scope > div > div');
  if (choice) {
    cookieBanner.remove();
  } else if (inner) {
    setTimeout(() => {
      inner.classList.remove('translate-y-full', 'opacity-0');
      inner.classList.add('translate-y-0', 'opacity-100');
    }, 600);
    cookieBanner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
      localStorage.setItem('aesi-cookie-consent', 'accepted');
      inner.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => cookieBanner.remove(), 500);
    });
    cookieBanner.querySelector('[data-cookie-reject]')?.addEventListener('click', () => {
      localStorage.setItem('aesi-cookie-consent', 'rejected');
      inner.classList.add('translate-y-full', 'opacity-0');
      setTimeout(() => cookieBanner.remove(), 500);
    });
  }
}

// ----- Back to top -----
const backToTop = document.querySelector<HTMLElement>('[data-back-to-top]');
if (backToTop) {
  const onScrollBtt = () => {
    backToTop.classList.toggle('opacity-0', window.scrollY < 400);
    backToTop.classList.toggle('pointer-events-none', window.scrollY < 400);
    backToTop.classList.toggle('opacity-100', window.scrollY >= 400);
  };
  window.addEventListener('scroll', onScrollBtt, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScrollBtt();
}

// ----- WhatsApp widget (scroll-revealed) -----
document.querySelectorAll<HTMLElement>('[data-wa-widget]').forEach((el) => {
  const showAt = Number(el.dataset.showAt || 400);
  const onScroll = () => {
    const show = window.scrollY > showAt;
    el.classList.toggle('opacity-0', !show);
    el.classList.toggle('pointer-events-none', !show);
    el.classList.toggle('opacity-100', show);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

// ----- Tabs -----
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((tabsRoot) => {
  const buttons = tabsRoot.querySelectorAll<HTMLButtonElement>('[data-tab-target]');
  const panels = tabsRoot.querySelectorAll<HTMLElement>('[data-tab-panel]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tabTarget;
      buttons.forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        b.classList.toggle('border-primary', on);
        b.classList.toggle('text-primary', on);
        b.classList.toggle('border-transparent', !on);
        b.classList.toggle('text-ink-muted', !on);
      });
      panels.forEach((p) => {
        p.hidden = p.dataset.tabPanel !== target;
      });
    });
  });
  // Keyboard nav (arrow keys)
  tabsRoot.addEventListener('keydown', (e) => {
    const evt = e as KeyboardEvent;
    const current = document.activeElement as HTMLElement;
    if (!current?.dataset.tabTarget) return;
    const idx = Array.from(buttons).indexOf(current as HTMLButtonElement);
    if (evt.key === 'ArrowRight' && idx < buttons.length - 1) (buttons[idx + 1] as HTMLButtonElement).focus();
    if (evt.key === 'ArrowLeft' && idx > 0) (buttons[idx - 1] as HTMLButtonElement).focus();
  });
});

// ----- Mobile menu -----
const menuBtn = document.querySelector<HTMLElement>('[data-menu-toggle]');
const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden', open);
    menuBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
  });
  mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

// ----- Header dropdowns (desktop) -----
document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((d) => {
  const btn = d.querySelector<HTMLButtonElement>('[data-dropdown-trigger]');
  const menu = d.querySelector<HTMLElement>('[data-dropdown-menu]');
  if (!btn || !menu) return;
  let hoverTimer: number | undefined;
  const open = () => { menu.classList.remove('opacity-0', 'invisible', 'translate-y-1'); menu.classList.add('opacity-100', 'visible', 'translate-y-0'); btn.setAttribute('aria-expanded', 'true'); };
  const close = () => { menu.classList.add('opacity-0', 'invisible', 'translate-y-1'); menu.classList.remove('opacity-100', 'visible', 'translate-y-0'); btn.setAttribute('aria-expanded', 'false'); };
  d.addEventListener('mouseenter', () => { clearTimeout(hoverTimer); open(); });
  d.addEventListener('mouseleave', () => { hoverTimer = window.setTimeout(close, 150); });
  btn.addEventListener('click', (e) => { e.preventDefault(); menu.classList.contains('invisible') ? open() : close(); });
});
