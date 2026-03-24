window.onload = function() {

  var slides = document.querySelectorAll('.slide');
  var counter = document.getElementById('slideCounter');
  var current = 0;

  function showSlide(n) {
    // Hide all
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    current = n;
    slides[current].classList.add('active');
    var nextNum = current + 2;
    if (nextNum > slides.length) nextNum = 1;
    counter.textContent = 'Next ' + nextNum + '/' + slides.length + ' >';
  }

  document.getElementById('nextBtn').onclick = function() {
    showSlide(current + 1);
  };

  document.getElementById('prevBtn').onclick = function() {
    showSlide(current - 1);
  };

  counter.onclick = function() {
    showSlide(current + 1);
  };

  setInterval(function() {
    showSlide(current + 1);
  }, 5000);

  var filterBtns = document.querySelectorAll('.filter-btn');
  var galItems = document.querySelectorAll('.gal-img');

  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].onclick = function() {

      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      for (var k = 0; k < galItems.length; k++) {
        var cat = galItems[k].getAttribute('data-cat');
        if (filter === 'all' || cat === filter || cat === 'all') {
          galItems[k].classList.remove('hidden');
        } else {
          galItems[k].classList.add('hidden');
        }
      }
    };
  }



  var track = document.getElementById('chefTrack');
  var cards = track.querySelectorAll('.chef-card');
  var pos = 0;
  var show = 3;
  var max = cards.length - show;

  document.getElementById('chefNext').onclick = function() {
    if (pos < max) {
      pos++;
    } else {
      pos = 0;
    }
    track.style.transform = 'translateX(-' + (pos * 33.33) + '%)';
  };

  document.getElementById('chefPrev').onclick = function() {
    if (pos > 0) {
      pos--;
    } else {
      pos = max;
    }
    track.style.transform = 'translateX(-' + (pos * 33.33) + '%)';
  };



  var testSlides = document.querySelectorAll('.test-slide');
  var testCurrent = 0;

  function showTest(n) {
    for (var i = 0; i < testSlides.length; i++) {
      testSlides[i].classList.remove('active');
    }
    if (n >= testSlides.length) n = 0;
    if (n < 0) n = testSlides.length - 1;
    testCurrent = n;
    testSlides[testCurrent].classList.add('active');
  }

  document.getElementById('testNext').onclick = function() {
    showTest(testCurrent + 1);
  };

  document.getElementById('testPrev').onclick = function() {
    showTest(testCurrent - 1);
  };

  setInterval(function() {
    showTest(testCurrent + 1);
  }, 6000);

  var topBtn = document.getElementById('topBtn');

  window.onscroll = function() {
    if (window.scrollY > 400) {
      topBtn.style.display = 'block';
    } else {
      topBtn.style.display = 'none';
    }
  };

  topBtn.onclick = function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.getElementById('navLinks');

  menuBtn.onclick = function() {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
    }
  };

  document.getElementById('bookBtn').onclick = function() {
    this.innerHTML = '<i class="fas fa-check"></i> Reservation Sent!';
    this.style.background = '#27ae60';
    var btn = this;
    setTimeout(function() {
      btn.innerHTML = '<i class="fas fa-thumbs-up"></i> BOOK A TABLE';
      btn.style.background = '';
    }, 3000);
  };

};