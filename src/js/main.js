// review carousel
$(document).ready(function () {

    $('#coursel').owlCarousel({
      loop: true,
      dots: true,
      slideSpeed: 1000,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      items: 2,
      resonsiveClass: true,
      responsiveRefreshRate: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        1000: {
          items: 2
        },
        1200: {
          items: 2
        },
        1920: {
          items: 2
        }
  
      }
  
    });
    wow = new WOW();
    wow.init();
  
  });
  // review carousel end