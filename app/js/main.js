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
