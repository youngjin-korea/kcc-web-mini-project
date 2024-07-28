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
        <button type="button" class="delete-btn" data-index="${index}">
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

      // 안내하기
      swal(
        "입출고내역 초기화",
        "입출고 내역 및 검색 조건을 초기화하였습니다.",
        "success"
      );
    });
});

// 삭제 버튼 클릭 시 선택된 항목 삭제
document.querySelector(".btn-outline-danger").addEventListener("click", () => {
  // 모든 체크박스 요소를 선택하여 NodeList로 반환
  const checkboxes = document.querySelectorAll(".delete-checkbox");

  // 체크된 항목이 있는지 확인
  const hasCheckedItem = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  );

  if (!hasCheckedItem) {
    swal("삭제할 항목을 추가해주세요.");
    return;
  }

  // 삭제 확인 메시지 표시 (custom confirm box with title)
  swal({
    title: "정말 삭제하겠습니까?",
    text: "삭제된 입출력 내역은 복구되지 않습니다.",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((checkbox) => {
    if (checkbox) {
      swal("선택한 입출력내역이 삭제 되었습니다.", {
        icon: "success",
      });

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          // 체크박스의 data-index 속성을 가져와 정수로 변환
          // 이 값은 배열에서 항목의 인덱스
          const index = parseInt(checkbox.dataset.index, 10);

          // 인덱스에 해당하는 항목을 jsonAll 배열에서 삭제
          // splice 메서드는 배열에서 특정 항목제거
          jsonAll.splice(index, 1);

          // jsonAll 배열의 현재 상태를 기준으로 테이블을 다시 생성
          createTable(jsonAll);
        }
      });
    } else {
      swal("삭제취소 하였습니다.");
    }
  });
});

// 삭제 버튼 클릭 시 각 항목 삭제
document.getElementById("tableBody").addEventListener("click", (event) => {
  if (event.target.closest(".delete-btn")) {
    const index = parseInt(
      event.target.closest(".delete-btn").dataset.index,
      10
    );

    // 삭제 확인 메시지 표시 (custom confirm box with title)
    swal({
      title: "입출고 내역 삭제",
      text: "정말 삭제하시겠습니까?\n삭제된 입출력 내역은 복구되지 않습니다.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("선택한 입출고 내역이 삭제되었습니다.", {
          icon: "success",
        });

        jsonAll.splice(index, 1);
        createTable(jsonAll);
      } else {
        swal("삭제 취소하였습니다.");
      }
    });
  }
});
