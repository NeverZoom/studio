import $ from "jquery";
window.jQuery = $;
window.$ = $;

gsap.registerPlugin(ScrollTrigger);

  // preloader
  var images = document.images,
    images_total_count = images.length,
    images_loaded_count = 0,
    perc_display = document.getElementById("loader-counter"),
    preloader = document.getElementById("page-preloader");

  for (var i = 0; i < images_total_count; i++) {
    var image_clone = new Image();
    image_clone.onload = image_loaded;
    image_clone.onerror = image_loaded;
    image_clone.src = images[i].src;
  }

  function image_loaded() {
    images_loaded_count++;
    perc_display.innerHTML =
      (((100 / images_total_count) * images_loaded_count) << 0) + "%";
		var size = (((100 / images_total_count) * images_loaded_count) << 0) + "%";
		$("#line").css('width',  size);

    if (images_loaded_count >= images_total_count) {
      setTimeout(function () {
        if (!preloader.classList.contains("done")) {
          preloader.classList.add("done");
					setTimeout(function () {
						preloader.classList.add("done1");
					}, 1000)
        }
      }, 1000);
    }
  }


document.addEventListener("DOMContentLoaded", () => {
	//cursor
  var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: window.innerWidth / 2,
    endY: window.innerHeight / 2,
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector(".cursor-dot"),
    $outline: document.querySelector(".cursor-dot-outline"),

    init: function () {
      // Set up element sizes
      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;

      this.setupEventListeners();
      this.animateDotOutline();
    },

    setupEventListeners: function () {
      var self = this;

      // Anchor hovering
      document.querySelectorAll("a").forEach(function (el) {
        el.addEventListener("mouseover", function () {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
        });
        el.addEventListener("mouseout", function () {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
        });
      });

      // Click events
      document.addEventListener("mousedown", function () {
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      document.addEventListener("mouseup", function () {
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });

      document.addEventListener("mousemove", function (e) {
        // Show the cursor
        self.cursorVisible = true;
        self.toggleCursorVisibility();

        // Position the dot
        self.endX = e.pageX;
        self.endY = e.pageY;
        self.$dot.style.top = self.endY + "px";
        self.$dot.style.left = self.endX + "px";
      });

      // Hide/show cursor
      document.addEventListener("mouseenter", function (e) {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        self.$dot.style.opacity = 1;
        self.$outline.style.opacity = 1;
      });

      document.addEventListener("mouseleave", function (e) {
        self.cursorVisible = true;
        self.toggleCursorVisibility();
        self.$dot.style.opacity = 0;
        self.$outline.style.opacity = 0;
      });
    },

    animateDotOutline: function () {
      var self = this;

      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$outline.style.top = self._y + "px";
      self.$outline.style.left = self._x + "px";

      requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
      var self = this;

      if (self.cursorEnlarged) {
        self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
        self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
      } else {
        self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
        self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
      }
    },

    toggleCursorVisibility: function () {
      var self = this;

      if (self.cursorVisible) {
        self.$dot.style.opacity = 1;
        self.$outline.style.opacity = 1;
      } else {
        self.$dot.style.opacity = 0;
        self.$outline.style.opacity = 0;
      }
    },
  };
  cursor.init();

  //gsap
  if (window.screen.width > 1200) {
		gsap.utils.toArray(".dark_transition").forEach((panel, i) => {
			ScrollTrigger.create({
				trigger: panel,
				start: "top 0%", 
				end: "top 0%",
				pin: true,
				pinSpacing: false,
				endTrigger: ".end_transition",
				// markers: true,
			});
		});
	}

  
  function initPortfolioSec() {
    const container = document.querySelector(".portfolio-scroll");
    let tl2 = gsap.timeline({
      scrollTrigger: {
        pin: true,
        scrub: 1,
        trigger: container,
        start: "top 10%", 
        // markers: true,
        end: () => container.scrollWidth - document.documentElement.clientWidth
      },
      defaults: { ease: "none", duration: 1 }
    });
  
    tl2
      .to(
        ".panel",
        {
          x: () => -(container.scrollWidth - document.documentElement.clientWidth)
        },
        0
      ).from(
        ".secondAn",
        {
          // opacity: 0,
          // scale: 0.25,
          duration: 0.2,
          // stagger: {
          //   amount: 0.8
          // }
        },
        0
      );

      gsap.from(".firstAn", {
        duration: 1,
        // opacity: 0,
        // scale: 0.25,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse"
        }
      });

  } // END initPortfolioSec
  
  initPortfolioSec();
  
  
  $('body').on('click', '.service_item', function(){
    location.href = $(this).data('href');
  });







});
