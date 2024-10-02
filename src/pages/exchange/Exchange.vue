<template>
  <HeaderNormal navbarTitle="환율 리스트" />

  <div class="container">
    <div style="margin-left: 15px;">
      <h5>통화 환율</h5>
      <p style="color: #9B9B9B;">원하는 통화를 선택하면 상세페이지로 이동됩니다.</p>
    </div>

    <div v-for="currency in filteredCurrencies" :key="currency.feno" class="currency-card">
      <div class="currency-header">
        <div class="currency-info">
          <img :src="getFlagUrl(currency.forexName)" :alt="currency.forexName" />
          <router-link :to="{ path: '/exchange/detail', query: { feno: currency.feno } }" class="no-underline">
            <h7>{{ currency.forexName }}</h7>
          </router-link>
        </div>
        <div class="favorite" @click="toggleFavorite(currency)" style="margin-bottom: 20px;">
          <span>
            <i :class="['fa-solid', 'fa-heart', 'icon', { 'favorite-active': currency.isFavorite }]"></i>
          </span>
        </div>
      </div>
      <div class="currency-rates">
        <div class="rate-item">
          <p class="label">매매기준율</p>
          <p class="highlight rate">{{ currency.forexBasicRate.toFixed(2) }}</p>
        </div>
        <div class="rate-item">
          <p class="label">입금(환전)할 때</p>
          <p class="rate">{{ currency.forexBuy.toFixed(2) }}</p>
        </div>
        <div class="rate-item">
          <p class="label">원화로 환전할 때</p>
          <p class="rate">{{ currency.forexSell.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, computed, onMounted } from 'vue';
import forexApi from '@/api/forexApi'; // Axios API 인스턴스 가져오기

const searchQuery = ref('');
const currencies = ref([]); // 외환 정보를 저장할 배열

// 외환 정보 가져오기
const fetchCurrencies = async () => {
  try {
    currencies.value = await forexApi.fetchAllForex(); // 외환 정보 API 호출
  } catch (error) {
    console.error("Failed to fetch currencies:", error);
  }
};

// 플래그 URL 반환 함수
const getFlagUrl = (forexName) => {
  switch (forexName) {
    case 'CNH':
      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png';
    case 'EUR':
      return 'https://i.namu.wiki/i/-aDCVSLRt5Gn7KGaXNZyjNVxjRey1gnfmg_16JrK7bqY1ihROnM1YVkzE1Da-FZWCp6JORbIBfVSSUIRjq0XfA.svg';
    case 'GBP':
      return 'https://i.namu.wiki/i/WNw8JiSr4x94S6McVTaDj70J_VmBtOPAV6NzP5FBOyRXD7E7nalYplrZeyGtsKq8KyAezsTqtS3Uec3jchRRUw.svg';
    case 'JPY(100)':
      return 'https://i.namu.wiki/i/uPDCkQv1zGpaEdmeqmEDRIM3nMyRD2BslQUouPpxpI5M-PkGdmxPwxFJvu9RCUUVYg2XOH4rfedfkxhnDqfumw.svg';
    case 'USD':
      return 'https://i.namu.wiki/i/fFkDY65WFfapNpAB8Np7V7kVd3rWE_cAgEZMGS2vdPJGJAfM463_PzmVHD_TJbg8_XGoCPrAmL84JrqjfTSIyA.svg';
    default:
      return ''; // 기본값은 빈 문자열
  }
};

// 컴포넌트가 마운트될 때 외환 정보 가져오기
onMounted(() => {
  fetchCurrencies();
});

// 즐겨찾기 토글 함수
const toggleFavorite = (currency) => {
  currency.isFavorite = !currency.isFavorite;
};

// 검색 필터링된 통화 목록
const filteredCurrencies = computed(() => {
  return currencies.value.filter((currency) =>
    currency.forexName.includes(searchQuery.value)
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
  margin-left: 10px;
}

.currency-info img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
  object-fit: cover;
  border: 0.5px solid gray;
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
  margin-left: 10px;
}

.rate{
  margin-right: 10px;
}

.icon {
  color: gray;
  position: absolute;
  transform: translateX(-170%);
  cursor: pointer;
  font-size: 23px;
}

.icon.favorite-active {
  color: #ffbf0a; /* 선택 시 노란색 */
}

.no-underline {
  text-decoration: none;
  color: #595959;
}

.highlight{
  color: #F8A70C;

}
</style>
