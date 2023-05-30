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
const customCursor = document.querySelector(".custom-cursor");
window.addEventListener("mousemove", (e) => {
  customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) scale(0.5)`;
});
document.querySelectorAll("[data-cursor]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    customCursor.classList.add("active");
    customCursor.classList.add(el.getAttribute("data-cursor"));
  });
  el.addEventListener("mouseleave", () => {
    customCursor.classList.remove("active");
    customCursor.classList.remove(el.getAttribute("data-cursor"));
  });
});
