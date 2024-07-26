let rankingJson = [];
window.onload = fetchData;

// 입출고 순위 데이터 가져오기
async function fetchData() {
  try {
    const response = await axios.get("ranking.json");
    rankingJson = response.data;
    console.log(rankingJson);
    createTable(rankingJson);
  } catch (error) {
    console.error("Fetch error가 발생했습니다.");
  }
}

//테이블 채우기
function createTable(data) {
  const tableBody = document.querySelector("table tbody");
  tableBody.innerHTML = ""; // 기존 테이블 내용 삭제

  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${item.rack}</td>
          <td>${item.itemName}</td>
          <td>${item.modelName}</td>
          <td>${item.manufacturer}</td>
          <td>${item.usage}</td>
          <td>${item.date}</td>
          <td>${item.specification}</td>
          <td>${item.quantity}</td>
      `;
    tableBody.appendChild(row);
  });
}
