// Burger menu
const menuBtn = document.querySelector("#menu-btn");
const burgerMenu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".overlay");
const burgerMenuCloseBtn = document.querySelector(".burger-menu__btn-close");

menuBtn.addEventListener("click", function () {
  burgerMenu.classList.add("show");
  overlay.classList.add("show");
});

burgerMenuCloseBtn.addEventListener("click", function () {
  burgerMenu.classList.remove("show");
  overlay.classList.remove("show");
});

overlay.addEventListener("click", function () {
  burgerMenu.classList.remove("show");
  overlay.classList.remove("show");
});

// AOS init
AOS.init({
  once: true,
});

// Swiper Work Slider
const workSlider = new Swiper(".work__slider", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    490: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    990: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

// Swiper Testimonials Slider
const testimonialsSlider = new Swiper(".testimonials__slider", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".testimonials__btn-prev",
    prevEl: ".testimonials__btn-next",
  },
});
