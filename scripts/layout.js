const sidebar = document.querySelector(".js-sidebar");
const navToggle = document.querySelector(".js-nav-toggle");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent this click from bubbling to body
  sidebar.classList.toggle("active");
  document.body.classList.toggle("sidebar-open");
});

// Close sidebar when clicking on overlay (anywhere outside sidebar)
document.addEventListener("click", (e) => {
  if (
    document.body.classList.contains("sidebar-open") &&
    !sidebar.contains(e.target) && // click is outside sidebar
    !navToggle.contains(e.target) // click is not the toggle button
  ) {
    sidebar.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  }
});
