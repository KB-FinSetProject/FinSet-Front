<template>
  <HeaderNormal navbarTitle="펀드 상세" />

  <div class="container" v-if="fund">
    <div class="risk-info">
      <span class="high-rating">{{ fund?.fundLisk }}</span>
      <span class="fund-type">{{ fund?.fundType }}</span>
    </div>
    <h4 class="fund-name">{{ fund.fundName }}</h4>
    <span class="commission">수수료미징구-온라인</span>

    <div class="rate-display">
      <div class="rate-box">
        <p>3개월 수익률</p>
        <hr class="white-bar" />
        <h3 class="rate">{{ fund.fundEarningRatio }} %</h3>
      </div>
    </div>

    <div class="base-display">
      <p>기준가</p>
      <h3 class="base-price">{{ fund.fundStandard }}원</h3>
      <p class="change">{{ fund.fundChangeRate }}</p>
    </div>

    <div class="data-display">
      <div class="data-item">
        <p>규모</p>
        <p><strong>{{ fund.fundScale }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>운용사</p>
        <p><strong>{{ fund.fundCompany }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>위험 등급</p>
        <p><strong>{{ fund.fundLisk }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>펀드 유형</p>
        <p><strong>{{ fund.fundType }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>선취 수수료</p>
        <p><strong>{{ fund.fundCharge }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>설정일</p>
        <p><strong>{{ fund.fundRegdate }}</strong></p>
      </div>
      <hr />
    </div>

    <div class="chart-container">
      <canvas ref="chartCanvas" class="chart"></canvas>
    </div>

    <div class="notice-display">
      <h6 class="notice-title">알려드립니다 !</h6>
      <p>과거의 운용실적이 미래의 수익률을 보장하지 않습니다.</p>
    </div>

    <div class="button-container">
      <a :href="fund.fundLink" target="_blank" rel="noopener noreferrer" class="join-button">보러가기</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/api/fundApi';
import { Chart, registerables } from 'chart.js';
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import wishApi from "@/api/wishApi.js";

Chart.register(...registerables);

const fund = ref(null);
const chartData = ref(null);
const chartCanvas = ref(null);
const route = useRoute();
const fundId = route.params.fno;

async function fetchFundDetail() {
  try {
    const response = await api.getFundDetail(fundId);
    fund.value = response.fund;
    chartData.value = response.chartData;
  } catch (error) {
    console.error('Failed to fetch fund details:', error);
    // Optionally, set a user-visible error state
  }

  await fetchWishes();
}

async function fetchWishes() {
  try {
    const fetchedWishes = await wishApi.fetchAllWishes();
    wishes.value = fetchedWishes || [];
  } catch (error) {
    console.warn("No wishes found or error fetching wishes:", error);
    wishes.value = [];
  }
}

// Favorite toggle function
const toggleFavorite = async (fund) => {
  fund.favorite = !fund.favorite;
  try {
    if (fund.favorite) {
      await wishApi.addWish({ tno: 3, uno: uno.value, pno: fund.fno });
    } else {
      await wishApi.deleteWish({ tno: 3, uno: uno.value, pno: fund.fno });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    fund.favorite = !fund.favorite; // Restore original state on error
  }
};

function createChart() {
  if (chartData.value && chartCanvas.value) {
    const labels = chartData.value.map(data => data.fundDatetime).reverse();
    const fundValues = chartData.value.map(data => data.fundVal).reverse();
    const benchmarkValues = chartData.value.map(data => data.benVal).reverse();
    const typeValues = chartData.value.map(data => data.typeVal).reverse();

    const allValues = [...fundValues, ...benchmarkValues, ...typeValues];
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '펀드',
            data: fundValues,
            borderColor: '#FF6767',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
          {
            label: '벤치마크',
            data: benchmarkValues,
            borderColor: '#00953C',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
          {
            label: '유형평균',
            data: typeValues,
            borderColor: '#547BC1',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            min: minValue - 3,
            max: maxValue + 3,
            grid: { display: false },
          },
          x: {
            type: 'category',
            grid: { display: false },
          }
        },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
      }
    });
  }
}

onMounted(() => {
  fetchFundDetail().then(createChart);
});

watch(fund, (newValue) => {
  if (newValue) createChart();
});
</script>

<style scoped>
.container {
  padding: 0; /* 모든 패딩 제거 */
  padding-bottom: 100px; /* 버튼을 위해 여유 공간 추가 */
  margin-top: -15px; /* 위쪽 공간을 조금 줄이기 위해 음수 margin 추가 */
  overflow-y: auto; /* 스크롤이 생기도록 설정 */
}

body {
  height: 1200px; /* 전체 화면 높이 설정 */
  overflow-y: auto; /* 수직 스크롤이 가능하도록 설정 */
  margin: 0; /* 기본 margin 제거 */
}

.risk-type {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767; /* 작은 박스 배경색 */
  padding: 5px 6px; /* 크기 줄이기 */
  border-radius: 3px;
  margin-right: 5px; /* 오른쪽 여백 추가 */
  width: 70px;
  height: 25px;
  font-size: 11px;
}

.fund-type {
  background-color: #EDF1F8;
  color: #547BC1; /* 작은 박스 배경색 */
  padding: 5px 6px; /* 크기 줄이기 */
  border-radius: 3px;
  width: 70px;
  height: 25px;
  font-size: 11px;
}

.fund-name {
  font-weight: bold;
  font-size: 24px;
  padding-top: 15px;
}

.commission {
  font-size: 16px;
}

.rate-display {
  margin: 20px 0;
  text-align: center; /* 중앙 정렬 */
}

.rate-box {
  background-color: #6E6053; /* 갈색 박스 */
  padding: 10px;
  color: white;
}

.white-bar {
  background-color: white;
  height: 2px; /* 바의 두께 */
  margin: 5px 0; /* 여백 추가 */
}

.base-display {
  margin: 20px 0;
  text-align: center; /* 중앙 정렬 */
}

.base-price {
  font-weight: bold;
  font-size: 24px; /* 폰트 크기 증가 */
  margin-bottom: 10px; /* 아래쪽 여백 추가 */
}

.change {
  color: #547BC1;
  font-size: 18px; /* 폰트 크기 증가 */
  text-align: center; /* 가운데 정렬 */
}

.data-display {
  padding: 10px;
  background-color: transparent; /* 회색 배경 제거 */
}

.data-item {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.chart-container {
  margin-top: 15px;
}

.notice-title {
  font-size: 15px;
  margin-top: 10px;
  color: #FF6767; /* 빨간색 글씨 */
  font-weight: bold; /* 굵게 표시 */
}

.notice-display {
  margin-bottom: 30px;
  font-size: 14px;
  background-color: #F6F6F6; /* 회색 배경 */
  padding: 10px; /* 패딩 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
  margin-top: 25px;
}

.button-container {
  text-align: center;
  margin-top: 10px;
}

.join-button {
  background-color: #FAB809; /* 노란색 배경 */
  padding: 15px 0;
  color: white;
  border-radius: 10px;
  width: 100%;
  display: inline-block;
  text-align: center;
  text-decoration: none; /* 밑줄 제거 */
}
</style>
