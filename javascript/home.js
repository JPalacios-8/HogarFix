const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.card');
const arrowLeft = document.querySelector('.arrow.left');
const arrowRight = document.querySelector('.arrow.right');

let index = 0;

// Funciones para navegación
function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

arrowLeft.addEventListener('click', () => {
  index = index > 0 ? index - 1 : cards.length - 1;
  updateCarousel();
});

arrowRight.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  updateCarousel();
});

// Swipe en móviles
let startX = 0;

carousel.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    index = (index + 1) % cards.length;
  } else if (endX - startX > 50) {
    index = index > 0 ? index - 1 : cards.length - 1;
  }
  updateCarousel();
});
function abrirModalChat() {
  document.getElementById("modalChatActivo").style.display = "flex";
}

function cerrarModalChat() {
  document.getElementById("modalChatActivo").style.display = "none";
}

function redirigirChat() {
  window.location.href = "chat.html?origen=usuario";
}

