document.addEventListener("DOMContentLoaded", () => {
  fetch("../../../data/warehouse.json")
    .then((response) => response.json())
    .then((data) => {
      populateTable(data);
    });
});

function populateTable(data) {
  const tableBody = document.getElementById("warehouseTableBody");
  tableBody.innerHTML = "";
  data.forEach((warehouse) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${warehouse.warehouseNumber}</td>
          <td>${warehouse.warehouseName}</td>
          <td>${warehouse.location}</td>
          <td>${warehouse.category}</td>
          <td>${warehouse.maxLoad}</td>
      `;
    tableBody.appendChild(row);
  });
}

function searchWarehouse() {
  const code = document
    .getElementById("searchWarehouseCode")
    .value.toUpperCase();
  const name = document.getElementById("searchWarehouseName").value;

  fetch("warehouse.json")
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.filter(
        (warehouse) =>
          (!code || warehouse.warehouseNumber.includes(code)) &&
          (!name || warehouse.warehouseName.includes(name))
      );
      populateTable(filteredData);
    });
}

function createNewWarehouse() {
  // document.getElementById("warehouseCode").value = "";
  // document.getElementById("warehouseName").value = "";
  // document.getElementById("warehouseLocation").value = "";
  // document.getElementById("rowNumber").value = "";
  // document.getElementById("colNumber").value = "";
  // document.getElementById("warehouseCategory").value = "상온";
}

function deleteWarehouse() {
  const code = document.getElementById("warehouseCode").value.toUpperCase();
  if (!code) return alert("창고 코드를 입력하세요.");

  fetch("warehouse.json")
    .then((response) => response.json())
    .then((data) => {
      const newData = data.filter(
        (warehouse) => warehouse.warehouseNumber !== code
      );
      populateTable(newData);
    });
}

function saveWarehouse() {
  const code = document.getElementById("warehouseCode").value.toUpperCase();
  const name = document.getElementById("warehouseName").value;
  const location = document.getElementById("warehouseLocation").value;
  const rowNumber = document.getElementById("rowNumber").value;
  const colNumber = document.getElementById("colNumber").value;
  const category = document.getElementById("warehouseCategory").value;

  if (!code || !name || !location || !rowNumber || !colNumber || !category) {
    return alert("모든 필드를 입력하세요.");
  }

  fetch("../../../data/warehouse.json")
    .then((response) => response.json())
    .then((data) => {
      const index = data.findIndex(
        (warehouse) => warehouse.warehouseNumber === code
      );
      if (index >= 0) {
        data[index] = {
          warehouseNumber: code,
          warehouseName: name,
          location,
          rowNumber,
          colNumber,
          category,
          maxLoad: rowNumber * colNumber,
        };
      } else {
        data.push({
          warehouseNumber: code,
          warehouseName: name,
          location,
          rowNumber,
          colNumber,
          category,
          maxLoad: rowNumber * colNumber,
        });
      }
      populateTable(data);
    });
}

// warehouseSetting.js
document.addEventListener("DOMContentLoaded", function () {
  fetch("newWarehouseModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => console.error("Error loading the modal:", error));
});
