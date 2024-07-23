document.addEventListener("DOMContentLoaded", function () {
  fetch("/WebContent/components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;

      const toggleButton = document.getElementById("toggle-nav-btn");

      toggleButton.addEventListener("click", function () {
        const navbar = document.getElementById("navbar");
        const content = document.querySelector(".content");
        navbar.classList.toggle("collapsed");

        if (navbar.classList.contains("collapsed")) {
          toggleButton.innerHTML = "&#9776;"; // 햄버거 모양
          content.style.marginLeft = "100px";
        } else {
          toggleButton.innerHTML = "&times;"; // X 모양
          content.style.marginLeft = "250px";
        }
      });
    });
});
