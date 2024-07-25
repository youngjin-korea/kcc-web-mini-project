document.addEventListener("DOMContentLoaded", function () {
  fetch("newMaterialModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);

      // 모달창이 로드된 후에 이벤트 리스너를 추가합니다.
      const newCustomRangeweight = document.getElementById(
        "newCustomRangeweight"
      );
      const newCustomNumber = document.getElementById("newCustomNumber");

      newCustomRangeweight.addEventListener("input", function () {
        newUpdateValueFromRange(newCustomRangeweight.value);
      });

      newCustomNumber.addEventListener("input", function () {
        newUpdateValueFromNumber(newCustomNumber.value);
      });
    })
    .catch((error) => console.error("Error loading the modal:", error));
});

function updateValueFromRange(value) {
  document.getElementById("rangeValue").innerText = value;
  document.getElementById("customNumber").value = value;
}

function updateValueFromNumber(value) {
  if (value < 0) value = 0;
  if (value > 100) value = 100;
  document.getElementById("rangeValue").innerText = value;
  document.getElementById("customRangeweight").value = value;
}

function newUpdateValueFromRange(value) {
  document.getElementById("newRangeValue").innerText = value;
  document.getElementById("newCustomNumber").value = value;
}

function newUpdateValueFromNumber(value) {
  if (value < 0) value = 0;
  if (value > 100) value = 100;
  document.getElementById("newRangeValue").innerText = value;
  document.getElementById("newCustomRangeweight").value = value;
}
