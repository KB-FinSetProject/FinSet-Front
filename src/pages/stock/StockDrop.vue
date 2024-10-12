<template>
  <HeaderNormal navbarTitle="주식 상품" />

  <div class="stock-container">

    <div class="tabs-container">
      <router-link to="/stock" class="tab" active-class="active" style="color: #DADADA;">전체</router-link>
      <router-link to="/stockhigh" class="tab" active-class="active" style="color: #DADADA;">급상승 ▲</router-link>
      <router-link to="/stockdrop" class="tab" active-class="active">급하락 <span style="color: #547BC1;">▼</span></router-link>
    </div>

    <br>
    
    <div class="stock-list">
      <div v-for="(stock, index) in stocks" :key="stock.sno" class="stock-item">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <span class="stock-rank">{{ index + 1 }}</span>

            <div class="stock-logo" :style="{ backgroundColor: stock.logoColor }">
              <span>
                <img :src="stock.imgUrl" alt="Thumbnail" class="rounded-circle me-3" style="width: 40px; height: 40px; object-fit: cover; margin-left:20px">
              </span>
            </div>

            <div class="stock-detail">
              <router-link :to="{ name: 'stockChart', params: { sno: stock.sno } }" class="stock-name">{{ stock.stockName }}</router-link>
              <p class="stock-details">{{ formatNumber(stock.stockPrice) }}
                <span class="change" :style="{ color: getColor(stock.priceChangeRate) }">{{ stock.priceChangeRate }}</span>
              </p>
            </div>
          </div>

          <div class="stock-icon" @click="toggleFavorite(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: stock.favorite ? '#FFBB00' : '#888' }"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api/stockApi';
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import wishApi from '@/api/wishApi';

const cr = useRoute();
const router = useRouter();
const stocks = ref([]);

// 즐겨찾기 추가 메서드
const addWish = async (stock) => {
  stocks.value = await api.addWish(stock);
  console.log(stocks.value);
};

// 즐겨찾기 삭제 메서드
const removeWish = async (stock) => {
  stocks.value = await api.removeWish(stock);
  console.log(stock.value);
};

// API에서 주식 리스트를 가져오는 함수
const load = async () => {
  try {
    stocks.value = await api.getDrop();
    console.log(stocks.value);
  } catch (error) {
    console.error("Error loading stocks:", error);
  }
};
const formatNumber = (value) => {
  if (value != null) {
    return value.toLocaleString('ko-KR');
  }
  return value;
};
onMounted(async () => {
  await load(); // 주식 리스트 로드
  await loadWishes(); // 위시리스트 로드
});

// 즐겨찾기 토글 메서드
const toggleFavorite = async (stock) => {
  try {
    stock.favorite = !stock.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (stock.favorite) {
      await wishApi.addWish({ tno: 4, uno: uno.value, pno: stock.sno }); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({ tno: 4, uno: uno.value, pno: stock.sno }); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    stock.favorite = !stock.favorite; // 원래 상태로 복구
  }
};

// 데이터 로드 함수
const loadWishes = async () => {
  try {
    const wishes = await wishApi.fetchAllWishes(uno.value); // wishes 데이터를 가져옵니다.
    console.log("wish : ", wishes);

    // 관심 목록에서 tno가 4인 상품의 pno를 사용해 stock.favorite 설정
    const favoritePnos = wishes
      .filter(wish => wish.tno === 4) // tno가 4인 항목 필터링
      .map(wish => wish.pno); // pno 추출

    // 각 주식의 favorite 상태 설정
    stocks.value.forEach(stock => {
      stock.favorite = favoritePnos.includes(stock.sno); // 현재 주식이 즐겨찾기인지 확인
    });
  } catch (error) {
    console.error("Error loading wishes:", error);
  }
};

// 변동률에 따라 색상을 반환하는 메서드
const getColor = (change) => {
  const changeRate = parseFloat(change); // 문자열을 숫자로 변환
  return changeRate < 0 ? '#547BC1' : '#FF6767'; // 음수는 파란색, 양수는 빨간색
};

// 이미지 URL을 반환하는 메서드
const getStockImg = (imgUrl) => {
  return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
};

const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
const uno = ref(authData ? authData.uno : null); // uno 값을 가져오기
console.log("uno : ", uno.value);

console.log("Route Params:", cr.params);
console.log("Stocks:", stocks.value);
</script>


<style scoped>
/* 스타일은 그대로 유지합니다 */
.stock-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  margin-bottom: 100px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: 40px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 24px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.best-yield-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px; /* 제목과 구분선 간의 간격 유지 */
  color: #000000;
  text-align: center;
  margin: 0; /* 제목 마진 초기화 */
}

.divider {
  height: 2px;
  width: 100%;
  background-color: #e1e1e1;
  margin: 0; /* 마진 제거 */
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  bottom: 25px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 10px; /* 여백 추가 */
  background-color: white; /* 배경색 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  /* border: none; */ /* 테두리 제거 */
}

.stock-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stock-info {
  display: flex;
  align-items: center;
}

.stock-rank {
  font-size: 20px; /* 기존 16px에서 18px로 증가 */
  font-weight: bold;
  margin-right: 10px;
}
.stock-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  margin-right: 10px; /* 마진 추가 */
  margin-left: 5px;
}

.stock-name {
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.stock-detail {
  margin-left: 10px;
}

.stock-details {
  font-size: 14px;
  margin: 0;
}

.change {
  margin-left: 7px;
}

.stock-icon {
  font-size: 24px; /* 폰트 크기를 24px로 변경 */
  color: #888; /* 기본 색상 */
  margin-right: 15px;
  margin-top: 10px;
}


.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd;
  margin-top: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 1px 8px 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}
</style>


