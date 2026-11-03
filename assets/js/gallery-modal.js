/**
 * DREAM PEAK - Gallery Filter & Interactive Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  // Gallery Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  if (!lightboxModal) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let visibleItems = [];
  let currentIndex = 0;

  function updateVisibleItems() {
    visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function showImage(index) {
    if (visibleItems.length === 0) return;
    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;

    currentIndex = index;
    const targetItem = visibleItems[currentIndex];
    const imgEl = targetItem.querySelector('img');
    const titleEl = targetItem.querySelector('.gallery-caption');
    const catEl = targetItem.querySelector('.gallery-cat');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Dream Peak Project';
    }
    if (titleEl && lightboxTitle) {
      lightboxTitle.textContent = titleEl.textContent;
    }
    if (catEl && lightboxCategory) {
      lightboxCategory.textContent = catEl.textContent;
    }
  }

  function openLightbox(index) {
    updateVisibleItems();
    showImage(index);
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Click on gallery item to open lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      const idx = visibleItems.indexOf(item);
      openLightbox(idx !== -1 ? idx : 0);
    });
  });

  // Navigation handlers
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-stage')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    }
  });
});
