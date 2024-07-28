document.addEventListener("DOMContentLoaded", fetchData);

let rankingJson = [];

/*-----------------입출고 순위 데이터 가져오기-----------*/ 
async function fetchData() {
  try {
    const response = await axios.get("ranking.json");
    rankingJson = response.data;

    const aggregatedData = countData(rankingJson);
    createTable(aggregatedData);
  } catch (error) {
    console.error("Fetch error가 발생했습니다.", error);
  }
}

// 데이터를 그룹화하여 수량을 합산하는 함수
function countData(data) {
  const count = data.reduce((acc, item) => {
    const key = item.modelName;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 }; // 처음에는 수량을 1로 설정
    } else {
      acc[key].quantity += 1; // 수량을 누적
    }
    return acc;
  }, {});

  return Object.values(count);
}

// 테이블 채우기
function createTable(data) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = ""; // 기존 테이블 내용 삭제

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.warehouseNumber}</td>
      <td>${item.itemName}</td>
      <td>${item.modelName}</td>
      <td>${item.manufacturer}</td>
      <td>${item.usage}</td>
      <td>${item.specification}</td>
      <td>${item.quantity}</td> <!-- 수량 추가 -->
    `;
    tableBody.appendChild(row);
  });
}
