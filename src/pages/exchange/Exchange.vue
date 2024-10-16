<template>
  <HeaderNormal navbarTitle="환율 리스트" />

  <div class="container">
    <div style="margin-left: 15px;">

      <h5>통화 환율(금일 00시 기준 업데이트)</h5>


      <p style="color: #9B9B9B;">원하는 통화를 선택하면 상세페이지로 이동됩니다.</p>
    </div>

    <div v-for="currency in filteredCurrencies" :key="currency.feno" class="currency-card">
      <div class="currency-header">
        <div class="currency-info">
          <img :src="currency.imgUrl" :alt="currency.forexName" />
          <router-link :to="{ path: '/exchange/detail', query: { feno: currency.feno } }" class="no-underline">
            <h7>{{ currency.forexName }}</h7>
          </router-link>
        </div>
        <div class="icon" @click="toggleFavorite(currency)"> <!-- 변경: deposit -> currency -->
          <i :class="currency.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: currency.favorite ? '#FAB809' : '#888' }"></i>
        </div>
      </div>
      <div class="currency-rates">
        <div class="rate-item">
          <p class="label">매매기준율</p>
          <p class="highlight rate">{{ currency.forexBasicRate.toLocaleString() }}</p>
        </div>
        <div class="rate-item">
          <p class="label">입금(환전)할 때</p>
          <p class="rate">{{ currency.forexBuy.toLocaleString() }}</p>
        </div>
        <div class="rate-item">
          <p class="label">원화로 환전할 때</p>
          <p class="rate">{{ currency.forexSell.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, computed, onMounted } from 'vue';
import forexApi from '@/api/forexApi'; // Axios API 인스턴스 가져오기
import wishApi from '@/api/wishApi'; // wish API 가져오기

const searchQuery = ref('');
const forexes = ref([]); // 외환 정보를 저장할 배열
const wishes = ref([]);
const uno = ref(null);

// 외환 정보 가져오기
const fetchForexes = async () => {
  try {
    const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
    uno.value = authData.uno; // uno 값 설정

    // 모든 예금 상품을 먼저 불러오기
    forexes.value = await forexApi.fetchAllForex();

    // 사용자 관심 목록 불러오기 (try-catch로 감싸서 오류 방지)
    try {
      wishes.value = await wishApi.fetchAllWishes();
    } catch (error) {
      console.warn("No wishes found or error fetching wishes:", error);
      wishes.value = [];
    }

    // 관심 목록에서 tno가 1인 상품의 pno를 사용해 deposit.favorite 설정
    const favoritePnos = wishes.value
      .filter(wish => wish.tno === 5)
      .map(wish => wish.pno);

      forexes.value.forEach(forex => {
        forex.favorite = favoritePnos.includes(forex.feno);
    });

  } catch (error) {
    console.error("Error fetching forexes:", error);
  }
};

// 즐겨찾기 토글 함수
const toggleFavorite = async (forex) => {
  try {
    forex.favorite = !forex.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (forex.favorite) {
      await wishApi.addWish({ tno: 5, uno: uno.value, pno: forex.feno });
    } else {
      await wishApi.deleteWish({ tno: 5, uno: uno.value, pno: forex.feno });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    forex.favorite = !forex.favorite; // 오류 시 원래 상태로 복구
  }
};


// 컴포넌트가 마운트될 때 외환 정보 가져오기
onMounted(() => {
  fetchForexes();
});


// 검색 필터링된 통화 목록
const filteredCurrencies = computed(() => {
  return forexes.value.filter((forex) =>
    forex.forexName.includes(searchQuery.value)
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
.fo{
  font-size: 10px;
}
.rate{
  margin-right: 10px;
}

.icon {
  color: gray;
  position: absolute;
  transform: translateX(1230%);
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
