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
      <router-link :to="{ name: 'stockChart', params: { sno: snoFromRoute } }" class="tab" active-class="active">차트</router-link>
      <router-link :to="{ name: 'stockDetail', params: { sno: stock.sno } }" class="tab" active-class="active" style="color: #DADADA;">종목정보</router-link>
      <router-link :to="{ name: 'stockCommunity', params: { sno: stock.sno } }" class="tab" active-class="active" style="color: #DADADA;">커뮤니티</router-link>
    </div>
    <br>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div class="chart-info">
        <span class="chart-high" style="color: red;">최고 {{ highestPrice }}원</span>
        <span class="chart-low" style="color: blue;">최저 {{ lowestPrice }}원</span>
      </div>
    </div>
    <br><br>
    <div class="sort">
      <div class="sort-include d-flex justify-content-between">
        <div class="sort-option" 
             :class="{ 'active': selectedTimeframe === '1일' }" 
             @click="selectTimeframe('1일')">1일</div>
        <div class="sort-option" 
             :class="{ 'active': selectedTimeframe === '1주' }" 
             @click="selectTimeframe('1주')">1주</div>
        <div class="sort-option" 
             :class="{ 'active': selectedTimeframe === '1달' }" 
             @click="selectTimeframe('1달')">1달</div>
      </div>
    </div>

    <br>
  
    <div class="timeframe-container d-flex align-items-start">
      <i class="fa-solid fa-chart-line icon"></i>
      <div>
        <div class="timeframe-info">
          <span>{{ timeframeText }} 전에 샀었다면 수익</span>
        </div>
        <div class="value-display">
          <h5>{{ formatNumber(displayValue) }}원</h5>
        </div>
      </div>
    </div>
    
    <hr>
    <h3 style="text-align: center;">News</h3>


    <div class="news-section">
      <div v-for="(news, index) in newsItems" :key="index" class="news-item">
        <div class="news-content">
          <h3>
            <a :href="news.link" target="_blank" rel="noopener noreferrer" class="news-link">{{ news.title }}</a>
          </h3>
          <p class="news-description">{{ news.content }}</p>
        </div>
        <img :src="news.image" alt="News Image" class="news-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import { Chart, registerables } from 'chart.js';
import { useRoute } from "vue-router";
import api from "@/api/stockApi.js";
import wishApi from "@/api/wishApi"; // wishApi import

const route = useRoute();
const sno = route.params.sno;
Chart.register(...registerables);

const stockChart = ref(null);
let chartInstance = null; // 차트 인스턴스를 저장할 변수
const chartData = ref([]);
const highestPrice = computed(() => Math.max(...chartData.value.map(data => data.stockPrice)));
const lowestPrice = computed(() => Math.min(...chartData.value.map(data => data.stockPrice)));

const newsItems = ref([]);
const timePeriods = ['1일', '1주', '1달'];

// initial values
const timeframeText = ref('1일'); // 초기 텍스트 설정
const displayValue = ref(0); // 계산된 수익 값을 저장
const selectedTimeframe = ref('1일'); // 초기 선택된 시간 프레임

const stock = ref({});
const pastValues = ref({
  daily: null,
  weekly: null,
  monthly: null,
});

const renderChart = () => {
  if (stockChart.value) {
    const ctx = stockChart.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.value.map(data => data.stockDatetime),
        datasets: [{
          data: chartData.value.map(data => data.stockPrice),
          borderColor: '#FAB809',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }, // 범례 제거
          tooltip: { enabled: false }, // 툴팁 제거
        },
        scales: {
          x: {
            display: false, // x축 범주 숨기기
          },
          y: {
            display: false, // y축 범주 숨기기
          },
        },
        elements: {
          line: {
            tension: 0, // 선의 곡률을 없애고 직선으로 만들기
          }
        },
      },
    });
  }
};

const selectTimeframe = (timeframe) => {
  selectedTimeframe.value = timeframe; // 선택된 시간 프레임 업데이트
  calculateDisplayValue(); // 새로운 시간 프레임에 따라 displayValue 계산
  timeframeText.value = timeframe; // 텍스트 업데이트
};

const calculateDisplayValue = () => {
  if (!chartData.value || chartData.value.length === 0) {
    return; // 차트 데이터가 없으면 계산할 수 없으므로 리턴
  }

  const currentRate = chartData.value[0].stockPrice; // 가장 최근 가격
  console.log(currentRate);
  
  let pastRate;
  if (selectedTimeframe.value === '1일') {
    pastRate = chartData.value[1] ? chartData.value[1].stockPrice : currentRate;
  } else if (selectedTimeframe.value === '1주') {
    pastRate = chartData.value[5] ? chartData.value[5].stockPrice : currentRate; // 1주 전 (5일 전)
  } else if (selectedTimeframe.value === '1달') {
    pastRate = chartData.value[19] ? chartData.value[19].stockPrice : currentRate; // 1달 전 (22일 전)
  }
  
  // 수익 계산 (현재 값에서 과거 값을 뺀 결과)
  displayValue.value = (currentRate - pastRate).toFixed(2); // 소수점 2자리까지
};

const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
const uno = ref(authData ? authData.uno : null); // uno 값을 가져오기
console.log("uno : ", uno.value);

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

