<template>
  <div class="exchange-container">
    <header>
    <button class="back-button" @click="goBack"><i class="fa-solid fa-arrow-left"></i></button>
    <h1>외환</h1>
    </header>
    <hr>
  </div>

  <div v-for="currency in filteredCurrencies" :key="currency.code" class="currency-card">
  <section class="exchange-info">
    <div class="currency-info">
      <h2>미국 달러(USD)</h2>
      <span>적용 환율: {{ baseRate }}</span>
    </div>
    <button @click="refreshRate" class="refresh-btn">환율 새로고침</button>
  </section>
  </div>
  <section class="exchange-rate">
    <h3>실시간 환율</h3>
    <p class="current-rate">{{ currentRate }}원</p>
    <p class="rate-change">
      전일대비 {{ rateChange }}원
      <span :class="rateChange > 0 ? 'up' : 'down'">
          {{ rateChange > 0 ? '▲' : '▼' }}
        </span>
    </p>
  </section>

  <div class="chart-container">
    <canvas ref="stockChart"></canvas>
    <div class="chart-info">
      <span class="chart-high">최고 {{ highestPrice }}원</span>
      <span class="chart-low">최저 {{ lowestPrice }}원</span>
    </div>
  </div>>

  <section class="chart">
    <h3>{{ selectedPeriod }}</h3>
    <canvas id="exchangeChart"></canvas>
    <div class="period-selector">
      <button @click="setPeriod('1일')">1일</button>
      <button @click="setPeriod('1주')">1주</button>
      <button @click="setPeriod('1달')">1달</button>
      <button @click="setPeriod('1년')">1년</button>
    </div>
  </section>

  <section class="profit-info">
    <p>1일 전에 샀었다면 수익: <strong>{{ profit }}원</strong></p>
    <p>(300만원 기준)</p>
  </section>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import Chart from 'chart.js/auto';

  // 데이터 정의
  const baseRate = ref(1344.80);  // 기본 환율
  const currentRate = ref(1340.06);  // 실시간 환율
  const rateChange = ref(3.02);  // 전일대비 변화
  const profit = ref(6777);  // 수익
  const selectedPeriod = ref('1일');  // 선택된 기간

  // 캔버스 참조
  const chartRef = ref(null);  // Chart.js가 그려질 캔버스 엘리먼트

  // 기간 설정 함수
  const setPeriod = (period) => {
  selectedPeriod.value = period;
  // 기간에 따라 차트 또는 데이터를 업데이트하는 로직 추가 가능
};

  // 환율 새로고침 함수
  const refreshRate = () => {
  console.log('환율 새로고침!');
  // 새로고침 로직 추가 (API 호출 등)
};

  // 차트 초기화 및 렌더링
  onMounted(async () => {
  await nextTick();  // DOM이 완전히 렌더링된 후에 차트 생성

  if (chartRef.value) {
  const ctx = chartRef.value.getContext('2d');
  new Chart(ctx, {
  type: 'line',
  data: {
  labels: ['최고', '최저'],
  datasets: [
{
  label: '환율',
  data: [1344.77, 1334.77],  // 차트 데이터
  borderColor: 'orange',
  borderWidth: 2,
  fill: false,
},
  ],
},
  options: {
  responsive: true,
  scales: {
  x: {
  display: true,
  title: {
  display: true,
  text: '시간',
},
},
  y: {
  display: true,
  title: {
  display: true,
  text: '환율 (KRW)',
},
},
},
},
});
} else {
  console.error('chartRef가 null입니다.');
}
});

// 백버튼 기능 (뒤로가기)
const goBack = () => {
  window.history.back();  // 브라우저의 뒤로가기 기능을 호출
};

</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.exchange-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 헤더 스타일 */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-right: 150px;
}

/* 뒤로 가기 버튼 스타일 */
.back-button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
}

.back-button i {
  font-size: 24px;
}

/* 환율 정보 섹션 */
.exchange-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.currency-card{
  background-color: #f0f0f0;
}

.currency-info h2 {
  font-size: 20px;
  margin-bottom: 5px;
}

.currency-info span {
  font-size: 16px;
  color: #555;
}

/* 새로고침 버튼 스타일 */
.refresh-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.refresh-btn:hover {
  background-color: #0056b3;
}

/* 실시간 환율 섹션 */
.exchange-rate h3{
  margin-bottom: 20px;
  font-size: 12px;
}

.current-rate {
  font-size: 25px;
  font-weight: bold;
}

.rate-change {
  font-size: 18px;
  color: #555;
}

.up {
  color: red;
}

.down {
  color: blue;
}

/* 차트 섹션 */
.chart {
  margin-bottom: 20px;
}

canvas {
  max-width: 100%;
  height: 300px;
}

/* 기간 선택 버튼 */
.period-selector {
  margin-top: 10px;
}

.period-selector button {
  background-color: #f0f0f0;
  border: none;
  padding: 8px 12px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.period-selector button:hover {
  background-color: #007bff;
  color: white;
}

/* 수익 정보 */
.profit-info {
  font-size: 16px;
  color: #333;
}

.profit-info strong {
  font-weight: bold;
  color: #28a745;
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
</style>
