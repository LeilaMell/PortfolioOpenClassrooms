//menu burger

const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

//carrousel
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');
const dotsContainer = document.querySelector('.dots');

let currentIndex = 0;
const totalSlides = slideElements.length;


slideElements.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
});

let startX = 0;
let endX = 0;

const carousel = document.querySelector('.main-carrousel');

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = startX - endX;

  // seuil minimum pour éviter les faux swipes
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      // swipe gauche → slide suivante
      currentIndex = (currentIndex + 1) % totalSlides;
    } else {
      // swipe droite → slide précédente
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    }
    updateCarousel();
  }
}