let jsonAll = [];
let jsonList = [];
let currentClickedRow = null;
window.onload = fetchData;

document.addEventListener("DOMContentLoaded", function () {
  // 오늘 날짜를 yyyy-mm-dd 형식으로 출력하는 코드
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // <main> 태그의 첫 번째 요소를 선택합니다
  const header = document.getElementsByTagName("header")[0];

  // <main> 태그가 존재하는 경우, 날짜를 설정합니다
  if (header) {
    header.insertAdjacentText("beforeend", ` ${formattedDate}`);
  }
});

// json fetch -> 재고쪽
async function fetchData() {
  try {
    const response = await fetch("../storage/out.json"); // JSON 파일 경로
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

//검색기능
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
