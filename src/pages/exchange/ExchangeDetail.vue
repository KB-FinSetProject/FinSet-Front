<template>
  <HeaderNormal navbarTitle="외환 상세" />

  <div class="container">
    <br><br>
    <h3 style="margin-left: 10px;">환전정보</h3>
    <span style="margin-left: 10px; color:gray">2024/10/01 09:00 기준 </span>
    <br>

    <div class="exchange-header d-flex align-items-center justify-content-between">
      <div class="exchage-include">
        <div class="exchange-info d-flex align-items-center">
          <img src="https://i.namu.wiki/i/5ac6l60QaKXGLqeGjkxO1kqHPZd-LJWM3DhbuxjjNmiZa5NaRekkUskLmuny2B_7ueHGx2sXE1bW_-TMg5yGIQ.svg" alt="외환 이미지" class="exchange-img" />
          <div class="exchange-detail d-flex align-items-center">
            <h6 class="exchange-name">{{ item.name }}</h6>
            <p class="exchange-details">적용환율: {{ item.rate }}</p>
          </div>
        </div>
      </div>
    </div>

    <br>
    <p style="margin-left: 10px; color: gray;">실시간 환율</p>
    <div class="info d-flex justify-content-between align-items-center">
      <h1>{{ item.rate }}원</h1>
      <span :style="{ color: item.change > 0 ? '#FF6767' : '#547BC1' }">
        <span style="color: gray;">전일대비 </span>{{ item.change }}원 {{ item.change > 0 ? '▲' : '▼' }} 
      </span>
    </div>

    <br>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div class="chart-info">
        <span class="chart-high">최고 {{ highestPrice }}원</span>
        <span class="chart-low">최저 {{ lowestPrice }}원</span>
      </div>
    </div>
  

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
          <span>{{ timeframeText }} 수익</span>
        </div>
        <div class="value-display">
          <h5>{{ displayValue }}원</h5>
        </div>
      </div>
    </div>

</div>

</template>


<script setup>
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import { ref, onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const stockChart = ref(null);
const chartData = ref([
  { date: '2023-09-01', price: 67000 },
  { date: '2023-09-02', price: 67500 },
  { date: '2023-09-03', price: 68000 },
  { date: '2023-09-04', price: 67800 },
  { date: '2023-09-05', price: 68200 },
]);

const highestPrice = computed(() => Math.max(...chartData.value.map(data => data.price)));
const lowestPrice = computed(() => Math.min(...chartData.value.map(data => data.price)));

const item = ref({
  name: '미국달러(USD)',
  rate: '1,344.80',
  change: '3.02',
});

// 선택된 기간을 관리하는 변수 추가 (기본값을 '1일'로 설정)
const selectedTimeframe = ref('1일');

const refreshData = () => {
  console.log('데이터 새로고침');
  // 데이터 새로고침 로직을 추가하세요.
};

const selectTimeframe = (timeframe) => {
  selectedTimeframe.value = timeframe; // 선택된 기간 업데이트
  console.log('선택된 기간:', timeframe);
  // 여기에 기간 선택에 따른 추가 로직을 구현
};

// 선택된 기간에 따라 표시할 텍스트를 결정하는 computed property 추가
const timeframeText = computed(() => {
  return selectedTimeframe.value === '1일' ? '1일 전에 샀었다면 ' :
         selectedTimeframe.value === '1주' ? '1주일 전에 샀었다면 ' :
         '1달 전에 샀었다면 ';
});

// 예시로 보여줄 값 (이 부분은 실제 데이터로 대체 가능)
const displayValue = computed(() => {
  return selectedTimeframe.value === '1일' ? '+1,340.00' :
         selectedTimeframe.value === '1주' ? '+1,330.00' :
         '+1,300.00';
});

onMounted(() => {
  const ctx = stockChart.value.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartData.value.map(data => data.date),
      datasets: [{
        label: '', // 데이터셋 레이블을 빈 문자열로 설정하여 표시되지 않도록 함
        data: chartData.value.map(data => data.price),
        borderColor: 'orange',
        borderWidth: 2,
        fill: false,
        pointRadius: 0, // 점을 숨김
      }],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false, // x축 숨기기
        },
        y: {
          display: false, // y축 숨기기
          min: 65000, // y축 최소값
          max: 69000, // y축 최대값
        },
      },
      plugins: {
        legend: {
          display: false, // 범례 숨기기
        },
        tooltip: {
          enabled: false, // 툴팁 숨기기
        },
      },
    },
  });
});
</script>

<style scoped>
.container{
  margin-top: -90px;
  margin-bottom: 120px;
}

.exchange-header {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between;
  width: 100%;
  background-color: rgba(110, 96, 83, 0.15);
}

.exchage-include{
  border-radius: 10px;
  background-color: white;
  margin: 20px;
  width: 350px;
}

.exchange-info {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding: 20px;
}

.exchange-img {
  width: 40px; /* 이미지 크기 */
  height: 40px; /* 이미지 크기 */
  margin-right: 10px; /* 이미지와 외환명 사이 간격 */
  border-radius: 50%; /* 동그랗게 만들기 */
  object-fit: cover; /* 이미지 비율 유지하며 잘라내기 */
}

.exchange-detail {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.exchange-name{
  font-weight: bold;
}

.exchange-details{
  color: gray;
}

.refresh{
  margin-left: 45px;
  border: none;
  background-color: transparent;
  color: gray;
  margin-bottom: 40px;
}

.info {
  display: flex;
  justify-content: space-between; /* 두 요소를 양 끝으로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  width: 370px; /* 필요한 경우 너비 조정 */
  margin: 0 10px;
}


.chart-container {
  height: 200px;
  margin-bottom: 20px;
  width: 330px;
  margin-left: 30px;
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

.sort{
  background-color: #E9E7E5; /* 기본 배경색 */
  padding: 10px 15px;
}

.sort-include {
  display: flex;
  justify-content: space-between; /* 양쪽 끝으로 공간 분배 */
  width: 100%; /* 전체 너비 사용 */
}

.sort-option {
  flex: 1; /* 각 옵션이 동일한 너비를 가지도록 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
  padding: 8px; /* 여백 추가 */
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
  margin-top: 20px; /* 상단 여백 */
}

.timeframe-info {
  font-size: 18px; /* 글씨 크기 조정 */
}

.value-display {
  margin-top: 5px; /* 값과 텍스트 간 간격 조정 */
  font-size: 24px; /* 값 크기 조정 */
  font-weight: bold; /* 값 두껍게 */
}
</style>
