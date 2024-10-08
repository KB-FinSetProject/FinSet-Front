<template>
  <HeaderSearch />

  <div class="stock-container">
    <div class="search-container">
      <input
        v-model="searchTerm"
        placeholder="검색어를 입력하세요"
        class="search-input"
      />
      <!-- 검색 아이콘 클릭 시 /search/results로 이동 -->
      <router-link
        :to="{ path: '/search/results', query: { term: searchTerm } }"
      >
        <template v-slot="{ navigate }">
          <i class="fas fa-magnifying-glass search-icon" @click="navigate"></i>
        </template>
      </router-link>
    </div>
    <p class="example-text">ex) 500000원에 맞는 주식을 찾아줘</p>
    <p class="example-text">ex) 3000000, 3년, 펀드</p>

    <hr class="divider" />

    <div v-if="searchResults.length > 0">
      <h2 class="section-title">검색 결과</h2>
      <div class="results-container">
        <div class="result-item" v-for="result in searchResults" :key="result.id">
          {{ result.name }}
        </div>
      </div>
    </div>

    <h2 class="section-title">상품 바로가기</h2>
    <div class="quick-links">
      <div class="button-container">
        <router-link to="/deposit" class="quick-button">예금</router-link>
        <router-link to="/installment" class="quick-button">적금</router-link>
        <router-link to="/stock" class="quick-button">주식</router-link>
        <router-link to="/fund" class="quick-button">펀드</router-link>
        <router-link to="/forex" class="quick-button">외환</router-link>
      </div>
    </div>

    <h2 class="section-title">최근 키워드</h2>
    <div class="recent-keywords">
      <div class="keyword-container">
        <button v-for="keyword in recentKeywords" :key="keyword" class="keyword-button">
          {{ keyword }}
          <i class="fa-solid fa-xmark icon" @click="removeKeyword(keyword)"></i>
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
      searchResults: [], // 검색 결과 저장
    };
  },
  methods: {
    removeKeyword(keyword) {
      // 클릭한 키워드를 recentKeywords에서 제거
      this.recentKeywords = this.recentKeywords.filter(k => k !== keyword);
    }
  }
};
</script>

<script setup>
import HeaderSearch from '@/components/common/HeaderSearch.vue';
</script>

<style scoped>
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
  color: black; /* 글씨색 */
}

.search-input:focus {
  outline: none;
  border-color: #FFA500 !important;
  box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
}

.search-icon {
  position: absolute; /* 아이콘 위치를 절대적으로 설정 */
  right: 10px; /* 오른쪽 여백 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-92%); /* 세로 중앙 정렬 */
  color: #000000; /* 아이콘 색상 */
  font-size: 21px; /* 아이콘 크기 조정 */
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
  flex-wrap: wrap; /* 가로 정렬 및 필요 시 줄바꿈 */
  gap: 10px; /* 상품 바로가기 버튼 간격 */
}

.quick-button {
  padding: 5px 15px; /* 크기 조정 */
  background-color: #FFBF0A;
  border: none;
  border-radius: 20px; /* 모서리 둥글게 유지 */
  cursor: pointer;
  color: white;
  text-decoration: none;
  display: inline-block; /* 인라인 블록 요소로 변경 */
}

.keyword-container{
  display: flex;
  flex-wrap: wrap; /* 가로 정렬 및 필요 시 줄바꿈 */
  gap: 10px; /* 상품 바로가기 버튼 간격 */
}

.keyword-button {
  padding: 5px 20px; /* 가로 길이 늘리기 */
  background-color: #816843;
  border: none;
  border-radius: 20px; /* 모서리 둥글게 유지 */
  cursor: pointer;
  color: white;
}

.icon{
  margin-left: 10px;
}
</style>
