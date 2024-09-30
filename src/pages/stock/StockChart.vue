<template>
  <div class="stock-detail">
    <div class="stock-header">
      <h1 class="stock-name">삼성전자</h1>
      <div class="stock-price-container">
        <span class="stock-price">67,500원</span>
        <i class="far fa-heart"></i>
      </div>
    </div>

    <div class="tabs-container">
      <router-link to="/stock/chart" class="tab" active-class="active">차트</router-link>
      <router-link to="/stock/detail" class="tab" active-class="active">종목정보</router-link>
      <router-link to="/stock/community" class="tab" active-class="active">커뮤니티</router-link>
    </div>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div class="chart-info">
        <span class="chart-high">최고 {{ highestPrice }}원</span>
        <span class="chart-low">최저 {{ lowestPrice }}원</span>
      </div>
<!--      <div class="time-buttons">-->
<!--        <button v-for="period in timePeriods" :key="period"-->
<!--                :class="['time-button', { active: activePeriod === period }]"-->
<!--                @click="changePeriod(period)">-->
<!--          {{ period }}-->
<!--        </button>-->
<!--      </div>-->
    </div>

    <div class="news-section">

      <div v-for="(news, index) in newsItems" :key="index" class="news-item">
        <div class="news-content">
          <h3>{{ news.title }}</h3>
          <p>{{ news.time }} · {{ news.source }}</p>
        </div>
        <img :src="news.image" :alt="news.title" class="news-thumbnail">
      </div>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default {
  setup() {
    const stockChart = ref(null);
    const chartData = ref([
      {date: '2023-09-01', price: 67000},
      {date: '2023-09-02', price: 67500},
      {date: '2023-09-03', price: 68000},
      {date: '2023-09-04', price: 67800},
      {date: '2023-09-05', price: 68200},
    ]);

    const highestPrice = computed(() => Math.max(...chartData.value.map(data => data.price)));
    const lowestPrice = computed(() => Math.min(...chartData.value.map(data => data.price)));

    const newsItems = ref([
      {
        title: '"삼성전자 기대 넘쳐?"...국내외서 \'경고\' 쏟아졌다',
        time: '12분 전',
        source: '한국경제',
        image: '/placeholder.svg?height=60&width=60'
      },
      {
        title: '[특징주] 삼성전자, 3Q실적 시장 기대치 하회 전망에 약세',
        time: '5시간 전',
        source: '이투데이',
        image: '/placeholder.svg?height=60&width=60'
      },
      {
        title: '엔비디아 추락...美 반도체 급락에 삼성·하이닉스도 [특징주]',
        time: '5시간 전',
        source: '아주경제',
        image: '/placeholder.svg?height=60&width=60'
      },
    ]);

    const timePeriods = ['1일', '1주', '3개월', '1년', '5년', '전체'];
    const activePeriod = ref('1일');

    const renderChart = () => {
      if (stockChart.value) {
        const ctx = stockChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: chartData.value.map(data => data.date),
            datasets: [{
              data: chartData.value.map(data => data.price),
              borderColor: '#FAB809',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: false
              }
            },
            scales: {
              x: {
                display: false
              },
              y: {
                display: false
              }
            },
          }
        });
      }
    };

    const changePeriod = (period) => {
      activePeriod.value = period;
      // 여기서는 실제로 차트를 업데이트하지 않습니다.
      // 필요하다면 여기에 다른 로직을 추가할 수 있습니다.
    };

    onMounted(() => {
      renderChart(); // 컴포넌트가 마운트될 때 한 번만 차트를 렌더링합니다.
    });

    return {
      stockChart,
      highestPrice,
      lowestPrice,
      newsItems,
      timePeriods,
      activePeriod,
      changePeriod
    };
  }
};
</script>

<style scoped>
.stock-detail {
  font-family: Arial, sans-serif;
  max-width: 390px;
  margin-top: -150px;
  padding: 20px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-name {
  font-size: 24px;
  font-weight: bold;
}

.stock-price-container {
  display: flex;
  align-items: center;
}

.stock-price {
  font-size: 28px;
  font-weight: bold;
  margin-right: 10px;
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

.chart-high {
  color: #e01e5a;
}

.chart-low {
  color: #2eb67d;
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
  border-radius: 15px;
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
flex:1px;


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

.news-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-left: 10px;
}
</style>