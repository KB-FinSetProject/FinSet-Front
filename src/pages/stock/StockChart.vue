<template>
  <HeaderNormal navbarTitle="주식 상세" />

  <div class="container">
    <div class="stock-detail">
      <div class="stock-header">
        <img :src="stock.imgUrl" alt="Thumbnail" class="rounded-circle me-3 thumbnail" style="width:36px; height: 36px; margin-left: -15px;">
        <div class="stock-info">
          <h1 class="stock-name">{{ stock.stockName }}</h1>
          <span class="stock-price">{{(stock?.openPrice ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} 원</span>
        </div>
        <div class="stock-icon" @click="toggleFavorite">
          <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: stock.favorite ? '#FFBB00' : '#888' }"></i>
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <router-link :to="{ name: 'stockChart', params: { sno: stock.sno } }" class="tab" active-class="active">차트</router-link>
      <router-link :to="{ name: 'stockDetail', params: { sno: stock.sno } }" class="tab" active-class="active" style="color: #DADADA;">종목정보</router-link>
      <router-link :to="{ name: 'stockCommunity', params: { sno: stock.sno } }" class="tab" active-class="active" style="color: #DADADA;">커뮤니티</router-link>
    </div>
    <br>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div id="tooltip" class="tooltip" v-if="tooltipVisible" :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px' }">
        {{ tooltipDate }}: {{ tooltipPrice }} 원
      </div>
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
const pastValues = ref({
  daily: null,
  weekly: null,
  monthly: null,
});

const tooltipVisible = ref(false);
const tooltipPosition = ref({ x: 0, y: 0 });
const tooltipDate = ref('');
const tooltipPrice = ref('');

const renderChart = () => {
  if (stockChart.value) {
    const ctx = stockChart.value.getContext('2d');
    const currentPrice = chartData.value[0]?.stockPrice;
    const currentDate = chartData.value[0]?.stockDatetime;

    const chart = new Chart(ctx, {
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
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: true,
            ticks: {
              callback: (value) => {
                return value.toLocaleString('ko-KR');
              },
            },
          },
        },
        elements: {
          line: {
            tension: 0,
          }
        },
      },
    });

    // 차트에 마우스 이벤트 추가
    stockChart.value.addEventListener('mousemove', (event) => {
      const rect = stockChart.value.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const index = Math.floor((x / rect.width) * chartData.value.length);

      if (index >= 0 && index < chartData.value.length) {
        tooltipVisible.value = true;
        tooltipPosition.value = { x: event.clientX, y: event.clientY - 30 }; // 툴팁 위치 조정
        tooltipDate.value = chartData.value[index].stockDatetime;
        tooltipPrice.value = chartData.value[index].stockPrice;
      } else {
        tooltipVisible.value = false; // 범위 밖으로 나가면 툴팁 숨김
      }
    });

    stockChart.value.addEventListener('mouseleave', () => {
      tooltipVisible.value = false; // 마우스가 차트를 떠나면 툴팁 숨김
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

// 즐겨찾기 토글 함수
const toggleFavorite = async () => {
  try {
    stock.value.favorite = !stock.value.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (stock.value.favorite) {
      await wishApi.addWish({tno: 4, uno: uno.value, pno: stock.value.sno}); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({tno: 4, uno: uno.value, pno: stock.value.sno}); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    stock.value.favorite = !stock.value.favorite; // 원래 상태로 복구
  }
};
const loadStockSymbol = async (sno) => {
  try {
    const symbolData = await api.getSymbol(sno);
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
// 데이터 로드 함수
const loadWishes = async () => {
  try {
    const wishes = await wishApi.fetchAllWishes(uno.value); // wishes 데이터를 가져옵니다.
    const favoritePnos = wishes
        .filter(wish => wish.tno === 4) // tno가 4인 항목 필터링
        .map(wish => wish.pno); // pno 추출

    stock.value.favorite = favoritePnos.includes(stock.value.sno); // 현재 주식이 즐겨찾기인지 확인
  } catch (error) {
    console.error("Error loading wishes:", error);
  }
};

onMounted(async () => {
  if (sno) {
    await getStockDetails(sno);
    await getChart(sno);
    await getNews(sno);
    await loadStockSymbol(sno);
  } else {
    console.error('sno is undefined');
  }
});

const getStockDetails = async (query) => {
  try {
    stock.value = await api.get(query);
  } catch (error) {
    console.error(`error`, error);
  }
};
const getNews = async (query) => {
  try {
    newsItems.value = await api.getNews(query);
  } catch (error) {
    console.error('error', error);
  }
};
const getChart = async (query) => {
  try {
    // 차트 데이터 가져오기
    chartData.value = await api.getChart(query);

    // 데이터 순서 반전 (가장 오래된 것이 먼저 나왔으므로 최신순으로)
    chartData.value.reverse();

    // 차트 렌더링
    renderChart();
    calculateDisplayValue(); // displayValue 계산
    loadWishes(); // 즐겨찾기 상태 로드
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
.container {
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

.stock-name {
  margin: 0;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: -62px; /* 기존 10px에서 20px로 변경 */
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

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px;
  border-radius: 5px;
  pointer-events: none; /* 툴팁이 클릭 이벤트를 방지 */
  z-index: 10; /* 차트 위에 표시되도록 설정 */
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

.sort {
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

.icon {
  margin: 15px;
  align-self: center;
  font-size: 30px;
  color: #547BC1;
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
