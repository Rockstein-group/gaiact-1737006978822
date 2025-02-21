document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");
  console.log("navLinksnavLinks", navLinks);
  const currentPath = window.location.pathname;

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      href &&
      currentPath != "/" &&
      href.includes(currentPath.replace(/^\/+|\/+$/g, ""))
    ) {
      link.classList.add("text-[#AEC90C]");
    } else {
      link.classList.remove("text-[#AEC90C]");
    }
  });
});
