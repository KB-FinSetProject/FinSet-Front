<template>
  <HeaderNormal navbarTitle="주식 상세" />

  <div class="stock-detail">
    <div class="stock-header">
      <div class="stock-info">
        <h1 class="stock-name">{{ stock.stockName }}</h1>
        <span class="stock-price">{{ stock.stockPrice }}</span>
      </div>
      <div class="stock-icon" @click="toggleFavorite">
        <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
           :style="{ color: stock.favorite ? '#FFBB00' : '#888' }"></i>
      </div>
    </div>
    <div class="tabs-container">
      <router-link to="/stock/chart" class="tab" active-class="active">차트</router-link>
      <router-link :to= "{ name: 'stockDetail', params: { sno: stock.sno } }"  class="tab" active-class="active" style="color: #DADADA;">종목정보</router-link>
      <router-link :to="{ name: 'stockCommunity', params: { sno: stock.sno } }" class="tab" active-class="active" style="color: #DADADA;">커뮤니티</router-link>
    </div>
    <br>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div class="chart-info">
        <span class="chart-high">최고 {{ highestPrice }}원</span>
        <span class="chart-low">최저 {{ lowestPrice }}원</span>
      </div>
      <br>
      <div class="time-buttons">
        <button v-for="period in timePeriods" :key="period"
                :class="['time-button', { active: activePeriod === period }]"
                @click="changePeriod(period)">
          {{ period }}
        </button>
      </div>
    </div>
    <br><br><br>
    <div class="news-section">
      <div v-for="(news, index) in newsItems" :key="index" class="news-item">
        <div class="news-content">
          <h3>{{ news.title }}</h3>
          <p>{{ news.content }} · {{ news.link }}</p>
        </div>
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

const route = useRoute();
const sno = route.params.sno;
Chart.register(...registerables);

const stockChart = ref(null);
const chartData = ref([]); // 차트 데이터
const highestPrice = computed(() => Math.max(...chartData.value.map(data => data.stockPrice)));
const lowestPrice = computed(() => Math.min(...chartData.value.map(data => data.stockPrice)));

const newsItems = ref([]);
const timePeriods = ['1일', '1주', '3개월', '1년', '5년', '전체'];
const activePeriod = ref('1일');
const stock = ref({});

const renderChart = () => {
  if (stockChart.value) {
    const ctx = stockChart.value.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.value.map(data => data.stockDatetime), // stockDatetime 사용
        datasets: [{
          data: chartData.value.map(data => data.stockPrice), // stockPrice 사용
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
            display: true,
            title: { display: true, text: '시간' },
          },
          y: {
            display: true,
            title: { display: true, text: '가격 (원)' },
          },
        },
      },
    });
  }
};

const changePeriod = (period) => {
  activePeriod.value = period;
};

const toggleFavorite = () => {
  stock.value.favorite = !stock.value.favorite; // 즐겨찾기 상태 토글
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
    const response = await api.getChart(query); // API에서 차트 데이터 가져오기
    chartData.value = response.map(item => ({
      scno: item.scno,
      sno: item.sno,
      stockDatetime: item.stockDatetime,
      stockPrice: item.stockPrice,
    })); // 데이터 매핑
    console.log(chartData.value);
    renderChart(); // 차트 렌더링
  } catch (error) {
    console.error('Error loading stocks:', error);
  }
};
</script>

<style scoped>
.stock-detail {
  font-family: Arial, sans-serif;
  max-width: 390px;
  padding: 20px;
  margin-top: 60px;
  margin-bottom: 100px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: -5px;
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

.chart-container {
  height: 200px;
  margin-bottom: 20px;
}

.chart-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  margin-top: 10px;
}

.time-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
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
  margin-top: 30px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.news-content p {
  font-size: 12px;
  color: #888;
  margin: 0;
}
</style>
