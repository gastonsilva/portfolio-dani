// gsap.defaults({
//   // ease: "power2.inOut",
//   // duration: 1,
// });
gsap.registerPlugin(ScrollTrigger, TextPlugin);

animateRandomItem = () => {
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
};
animateRandomItem();

const scroller = document.querySelector("#scroller");
const mainScrollBar = Scrollbar.init(scroller, {
  damping: 0.1,
  delegateTo: document,
  alwaysShowTracks: true,
});
ScrollTrigger.scrollerProxy("#scroller", {
  scrollTop(value) {
    if (arguments.length) {
      mainScrollBar.scrollTop = value;
    }
    return mainScrollBar.scrollTop;
  },
});
mainScrollBar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: scroller });

// Only for development
if (window.location.href.includes("localhost")) {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollPosition", mainScrollBar.offset.y);
  });
  window.addEventListener("load", () => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      mainScrollBar.setPosition(0, scrollPosition, { withoutCallbacks: true });
      localStorage.removeItem("scrollPosition");
    }
  });
}

gsap.to(".gallery", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".menu",
    scrub: true,
  },
});

const menuSymbols = gsap.utils.toArray(".menu .menu-symbol");
menuSymbols.forEach((symbol, idx) => {
  gsap.from(symbol, {
    opacity: 0,
    x: "-500px",
    rotation: 360,
    scrollTrigger: {
      trigger: ".menu",
      scrub: true,
      start: `top bottom-=${50 - idx * 10}%`,
      end: `top bottom-=${100 - idx * 10}%`,
    },
  });
});

const menuTexts = gsap.utils.toArray(".menu .menu-text");
menuTexts.forEach((text, idx) => {
  gsap.from(text, {
    opacity: 0,
    x: "-500px",
    scrollTrigger: {
      trigger: ".menu",
      scrub: true,
      start: `top bottom-=${50 - idx * 10}%`,
      end: `top bottom-=${100 - idx * 10}%`,
    },
  });
});

gsap.from(".main-title", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".main-title",
    scrub: true,
  },
});

gsap.to(".menu", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-1",
    start: "-25% 25%",
    end: "top 25%",
    scrub: true,
  },
});

gsap.from(".intro-1", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".intro-1",
    start: "-50% center",
    end: "-25% 25%",
    scrub: true,
  },
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-1",
      start: "top 25%",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  })
  .to(".intro-1", {
    opacity: 0,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-2",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  })
  .from(".intro-2-0", {
    opacity: 0,
  })
  .to(".intro-2-0", {
    opacity: 0,
  });

// gsap.from(".intro-2-0", {
//   opacity: 0,
//   scrollTrigger: {
//     trigger: ".intro-2",
//     pin: true,
//     scrub: true,
//   },
// });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-2",
      start: "top top",
      scrub: "0.5",
    },
  })
  .from(".intro-2-1", {
    ease: "power2.out",
    x: 500,
    opacity: 0,
  })
  .to(".intro-2-1", {
    opacity: 0,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-3",
      scrub: true,
      pin: true,
      pinSpacing: false,
    },
  })
  .to(".intro-type", {
    text: "Esperamos que disfrutes navegando por el sitio y que encuentres la cabaña perfecta para tus próximas vacaciones",
    duration: 0.75,
    delay: 0.05,
    ease: "none",
  })
  .to(".intro-type", {
    duration: 0.25,
    opacity: 0,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-4",
      pin: true,
      pinSpacing: false,
      scrub: true,
    },
  })
  .from(".intro-4", {
    x: 500,
    duration: 0.15,
    opacity: 0,
  })
  .addPause(0.5)
  .to(".intro-4", {
    x: -500,
    duration: 0.15,
    opacity: 0,
  })
  .addPause(0.2);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-5",
      pin: true,
      pinSpacing: false,
      scrub: true,
    },
  })
  .from(".intro-5-title", {
    duration: 0.25,
    opacity: 0,
  })
  .addPause(0.5)
  .to(".intro-5-title", {
    duration: 0.25,
    opacity: 0,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-5",
      scrub: true,
    },
  })
  .from(".intro-5-0", {
    duration: 0.25,
    opacity: 0,
    x: -500,
  })
  .addPause(0.5)
  .to(".intro-5-0", {
    duration: 0.25,
    opacity: 0,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".intro-5",
      scrub: true,
    },
  })
  .from(".intro-5-1", {
    duration: 0.25,
    opacity: 0,
    x: 500,
  })
  .addPause(0.5)
  .to(".intro-5-1", {
    duration: 0.25,
    opacity: 0,
  });

gsap.timeline({
  scrollTrigger: {
    trigger: ".plan",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

const plans = gsap.utils.toArray(".plan-item");
plans.forEach((plan, idx) => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".plan",
        scrub: true,
      },
    })
    .from(plan, {
      opacity: 0,
      x: `${idx % 2 ? 500 : -500}px`,
      duration: 0.3,
      // scrollTrigger: {
      //   trigger: plan,
      //   scrub: true,
      // },
    })
    .addPause(0.4)
    .to(plan, {
      opacity: 0,
      duration: 0.3,
    });
});

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".emp",
      scrub: true,
    },
  })
  .from(".emp-1", {
    x: 500,
    opacity: 0,
    duration: 0.5,
  })
  .addPause(0.5)
  .to(".emp", {
    opacity: 0,
    duration: 0.5,
  });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".emp",
      scrub: true,
    },
  })
  .from(".emp-2", {
    x: -500,
    opacity: 0,
    duration: 0.5,
  })
  .addPause(1);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".def",
      scrub: true,
    },
  })
  .from(".gt1", {
    x: -500,
    opacity: 0,
    duration: 1/3,
  })
  .addPause(2/3);

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".def",
      scrub: true,
    },
  })
  .from(".gt2", {
    x: -500,
    opacity: 0,
    duration: 1/3,
  })
  .addPause(2/3);

gsap.set(".def", { filter: "blur(0px)" });
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".def",
      scrub: true,
    },
  })
  .from(".def", {
    filter: "blur(10px)",
    duration: 0.25,
  })
  .addPause(0.5)
  .to(".def", {
    filter: "blur(10px)",
    duration: 0.25,
  });

gsap.to(".colores", {
  text: "Colores tierras y verdosos puede transmitir una sensación de naturaleza, tranquilidad, serenidad y frescura.",
  scrollTrigger: {
    trigger: ".colores",
    scrub: true,
  },
});

gsap.from(".boc4", {
  
})

if (window.location.href.includes("localhost")) {
  // Only necessary to correct marker position - not needed in production
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
    mainScrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }
}
