<template>
  <HeaderNormal navbarTitle="펀드 상세" />

  <div class="container">
    <span class="high-risk">높은 위험</span>
    <span class="foreign-stock">해외주식형</span>
    <br /><br />
    <h5>{{ name }}</h5>
    <span>수수료미징구-온라인</span>
    <br /><br />

    <div class="rate-display">
      <p>3개월 수익률</p>
      <hr />
      <h3>{{ rate }}%</h3>
    </div>

    <div class="base-display">
      <p>기준가</p>
      <h3>{{ base }}원</h3>
      <p style="color: #547BC1;">{{ change }}</p>
      <hr />
    </div>

    <div class="data-display">
      <div class="data-item">
        <p>규모</p>
        <p><strong>{{ amount }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>운용사</p>
        <p><strong>{{ company }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>위험 등급</p>
        <p><strong>{{ danger }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>펀드 유형</p>
        <p><strong>{{ type }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>선취 수수료</p>
        <p><strong>{{ fees }}</strong></p>
      </div>
      <hr />
      <div class="data-item">
        <p>설정일</p>
        <p><strong>{{ date }}</strong></p>
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

const name = '미래에셋인도중형포커스증권자 투자신탁 1(주식) 종류 C-e';
const rate = 14.08;
const base = 4813.93;
const change = -7.44;
const amount = 1131.38;
const company = '미래에셋 자산운용';
const danger = '높은 위험';
const type = '인도주식';
const fees = '수수료없음';
const date = '2015/09/23';
</script>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    data() {
        return {
            currentSlide: 0, // 슬라이드 인덱스
            type: 'line', // 차트 타입을 'line'으로 설정
            data: {
                labels: ['January', ' February', ' March', ' April', ' May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    data: [40, 20, 30, 50, 70, 80, 50],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: true, // 영역 채우기
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
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
                type: this.type, // 'line' 차트를 생성
                data: this.data,
                options: this.options
            });
        },
        goToSlide(index) {
            this.currentSlide = index; // 클릭한 버튼에 따라 슬라이드 변경
        },
        goToUrl(url) {
            window.location.href = url; // 해당 URL로 이동
        },
    }
}
</script>

<style scoped>
.container {
  margin-bottom: 300px;
  width: 100%;
}

.data-display {
  width: 80%;
  margin: 20px auto;
}

/* 색상 스타일 추가 */
.high-risk {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
}

.foreign-stock {
  margin-left: 10px;
  background-color: #EDF1F8;
  color: #547BC1;
  padding: 5px;
  border-radius: 5px;
  font-size: 10px;
}

.rate-display {
  background-color: #6E6053; /* 배경색 설정 */
  color: white; /* 글씨색 흰색으로 설정 */
  padding: 10px; /* 패딩 추가 */
  text-align: center;
}

.rate-display hr {
  border: 1px solid white; /* hr도 흰색으로 설정 */
}

.base-display {
  padding: 10px; /* 패딩 추가 */
  text-align: center;
}

.data-display {
  display: flex;
  flex-direction: column; /* 수직 방향으로 배치 */
}

.data-item {
  display: flex;
  justify-content: space-between; /* 항목 간의 공간을 동일하게 배분 */
}

.notice-display {
  background-color: #F5F5F5; /* 배경색 설정 */
  padding: 10px; /* 패딩 추가 */
  text-align: center;
  margin-top: 20px;
}

.button-container {
  display: flex; /* flexbox 사용 */
  justify-content: center; /* 가로 중앙 정렬 */
}

.join-button {
  background-color: #FFBB00; /* 버튼 배경색 */
  color: white; /* 글씨 색상 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 3px 30px; /* 버튼 내부 여백 */
  font-size: 20px; /* 글씨 크기 */
  cursor: pointer; /* 마우스 포인터를 손가락으로 변경 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */
  text-decoration: none;
  position: relative;
  margin-top: 30px;
}

.join-button:hover {
  background-color: #e6a600; /* 마우스 오버 시 배경색 변화 */
}

/* 차트 스타일 추가 */
.chart {
  width: 100%; /* 가로 100% */
  height: 400px; /* 원하는 높이 설정 */
}
</style>
