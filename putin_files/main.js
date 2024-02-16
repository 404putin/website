/*
* ----------------------------------------------------------------------------------------
Version       : 1.0
Filename      : main.js
* ----------------------------------------------------------------------------------------
* ----------------------------------------------------------------------------------------
*/
const Putininit = (function () {
  "use strict";
  // variable
  var header = $("#header-main");
  var slides = $(".swiper-wrapper");
  //var slidetwo = $(".swiper-wrapper");
  var formsubs = $("#formcontact");
  var goup = $("#scrollUp");
  //detect mobile device
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  // scroll page
  const scrollpage = function (e) {
    if (window.pageYOffset > 10) {
      header.addClass("fixi");
      goup.addClass("showin");
    } else {
      header.removeClass("fixi");
      goup.removeClass("showin");
    }
  };
  // form submit-----------------------
  const formsub = function (e) {
    // form contact
    if (formsubs.length) {
      $("#formcontact")
        .submit(function (e) {
          e.preventDefault();
        })
        .validate({
          errorElement: "em",
          rules: {
            email: {
              required: true,
              email: true,
            },
            name: {
              required: true,
              minlength: 5,
            },
            comment: {
              required: true,
            },
          },
          messages: {
            email: {
              required: "Check your email input ",
            },
            name: {
              required: "Please check your first name input",
            },
            comment: {
              required: "Please write something for us",
            },
          },
          submitHandler: function (form) {
            $.ajax({
              type: "POST",
              url: "https://mail-sage.vercel.app/mail",
              data: $(form).serialize(),
              beforeSend: function () {
                $("#submitbutton span").html(
                  '<div class="spinner-border spinner-border-sm ml-auto" role="status" aria-hidden="true"></div>'
                );
                $("input, textarea").attr("readonly", "readonly");
              },
              success: function (msg) {
                if (msg == "your message send") {
                  $("#formcontact").trigger("reset");
                  $("#submitbutton span").html("Send Message Now");
                  $("input, textarea").removeAttr("readonly");
                  Swal.fire({
                    icon: "success",
                    title: "Message send successful !",
                    text: "",
                    showConfirmButton: false,
                    confirmButtonColor: "#E25B0F",
                    focusConfirm: false,
                    confirmButtonText: "",
                    footer:
                      '<p class="mb-0">Your message has been sent, I will reply to you shortly</p>',
                  });
                } else {
                  $("input, textarea").removeAttr("readonly");
                  $("#formcontact").trigger("reset");
                  Swal.fire({
                    icon: "error",
                    title: "Something went wrong!",
                    text: "",
                    showConfirmButton: false,
                    confirmButtonColor: "#E25B0F",
                    focusConfirm: false,
                    confirmButtonText: "",
                    footer: '<p class="mb-0">something unknown error</p>',
                  });
                }
              },
            });
            return false;
          },
        });
    }
  };
  // menu mobile ----------------
  const menumobile = function (e) {
    $(".navbar-toggler").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      header.toggleClass("stack-head");
    });
  };
  // titlt
  const tilt = function (e) {
    $(".card-item").tilt({
      glare: false,
      maxGlare: 0.1,
    });
  };
  // magnifig popup 
  const magnificzoom = function(e){
      // magnific image init ----------------------
      $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    if ($('.image-popup').length > 0) {
        $('.image-popup').magnificPopup({
            type: 'image',
            fixedContentPos: true,
            gallery: { enabled: true },
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    }
    //Video Popup init
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: true
    });
    //Video Popup init
    if ($('.video-popup').length > 0) {
        $('.video-popup').magnificPopup({
            type: "iframe",
            removalDelay: 300,
            mainClass: "mfp-fade",
            overflowY: "hidden",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src'
            }
        });
    };
  };
  // sliders owl
  const sliders = function (e) {
    // what hows slide
    if (slides.length) {
      new Swiper(".swiper-container", {
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
        breakpoints: {
          1920: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1028: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
    }
    /* if (slidetwo.length) {
      var swipertwo = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        },
        keyboard: {
          enabled: true,
        },
        mousewheel: {
          thresholdDelta: 70,
        },
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 2,
          },
          1560: {
            slidesPerView: 3,
          },
        },
      });
    }*/
  };
  // accordion
  const accordion = function (e) {
    $(".flat-question").each(function () {
      var speed = { duration: 400 };
      $(".flat-question .toggle-content").hide();
      $(".flat-question .accordion-toggle .toggle-title.active")
        .siblings(".toggle-content")
        .show();
      $(".flat-question .accordion")
        .find(".toggle-title")
        .on("click", function () {
          $(this).toggleClass("active");
          $(this)
            .closest(".accordion")
            .find(".accordion-toggle")
            .removeClass("active");
          $(this).closest(".accordion-toggle").toggleClass("active");
          $(this).next().slideToggle(speed);
          $(".flat-question .toggle-content")
            .not($(this).next())
            .slideUp(speed);
          if ($(this).is(".active")) {
            $(this)
              .closest(".accordion")
              .find(".toggle-title.active")
              .toggleClass("active");
            $(this).toggleClass("active");
          }
        });
    });
  };
  //binds event ----------------------------
  const bindEvents = function (e) {
    // window onbuffer
    window.onbeforeunload = function (e) {
      // allways force page to scroll top on refresh
      window.scrollTo(0, 0);
    };
    // window load
    window.addEventListener("load", (e) => {});
    // document load
    window.addEventListener("DOMContentLoaded", (e) => {
      // menu mobile
      menumobile();
      // counter
      accordion();
      // odometer();
      if (!isMobile.any()) {
        tilt();
      };
      // magmific popup 
      magnificzoom();
      // form submit
      formsub();
      // swiper
      sliders();
    });
    window.addEventListener("scroll", (e) => {
      // page scroll
      scrollpage();
    });
  };
  // init - initilizes elements and events
  const AppInit = function (e) {
    bindEvents();
  };
  return {
    AppInit: AppInit,
  };
})();
//initilizing app
Putininit.AppInit();
