gsap.registerPlugin(ScrollTrigger, TextPlugin);
// gsap.registerPlugin(TextPlugin);

// document.querySelectorAll(".scroll-type").forEach((element) => {
//   element.style.height = `${element.offsetHeight}px`;
// });

// function scrollTrigger(selector, options = {}) {
//   let els = document.querySelectorAll(selector);
//   els = Array.from(els);
//   els.forEach((el) => {
//     addObserver(el, options);
//   });
// }

// function addObserver(el, options) {
//   if (!("IntersectionObserver" in window)) {
//     if (options.cb) {
//       options.cb(el);
//     } else {
//       entry.target.classList.add("active");
//     }
//     return;
//   }
//   let observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         if (options.cb) {
//           options.cb(entry.target);
//         } else {
//           entry.target.classList.add("active");
//         }
//         observer.unobserve(entry.target);
//       }
//     });
//   }, options);
//   observer.observe(el);
// }

function animateRandomItem() {
  const disenoWebItems = document.querySelectorAll(".diseno-web-item");
  const randomIndex = Math.floor(
    Math.random() *
      Array.from(disenoWebItems).filter(
        (item) => getComputedStyle(item).display !== "none"
      ).length
  );
  const randomItem = disenoWebItems[randomIndex];
  randomItem.classList.add("animated");
  randomItem.addEventListener(
    "animationend",
    () => {
      randomItem.classList.remove("animated");
      animateRandomItem();
    },
    { once: true }
  );
}

animateRandomItem();

// Setup
const scroller = document.querySelector(".scroller");

const bodyScrollBar = Scrollbar.init(scroller, {
  damping: 0.1,
  delegateTo: document,
  alwaysShowTracks: true,
});

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  },
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });

gsap.from(".intro-1", {
  x: -500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-1",
    toggleActions: "play none none reset",
  },
});

gsap.from(".intro-2", {
  x: 500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-2",
    toggleActions: "play none none reset",
  },
});

gsap.to(".intro-type", {
  text: "Esperamos que disfrutes navegando por el sitio y que encuentres la cabaña perfecta para tus próximas vacaciones",
  duration: 5,
  delay: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".intro-type",
    // start: "top 10%",
    toggleActions: "play none none reset",
  },
});

gsap.from(".intro-3", {
  y: 500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-3",
    toggleActions: "play none none reset",
  },
});

gsap.from(".intro-4-1", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-4-1",
    toggleActions: "play none none reset",
  },
});


gsap.from(".intro-4-2", {
  x: -500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-4-2",
    start: "top 25%",
    toggleActions: "play none none reset",
  },
});

gsap.from(".intro-4-3", {
  x: 500,
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-4-2",
    start: "top 25%",
    toggleActions: "play none none reset",
  },
});
