const sidebar = document.querySelector(".js-sidebar");
const sidebarToggleButton = document.querySelector(".js-sidebar-toggle");

sidebarToggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});
