const subregions = {
  seoul: ["강남구", "종로구", "서초구"],
  busan: ["해운대구", "수영구", "부산진구"],
  gyunggi: ["수원시", "고양시", "용인시"],
  // Add more subregions as needed
};

const regionNames = {
  seoul: "서울특별시",
  busan: "부산광역시",
  gyunggi: "경기도",
  // Add more mappings as needed
};

function updateSubregions() {
  const regionSelect = document.getElementById("regionSelect");
  const subregionSelect = document.getElementById("subregionSelect");
  const selectedRegion = regionSelect.value;

  // Clear previous subregions
  subregionSelect.innerHTML = '<option value="">선택하세요</option>';

  // Populate new subregions
  if (subregions[selectedRegion]) {
    subregions[selectedRegion].forEach((subregion) => {
      const option = document.createElement("option");
      option.value = subregion;
      option.textContent = subregion;
      subregionSelect.appendChild(option);
    });
  }
}

function addBadge() {
  const regionSelect = document.getElementById("regionSelect");
  const subregionSelect = document.getElementById("subregionSelect");
  const badgeContainer = document.getElementById("badgeContainer");
  const selectedRegion = regionSelect.value;
  const selectedSubregion = subregionSelect.value;

  if (selectedRegion && selectedSubregion) {
    const badge = document.createElement("span");
    badge.className = "badge badge-primary";
    badge.textContent = `${regionNames[selectedRegion]} ${selectedSubregion}`;

    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-btn";
    removeBtn.innerHTML = "&times;";
    removeBtn.onclick = function () {
      badgeContainer.removeChild(badge);
    };

    badge.appendChild(removeBtn);
    badgeContainer.appendChild(badge);
  }
}

function search() {
  const badges = document.querySelectorAll(".badge");
  const selectedSubregions = [];

  badges.forEach((badge) => {
    const text = badge.textContent.slice(0, -1); // Remove the '×' character
    selectedSubregions.push(text);
  });

  alert("선택된 지역: " + selectedSubregions.join(", "));
  // Here you can add code to perform the search operation
}
