{
  // from http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) {
      let e = window.event;
    }
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy,
    };
  };

  // From https://davidwalsh.name/javascript-debounce-function.
  const debounce = (func, wait, immediate) => {
    let timeout;
    return () => {
      let context = this,
        args = arguments;
      let later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  const distance = (x1, x2, y1, y2) => {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  };

  let win = { width: window.innerWidth, height: window.innerHeight };
  let center = { x: win.width / 2, y: win.height / 2 };

  class GridItem {
    constructor(el, options) {
      this.CONFIG = {
        filledColor: "#fff",
      };
      Object.assign(this.CONFIG, options);
      this.DOM = {};
      this.DOM.el = el;
      const bcr = this.DOM.el.getBoundingClientRect();
      this.itemCenter = {
        x: bcr.left + bcr.width / 2,
        y: bcr.top + bcr.height / 2,
      };
      this.revealer = new Revealer(this.DOM.el, {
        color:
          this.CONFIG.filledColor ||
          window.getComputedStyle(document.body, null).backgroundColor,
      });
      this.initEvents();
    }
    initEvents() {
      window.addEventListener("resize", (ev) => debounce(this.onresize()));
    }
    onresize(ev) {
      const bcr = this.DOM.el.getBoundingClientRect();
      this.itemCenter = {
        x: bcr.left + bcr.width / 2,
        y: bcr.top + bcr.height / 2,
      };
    }
    show(animation = true) {
      return animation
        ? this.revealer.show({
            direction: this.DOM.el.dataset.direction || "rtl",
            delay: this.DOM.el.dataset.delay || 0,
          })
        : this.revealer.show();
    }
    hide(animation = true) {
      return animation
        ? this.revealer.hide({
            direction: this.DOM.el.dataset.direction || "rtl",
            delay: this.DOM.el.dataset.delay || 0,
          })
        : this.revealer.hide();
    }
    showFilled() {
      return this.revealer.showFilled({
        direction: this.DOM.el.dataset.direction || "rtl",
        delay: this.DOM.el.dataset.delay || 0,
      });
    }
    hideFilled() {
      return this.revealer.hideFilled({
        direction: this.DOM.el.dataset.direction || "rtl",
        delay: this.DOM.el.dataset.delay || 0,
      });
    }
    setTransform(transform) {
      const dist = distance(
        this.itemCenter.x,
        this.itemCenter.y,
        center.x,
        center.y
      );
      const tx = (transform.translateX / win.width) * dist || 0;
      const ty = (transform.translateY / win.height) * dist || 0;
      this.DOM.el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    }
  }

  class Grid {
    constructor(el, options) {
      this.CONFIG = {
        filledColor: "#fff",
      };
      Object.assign(this.CONFIG, options);
      this.DOM = {};
      this.DOM.el = el;
      this.DOM.items = Array.from(
        this.DOM.el.querySelectorAll("div.grid__item")
      );
      this.layout();
    }
    layout() {
      this.itemsTotal = this.DOM.items.length;
      this.items = [];
      this.DOM.items.forEach((item) =>
        this.items.push(
          new GridItem(item, { filledColor: this.CONFIG.filledColor })
        )
      );
    }
    show(filled = false, animation = true) {
      return new Promise((resolve, reject) => {
        this.DOM.el.classList.add("grid--animating");
        this.hideItems();

        this.DOM.el.classList.add("grid--current");
        const promises = [];
        for (let i = 0; i < this.itemsTotal; i++) {
          const promise = filled
            ? this.items[i].showFilled()
            : this.items[i].show(animation);
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          this.DOM.el.classList.remove("grid--animating");
          resolve();
        });
      });
    }
    hide(filled = false, animation = true) {
      return new Promise((resolve, reject) => {
        this.DOM.el.classList.add("grid--animating");
        const promises = [];
        for (let i = 0; i < this.itemsTotal; i++) {
          const promise = filled
            ? this.items[i].hideFilled()
            : this.items[i].hide(animation);
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          this.DOM.el.classList.remove("grid--animating");
          this.DOM.el.classList.remove("grid--current");
          resolve();
        });
      });
    }
    hideItems() {
      for (let i = 0; i < this.itemsTotal; i++) {
        this.items[i].hide(false);
      }
    }
    tilt(transform) {
      for (let i = 0; i < this.itemsTotal; i++) {
        const item = this.items[i];
        item.setTransform(transform);
      }
    }
  }

  class GridManager {
    constructor(grid, options) {
      this.CONFIG = {
        filledColor: false, // false || colorvalue (e.g. '#666')
        hasTilt: false,
        tilt: { maxTranslationX: 50, maxTranslationY: 50 },
      };
      Object.assign(this.CONFIG, options);
      this.DOM = {};
      this.DOM.grid = grid;
      this.init();
    }
    init() {
      this.grid = new Grid(this.DOM.grid, {
        filledColor: this.CONFIG.filledColor,
      });
      this.initEvents();
    }
    initEvents() {
      if (this.CONFIG.hasTilt) {
        document.addEventListener("mousemove", (ev) => this.onmousemove(ev));
        window.addEventListener("resize", (ev) => debounce(this.onresize()));
      }
      this.grid.show();
    }
    onmousemove(ev) {
      requestAnimationFrame(() => {
        const mousepos = getMousePos(ev);
        const transX =
          ((2 * this.CONFIG.tilt.maxTranslationX) / win.width) * mousepos.x -
          this.CONFIG.tilt.maxTranslationX;
        const transY =
          ((2 * this.CONFIG.tilt.maxTranslationY) / win.height) * mousepos.y -
          this.CONFIG.tilt.maxTranslationY;
        this.grid.tilt({
          translateX: transX,
          translateY: transY,
        });
      });
    }
    onresize(ev) {
      win = { width: window.innerWidth, height: window.innerHeight };
      center = { x: win.width / 2, y: win.height / 2 };
    }
  }

  window.GridManager = GridManager;
}
