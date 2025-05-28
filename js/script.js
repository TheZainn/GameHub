const toggleBtn = document.getElementById("darkModeToggleBtn");
const modeIcon = document.getElementById("modeIcon");

function updateMode(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  modeIcon.textContent = isDark ? "🌙" : "🌞";
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("darkMode");
  const isDark = saved === "enabled";
  updateMode(isDark);
});

toggleBtn.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  updateMode(isDark);
});

// Simulasi login sukses
const isLoggedIn = true;
const username = "Gamer123";
const profileImg = "images/profile-user.png"; // ganti dengan path yang sesuai

document.addEventListener("DOMContentLoaded", function () {
  if (isLoggedIn) {
    document.querySelector(".auth-buttons").classList.add("d-none");
    const userInfo = document.querySelector(".user-info");
    userInfo.classList.remove("d-none");
    userInfo.querySelector("img").src = profileImg;
    userInfo.querySelector(".username").textContent = username;
  }

  // Keranjang
  const cart = [];
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productName = this.dataset.product;
      cart.push(productName);
      alert(`Ditambahkan ke keranjang: ${productName}`);
    });
  });
});

(function ($) {
  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $("body");
      Body.addClass("preloader-site");
    });
    $(window).load(function () {
      $(".preloader-wrapper").fadeOut();
      $("body").removeClass("preloader-site");
    });
  };

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  var initSwiper = function () {
    var swiper = new Swiper(".main-swiper", {
      loop: true,
      autoplay: {
        delay: 3000, // 3 detik
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      },
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      },
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      },
    });
  };

  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);
      var quantity = 0;

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        $el_product.find("#quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product.find("#quantity").val(quantity - 1);
        }
      });
    });
  };

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  };

  // document ready
  $(document).ready(function () {
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();
  }); // End of a document
})(jQuery);
