const sections = document.querySelectorAll(
  "section",
  "header",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6"
);
window.addEventListener("scroll", () => {
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });
  window.location.hash = `#${currentSection}`;
});
