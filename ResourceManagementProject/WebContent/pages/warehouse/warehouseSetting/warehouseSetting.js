document.addEventListener("DOMContentLoaded", function () {
  fetch("../../../data/warehouse.json")
    .then((response) => response.json())
    .then((data) => {
      warehouseArray = data;
      populateTable(warehouseArray);
    });

  fetch("newWarehouseModal.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch((error) => console.error("Error loading the modal:", error));
});

let warehouseArray = [];
let selectedRowIndex = null;

function populateTable(data) {
  const tableBody = document.getElementById("warehouseTableBody");
  tableBody.innerHTML = "";
  data.forEach((warehouse, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-index", index);
    row.addEventListener("click", () => selectRow(index));
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

function selectRow(index) {
  selectedRowIndex = index;
  const warehouse = warehouseArray[index];
  document.getElementById("warehouseCode").value =
    warehouse.warehouseNumber || "";
  document.getElementById("warehouseName").value =
    warehouse.warehouseName || "";
  document.getElementById("warehouseLocation").value = warehouse.location || "";
  document.getElementById("rowNumber").value = warehouse.rowNumber || "";
  document.getElementById("colNumber").value = warehouse.colNumber || "";
  document.getElementById("warehouseCategory").value = warehouse.category || "";
}

function validateWarehouseFields(fields) {
  const { code, name, location, rowNumber, colNumber, category } = fields;
  if (!code || !name || !location || !rowNumber || !colNumber || !category) {
    swal("모든 필드를 입력하세요.", "", "warning");
    return false;
  }
  if (rowNumber <= 0 || colNumber <= 0) {
    swal("가로 및 세로 크기는 0보다 커야 합니다.", "", "warning");
    return false;
  }
  return true;
}

function saveWarehouse() {
  const code = document.getElementById("warehouseCode").value.toUpperCase();
  const name = document.getElementById("warehouseName").value;
  const location = document.getElementById("warehouseLocation").value;
  const rowNumber = parseInt(document.getElementById("rowNumber").value, 10);
  const colNumber = parseInt(document.getElementById("colNumber").value, 10);
  const category = document.getElementById("warehouseCategory").value;

  const fields = { code, name, location, rowNumber, colNumber, category };
  if (!validateWarehouseFields(fields)) return;

  const updatedWarehouse = {
    warehouseNumber: code,
    warehouseName: name,
    location,
    rowNumber,
    colNumber,
    category,
    maxLoad: rowNumber * colNumber * 100,
  };

  if (selectedRowIndex !== null) {
    warehouseArray[selectedRowIndex] = updatedWarehouse;
  } else {
    warehouseArray.push(updatedWarehouse);
  }

  populateTable(warehouseArray);
  swal("저장 완료", "창고 정보가 저장되었습니다.", "success");
}

function searchWarehouse() {
  const code = document
    .getElementById("searchWarehouseCode")
    .value.toUpperCase();
  const name = document.getElementById("searchWarehouseName").value;

  const filteredData = warehouseArray.filter(
    (warehouse) =>
      (!code || warehouse.warehouseNumber.includes(code)) &&
      (!name || warehouse.warehouseName.includes(name))
  );
  populateTable(filteredData);
}

function createWarehouse() {
  const form = document.getElementById("createWarehouseForm");

  const code = document.getElementById("newWarehouseCode").value.toUpperCase();
  const name = document.getElementById("newWarehouseName").value;
  const location = document.getElementById("newWarehouseLocation").value;
  const rowNumber = parseInt(document.getElementById("newRowNumber").value, 10);
  const colNumber = parseInt(document.getElementById("newColNumber").value, 10);
  const category = document.getElementById("newWarehouseCategory").value;

  const fields = { code, name, location, rowNumber, colNumber, category };
  if (!validateWarehouseFields(fields)) {
    form.classList.add("was-validated");
    return;
  }

  const newWarehouse = {
    warehouseNumber: code,
    warehouseName: name,
    location,
    rowNumber,
    colNumber,
    category,
    maxLoad: rowNumber * colNumber * 100,
  };

  warehouseArray.push(newWarehouse);
  populateTable(warehouseArray);

  alert("test");

  // 모달 닫기
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("createWarehouseModal")
  );
  modal.hide();

  // 폼 초기화
  form.reset();
  form.classList.remove("was-validated");

  swal("등록 완료", "새로운 창고 등록이 완료되었습니다!", "success");
}

function deleteWarehouse() {
  if (selectedRowIndex === null) {
    swal("선택된 창고가 없습니다.", "삭제할 창고를 선택해주세요.", "warning");
    return;
  }

  swal({
    title: "삭제 확인",
    text: "선택된 창고를 정말 삭제하시겠습니까?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      warehouseArray.splice(selectedRowIndex, 1);
      populateTable(warehouseArray);
      swal("삭제 완료", "선택된 창고가 삭제되었습니다.", "success");

      // settingArea 필드 값 지우기
      document.getElementById("warehouseCode").value = "";
      document.getElementById("warehouseName").value = "";
      document.getElementById("warehouseLocation").value = "";
      document.getElementById("rowNumber").value = "";
      document.getElementById("colNumber").value = "";
      document.getElementById("warehouseCategory").value = "";

      selectedRowIndex = null; // 선택된 창고 인덱스 초기화
    }
  });
}
function downloadExcel() {
  const worksheet = XLSX.utils.json_to_sheet(warehouseArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Warehouses");
  XLSX.writeFile(workbook, "warehouses.xlsx");
}
