AOS.init();

// HAMBURGER

window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".mobile"),
    mobileMenuItem = document.querySelectorAll(".mobile__link"),
    socialIcon = document.querySelectorAll(".social__icon"),
    hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger--active");
    menu.classList.toggle("mobile--active");
  });

  mobileMenuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger--active");
      menu.classList.toggle("mobile--active");
    });
  });

  socialIcon.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger--active");
      menu.classList.toggle("mobile--active");
    });
  });
});

// MAIN SLIDER

$(".main-slider").slick({
  autoplay: true,
  infinite: true,
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrow: false,
  fade: true,
  dotsClass: 'dots-style',
});
$(".main-slider .slick-arrow").remove();

// PRODUCT CARD SLIDER

$(".product-card__slider").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: ".product-card__nav-thumbnails",
});

$(".product-card__nav-thumbnails").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: ".product-card__slider",
  dots: false,
  focusOnSelect: false,
  arrow: false,
});

// Remove active class from all thumbnail slides
$(".product-card__nav-thumbnails .slick-slide").removeClass("slick-active");

// Set active class to first thumbnail slides
$(".product-card__nav-thumbnails .slick-slide").eq(0).addClass("slick-active");

// On before slide change match active thumbnail to current slide
$(".product-card__slider").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    var mySlideNumber = nextSlide;
    $(".product-card__nav-thumbnails .slick-slide").removeClass("slick-active");
    $(".product-card__nav-thumbnails .slick-slide")
      .eq(mySlideNumber)
      .addClass("slick-active");
  }
);
$(".product-card__nav-thumbnails .slick-arrow").remove();


$(document).ready(function() {
  $(".accordion__button").on("click", function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this)
        .siblings(".accordion__content")
        .slideUp(300);
      $(".accordion__button span")
        .removeClass("icon-up_arrow")
        .addClass("icon-down_arrow");
    } else {
      $(".accordion__button span")
        .removeClass("icon-up_arrow")
        .addClass("icon-down_arrow");
      $(this)
        .find("span")
        .removeClass("icon-down_arrow")
        .addClass("icon-up_arrow");
      $(".accordion__button").removeClass("active");
      $(this).addClass("active");
      $(".accordion__content").slideUp(200);
      $(this)
        .siblings(".accordion__content")
        .slideDown(200);
    }
  });
});

// SIDEBAR

let getList = document.querySelectorAll('.side-btn');

for(let a  of getList) {
    console.log(a);
    a.addEventListener('click' , showList);
}

function showList () {
    let getHide = document.querySelector('.accordion-catalog__sublist-hide');
    console.log(getHide);
    for (let i = 0; i < 1; i++) {
        if(getHide.style.display == 'block') {
            getHide.style.display = 'none';
        } else { 
            getHide.style.display = 'block';
        }
    }
    

}