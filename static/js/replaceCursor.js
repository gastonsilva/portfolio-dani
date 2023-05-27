// // const cursorList = ["triangle", "square", "circle"];
// const positionElement = (e) => {
//   const mouseY = e.clientY;
//   const mouseX = e.clientX;
//   // cursorList.forEach((cursor) => {
//   //   document
//   //     .querySelector(`.cursor-${cursor}`)
//   //     .style.transform(`translate3d(${mouseX}px, ${mouseY}px, 0)`);
//   // });
// };
// // window.addEventListener("mousemove", positionElement);
window.addEventListener("mousemove", (e) => {
  document.querySelector(
    ".custom-cursor"
  ).style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(0.5)`;
});
document.querySelectorAll("[data-cursor]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.querySelector(".custom-cursor").classList.add("active");
    document
      .querySelector(".custom-cursor")
      .classList.add(el.getAttribute("data-cursor"));
  });
  el.addEventListener("mouseleave", () => {
    document.querySelector(".custom-cursor").classList.remove("active");
    document
      .querySelector(".custom-cursor")
      .classList.remove(el.getAttribute("data-cursor"));
  });
});
