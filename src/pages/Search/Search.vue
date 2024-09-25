<template>
  <div class="stock-container">
    <div class="search-container">
      <input
          v-model="searchTerm"
          placeholder="검색어를 입력하세요"
          class="search-input"
      />
      <i class="fas fa-magnifying-glass search-icon"></i> <!-- 검색 아이콘 -->
    </div>
    <p class="example-text">ex) 500000원에 맞는 주식을 찾아줘</p>
    <p class="example-text">ex) 3000000, 3년, 펀드</p>

    <hr class="divider" /> <!-- 구분선 추가 -->
    <h2 class="section-title">상품 바로가기</h2>
    <div class="quick-links">
      <div class="button-container">
        <button v-for="link in quickLinks" :key="link" class="quick-button">
          {{ link }}
        </button>
      </div>
    </div>

    <h2 class="section-title">최근 키워드</h2>
    <div class="recent-keywords">
      <div class="keyword-container">
        <button v-for="keyword in recentKeywords" :key="keyword" class="keyword-button">
          {{ keyword }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      quickLinks: ['예적금', '주식', '펀드', '외환'],
      recentKeywords: ['A', 'B', 'C'],
    };
  },
};
</script>

<style>
.stock-container {
  padding: 16px;
}

.search-container {
  position: relative; /* 아이콘 위치 조정을 위한 relative 설정 */
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px; /* 간격 늘리기 */
  border: 2px solid #000; /* 테두리 두껍게 변경 */
  border-radius: 7px;
  background-color: #ffffff; /* 배경색 */
  color: #d1d1d1; /* 글씨색 */
}

.search-icon {
  position: absolute; /* 아이콘 위치를 절대적으로 설정 */
  right: 10px; /* 오른쪽 여백 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-92%); /* 세로 중앙 정렬 */
  color: #000000; /* 아이콘 색상 */
  font-size: 22px; /* 아이콘 크기 조정 */
}

.example-text {
  font-size: 12px;
  color: #888;
  margin: 4px 0; /* 위아래 간격 늘리기 */
}

.section-title {
  font-size: 16px; /* 줄이고 굵게 */
  font-weight: bold; /* 굵게 */
  margin: 16px 0 8px; /* 여백 조정 */
}

.divider {
  border: none;
  height: 1px; /* 선 높이 */
  background-color: #ccc; /* 회색 선 색상 */
  margin: 16px 0; /* 구분선과 위아래 간격 늘리기 */
}

.quick-links,
.recent-keywords {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* 상품 바로가기 버튼 간격 */
  margin-bottom: 16px;
}

.button-container {
  display: flex;
  gap: 10px; /* 상품 바로가기 버튼 간격 */
}

.keyword-container {
  display: flex;
  gap: 10px; /* 최근 키워드 버튼 간격 늘리기 */
}

.quick-button {
  padding: 5px 25px; /* 크기 조정 */
  background-color: #FFBF0A;
  border: none;
  border-radius: 20px; /* 모서리 둥글게 유지 */
  cursor: pointer;
  color: white;
}

.keyword-button {
  padding: 5px 35px; /* 가로 길이 늘리기 */
  background-color: #816843;
  border: none;
  border-radius: 20px; /* 모서리 둥글게 유지 */
  cursor: pointer;
  color: white;
}
</style>