// 데이터 로드 함수
const loadWishes = async () => {
  try {
    const wishes = await wishApi.fetchAllWishes(uno.value); // wishes 데이터를 가져옵니다.
    console.log("wish : ", wishes);

    // 관심 목록에서 tno가 4인 상품의 pno를 사용해 stock.favorite 설정
    const favoritePnos = wishes
      .filter(wish => wish.tno === 4) // tno가 4인 항목 필터링
      .map(wish => wish.pno); // pno 추출

    stock.value.favorite = favoritePnos.includes(stock.value.sno); // 현재 주식이 즐겨찾기인지 확인
  } catch (error) {
    console.error("Error loading wishes:", error);
  }
};

onMounted(() => {
  getChart(sno); // sno로 차트 데이터를 가져옵니다.
  getStockDetails(sno); // sno로 주식 상세 데이터를 가져옵니다.
  getNews(sno); // sno로 뉴스 데이터를 가져옵니다.
});
  
const getStockDetails = async (query) => {
  try {
    stock.value = await api.get(query);
    console.log(stock.value);
  } catch (error) {
    console.error(`error`, error);
  }
};

const getNews = async (query) => {
  try {
    newsItems.value = await api.getNews(query);
    console.log(newsItems.value);
  } catch (error) {
    console.error('error', error);
  }
};

const getChart = async (query) => {
  try {
    chartData.value = await api.getChart(query);
    renderChart();
    calculateDisplayValue(); // 차트 데이터가 업데이트 된 후 displayValue 계산
    loadWishes(); // wishes 로드하여 즐겨찾기 상태 설정
  } catch (error) {
    console.error('error', error);
  }
};

const formatNumber = (value) => {
  if (value != null) {
    return value.toLocaleString('ko-KR');
  }
  return value;
};
</script>



<style scoped>
.container{
  margin-bottom: 100px;
  margin-top: -40px;
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

.stock-name{
  margin:0;
  position: relative;
  top:4px;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: -77px; /* 기존 10px에서 20px로 변경 */
}

.stock-price {
  font-size: 28px;
  font-weight: bold;
}

.stock-icon {
  font-size: 30px;
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


.chart-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  margin-top: 30px;

}

.time-buttons {
  display: flex;
  justify-content: space-between;

}

.time-button {
  padding: 5px 10px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
}

.time-button.active {
  background-color: #FAB809;
  color: white;
}
.news-section {
  margin-top: 20px;
  width: 360px;
  
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 세로 정렬을 시작으로 설정 */
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.news-content {
  flex: 1;
}

.news-content h3 {
  font-size: 14px;
  margin: 0 0 5px 0;
}

.news-link {
  color: black; /* 링크 색상 검정색 */
  text-decoration: none; /* 밑줄 제거 */
}

.news-content p {
  font-size: 12px;
  color: #888;
  margin: 0;
  overflow: hidden; /* 내용이 넘치면 숨기기 */
  text-overflow: ellipsis; /* 넘어간 텍스트를 "..."으로 표시 */
  display: -webkit-box; /* 크로스 브라우저 지원을 위해 */
  -webkit-line-clamp: 2; /* 줄 수 제한 */
  -webkit-box-orient: vertical; /* 수직 방향으로 박스 배치 */
}

.news-image {
  width: 60px; /* 이미지 너비 */
  height: 60px; /* 이미지 높이 */
  object-fit: cover; /* 이미지 비율 유지하며 자르기 */
  margin-left: 10px; /* 내용과 이미지 간의 간격 */
}


.chart-container {
  max-width: 390px; /* 원하는 최대 너비 */
  width: 90%; /* 반응형을 위해 100% 설정 */
  height: 200px;
  margin-left: 20px;
}


.sort{
  background-color: #E9E7E5; /* 기본 배경색 */
  padding: 10px 15px;
  margin-top: 30px;
  border-radius: 7px;
}

.sort-include {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 공간 분배 */
  width: 100%; /* 전체 너비 사용 */
}

.sort-option {
  flex: 1; /* 각 옵션이 동일한 너비를 가지도록 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 7px; /* 여백 추가 */
  cursor: pointer; /* 마우스 커서를 포인터로 변경 */
  background-color: transparent; /* 기본 배경색은 투명 */
  margin: 0 5px; /* 양쪽 간격 */
  border-radius: 5px; /* 모서리 둥글게 */
  transition: background-color 0.3s; /* 배경색 변경 시 애니메이션 효과 */
}

.sort-option:hover {
  background-color: white; /* 마우스 오버 시 배경색 변경 */
}

/* 선택된 옵션 스타일 */
.sort-option.active {
  background-color: white; /* 선택된 옵션은 흰색 */
}

.icon{
  margin : 15px; 
  align-self: center;
  font-size: 30px;
  color : #547BC1;
}

.timeframe-container {
  margin-top: 10px; /* 상단 여백 */
}

.timeframe-info {
  font-size: 16px; /* 글씨 크기 조정 */
  position: relative;
  top: 5px;
}

.value-display {
  margin-top: 5px; /* 값과 텍스트 간 간격 조정 */
  font-size: 24px; /* 값 크기 조정 */
  font-weight: bold; /* 값 두껍게 */
}


</style>
