<template>
  <HeaderNormal navbarTitle="주식 상세" />

  <div class="container">
    <div class="stock-detail">
      <div class="stock-header">
        <img :src="stock.imgUrl" alt="Thumbnail" class="rounded-circle me-3 thumbnail" style="width:36px; height: 36px; margin-left: -15px;">

        <div class="stock-info">
          <h1 class="stock-name">{{ stock.stockName }}</h1>
          <span class="stock-price">{{ formatNumber(stock.stockPrice) }} 원</span>
        </div>
        <div class="stock-icon" @click="toggleFavorite">
          <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: stock.favorite ? '#FFBB00' : '#888' }"></i>
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <router-link 
        :to="{ name: 'stockChart', params: { sno: snoFromRoute } }" 
        class="tab" 
        active-class="active" 
        style="color: #DADADA;">
        차트
      </router-link>
      <router-link 
        :to="{ name: 'stockDetail', params: { sno: stock.sno } }" 
        class="tab" 
        active-class="active">
        종목정보
      </router-link>
      <router-link 
        :to="{ name: 'stockCommunity', params: { sno: stock.sno } }" 
        class="tab" 
        active-class="active" 
        style="color: #DADADA;">
        커뮤니티
      </router-link>
    </div>
    <br>

    <div class="stock-details">
      <h3 style="font-weight: bold;">시세</h3>
      <div class="price-range">
        <input type="range" v-model="currentPrice" :min="minValue" :max="maxValue" disabled class="range-slider">
        <div class="price-labels">
          <span class="min-price">1일 최저가</span>
          <span class="max-price">1일 최고가</span>
        </div>
        <div class="price-info">
          <span class="min-price-value">{{ formatNumber(stock.minValue) }} 원</span>
          <span class="max-price-value">{{ formatNumber(stock.maxValue) }} 원</span>
        </div>
      </div>

      <br>
      <div class="stock-info-grid">
        <div class="stock-info-item">
          <span>시가</span>
          <span style="font-weight: bold; color:#555555">{{ formatNumber(stock.openPrice) }} 원</span>
        </div>
        <hr style="margin: 0 15px; border-color:orange; width:300px">
        <div class="stock-info-item">
          <span>종가</span>
          <span style="font-weight: bold; color:#555555">{{ formatNumber(stock.closePrice) }} 원</span>
        </div>
        <hr style="margin: 0 15px; border-color:orange; width:300px">
        <div class="stock-info-item">
          <span>거래대금</span>
          <span style="font-weight: bold; color:#555555">{{ formatNumber(stock.tradingVol) }} 주</span>
        </div>
      </div>
      <br>

      <div class="additional-info">
        <div class="info-item">
          <h5 style="margin-top: 5px;">매출</h5>
          <h5 style="margin-bottom: 5px;">{{ stock.sales }}</h5>
        </div>
        <div class="info-item">
          <h5 style="margin-top: 5px;">영업이익</h5>
          <h5 style="margin-bottom: 5px;">{{ stock.profit }}</h5>
        </div>
        <div class="info-item">
          <h5 style="margin-top: 5px;">순수익</h5>
          <h5 style="margin-bottom: 5px;">{{ stock.income }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import { useRoute } from "vue-router";
import api from "@/api/stockApi.js";
import wishApi from "@/api/wishApi"; // wishApi import

const route = useRoute();
const snoFromRoute = route.params.sno;

const stock = ref({
  minValue: 0,
  maxValue: 0,
  openPrice: 0,
  closePrice: 0,
  tradingVol: 0,
  sales: 0,
  profit: 0,
  income: 0,
  favorite: false, // 초기값 설정
});

const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
const uno = ref(authData ? authData.uno : null); // uno 값을 가져오기
console.log("uno : ", uno.value);

const wishes = ref([]); // wishes 상태 변수 추가

// 즐겨찾기 토글 함수
const toggleFavorite = async () => {
  try {
    stock.value.favorite = !stock.value.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (stock.value.favorite) {
      await wishApi.addWish({ tno: 4, uno: uno.value, pno: stock.value.sno }); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({ tno: 4, uno: uno.value, pno: stock.value.sno }); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    stock.value.favorite = !stock.value.favorite; // 원래 상태로 복구
  }
};

// 주식 정보 로딩 함수
const loadStockDetails = async () => {
  try {
    stock.value = await api.get(snoFromRoute); // 주식 정보 로딩
    console.log('주식 상세 정보:', stock.value);

    // wishApi를 사용해 wishes 로딩
    wishes.value = await wishApi.fetchAllWishes(uno.value); // wishes 데이터를 가져옵니다.
    console.log("wish : ", wishes.value);

    // 관심 목록에서 tno가 4인 상품의 pno를 사용해 stock.favorite 설정
    const favoritePnos = wishes.value
      .filter(wish => wish.tno === 4) // tno가 4인 항목 필터링
      .map(wish => wish.pno); // pno 추출

    stock.value.favorite = favoritePnos.includes(stock.value.sno); // 현재 주식이 즐겨찾기인지 확인
  } catch (error) {
    console.error('Error loading stock details:', error);
  }
};

const loadStockSymbol = async () => {
  try {
    const symbolData = await api.getSymbol(snoFromRoute);
    stock.value = {
      ...stock.value,
      openPrice: symbolData.openPrice,
      closePrice: symbolData.closePrice,
      tradingVol: symbolData.tradingVol,
      sales: symbolData.sales,
      profit: symbolData.profit,
      income: symbolData.income,
      minValue: symbolData.minValue,
      maxValue: symbolData.maxValue,
    };
    console.log('심볼 상세 정보:', symbolData);
  } catch (error) {
    console.error('Error loading stock symbol details:', error);
  }
};

const formatNumber = (value) => {
  if (value != null) {
    return value.toLocaleString('ko-KR');
  }
  return value;
};

function getImg(imgUrl) {
  return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
}

// 컴포넌트 마운트 시 데이터 로딩
onMounted(() => {
  loadStockDetails();
  loadStockSymbol();
});
</script>



<style scoped>


.container{
  margin-bottom: 100px;
  margin-top: -120px;
  margin-top: -130px;
}

.stock-detail {
  font-family: Arial, sans-serif;
  max-width: 390px;
  padding: 20px;
  margin-bottom: 100px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-name{
  margin:0;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: -77px; 
}

.stock-price {
  font-size: 28px;
  font-weight: bold;
}

.stock-icon {
  font-size: 30px;
}

.stock-info {
  display: flex;
  flex-direction: column; /* Stack name and price vertically */
  align-items: flex-start; /* Align items to the left */
}

.stock-info-grid {
  display: flex;
  flex-direction: column; /* 항목들을 수직으로 나열 */
  background-color: rgba(250, 176, 9, 0.16);
  padding: 5px 10px;
  border-radius: 20px;
  width: 360px;
}

.stock-info-item {
  display: flex;
  justify-content: space-between; /* 이름과 값을 양쪽으로 정렬 */
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 17px;
}


.stock-price {
  font-size: 28px;
  font-weight: bold;
}

.stock-price-container {
  display: flex;
  align-items: center;
}


.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: -130px;

}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}


.stock-info-grid {
  display: flex;
  justify-content: space-between; /* 이름과 값을 양쪽으로 배치 */
  border-radius: 13px;
}

.stock-info-item {
  flex: 1; /* 각 항목이 균등하게 공간을 차지하도록 설정 */
  display: flex;
  justify-content: space-between; /* 각 항목의 이름과 값을 양쪽으로 정렬 */
  padding: 10px 0; /* 위아래 여백 추가 */
}

.additional-info {
  display: flex; /* Flexbox를 사용하여 가로 배치 */ 
}

.info-item {
  flex: 1; /* 각 항목이 동일한 비율로 공간을 차지하게 설정 */
  padding: 10px; /* 각 항목의 내부 여백 */
  text-align: center; /* 텍스트를 중앙 정렬 */
  margin: 0px 10px; /* 좌우 간격 추가 */
  border-radius: 10px;
  background-color: rgba(110, 96, 83, 0.5);
}

/* 첫 번째 및 마지막 항목의 좌우 마진을 조정하여 불균형을 피함 */
.info-item:first-child {
  margin-left: 0; /* 첫 번째 항목의 왼쪽 마진 제거 */
}

.info-item:last-child {
  margin-right: 0; /* 마지막 항목의 오른쪽 마진 제거 */
}

h5{
  color: white;
}

.price-range {
  display: flex;
  flex-direction: column; /* 세로 방향으로 쌓기 */
  align-items: stretch; /* 아이템을 수평으로 늘리기 */
}

.range-slider {
  margin-bottom: 10px; /* 슬라이더와 레이블 간의 간격 */
}

.price-labels {
  display: flex; /* 가로 방향으로 배치 */
  justify-content: space-between; /* 양쪽 끝으로 배치 */
}

.min-price {
  text-align: left; /* 왼쪽 정렬 */
  color: #FF6767; 
  font-weight:bold;
}

.max-price {
  text-align: right; /* 오른쪽 정렬 */
  color: #547BC1; 
  font-weight:bold;
}

.min-price-value{
  color: #9B9B9B; 
}

.max-price-value{
  color: #9B9B9B; 
}

.price-info {
  display: flex; /* 가로 방향으로 배치 */
  justify-content: space-between; /* 양쪽 끝으로 배치 */
  margin-top: 5px; /* 레이블과 가격 정보 간의 간격 */
}

.range-slider {
  -webkit-appearance: none; /* 기본 스타일 제거 */
  width: 100%; /* 슬라이더 너비 */
  height: 6px; /* 슬라이더 두께 */
  background: transparent; /* 배경 투명 */
  position: relative; /* 가상 요소를 위한 포지션 설정 */
}

.range-slider::-webkit-slider-runnable-track {
  height: 6px; /* 슬라이더 두께 */
  background: #FAB809; /* 전체 색상 */
  border-radius: 5px; /* 모서리 둥글게 */
}


.range-slider::before {
  content: '';
  position: absolute;
  left: 67%;
  top: -2px;
  transform: translateX(-50%); /* 정중앙으로 조정 */
  width: 10px; /* 점의 너비 */
  height: 10px; /* 점의 높이 */
  background: #6E6053; /* 점 색상 */
  border-radius: 50%; /* 둥글게 */
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* 기본 썸 스타일 제거 */
  background: transparent; /* 썸 배경 투명 */
  width: 0; /* 썸 크기 0으로 설정하여 보이지 않게 함 */
  height: 0; /* 썸 크기 0으로 설정하여 보이지 않게 함 */
}

h3{
  position: relative;
  bottom:15px;
}
.me-3 {
  margin-right: 3rem !important;}
</style>