let jsonAll = [];
let jsonList = [];
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
    const response = await fetch("material.json"); // JSON 파일 경로
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();

    populateTable(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

function populateTable(data) {
  const tableBody = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  data.forEach((item) => {
    const row = document.createElement("tr");

    Object.values(item).forEach((text) => {
      const cell = document.createElement("td");
      cell.textContent = text;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}

// 밑은 모달창
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
