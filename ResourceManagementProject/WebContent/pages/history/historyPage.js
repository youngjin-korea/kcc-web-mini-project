let jsonAll = [];

// 페이지 로드되면 바로 데이터 불러오게 하기.
window.onload = fetchData;

// 입출고내역 데이터 가져오기
async function fetchData() {
  try {
    const response = await fetch("history.json"); // JSON 파일 경로
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    jsonAll = [...data];
    console.log(jsonAll);
    createTable(jsonAll);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// 테이블에 데이터 추가
function createTable(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // 기존 내용 지우기

  data.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <input type="checkbox" class="delete-checkbox" />
      </td>      
      <td>${item.category}</td>
      <td>${item.barcode}</td>
      <td>${item.itemName}</td>
      <td>${item.modelName}</td>
      <td>${item.manufacturer}</td>
      <td>${item.specification}</td>
      <td>${item.processingDate}</td>
      <td>
        <button type="button" onclick="alert('클릭!')">
          <img class="deleteImg" src="./static/deleteImg.jpg" />
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// 날짜 버튼 선택 시 dateStart 값 변경
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date();
  const btnToday = document.getElementById("btnradio1");
  const btnWeek = document.getElementById("btnradio2");
  const btnMonth = document.getElementById("btnradio3");
  const btnSixMonths = document.getElementById("btnradio4");
  const dateStart = document.getElementById("dateStart");
  const dateEnd = document.getElementById("dateEnd");

  btnToday.addEventListener("click", () => {
    dateStart.valueAsDate = new Date(today);
    dateEnd.valueAsDate = new Date(today);
  });

  btnWeek.addEventListener("click", () => {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    dateStart.valueAsDate = weekAgo;
    dateEnd.valueAsDate = new Date(today);
  });

  btnMonth.addEventListener("click", () => {
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    dateStart.valueAsDate = monthAgo;
    dateEnd.valueAsDate = new Date(today);
  });

  btnSixMonths.addEventListener("click", () => {
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    dateStart.valueAsDate = sixMonthsAgo;
    dateEnd.valueAsDate = new Date(today);
  });

  // 검색 버튼 클릭 시 데이터 필터링
  document.querySelector(".search").addEventListener("click", () => {
    const selectInput = document.getElementById("selectInput").value;
    const searchType = document.querySelector(
      'input[name="searchType"]:checked'
    ).value;
    const searchBar = document.getElementById("searchBar").value.toLowerCase();
    const dateStartValue = new Date(document.getElementById("dateStart").value);
    const dateEndValue = new Date(document.getElementById("dateEnd").value);

    const filteredData = jsonAll.filter((item) => {
      const itemDate = new Date(item.processingDate);
      const searchMatch = item[searchType].toLowerCase().includes(searchBar);

      return (
        (selectInput === "전체" || item.category === selectInput) &&
        itemDate >= dateStartValue &&
        itemDate <= dateEndValue &&
        searchMatch
      );
    });

    createTable(filteredData);
  });

  // 초기화 버튼 클릭 시 필터 초기화
  document
    .querySelector(".button.btn-secondary")
    .addEventListener("click", () => {
      // 구분을 전체로 설정
      document.getElementById("selectInput").value = "전체";

      // 선택박스를 자재명으로 설정
      document.getElementById("item").checked = true;

      // 기간을 오늘로 설정
      const today = new Date();
      document.getElementById("dateStart").valueAsDate = today;
      document.getElementById("dateEnd").valueAsDate = today;

      // 검색창 초기화
      document.getElementById("searchBar").value = "";

      // 기간선택 버튼 초기화
      document.getElementById("btnradio1").checked = true;

      // 전체 내역으로 다시 출력
      createTable(jsonAll);
    });
});

// 삭제 버튼 클릭 시 선택된 항목 삭제
document.querySelector(".btn-outline-danger").addEventListener("click", () => {
  // 1. 모든 체크박스 요소를 선택하여 NodeList로 반환합니다.
  const checkboxes = document.querySelectorAll(".delete-checkbox");

  // 2. 각 체크박스를 반복하여 처리합니다.
  checkboxes.forEach((checkbox) => {
    // 3. 체크박스가 선택된 경우에만 처리합니다.
    if (checkbox.checked) {
      // 4. 체크박스의 data-index 속성을 가져와 정수로 변환합니다. 이 값은 배열에서 항목의 인덱스를 나타냅니다.
      const index = parseInt(checkbox.dataset.index, 10);

      // 5. 인덱스에 해당하는 항목을 jsonAll 배열에서 삭제합니다. splice 메서드는 배열에서 특정 항목을 제거합니다.
      jsonAll.splice(index, 1);
    }
  });

  // 6. jsonAll 배열의 현재 상태를 기준으로 테이블을 다시 만듭니다.
  createTable(jsonAll);
});
