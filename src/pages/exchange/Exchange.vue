<template>
    <div class="container">
      <div class="header">
        <!-- 백버튼 추가 -->
        <button class="back-button" @click="goBack"><i class="fa-solid fa-arrow-left"></i></button>
        <h1>환율 리스트</h1>
      </div>

      <hr>
      <h5>통화 환율</h5>
      <p>원하는 통화를 선택하면 입금(환전)으로 이동됩니다.</p>
      <router-link to="/exchangedetailpage">
      <div v-for="currency in filteredCurrencies" :key="currency.code" class="currency-card">
        <div class="currency-header">
        <div class="currency-info">
          <img :src="currency.flagUrl" :alt="currency.name" />
          <h2>{{ currency.name }}</h2>
        </div>
          <div class="favorite" @click="toggleFavorite(currency)">
            <span :class="{'active': currency.isFavorite}"><i class="fa-solid fa-heart"></i></span>
          </div>
        </div>
        <div class="currency-rates">

          <div class="rate-item">
          <p>매매기준율</p>
          <p class="highlight">{{ currency.standardRate.toFixed(2) }}</p>
          </div>

          <div class="rate-item">
          <p>입금(환전)할 때</p>
          <p class="highlight">{{ currency.depositRate.toFixed(2) }}</p>
          </div>
          <div class="rate-item">
          <p>원화로 환전할 때</p>
          <p class="highlight">{{ currency.withdrawalRate.toFixed(2) }}</p>
          </div>
        </div>
      </div>
      </router-link>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');

// 통화 정보
const currencies = ref([
  {
    name: '미국 달러(USD)',
    code: 'USD',
    flagUrl: 'https://via.placeholder.com/24x24.png?text=US',
    standardRate: 1344.50,
    depositRate: 1344.50,
    withdrawalRate: 1344.50,
    isFavorite: true,
  },
  {
    name: '일본 엔(JPY)',
    code: 'JPY',
    flagUrl: 'https://via.placeholder.com/24x24.png?text=JP',
    standardRate: 1344.50,
    depositRate: 1344.50,
    withdrawalRate: 1344.50,
    isFavorite: false,
  },
  {
    name: '유럽 유로(EUR)',
    code: 'EUR',
    flagUrl: 'https://via.placeholder.com/24x24.png?text=EU',
    standardRate: 1344.50,
    depositRate: 1344.50,
    withdrawalRate: 1344.50,
    isFavorite: false,
  },
]);

// 즐겨찾기 토글 함수
const toggleFavorite = (currency) => {
  currency.isFavorite = !currency.isFavorite;
};

// 검색 필터링된 통화 목록
const filteredCurrencies = computed(() => {
  return currencies.value.filter((currency) =>
      currency.name.includes(searchQuery.value)
  );
});

// 백버튼 기능 (뒤로가기)
const goBack = () => {
  window.history.back();  // 브라우저의 뒤로가기 기능을 호출
};
</script>

<style scoped>

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 150px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 1.5rem;
  margin: 0 auto;
}
h5{
  font-weight: 700;
}

.back-button {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 10px;
}

.currency-header {
  display: flex;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  width: 85%;           /* 가로 크기는 유지 */
  height: 0px;          /* 높이를 자동으로 조정 */
  padding: 3px;          /* 패딩을 줄여서 높이를 줄임 */
  margin: 5px;
}

.currency-card {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.currency-info {
  display: flex;
  align-items: center;
  height: 0px;
}

.currency-info img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
  margin-bottom: 100px;
}

.currency-info h2 {
  font-size: 1rem;
  margin: 0;
  margin-bottom: 100px;
}

.currency-rates {
  display: block;
  margin-top: 20px;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
}

.rate-item p {
  margin: 5px 0;
  color: #555;
}
.currency-rates p {
  margin: 5px 0;
  color: #555;
  text-align: center;
}

.currency-rates .highlight {
  color: #ff9900;
  font-weight: bold;
}

.favorite {
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 95px;
  height: 50px;
  width: 60px;
}

.favorite .active {
  color: #ffcc00;
}
</style>