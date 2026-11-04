/**
 * DREAM PEAK - Interactive Gallery & Lightbox Controller
 * Supports:
 * - Dynamic category filtering (All, Retail, Commercial, Corporate, Residential)
 * - Paginated "View More" button with responsive batch sizes (Desktop: 12, Tablet: 8, Mobile: 6)
 * - Smooth entrance animations & loading indicator
 * - Fullscreen interactive Lightbox with Next / Prev / Touch Swipe / Keyboard navigation
 * - Background scroll lock
 */

document.addEventListener('DOMContentLoaded', () => {
  // Master database from assets/js/gallery-data.js
  const allProjects = window.DREAM_PEAK_GALLERY || [];
  if (!allProjects.length) {
    console.warn('Dream Peak Gallery database not found or empty.');
    return;
  }

  const galleryGrid = document.getElementById('galleryGrid');
  const viewMoreBtn = document.getElementById('viewMoreBtn');
  const viewMoreWrap = document.getElementById('viewMoreWrap');
  const countStatus = document.getElementById('galleryCountStatus');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Breakpoint-aware batch size
  function getBatchSize() {
    const width = window.innerWidth;
    if (width <= 768) return 6; // Mobile
    if (width <= 1024) return 8; // Tablet
    return 12; // Desktop
  }

  let currentFilter = 'all';
  let filteredProjects = [...allProjects];
  let displayedCount = 0;
  let currentlyRenderedItems = [];

  // Filter project list based on current active category
  function applyFilter(filter) {
    currentFilter = filter;
    if (filter === 'all') {
      filteredProjects = [...allProjects];
    } else {
      filteredProjects = allProjects.filter(p => p.category === filter);
    }
    // Reset pagination
    displayedCount = 0;
    galleryGrid.innerHTML = '';
    currentlyRenderedItems = [];

    // Load initial batch
    const initialBatch = getBatchSize();
    loadNextBatch(initialBatch, false);
  }

  // Create DOM element for a single gallery item
  function createGalleryCard(project, isAnimated = true) {
    const item = document.createElement('div');
    item.className = 'gallery-item' + (isAnimated ? ' item-animating' : '');
    item.setAttribute('data-category', project.category);
    item.setAttribute('data-id', project.id);
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${project.title}`);

    item.innerHTML = `
      <img src="${project.src}" alt="${project.alt}" loading="lazy" decoding="async">
      <div class="gallery-overlay">
        <span class="gallery-cat">${project.catLabel}</span>
        <h3 class="gallery-caption">${project.title}</h3>
      </div>
    `;

    // Click to open lightbox
    item.addEventListener('click', () => {
      const idx = currentlyRenderedItems.indexOf(project);
      openLightbox(idx !== -1 ? idx : 0);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = currentlyRenderedItems.indexOf(project);
        openLightbox(idx !== -1 ? idx : 0);
      }
    });

    return item;
  }

  // Load next batch of projects
  function loadNextBatch(batchSize, isAnimated = true) {
    const start = displayedCount;
    const end = Math.min(start + batchSize, filteredProjects.length);
    const toRender = filteredProjects.slice(start, end);

    const fragment = document.createDocumentFragment();
    toRender.forEach(proj => {
      currentlyRenderedItems.push(proj);
      const card = createGalleryCard(proj, isAnimated);
      fragment.appendChild(card);
    });

    galleryGrid.appendChild(fragment);
    displayedCount = end;

    updateViewMoreState();
  }

  // Update button visibility, loading state, and counter
  function updateViewMoreState() {
    const total = filteredProjects.length;
    if (countStatus) {
      if (displayedCount >= total) {
        countStatus.innerHTML = `Showing all <span class="highlight-num">${total}</span> ${currentFilter === 'all' ? '' : currentFilter + ' '}projects`;
      } else {
        countStatus.innerHTML = `Showing <span class="highlight-num">${displayedCount}</span> of <span class="highlight-num">${total}</span> ${currentFilter === 'all' ? '' : currentFilter + ' '}projects`;
      }
    }

    if (viewMoreWrap && viewMoreBtn) {
      if (displayedCount >= total) {
        viewMoreBtn.style.display = 'none';
      } else {
        viewMoreBtn.style.display = 'inline-flex';
        viewMoreBtn.classList.remove('loading');
      }
    }
  }

  // View More button click event with smooth loading delay
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      viewMoreBtn.classList.add('loading');
      setTimeout(() => {
        const batch = getBatchSize();
        loadNextBatch(batch, true);
      }, 240);
    });
  }

  // Category filter button click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      applyFilter(filter);
    });
  });

  // =========================================================================
  // LIGHTBOX MODAL CONTROLLER
  // =========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentLightboxIndex = 0;

  function showLightboxImage(index) {
    if (!currentlyRenderedItems.length) return;
    if (index < 0) index = currentlyRenderedItems.length - 1;
    if (index >= currentlyRenderedItems.length) index = 0;

    currentLightboxIndex = index;
    const project = currentlyRenderedItems[currentLightboxIndex];

    if (lightboxImg) {
      lightboxImg.style.opacity = '0.4';
      lightboxImg.src = project.src;
      lightboxImg.alt = project.alt || project.title;
      setTimeout(() => {
        lightboxImg.style.opacity = '1';
      }, 80);
    }

    if (lightboxTitle) lightboxTitle.textContent = project.title;
    if (lightboxCategory) lightboxCategory.textContent = project.catLabel;
    if (lightboxCounter) {
      lightboxCounter.textContent = `Project ${currentLightboxIndex + 1} of ${currentlyRenderedItems.length}`;
    }
  }

  function openLightbox(index) {
    showLightboxImage(index);
    if (lightboxModal) {
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentLightboxIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showLightboxImage(currentLightboxIndex + 1);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-stage')) {
        closeLightbox();
      }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 45;
      if (touchEndX < touchStartX - threshold) {
        // Swiped Left -> Next
        showLightboxImage(currentLightboxIndex + 1);
      } else if (touchEndX > touchStartX + threshold) {
        // Swiped Right -> Prev
        showLightboxImage(currentLightboxIndex - 1);
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showLightboxImage(currentLightboxIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showLightboxImage(currentLightboxIndex + 1);
    }
  });

  // Initial load
  applyFilter('all');
});
