<template>
  <div class="stock-container">
    <h1>상품검색</h1>
    <input
        v-model="searchTerm"
        placeholder="검색어를 입력하세요"
        class="search-input"
    />
    <p class="example-text">ex) 500000원에 맞는 주식을 찾아줘</p>
    <p class="example-text">ex) 3000000, 3년, 펀드</p>

    <h2 class="section-title">상품 바로가기</h2>
    <div class="quick-links">
      <button v-for="link in quickLinks" :key="link" class="quick-button">
        {{ link }}
      </button>
    </div>

    <h2 class="section-title">최근 키워드</h2>
    <div class="recent-keywords">
      <button v-for="keyword in recentKeywords" :key="keyword" class="keyword-button">
        {{ keyword }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      quickLinks: ['예적금', '주식', '펀드', '외환'],
      recentKeywords: ['적금', '주식', '외환'],
    };
  },
};
</script>

<style>
.stock-container {
  padding: 16px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.example-text {
  font-size: 12px;
  color: #888;
  margin: 0 0 16px;
}

.section-title {
  font-size: 16px; /* 줄이고 굵게 */
  font-weight: bold; /* 굵게 */
  margin: 16px 0 8px; /* 여백 조정 */
}

.quick-links {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.quick-button {
  padding: 10px 40px; /* 가로 길이 늘리기 */
  background-color: #FFBF0A;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  flex-grow: 1; /* 버튼을 가로로 늘리기 */
}

.recent-keywords {
  display: flex;
  gap: 10px;
}

.keyword-button {
  padding: 10px 40px; /* 가로 길이 늘리기 */
  background-color: #816843;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  color: white;
  flex-grow: 1; /* 버튼을 가로로 늘리기 */
}
</style>
