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

// Acordion
const accordionItemHeaders = document.querySelectorAll(
  ".accordion__item-header"
);
const accordionFirstItemBody = document.querySelector(
  ".accordion__item:nth-child(1) .accordion__item-body"
);

if (accordionFirstItemBody) {
  // Open first item
  accordionFirstItemBody.style.maxHeight =
    accordionFirstItemBody.scrollHeight + "px";

  accordionItemHeaders.forEach((accordionItemHeader) => {
    accordionItemHeader.addEventListener("click", (event) => {
      // Remove active class all headers except clicked item
      accordionItemHeaders.forEach((accordionItemHeader) => {
        if (accordionItemHeader == event.target) {
          return;
        }
        const accordionItemBody = accordionItemHeader.nextElementSibling;
        accordionItemHeader.classList.remove("active");
        accordionItemBody.style.maxHeight = 0;
      });
      // If clicked item is open close and vice versa
      event.target.classList.toggle("active");
      const accordionItemBody = event.target.nextElementSibling;
      if (accordionItemHeader.classList.contains("active")) {
        accordionItemBody.style.maxHeight =
          accordionItemBody.scrollHeight + "px";
      } else {
        accordionItemBody.style.maxHeight = 0;
      }
    });
  });
}

// Video Popup

const playBtn = document.querySelector(".blog__aside-video-icon");

if (playBtn) {
  const videoPopup = document.querySelector(".video-popup");
  const videoPopupCloseBtn = document.querySelector(".video-popup__close");

  // Youtube iframe player
  let tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";

  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: "wS_qbDztgVY",
      playerVars: {
        playsinline: 1,
      },
    });
  }

  playBtn.addEventListener("click", () => {
    videoPopup.classList.add("show");
    player.playVideo();
  });

  videoPopupCloseBtn.addEventListener("click", () => {
    videoPopup.classList.remove("show");
    player.stopVideo();
  });
}
