<template>
  <HeaderNormal navbarTitle="환율 리스트" />

  <div class="container">
    <div style="margin-left: 15px;">
      <h5>통화 환율</h5>
      <p style="color: #9B9B9B;">원하는 통화를 선택하면 상세페이지로 이동됩니다.</p>
    </div>

    <div v-for="currency in filteredCurrencies" :key="currency.code" class="currency-card">
      <div class="currency-header">
        <div class="currency-info">
          <img :src="currency.flagUrl" :alt="currency.name" />
          <router-link :to="`/exchangedetail`" class="no-underline">
            <h7>{{ currency.name }}</h7>
          </router-link>
        </div>
        <div class="favorite" @click="toggleFavorite(currency)">
          <span>
            <i :class="['fa-solid', 'fa-heart', 'icon', { 'favorite-active': currency.isFavorite }]"></i>
          </span>
        </div>
      </div>
      <div class="currency-rates">
        <div class="rate-item">
          <p class="label">매매기준율</p>
          <p class="highlight rate">{{ currency.standardRate.toFixed(2) }}</p>
        </div>
        <div class="rate-item">
          <p class="label">입금(환전)할 때</p>
          <p class="rate">{{ currency.depositRate.toFixed(2) }}</p>
        </div>
        <div class="rate-item">
          <p class="label">원화로 환전할 때</p>
          <p class="rate">{{ currency.withdrawalRate.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, computed } from 'vue';

const searchQuery = ref('');

// 통화 정보
const currencies = ref([
  {
    name: '미국 달러(USD)',
    code: 'USD',
    flagUrl: 'https://i.namu.wiki/i/5ac6l60QaKXGLqeGjkxO1kqHPZd-LJWM3DhbuxjjNmiZa5NaRekkUskLmuny2B_7ueHGx2sXE1bW_-TMg5yGIQ.svg',
    standardRate: 1344.50,
    depositRate: 1344.50,
    withdrawalRate: 1344.50,
    isFavorite: true,
  },
  {
    name: '일본 엔(JPY)',
    code: 'JPY',
    flagUrl: 'https://i.namu.wiki/i/uPDCkQv1zGpaEdmeqmEDRIM3nMyRD2BslQUouPpxpI5M-PkGdmxPwxFJvu9RCUUVYg2XOH4rfedfkxhnDqfumw.svg',
    standardRate: 1344.50,
    depositRate: 1344.50,
    withdrawalRate: 1344.50,
    isFavorite: false,
  },
  {
    name: '유럽 유로(EUR)',
    code: 'EUR',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/1200px-Flag_of_Europe.svg.png',
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
  box-sizing: border-box;
  margin-bottom: 150px;
  margin-top: -70px;
}

.currency-card {
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
}

.currency-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.currency-info {
  display: flex;
  align-items: center;
}

.currency-info img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
}

.currency-rates {
  margin-top: 10px;
  background-color: rgba(110, 96, 83, 0.17);
  padding: 15px 10px;
  border-radius: 10px;
  height: 125px;
  width: 320px;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  color: #595959;
}

.label {
  color: #595959;
}

.icon {
  color: gray;
  position: absolute;
  transform: translateX(-200%);
  cursor: pointer;
}

.icon.favorite-active {
  color: #ffbf0a; /* 선택 시 노란색 */
}

.no-underline {
  text-decoration: none;
  color: #595959;
}

</style>
