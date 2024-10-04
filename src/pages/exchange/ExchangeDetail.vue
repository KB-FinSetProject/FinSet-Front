<template>
  <HeaderNormal navbarTitle="외환 상세" />

  <div class="container">
    <br><br>
    <h3 style="margin-left: 10px;">환전정보</h3>
    <span style="margin-left: 10px; color:gray">2024/10/01 09:00 기준 </span>
    <br><br>

    <div class="exchange-header d-flex align-items-center justify-content-between" v-if="item">
      <div class="exchage-include">
        <div class="exchange-info d-flex align-items-center">
          <img :src="getFlagUrl(item.forexName)" alt="외환 이미지" class="exchange-img" />
          <div class="exchange-detail d-flex align-items-center">
            <h6 class="exchange-name">{{ item.forexName }}</h6>
            <p class="exchange-details">적용환율: {{ item.forexBasicRate.toLocaleString() }}원</p>
          </div>
        </div>
      </div>
    </div>

    <br>
    <p style="margin-left: 10px; color: gray;">실시간 환율</p>
    <div class="info d-flex justify-content-between align-items-center" v-if="item">
      <h1>{{ item.forexBasicRate.toLocaleString() }}원</h1>
      <span :style="{ color: item.change > 0 ? '#FF6767' : '#547BC1' }">
        <span style="color: gray;">전일대비 </span>{{ change }}원 {{ change > 0 ? '▲' : '▼' }}
      </span>
    </div>

    <br>

    <div class="chart-container">
      <canvas ref="stockChart"></canvas>
      <div class="chart-info" v-if="item">
        <span class="chart-high">최고 {{ highestPrice.toLocaleString() }}원</span>
        <span class="chart-low">최저 {{ lowestPrice.toLocaleString() }}원</span>
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
  
    <div class="timeframe-container d-flex align-items-start" v-if="item">
      <i class="fa-solid fa-chart-line icon"></i>
      <div>
        <div class="timeframe-info">
          <span>{{ timeframeText }} 전에 샀었다면 수익</span>
        </div>
        <div class="value-display">
          <h5>{{ displayValue.toLocaleString() }}원</h5>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
</script>

<script>
import forexApi from "@/api/forexApi"; // 외환 정보를 가져오는 API 모듈
import { Chart, registerables } from 'chart.js'; // Chart.js 가져오기
Chart.register(...registerables);

