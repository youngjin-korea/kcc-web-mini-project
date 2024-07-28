const fs = require('fs');

// 원래 데이터 세트
const originalData = [
  {
    "id": 1,
    "checked": false,
    "category": "입고",
    "barcode": "23072600001",
    "itemName": "사과",
    "modelName": "APL-1234",
    "manufacturer": "Fruit Co.",
    "specification": "BOX",
    "processingDate": "2024-03-15"
  },
  {
    "id": 2,
    "checked": false,
    "category": "출고",
    "barcode": "23072600002",
    "itemName": "배",
    "modelName": "PER-5678",
    "manufacturer": "Fruit Co.",
    "specification": "BOX",
    "processingDate": "2024-05-20"
  },
  // ... (원래 데이터 세트의 나머지 항목들)
];

// 아이템 이름들
const itemNames = ["사과", "배", "포도", "오렌지", "바나나", "딸기", "키위", "망고", "파인애플", "레몬", "라임", "복숭아", "자두", "체리", "블루베리", "라즈베리", "블랙베리", "석류", "자몽", "크랜베리", "멜론", "수박", "감", "밤", "대추", "무화과", "코코넛", "구아바", "파파야", "패션프루트"];
const categories = ["입고", "출고"];
const manufacturers = ["Fruit Co.", "Berry Farm", "Tropical Fruits Co.", "Citrus Inc.", "Orchard Co.", "Vineyard Ltd."];

// 임의의 날짜 생성 함수
function getRandomDate(start, end) {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

// 확장된 데이터 생성
const extendedData = [];

for (let i = 1; i <= 1000; i++) {
  const randomItemName = itemNames[Math.floor(Math.random() * itemNames.length)];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomManufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
  const randomModelName = `${randomItemName.slice(0, 3).toUpperCase()}-${Math.floor(Math.random() * 10000)}`;
  const randomSpecification = ["BOX", "KG", "BUNCH"][Math.floor(Math.random() * 3)];
  const randomProcessingDate = getRandomDate(new Date(2024, 0, 1), new Date(2024, 11, 31));

  extendedData.push({
    id: i,
    checked: false,
    category: randomCategory,
    barcode: `23072600${String(i).padStart(3, '0')}`,
    itemName: randomItemName,
    modelName: randomModelName,
    manufacturer: randomManufacturer,
    specification: randomSpecification,
    processingDate: randomProcessingDate
  });
}

// JSON 파일로 저장
fs.writeFileSync('ranking.json', JSON.stringify(extendedData, null, 2));
console.log('1000개의 항목이 포함된 ranking.json 파일이 생성되었습니다.');
