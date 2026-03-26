window.onload = function() {

  var slides = document.querySelectorAll('.slide');
  var current = 0;

  function showSlide(n) {
    slides[current].classList.remove('active');
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    current = n;
    slides[current].classList.add('active');
  }

  document.getElementById('nextBtn').onclick = function() { showSlide(current + 1); };
  document.getElementById('prevBtn').onclick = function() { showSlide(current - 1); };
  setInterval(function() { showSlide(current + 1); }, 5000);

  var filterBtns = document.querySelectorAll('.filter-btn');
  var galBoxes   = document.querySelectorAll('.gal-box');

  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].onclick = function() {
      for (var j = 0; j < filterBtns.length; j++) filterBtns[j].classList.remove('active');
      this.classList.add('active');
      var cat = this.getAttribute('data-cat');
      for (var k = 0; k < galBoxes.length; k++) {
        var itemCat = galBoxes[k].getAttribute('data-cat');
        if (cat === 'all' || itemCat === cat || itemCat === 'all') {
          galBoxes[k].classList.remove('hidden');
        } else {
          galBoxes[k].classList.add('hidden');
        }
      }
    };
  }

  var chefCards = document.getElementById('chefCards');
  var pos = 0;
  var max = chefCards.querySelectorAll('.chef-card').length - 3;

  document.getElementById('chefNext').onclick = function() {
    if (pos < max) pos++; else pos = 0;
    chefCards.style.transform = 'translateX(-' + (pos * 33.33) + '%)';
  };
  document.getElementById('chefPrev').onclick = function() {
    if (pos > 0) pos--; else pos = max;
    chefCards.style.transform = 'translateX(-' + (pos * 33.33) + '%)';
  };

  var testItems = document.querySelectorAll('.test-item');
  var testCur = 0;

  function showTest(n) {
    testItems[testCur].classList.remove('active');
    if (n >= testItems.length) n = 0;
    if (n < 0) n = testItems.length - 1;
    testCur = n;
    testItems[testCur].classList.add('active');
  }

  document.getElementById('testNext').onclick = function() { showTest(testCur + 1); };
  document.getElementById('testPrev').onclick = function() { showTest(testCur - 1); };
  setInterval(function() { showTest(testCur + 1); }, 6000);

  var topBtn = document.getElementById('topBtn');
  window.onscroll = function() {
    topBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
  };
  topBtn.onclick = function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  chefCards.style.transform = 'translateX(-' + (pos * 33.33) + '%)';

};