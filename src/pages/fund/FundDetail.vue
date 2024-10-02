<template>
  <HeaderNormal navbarTitle="펀드 상세" />

  <div class="container" v-if="fund">
    <span class="high-risk">높은 위험</span>
    <span class="foreign-stock">해외주식형</span>
    <br /><br />
    <h4 style="font-weight: bold;">{{ fund.name }}</h4>
    <span>수수료미징구-온라인</span>
    <br /><br />

    <div class="rate-display">
      <p>3개월 수익률</p>
      <hr />
      <h3>{{ fund.rate }}%</h3>
    </div>

    <div class="base-display">
      <p>기준가</p>
      <h3 style="font-weight: bold;">{{ fund.base }}원</h3>
      <p style="color: #547BC1;">{{ fund.change }}</p>
      <hr />
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
      <canvas ref="lineChart" class="chart" />
    </div>

    <div class="notice-display">
      <h6 style="font-weight: bold; color: #CC4334">알려드립니다 !</h6>
      <p>과거의 운용실적이 미래의 수익률을 보장하지 않습니다. </p>
    </div>

    <div class="button-container">
      <a href="당신이연결할링크" class="join-button">보러가기</a>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { onMounted, ref } from 'vue';
import api from '@/api'; // API 모듈 가져오기

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

// 컴포넌트가 마운트될 때 API 호출
onMounted(() => {
  fetchFundDetail();
});
</script>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      currentSlide: 0,
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
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      new Chart(this.$refs.lineChart, {
        type: this.type,
        data: this.data,
        options: this.options
      });
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    goToUrl(url) {
      window.location.href = url;
    },
  }
}
</script>