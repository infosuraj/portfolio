(function ($) {
  "use strict";

  $(document).ready(function () {
    /*----------------------------------------------
		1. Responsive Menu
		----------------------------------------------*/

    function navResponsive() {
      let navbar = document.querySelector(".navbar .items");
      let menu = document.querySelector("#menu .items");

      // Ensure both navbar and menu elements exist before proceeding
      if (navbar && menu) {
        menu.innerHTML = "";
        menu.appendChild(navbar.cloneNode(true));

        let icons = document.querySelectorAll(".menu .icon-arrow-right");
        icons.forEach((icon) => {
          icon.classList.remove("icon-arrow-right");
          icon.classList.add("icon-arrow-down");
        });
      }
    }

    // Run navResponsive initially and on window resize
    navResponsive();
    window.addEventListener("resize", function () {
      navResponsive();
    });

    // Add 'children-{count}' class to dropdown menus
    let dropdownMenus = document.querySelectorAll(".menu .dropdown-menu");
    dropdownMenus.forEach(function (menu) {
      let children = menu.querySelectorAll(".dropdown").length;
      menu.classList.add("children-" + children);
    });

    // Add 'prevent' class to nav-links inside dropdown items
    let dropdownItems = document.querySelectorAll(".menu .nav-item.dropdown");
    dropdownItems.forEach(function (item) {
      let children = item.querySelectorAll(".nav-link");
      children.forEach(function (link) {
        link.classList.add("prevent");
      });
    });

    // Handle click events to show/hide dropdowns and handle smooth anchor links
    document.addEventListener("click", function (event) {
      let target = event.target;

      // Check if the clicked element is a .nav-link inside the #menu
      if (target.closest("#menu .nav-item .nav-link")) {
        let navLink = target.closest(".nav-link");

        // Prevent the default action if the link has 'prevent' class
        if (navLink.classList.contains("prevent")) {
          event.preventDefault();
        }

        let dropdown = navLink.nextElementSibling;
        if (dropdown) {
          dropdown.classList.toggle("show");
        }

        // Hide the menu if it's a smooth anchor link
        if (navLink.classList.contains("smooth-anchor")) {
          let menuModal = document.querySelector("#menu");
          if (menuModal) {
            menuModal.classList.remove("show");
          }
        }
      }
    });

    /*----------------------------------------------
		2. Navigation
		----------------------------------------------*/

    var position = window.scrollY;
    var navbar = document.querySelector(".navbar");
    var topThreshold = 50;

    document.addEventListener("DOMContentLoaded", function () {
      if (position > topThreshold) {
        navbar.style.display = "none"; // Hide navbar if not near the top on page load
      }
    });

    window.addEventListener("scroll", function () {
      if (navbar) {
        let scroll = window.scrollY;

        if (!navbar.classList.contains("relative")) {
          if (scroll > topThreshold) {
            // Scrolling down or up, but not near the top
            navbar.style.display = "none"; // Hide the navbar
          } else {
            // Near the top of the page
            navbar.style.display = "block"; // Show the navbar
          }

          position = scroll; // Update the position for the next scroll event
        }
      }
    });

    let navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (link) {
      let href = link.getAttribute("href");
      if (href.length > 1 && href.indexOf("#") !== -1) {
        link.classList.add("smooth-anchor");
      }
    });

    document.addEventListener("click", function (event) {
      if (event.target.matches(".smooth-anchor")) {
        event.preventDefault();

        // Extract the href and parse it to get the correct hash
        const href = event.target.getAttribute("href");
        const targetHash = new URL(href, window.location.href).hash;

        // Only proceed if a valid hash exists
        if (targetHash && targetHash.length > 1) {
          const targetElement = document.querySelector(targetHash);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: "smooth",
            });
          }
        }
      }

      // Handle empty anchor links
      if (event.target.matches('a[href="#"]')) {
        event.preventDefault();
      }
    });

    let dropdownMenusNav = document.querySelectorAll(".dropdown-menu");
    dropdownMenusNav.forEach(function (dropdown) {
      dropdown.addEventListener("mouseenter", function () {
        let navLink = dropdown.parentElement.querySelector(".nav-link");
        if (navLink) {
          navLink.classList.add("active");
        }
      });

      dropdown.addEventListener("mouseleave", function () {
        let navLink = dropdown.parentElement.querySelector(".nav-link");
        if (navLink) {
          navLink.classList.remove("active");
        }
      });
    });

    /*----------------------------------------------
		3. Navbar Toggler
		----------------------------------------------*/

    $(".navbar-toggler").on("click", function () {
      var offcanvas = $("#offcanvasRight");
      if (offcanvas.hasClass("show")) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
    });

    // Ensure the active class is correctly updated when the offcanvas is closed via other means
    $("#offcanvasRight").on("hidden.bs.offcanvas", function () {
      $(".navbar-toggler").removeClass("active");
    });

    // Immediately remove active class when backdrop is clicked
    $(document).on("click", ".offcanvas-backdrop", function () {
      $(".navbar-toggler").removeClass("active");
    });

    // Add class to navbar-toggler when scroll position is 100px
    $(window).on("scroll resize", function () {
      var scrollPosition = $(window).scrollTop();
      var isMobile = window.innerWidth < 768; // Adjust this value based on your mobile breakpoint

      // On resize to mobile, add 'scrolled' class
      if (isMobile) {
        if (scrollPosition < 50) {
          $(".navbar .navbar-toggler").addClass("scrolled");
        }
      }

      // Scroll behavior
      if (scrollPosition >= 300) {
        $(".navbar-toggler").addClass("scrolled");
      } else if (scrollPosition >= 50) {
        $(".navbar-toggler").removeClass("scrolled");
      } else if (!isMobile) {
        // Ensure class is removed on larger screens when scrolling back to the top
        $(".navbar-toggler").removeClass("scrolled");
      }
    });

    // Close the offcanvas when smooth anchor is clicked
    $(".offcanvas-body").on("click", ".nav-link.smooth-anchor", function () {
      // Hide the offcanvas (just like clicking the toggler to close)
      var offcanvasElement = $("#offcanvasRight");
      var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement[0]); // Get the offcanvas instance
      bsOffcanvas.hide(); // Close the offcanvas
    });

    /*----------------------------------------------
		4. Filter Items
		----------------------------------------------*/

    const filterItems = document.querySelectorAll(".filter-items");

    if (filterItems.length) {
      document
        .querySelectorAll(".explore-area")
        .forEach((exploreArea, index) => {
          const count = index + 1;

          // Update classes
          exploreArea.querySelectorAll(".filter-items").forEach((el) => {
            el.classList.remove("filter-items");
            el.classList.add(`filter-items-${count}`);
          });

          exploreArea.querySelectorAll(".filter-item").forEach((el) => {
            el.classList.remove("filter-item");
            el.classList.add(`filter-item-${count}`);
          });

          exploreArea.querySelectorAll(".filter-btn").forEach((el) => {
            el.classList.remove("filter-btn");
            el.classList.add(`filter-btn-${count}`);
          });

          // Initialize Shuffle
          const Filter = new Shuffle(
            document.querySelector(`.filter-items-${count}`),
            {
              itemSelector: `.filter-item-${count}`,
              buffer: 1,
            }
          );

          // Add event listeners
          exploreArea
            .querySelectorAll(`.filter-btn-${count}`)
            .forEach((btn) => {
              btn.addEventListener("change", function (e) {
                if (e.target.checked) {
                  Filter.filter(e.target.value);
                }
              });
            });
        });
    }

    /*----------------------------------------------
		5. Transition
		----------------------------------------------*/

    window.addEventListener("load", function () {
      // Check if any of the target elements for the animations exist in the DOM
      if (
        document.querySelector(".animate-hero") ||
        document.querySelector(".animate-top") ||
        document.querySelector(".animate-bottom") ||
        document.querySelector(".animate-line") ||
        document.querySelector(".animate-left") ||
        document.querySelector(".animate-right")
      ) {
        // Creating a default timeline
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: "power2.out",
            opacity: 1,
            transformStyle: "preserve-3d",
          },
        });

        // Timeline Animation
        tl.fromTo(
          ".animate-hero",
          {
            opacity: 0,
            transform: "translate3d(0px, 100px, 0px) skew(0deg, 7deg)",
          },
          {
            transform: "translate3d(0px, 0px, 0px) skew(0deg, 0deg)",
          },
          0
        )
          .fromTo(
            ".animate-top",
            {
              opacity: 0,
              transform: "translate3d(0px, -100px, 0px)",
            },
            {
              transform: "translate3d(0px, 0px, 0px)",
            },
            0
          )
          .fromTo(
            ".animate-bottom",
            {
              opacity: 0,
              transform: "translate3d(0px, 100px, 0px)",
            },
            {
              transform: "translate3d(0px, 0px, 0px)",
            },
            0
          )
          .fromTo(
            ".animate-line",
            {
              opacity: 0,
              transform: "translate3d(0px, 0px, 0px) scale3d(0, 0, 0)",
            },
            {
              transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1)",
            },
            0
          )
          .fromTo(
            ".animate-left",
            {
              opacity: 0,
              transform: "translate3d(100px, 0px, 0px)",
            },
            {
              transform: "translate3d(0px, 0px, 0px)",
            },
            0
          )
          .fromTo(
            ".animate-right",
            {
              opacity: 0,
              transform: "translate3d(-100px, 0px, 0px)",
            },
            {
              transform: "translate3d(0px, 0px, 0px)",
            },
            0
          );
      }
    });
  });
})(jQuery);
