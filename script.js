document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initPortfolioTabs();
  initBuildViews();
  initLightbox();
  initNavbarScroll();
  initSmoothScroll();
});

/* ── Mobile Menu Toggle ── */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Portfolio Tab Switching ── */
function initPortfolioTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.portfolio-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach((panel) => {
        panel.classList.remove('active');
        if (panel.id === `panel-${target}`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

/* ── Build Exterior / Interior Views ── */
function initBuildViews() {
  document.querySelectorAll('[data-build-view]').forEach((group) => {
    const btns = group.querySelectorAll('.build-view-btn');
    const imgs = group.querySelectorAll('.build-view-img');

    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const view = btn.dataset.view;

        btns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        imgs.forEach((img) => {
          img.classList.toggle('active', img.dataset.view === view);
        });
      });
    });
  });
}

/* ── Image Lightbox Preview ── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  const openLightbox = (src, alt) => {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = alt || '';
    lightbox.hidden = false;
    lightbox.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => lightbox.classList.add('open'));
    document.body.classList.add('lightbox-open');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    setTimeout(() => {
      if (!lightbox.classList.contains('open')) {
        lightbox.hidden = true;
        lightboxImg.src = '';
      }
    }, 250);
  };

  document.querySelectorAll('.lightbox-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (trigger.dataset.lightboxDynamic === 'true') {
        const activeImg = trigger.querySelector('.build-view-img.active');
        if (!activeImg) return;
        openLightbox(activeImg.currentSrc || activeImg.src, activeImg.alt);
        return;
      }

      openLightbox(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt);
    });
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ── Navbar Glassmorphism on Scroll ── */
function initNavbarScroll() {
  const header = document.getElementById('navbar');

  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }
  });
}

/* ── Smooth Scroll for Anchor Links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
