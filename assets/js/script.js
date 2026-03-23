/*
=======================================================
  PIQUANT RESTAURANT — assets/js/script.js
=======================================================
  Sections handled:
  1. Hero Slider          — 3 slides, auto + manual
  2. Gallery Filter       — show/hide by category
  3. Chef Carousel        — drag/slide 3 cards at a time
  4. Testimonials Slider  — 3 reviews auto + manual
  5. Navbar Scroll        — sticky shadow + active state
  6. Back to Top          — show/hide + smooth scroll
  7. Navbar Slide BG      — set bg-image from data attr
  8. Mobile Menu Toggle   — show/hide nav-menu
=======================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════════════
     1. HERO SLIDER
  ══════════════════════════════════════ */
  const slides       = document.querySelectorAll('.slide');
  const prevBtn      = document.getElementById('heroPrev');
  const nextBtn      = document.getElementById('heroNext');
  const counterEl    = document.getElementById('slideCounter');
  let   currentSlide = 0;
  let   autoSlideTimer;

  /* Set background images from data-bg attribute */
  slides.forEach(function (slide) {
    var bg = slide.getAttribute('data-bg');
    if (bg) slide.style.backgroundImage = 'url(' + bg + ')';
  });

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    var next = (currentSlide + 1) % slides.length;
    if (counterEl) counterEl.textContent = 'Next ' + (next + 1) + '/' + slides.length + ' >';
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAuto() {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); startAuto(); });
  if (counterEl) counterEl.addEventListener('click', function () { nextSlide(); startAuto(); });

  startAuto();

  /* ══════════════════════════════════════
     2. GALLERY FILTER
  ══════════════════════════════════════ */
  var filterBtns = document.querySelectorAll('.gf-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');

      galleryItems.forEach(function (item) {
        if (filter === 'all') {
          item.classList.remove('hidden');
        } else {
          var cat = item.getAttribute('data-cat');
          if (cat === filter || cat === 'all') {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        }
      });
    });
  });

  /* ══════════════════════════════════════
     3. CHEF CAROUSEL
  ══════════════════════════════════════ */
  var chefTrack   = document.getElementById('chefTrack');
  var chefPrevBtn = document.getElementById('chefPrev');
  var chefNextBtn = document.getElementById('chefNext');

  if (chefTrack) {
    var chefCards     = chefTrack.querySelectorAll('.chef-card');
    var chefIndex     = 0;
    var chefVisible   = 3; /* cards visible at once */
    var chefMax       = Math.max(0, chefCards.length - chefVisible);

    function updateChefTrack() {
      /* Width of one card = 100% / chefVisible of the container */
      var cardPct = 100 / chefVisible;
      chefTrack.style.transform = 'translateX(-' + (chefIndex * cardPct) + '%)';
    }

    function chefNext() {
      if (chefIndex < chefMax) { chefIndex++; } else { chefIndex = 0; }
      updateChefTrack();
    }

    function chefPrev() {
      if (chefIndex > 0) { chefIndex--; } else { chefIndex = chefMax; }
      updateChefTrack();
    }

    if (chefPrevBtn) chefPrevBtn.addEventListener('click', chefPrev);
    if (chefNextBtn) chefNextBtn.addEventListener('click', chefNext);

    /* Responsive: show 1 card on mobile */
    function adjustChefVisible() {
      var w = window.innerWidth;
      if (w < 600)       { chefVisible = 1; }
      else if (w < 900)  { chefVisible = 2; }
      else               { chefVisible = 3; }
      chefMax = Math.max(0, chefCards.length - chefVisible);
      chefCards.forEach(function (card) {
        card.style.minWidth = 'calc(' + (100 / chefVisible) + '% - 16px)';
      });
      if (chefIndex > chefMax) chefIndex = chefMax;
      updateChefTrack();
    }

    adjustChefVisible();
    window.addEventListener('resize', adjustChefVisible);
  }

  /* ══════════════════════════════════════
     4. TESTIMONIALS SLIDER
  ══════════════════════════════════════ */
  var testSlides   = document.querySelectorAll('.test-slide');
  var testPrevBtn  = document.getElementById('testPrev');
  var testNextBtn  = document.getElementById('testNext');
  var testIndex    = 0;
  var testTimer;

  function goToTest(index) {
    testSlides[testIndex].classList.remove('active');
    testIndex = (index + testSlides.length) % testSlides.length;
    testSlides[testIndex].classList.add('active');
  }

  function testNext() { goToTest(testIndex + 1); }
  function testPrev() { goToTest(testIndex - 1); }

  function startTestAuto() {
    clearInterval(testTimer);
    testTimer = setInterval(testNext, 6000);
  }

  if (testPrevBtn) testPrevBtn.addEventListener('click', function () { testPrev(); startTestAuto(); });
  if (testNextBtn) testNextBtn.addEventListener('click', function () { testNext(); startTestAuto(); });

  startTestAuto();

  /* ══════════════════════════════════════
     5. NAVBAR SCROLL
  ══════════════════════════════════════ */
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,.7)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,.6)';
    }
  });

  /* ══════════════════════════════════════
     6. BACK TO TOP
  ══════════════════════════════════════ */
  var backTop = document.getElementById('backTop');

  window.addEventListener('scroll', function () {
    if (backTop) {
      if (window.scrollY > 400) {
        backTop.classList.add('visible');
      } else {
        backTop.classList.remove('visible');
      }
    }
  });

  if (backTop) {
    backTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══════════════════════════════════════
     7. MOBILE MENU TOGGLE
  ══════════════════════════════════════ */
  var mobileToggle = document.getElementById('mobileToggle');
  var navMenu      = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      var icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-times');
      } else {
        icon.classList.replace('fa-times', 'fa-bars');
      }
    });
  }

  /* Close mobile menu when clicking outside */
  document.addEventListener('click', function (e) {
    if (navMenu && mobileToggle) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        var icon = mobileToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-times', 'fa-bars');
      }
    }
  });

  /* ══════════════════════════════════════
     8. SMOOTH SCROLL for anchor links
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; /* navbar height */
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        /* close mobile menu if open */
        if (navMenu) navMenu.classList.remove('open');
      }
    });
  });

  /* ══════════════════════════════════════
     9. BOOK A TABLE button feedback
  ══════════════════════════════════════ */
  var bookBtn = document.querySelector('.book-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', function () {
      var orig = bookBtn.textContent;
      bookBtn.innerHTML = '<i class="fas fa-check"></i> Reservation Sent!';
      bookBtn.style.background = '#27ae60';
      setTimeout(function () {
        bookBtn.innerHTML = '<i class="fas fa-thumbs-up"></i> BOOK A TABLE';
        bookBtn.style.background = '';
      }, 3000);
    });
  }

  /* ══════════════════════════════════════
     10. SEARCH TOGGLE
  ══════════════════════════════════════ */
  var searchBtn   = document.querySelector('.search-btn');
  var searchInput = document.getElementById('searchInput');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function () {
      var q = searchInput.value.trim();
      if (q) {
        /* placeholder: could open a search modal */
        alert('Searching for: ' + q);
        searchInput.value = '';
      }
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') searchBtn.click();
    });
  }

});
/* END OF SCRIPT */