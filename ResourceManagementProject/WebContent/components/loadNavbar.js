document.addEventListener("DOMContentLoaded", function () {
  fetch("/WebContent/components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
    });
});
