<template>
  <HeaderNormal navbarTitle="외환" />

  <h3>환전정보</h3>
  <br>
  <div v-for="currency in filteredCurrencies" :key="currency.code" class="currency-card">
  <section class="exchange-info">
    <div class="currency-info">
      <div class="currency-details">
      <h2>{{ currency.name }} ({{ currency.code }})</h2>
      <span class="exchange-rate">적용 환율: {{ baseRate }}</span>
      </div>
    </div>
    <button @click="refreshRate" class="refresh-btn">환율 새로고침<i class="fa-solid fa-repeat"></i></button>
  </section>
  </div>
  <br>
  <section class="exchange-rate">
    <h3>실시간 환율</h3>
    <div class="rate-container">
    <p class="current-rate">{{ currentRate }}원</p>
    <p class="rate-change">
      전일대비 {{ rateChange }}원
      <span :class="rateChange > 0 ? 'up' : 'down'">
          {{ rateChange > 0 ? '▲' : '▼' }}
        </span>
    </p>
    </div>
  </section>

  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
    <div class="chart-info">
      <span class="chart-high">최고 {{ highestPrice }}원</span>
      <span class="chart-low">최저 {{ lowestPrice }}원</span>
    </div>
  </div>

  <section class="chart">
    <div class="period-selector">
      <button @click="setPeriod('1일')" :class="{active: selectedPeriod === '1일'}">1일</button>
      <button @click="setPeriod('1주')" :class="{active: selectedPeriod === '1주'}">1주</button>
      <button @click="setPeriod('1달')" :class="{active: selectedPeriod === '1달'}">1달</button>
      <button @click="setPeriod('1년')" :class="{active: selectedPeriod === '1년'}">1년</button>
    </div>
  </section>


  <section class="profit-info" >
    <div style="display: flex">
    <i class="fa-solid fa-chart-line"></i>
   <p>1일 전에 샀었다면 수익</p>
    </div>
    <div style="display: flex">
    <strong>{{ profit }}원</strong><p>(300만원 기준)</p></div>
  </section>

</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import HeaderNormal from "@/components/common/HeaderNormal.vue";
  import {Chart, registerables} from 'chart.js';

  Chart.register(...registerables);


  const filteredCurrencies = ref([
    { name: '미국 달러', code: 'USD' }]);

  // 데이터 정의
  const baseRate = ref(1344.80);  // 기본 환율
  const currentRate = ref(1340.06);  // 실시간 환율
  const rateChange = ref(3.02);  // 전일대비 변화
  const profit = ref(6777);
  const selectedPeriod = ref('1일');
  const highestPrice = ref(1344.77);  // 차트의 최고 환율
  const lowestPrice = ref(1334.77);

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

</script>

<style scoped>
/* 전체 컨테이너 스타일 */
.exchange-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h3{
  font-weight: 700;
margin-bottom: 0px;
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
  height: 120px;
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
  font-size: 12px;
}

.rate-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-left: 30px;
}

.period-selector button {
  background-color: #888;
  border: none;
  padding: 8px 25px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #f0f0f0;
}

.period-selector button.active {
  background-color: white; /* 선택된 버튼의 배경색 */
  color: black; /* 선택된 버튼의 글자 색 */
}

/* 수익 정보 */
.profit-info {
  height: 200px;
  font-size: 16px;
  color: #333;
  margin-bottom: 1rem;
}
.profit-info p{
  margin-bottom: 0;
  margin-left: 25px;
}

.profit-info strong{
  margin-left: 25px;
}

.profit-info strong {
  font-weight: bold;
  color: #28a745;
}
.fa-chart-line{
  color:dodgerblue;
}
.chart-container {
  height: 200px;
  margin-bottom: 20px;
}

p {
  margin-top: -8px;
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
