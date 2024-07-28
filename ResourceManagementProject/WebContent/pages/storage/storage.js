let jsonAll = [];
let jsonList = [];
let currentClickedRow = null;
let barcode = 0;
window.onload = fetchData;

document.addEventListener("DOMContentLoaded", function () {
  // 오늘 날짜를 yyyy-mm-dd 형식으로 출력하는 코드
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // 당일 바코드 번호 생성
  barcode = parseInt(`${String(year).slice(-2) + month + day}00000`);

  // <main> 태그의 첫 번째 요소를 선택합니다
  const header = document.getElementsByTagName("header")[0];

  // <main> 태그가 존재하는 경우, 날짜를 설정합니다
  if (header) {
    header.insertAdjacentText("beforeend", ` ${formattedDate}`);
  }
});

// json fetch -> 재고쪽 데이터 페칭 및 테이블 생성
async function fetchData() {
  try {
    const response = await fetch("material.json"); // JSON 파일 경로
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    jsonAll = [...data];

    populateTable(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// data 객체의 tr 생성 함수
function populateTable(data) {
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");

    // 행에 고유 ID를 설정 (예: "row-1", "row-2", ...)
    row.id = `row-${index + 1}`;

    row.addEventListener("click", (e) => {
      clickedList(item, e);
    });

    Object.values(item).forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}
// data 객체의 tr 생성 함수
function populateTable(data) {
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");

    // 행에 고유 ID를 설정 (예: "row-1", "row-2", ...)
    row.id = `row-${index + 1}`;

    row.addEventListener("click", (e) => {
      clickedList(item, e);
    });

    Object.values(item).forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// 검색기능
window.enterkeySearch = (event) => {
  if (event.keyCode == 13 || event.type === "click") {
    searchItem();
  }
};

function searchItem() {
  const modelName = document.getElementById("model-name").value.toLowerCase();
  const itemName = document.getElementById("material-name").value.toLowerCase();

  const filteredData = jsonAll.filter(
    (material) =>
      material.modelName.toLowerCase().includes(modelName) &&
      material.itemName.toLowerCase().includes(itemName)
  );

  populateTable(filteredData);
}

// 자재 click 시 바코드 및 생성 날짜 생성
function clickedList(item, e) {
  // 현재 클릭된 행
  const clickedRow = e.currentTarget;

  // 이전 클릭된 행에서 ID 제거
  if (currentClickedRow && currentClickedRow !== clickedRow) {
    currentClickedRow.removeAttribute("id");
  }

  // 클릭된 행에 ID 설정
  clickedRow.id = "clickedColor";

  // 현재 클릭된 행을 업데이트
  currentClickedRow = clickedRow;

  // 클릭된 행의 item 정보와 ID 출력
  console.log("아이템 값: ", item);
  console.log("클릭된 행의 ID: ", clickedRow.id);
}

// 입고완료 이벤트
document
  .getElementById("complete-button")
  .addEventListener("click", addBarcodes);

function addBarcodes() {
  if (!currentClickedRow) {
    alert("먼저 행을 선택하세요.");
    return;
  }

  const tdContent = currentClickedRow.getElementsByTagName("td")[2].textContent;
  const quantity = parseInt(document.getElementById("quantity-input").value);
  console.log(quantity);

  if (isNaN(quantity) || quantity <= 0) {
    alert("수량을 입력하세요.");
    return;
  }

  jsonAll = jsonAll.map((it) => {
    if (it.modelName === tdContent) {
      const sum = it.currentStock + quantity;
      return { ...it, currentStock: sum };
    }
    return it; // 조건이 맞지 않는 경우 원래의 객체를 반환
  });

  const tableBody = document
    .getElementById("table-s")
    .getElementsByTagName("tbody")[0];
  const today = new Date().toISOString().slice(0, 10);
  console.log(new Date().toISOString());
  tableBody.innerHTML = "";
  for (let i = 0; i < quantity; i++) {
    const row = document.createElement("tr");
    const noCell = document.createElement("td");
    const dateCell = document.createElement("td");
    const barcodeCell = document.createElement("td");

    noCell.textContent = tableBody.getElementsByTagName("tr").length + 1;
    dateCell.textContent = today;
    barcodeCell.textContent = barcode++;

    row.appendChild(noCell);
    row.appendChild(dateCell);
    row.appendChild(barcodeCell);

    tableBody.appendChild(row);
  }

  currentClickedRow.removeAttribute("id");
  currentClickedRow = null;
  populateTable(jsonAll);
  alert(`${tdContent}: ${quantity}(EA/BOX) 추가되었습니다.`);
}

// 신규자재 생성 이벤트
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

      const closeBtn = document.getElementById("closeBtn");
      closeBtn.addEventListener("click", function () {
        // 필드 초기화
        resetModalFields();
      });

      const submitBtn = document.getElementById("submitBtn");
      submitBtn.addEventListener("click", function () {
        const materialName = document
          .getElementById("materialNameInput")
          .value.trim();
        const modelName = document
          .getElementById("modelNameInput")
          .value.trim();
        const manufacturer = document
          .getElementById("manufacturerInput")
          .value.trim();
        const specification = document
          .querySelector('select[aria-label="규격"]')
          .value.trim();
        const usage = document.getElementById("usageInput").value.trim();

        // 값이 모두 입력되었는지 확인
        if (
          !materialName ||
          !modelName ||
          !manufacturer ||
          !specification ||
          !usage
        ) {
          alert("값을 모두 입력하여야 등록할 수 있습니다.");
          return;
        }

        // 중복 여부 확인
        const isDuplicate = jsonAll.some(
          (item) =>
            item.itemName === materialName || item.modelName === modelName
        );

        if (isDuplicate) {
          alert("이미 존재하는 자재입니다.");
          return;
        }

        // 자재 등록
        jsonAll.push({
          warehouseNumber: String(jsonAll.length + 1).padStart(3, "0"),
          itemName: materialName,
          modelName: modelName,
          manufacturer: manufacturer,
          specification: specification,
          usage: usage,
          currentStock: 0,
        });
        alert("자재가 성공적으로 등록되었습니다.");

        populateTable(jsonAll);

        // 필드 초기화 및 모달 닫기
        resetModalFields();
        const closeEvent = document.querySelector(
          "#createMaterialModal .btn-close"
        );
        closeBtn.click();
      });
    })
    .catch((error) => console.error("Error loading the modal:", error));
});

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

function resetModalFields() {
  document.getElementById("materialNameInput").value = "";
  document.getElementById("modelNameInput").value = "";
  document.getElementById("manufacturerInput").value = "";
  document.querySelector('select[aria-label="카테고리"]').value =
    "카테고리 선택";
  document.querySelector('select[aria-label="규격"]').value = "규격 선택";
  document.getElementById("usageInput").value = "";
  document.getElementById("newCustomRangeweight").value = 50;
  document.getElementById("newCustomNumber").value = 50;
  document.getElementById("newRangeValue").innerText = 50;
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