export default {
  data() {
    return {
      item: null, // 외환 정보를 저장할 객체
      chartData: null, // 차트 데이터를 저장할 객체
      selectedTimeframe: '1일', // 초기 값 설정
      highestPrice: 0, // 최대 가격
      lowestPrice: 0, // 최소 가격
      timeframeText: '1일', // 초기 텍스트 설정
      displayValue: 0, // 계산된 수익 값을 저장
      change: 0, // 전일 대비 변동 값을 저장
    };
  },
  async mounted() {
    const feno = this.$route.query.feno; // 쿼리 파라미터에서 feno를 가져옴
    await this.fetchExchangeDetails(feno); // 해당 feno로 외환 정보 요청
    await this.fetchForexChartById(feno); // 차트 데이터 요청
    this.calculateDisplayValue(); // 초기 로드 시 1일 기준으로 displayValue 계산
    this.calculateChange(); // 전일 대비 변동 값 계산
  },
  methods: {
    async fetchExchangeDetails(feno) {
      try {
        this.item = await forexApi.fetchForexById(feno);
      } catch (error) {
        console.error("Error fetching exchange details:", error);
      }
    },
    async fetchForexChartById(feno) {
      try {
        this.chartData = await forexApi.fetchForexChartById(feno);
        console.log("Fetched chart data:", this.chartData);
        const forexRates = this.chartData.map(data => data.forexBasicRate);

        // 최대값과 최소값 계산 후 저장
        this.highestPrice = Math.max(...forexRates);
        this.lowestPrice = Math.min(...forexRates);

        console.log("Highest Price:", this.highestPrice);
        console.log("Lowest Price:", this.lowestPrice);
        this.renderChart(); // 차트 렌더링
      } catch (error) {
        console.error("Error fetching forex chart by ID:", error);
      }
    },
    renderChart() {
      const ctx = this.$refs.stockChart.getContext('2d');
      
      new Chart(ctx, {
        type: 'line', // 차트 타입
        data: {
          labels: this.chartData.map(data => data.forexDatetime), // x축 레이블
          datasets: [{
            label: '', // 데이터셋 레이블을 빈 문자열로 설정하여 표시되지 않도록 함
            data: this.chartData.map(data => data.forexBasicRate), // y축 데이터
            borderColor: 'orange', // 선 색상
            borderWidth: 2, // 선 두께
            fill: false, // 선 아래 영역을 채우지 않음
            pointRadius: 0, // 점을 숨김
          }]
        },
        options: {
          responsive: true, // 반응형 차트
          scales: {
            x: {
              display: false, // x축 숨기기
              grid: {
                display: false, // x축 그리드 라인 숨기기
              }
            },
            y: {
              display: false, // y축 숨기기
              grid: {
                display: false, // y축 그리드 라인 숨기기
              }
            }
          },
          plugins: {
            legend: {
              display: false, // 범례 숨기기
            },
            tooltip: {
              enabled: false, // 툴팁 숨기기
            },
          },
          elements: {
            line: {
              tension: 0.4 // 선을 부드럽게 함 (0: 직선, 1: 곡선)
            }
          }
        }
      });
    },
    calculateChange() {
      if (this.chartData && this.chartData.length > 1) {
        // 인덱스 0과 인덱스 1의 forexBasicRate 차이를 계산
        this.change = (this.chartData[0].forexBasicRate - this.chartData[1].forexBasicRate).toFixed(2);
      } else {
        this.change = 0; // 데이터가 부족할 경우 0으로 설정
      }
    },
    calculateDisplayValue() {
      if (!this.chartData || this.chartData.length === 0) {
        return; // 차트 데이터가 없으면 계산할 수 없으므로 리턴
      }

      const currentRate = this.chartData[0].forexBasicRate; // 가장 최근 가격
      
      let pastRate;
      if (this.selectedTimeframe === '1일') {
        pastRate = this.chartData[1] ? this.chartData[1].forexBasicRate : currentRate;
      } else if (this.selectedTimeframe === '1주') {
        pastRate = this.chartData[5] ? this.chartData[5].forexBasicRate : currentRate; // 1주 전 (5일 전)
      } else if (this.selectedTimeframe === '1달') {
        pastRate = this.chartData[19] ? this.chartData[19].forexBasicRate : currentRate; // 1달 전 (22일 전)
      }
      
      // 수익 계산 (현재 값에서 과거 값을 뺀 결과)
      this.displayValue = (currentRate - pastRate).toFixed(2); // 소수점 2자리까지
    },
    getFlagUrl(forexName){
      if (forexName.includes('CNH')) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png';
      } else if (forexName.includes('EUR')) {
        return 'https://i.namu.wiki/i/-aDCVSLRt5Gn7KGaXNZyjNVxjRey1gnfmg_16JrK7bqY1ihROnM1YVkzE1Da-FZWCp6JORbIBfVSSUIRjq0XfA.svg';
      } else if (forexName.includes('GBP')) {
        return 'https://i.namu.wiki/i/WNw8JiSr4x94S6McVTaDj70J_VmBtOPAV6NzP5FBOyRXD7E7nalYplrZeyGtsKq8KyAezsTqtS3Uec3jchRRUw.svg';
      } else if (forexName.includes('JPY')) {
        return 'https://i.namu.wiki/i/uPDCkQv1zGpaEdmeqmEDRIM3nMyRD2BslQUouPpxpI5M-PkGdmxPwxFJvu9RCUUVYg2XOH4rfedfkxhnDqfumw.svg';
      } else if (forexName.includes('USD')) {
        return 'https://i.namu.wiki/i/fFkDY65WFfapNpAB8Np7V7kVd3rWE_cAgEZMGS2vdPJGJAfM463_PzmVHD_TJbg8_XGoCPrAmL84JrqjfTSIyA.svg';
      } else {
        return ''; // 기본값은 빈 문자열
      }
    },
    selectTimeframe(timeframe) {
      this.selectedTimeframe = timeframe;
      this.timeframeText = timeframe; // 선택한 시간대를 그대로 timeframeText에 반영
      
      // 시간대에 따라 수익 값을 계산하는 로직 추가
      this.calculateDisplayValue();
    }
  }
};
</script>



<style scoped>
.container{
  margin-top: -100px;
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
  border: 0.5px solid gray;
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