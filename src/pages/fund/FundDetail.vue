<template>
  <HeaderNormal navbarTitle="펀드 상세" />
  
  <div class="container" v-if="fund">
    <div class="risk-type">
      <span class="high-risk">높은 위험</span>
      <span class="foreign-stock">해외주식형</span>
    </div>
    <h4 class="fund-name">{{ fund.name }}</h4>
    <span class="commission">수수료미징구-온라인</span>

    <div class="rate-display">
      <div class="rate-box">
        <p>3개월 수익률</p>
        <hr class="white-bar" />
        <h3 class="rate">{{ fund.rate }} %</h3>
      </div>
    </div>

    <div class="base-display">
      <p>기준가</p>
      <h3 class="base-price">{{ fund.base }}원</h3>
      <p class="change">{{ fund.change }}</p>
    </div>

    <div class="data-display">
      <div class="data-item">
        <p>규모</p>
        <p><strong>{{ fund.amount }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>운용사</p>
        <p><strong>{{ fund.company }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>위험 등급</p>
        <p><strong>{{ fund.danger }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>펀드 유형</p>
        <p><strong>{{ fund.type }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>선취 수수료</p>
        <p><strong>{{ fund.fees }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>설정일</p>
        <p><strong>{{ fund.date }}</strong></p>
      </div>
      <hr />
    </div>

    <div class="chart-container">
      <canvas ref="lineChart" class="chart"></canvas>
    </div>

    <div class="notice-display">
      <h6 class="notice-title">알려드립니다 !</h6>
      <p>과거의 운용실적이 미래의 수익률을 보장하지 않습니다.</p>
    </div>

    <div class="button-container">
      <a href="당신이연결할링크" class="join-button">보러가기</a>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { onMounted, ref, watch } from 'vue';
import api from '@/api'; // API 모듈 가져오기
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const fund = ref(null); // 펀드 정보를 저장할 ref 변수

// 펀드 ID (예: URL 파라미터 등으로 가져올 수 있음)
const fundId = '123'; // 예시 ID

// 펀드 상세 정보 가져오기
async function fetchFundDetail() {
  try {
    const response = await api.get(fundId); // 펀드 ID로 API 호출
    fund.value = response; // 응답 데이터를 ref에 저장
  } catch (error) {
    console.error('펀드 상세 정보 가져오기 실패:', error);
  }
}

// 차트 생성
function createChart() {
  if (fund.value) {
    new Chart(document.querySelector("canvas"), {
      type: 'line',
      data: {
        labels: ['23/10/01', '23/12/01', '24/02/01', '24/04/01', '24/06/01', '24/08/01', '24/10/01'],
        datasets: [
          {
            label: '펀드',
            data: [40, 20, 30, 50, 70, 80, 50],
            backgroundColor: 'rgba(255, 0, 0, 0)',
            borderColor: '#FF6767',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
          {
            label: '벤치마크',
            data: [20, 0, 10, 30, 50, 60, 30],
            backgroundColor: 'rgba(0, 255, 0, 0)',
            borderColor: '#00953C',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
          {
            label: '유형평균',
            data: [30, 10, 20, 40, 60, 70, 40],
            backgroundColor: 'rgba(0, 0, 255, 0)',
            borderColor: '#547BC1',
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }
}

// 컴포넌트가 마운트될 때 API 호출
onMounted(() => {
  fetchFundDetail().then(() => {
    createChart(); // 펀드 정보가 로드된 후 차트 생성
  });
});

// fund가 업데이트될 때 차트 생성
watch(fund, (newValue) => {
  if (newValue) {
    createChart();
  }
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

.high-risk {
  background-color: #FDEBEA;
  color: #FF6767; /* 작은 박스 배경색 */
  padding: 5px 6px; /* 크기 줄이기 */
  border-radius: 3px;
  margin-right: 5px; /* 오른쪽 여백 추가 */
  width: 70px;
  height: 25px;
  font-size: 11px;
}

.foreign-stock {
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
}

.base-price {
  font-weight: bold;
  font-size: 20px;
}

.change {
  color: #547BC1;
}

.data-display {
  margin: 20px 0;
}

.data-item {
  display: flex;
  justify-content: space-between;
}

.chart-container {
  margin: 40px 0;
}

.notice-display {
  background-color: #e2e3e5; /* 회색 박스 */
  padding: 10px;
  border-radius: 5px;
  margin: 20px 0;
}

.notice-title {
  font-weight: bold;
  color: #CC4334; /* 빨간 글씨 */
}

.button-container {
  text-align: center;
  margin-top: 20px; /* 버튼 간격 조정 */
}

.join-button {
  padding: 10px 20px;
  width: 200px; /* 버튼의 고정 가로 길이 설정 */
  background-color: #FFBF47; /* 노란색 버튼 */
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s; /* 부드러운 배경색 전환 효과 */
}


.join-button:hover {
  background-color: #FFC107; /* 호버 시 색상 변경 */
}
</style>
