/**
 * DREAM PEAK - Main Navigation & Global Scripts
 * Includes: Sticky Header, Mobile Drawer, and Animated Statistics Counter
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Menu Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerOverlay) drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  // Current page active navigation highlighting
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    const cleanCurrent = currentPath.replace(/\.html$/, '').replace(/\/$/, '') || '/';

    if (cleanHref === cleanCurrent) {
      link.classList.add('active');
    }
  });

  // Highlight Our Expertise if on Retail or Residence page
  if (currentPath === '/retail' || currentPath === '/residence') {
    const expToggle = document.getElementById('expertiseMenuToggle');
    if (expToggle) expToggle.classList.add('active');
  }

  // ==========================================================================
  // SCROLL-TRIGGERED SLOW STATISTICS COUNTER ANIMATION
  // Requirements:
  // - Trigger ONLY on scroll (never automatically on page load)
  // - IntersectionObserver with threshold: 0.35 (35% visibility)
  // - 3500ms duration (3.5 seconds slow & smooth counting)
  // - Ease-out timing function (smooth start, gradually decelerating)
  // - All four counters in the section start simultaneously
  // - Run once per page load, never re-trigger on scroll away
  // - Red '+' symbol remains static & visible
  // ==========================================================================

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(counterEl, targetVal, duration = 3500) {
    let startTimestamp = null;
    let animFrameId = null;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = Math.round(easedProgress * targetVal);
      counterEl.textContent = currentVal;

      if (progress < 1) {
        animFrameId = window.requestAnimationFrame(step);
      } else {
        counterEl.textContent = targetVal;
        if (animFrameId) {
          window.cancelAnimationFrame(animFrameId);
        }
      }
    }

    animFrameId = window.requestAnimationFrame(step);
  }

  function startSectionCounters(sectionEl) {
    if (sectionEl.dataset.counterStarted === 'true') return;
    sectionEl.dataset.counterStarted = 'true';

    const sectionCounters = sectionEl.querySelectorAll('.counter[data-target]');
    sectionCounters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10);
      if (!isNaN(targetVal)) {
        animateCounter(counter, targetVal, 3500);
      }
    });
  }

  // Ensure all counters initially display 0
  const allCounters = document.querySelectorAll('.counter[data-target]');
  allCounters.forEach(counter => {
    counter.textContent = '0';
  });

  const statSections = document.querySelectorAll('.hero-stats-bar, .highlights-grid, .client-hero-summary');

  if (statSections.length > 0 && 'IntersectionObserver' in window) {
    let userHasScrolled = window.scrollY > 20;
    const pendingVisibleSections = new Set();

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const section = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (userHasScrolled) {
            startSectionCounters(section);
            observer.unobserve(section);
          } else {
            // Keep at 0 and wait for user to initiate scroll
            pendingVisibleSections.add(section);
          }
        } else if (!entry.isIntersecting) {
          pendingVisibleSections.delete(section);
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px'
    });

    statSections.forEach(sec => counterObserver.observe(sec));

    // Listen for scroll interaction to start pending sections
    const handleFirstUserScroll = () => {
      userHasScrolled = true;
      pendingVisibleSections.forEach(section => {
        startSectionCounters(section);
        counterObserver.unobserve(section);
      });
      pendingVisibleSections.clear();

      window.removeEventListener('scroll', handleFirstUserScroll);
      window.removeEventListener('wheel', handleFirstUserScroll);
      window.removeEventListener('touchmove', handleFirstUserScroll);
    };

    window.addEventListener('scroll', handleFirstUserScroll, { passive: true });
    window.addEventListener('wheel', handleFirstUserScroll, { passive: true });
    window.addEventListener('touchmove', handleFirstUserScroll, { passive: true });
  } else {
    // Graceful fallback for non-supporting browsers
    allCounters.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target');
    });
  }

  // ==========================================================================
  // BACK TO TOP SMOOTH SCROLL FUNCTIONALITY
  // ==========================================================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // OUR EXPERTISE MEGA MENU (DESKTOP & MOBILE INTERACTION)
  // ==========================================================================
  const expertiseNavItem = document.getElementById('expertiseNavItem');
  const expertiseMenuToggle = document.getElementById('expertiseMenuToggle');
  const expertiseMegaMenu = document.getElementById('expertiseMegaMenu');

  if (expertiseNavItem && expertiseMenuToggle) {
    let hideTimer = null;

    const showMegaMenu = () => {
      clearTimeout(hideTimer);
      expertiseNavItem.classList.add('open');
      expertiseMenuToggle.setAttribute('aria-expanded', 'true');
    };

    const hideMegaMenu = () => {
      hideTimer = setTimeout(() => {
        expertiseNavItem.classList.remove('open');
        expertiseMenuToggle.setAttribute('aria-expanded', 'false');
      }, 140);
    };

    // Desktop: Hover interaction with smooth bridge
    expertiseNavItem.addEventListener('mouseenter', showMegaMenu);
    expertiseNavItem.addEventListener('mouseleave', hideMegaMenu);

    // Desktop / Tablet: Click to toggle dropdown
    expertiseMenuToggle.addEventListener('click', (e) => {
      if (window.innerWidth > 992) {
        e.preventDefault();
        if (expertiseNavItem.classList.contains('open')) {
          expertiseNavItem.classList.remove('open');
          expertiseMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
          showMegaMenu();
        }
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!expertiseNavItem.contains(e.target)) {
        expertiseNavItem.classList.remove('open');
        expertiseMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && expertiseNavItem.classList.contains('open')) {
        expertiseNavItem.classList.remove('open');
        expertiseMenuToggle.setAttribute('aria-expanded', 'false');
        expertiseMenuToggle.focus();
      }
    });
  }

  // Mobile drawer mega menu accordion toggle
  const mobileExpertiseToggle = document.getElementById('mobileExpertiseToggle');
  const mobileMegaItem = document.querySelector('.mobile-mega-item');
  if (mobileExpertiseToggle && mobileMegaItem) {
    mobileExpertiseToggle.addEventListener('click', (e) => {
      if (e.target.closest('.mobile-mega-btn') || e.target.closest('.mobile-mega-chevron')) {
        e.preventDefault();
        e.stopPropagation();
        mobileMegaItem.classList.toggle('open');
      }
    });
  }
});
