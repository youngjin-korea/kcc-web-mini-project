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

// 모달창용 값 변경 함수
function newUpdateValueFromNumber(value) {
  if (value < 0) value = 0;
  if (value > 100) value = 100;
  document.getElementById("newRangeValue").innerText = value;
  document.getElementById("newCustomRangeweight").value = value;
}

document.addEventListener("DOMContentLoaded", function () {
  loadMaterialData();
});

async function loadMaterialData() {
  try {
    const response = await fetch("../../data/material.json");
    const materialData = await response.json();
    const tableBody = document.getElementById("materialTableBody");
    tableBody.innerHTML = "";

    materialData.forEach((material) => {
      const row = document.createElement("tr");
      Object.keys(material).forEach((key) => {
        const cell = document.createElement("td");
        cell.textContent = material[key];
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading material data:", error);
  }
}

function searchItem() {
  const modelName = document
    .getElementById("searchModelName")
    .value.toLowerCase();
  const materialName = document
    .getElementById("searchMaterialName")
    .value.toLowerCase();
  const manufacturer = document
    .getElementById("searchManufacturer")
    .value.toLowerCase();
  const category = document.getElementById("categorySelect").value;

  fetch("../../data/material.json")
    .then((response) => response.json())
    .then((materialData) => {
      const filteredData = materialData.filter((material) => {
        let match = true;

        if (
          materialName &&
          !material.materialName.toLowerCase().includes(materialName)
        ) {
          match = false;
        }

        if (
          modelName &&
          !material.modelName.toLowerCase().includes(modelName)
        ) {
          match = false;
        }

        if (
          manufacturer &&
          !material.manufacturer.toLowerCase().includes(manufacturer)
        ) {
          match = false;
        }

        if (
          category &&
          category !== "카테고리 선택" &&
          category !== "전체" &&
          material.category !== category
        ) {
          match = false;
        }

        return match;
      });

      const tableBody = document.getElementById("materialTableBody");
      tableBody.innerHTML = "";

      filteredData.forEach((material) => {
        const row = document.createElement("tr");

        Object.keys(material).forEach((key) => {
          const cell = document.createElement("td");
          cell.textContent = material[key];
          row.appendChild(cell);
        });

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error filtering material data:", error));
}
