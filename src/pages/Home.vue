<template>
  <HeaderHome />

  <div class="container">
    <div class="chart-container">
      <h2><i class="fa-solid fa-magnifying-glass-chart icon"></i>TODAY KOSPI</h2>
      <h2 style="margin-top: 10px;">{{ kospiData[0]?.kospiVal?.toLocaleString() }}원</h2> <!-- KOSPI 가격 표시 -->

      
      <h6 :style="{ color: (kospiData[0]?.kospiVal - (kospiData[1]?.kospiVal || 0)) > 0 ? '#FF6767' : '#547BC1' }">
        <span style="color: gray;">전일대비 </span>{{ (kospiData[0]?.kospiVal - (kospiData[1]?.kospiVal || 0)).toFixed(2) }}원 {{ (kospiData[0]?.kospiVal - (kospiData[1]?.kospiVal || 0)) > 0 ? '▲' : '▼' }}
      </h6>
      <br>
      <div class="chart-container">
        <canvas ref="lineChart"></canvas>
      </div>

    </div>

    <hr style="margin-top: 20px; margin-bottom:35px">

    <div class="news">
      <i class="fa-solid fa-newspaper icon"></i> <span class="title">News</span>
      <br>
      <br>
      <div class="card-slider">
        <div class="d-flex flex-row card-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(news, index) in newsList" :key="index" class="card shadow-sm me-3" style="width: calc(50% - 10px);">
            <img class="card-img-top" :src="news.image" :alt="`Thumbnail ${index + 1}`">
            <div class="card-body">
              <p class="card-text">{{ news.title }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl(news.link)">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br>

      <div class="d-flex justify-content-center mt-1"> 
        <button class="circle-button" v-for="(news, index) in newsList.slice(0, 3)" :key="index" @click="goToSlide(index)"></button>
      </div>
    </div>

    <br>
    <hr>
    <br>

    <div class="wish">
      <i class="fa-solid fa-heart icon"></i> <span class="title">관심목록</span>
      <br>
      <br>

      <div class="wish-item d-flex align-items-center mt-2">
        <router-link to="/wish" class="d-flex align-items-center" style="text-decoration: none; color:black">
          <img src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <p class="mb-0" style="font-weight: bold;">NH 고향사랑 기부 예금</p>
            <p class="mb-0 text-muted">NH 농협은행</p>
          </div>
        </router-link>
      </div>

      <div class="wish-item d-flex align-items-center mt-2">
        <router-link to="/wish" class="d-flex align-items-center" style="text-decoration: none; color:black">
          <img src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <p class="mb-0" style="font-weight: bold;">삼성전자</p>
            <p class="mb-0 text-muted">
              67,500원 <span style="color: #547BC1;">-2.0</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderHome from '@/components/common/HeaderHome.vue';
import api from '@/api/homeApi'; // Axios 인스턴스 가져오기
import { Chart, registerables } from 'chart.js'; // Chart.js 가져오기

// Chart.js 등록
Chart.register(...registerables);

export default {
  components: {
    HeaderHome,
  },
  data() {
    return {
      currentSlide: 0, // 슬라이드 인덱스
      newsList: [], // 뉴스를 저장할 배열
      kospiData: [], // KOSPI 데이터를 저장할 배열
      lineChartRef: null, // lineChart에 대한 ref
    };
  },
  mounted() {
    this.lineChartRef = this.$refs.lineChart; // ref 이름에 맞게 수정
    this.fetchNews(); // 뉴스 가져오기
    this.fetchKospiData(); // KOSPI 데이터 가져오기
  },
  methods: {
    async fetchNews() {
      try {
        const response = await api.getHomeNews(); // API 호출
        this.newsList = response; // 응답 데이터를 newsList에 저장
        console.log('Fetched News List:', this.newsList); // 뉴스 리스트를 로그로 출력
      } catch (error) {
        console.error('뉴스를 가져오는 중 오류가 발생했습니다:', error);
      }
    },
    async fetchKospiData() {
      try {
        const response = await api.getKospiData(); // KOSPI 데이터 API 호출
        this.kospiData = response; // 응답 데이터를 kospiData에 저장
        console.log('Fetched KOSPI Data:', this.kospiData); // KOSPI 데이터를 로그로 출력
        this.createChart(); // KOSPI 데이터가 로드된 후 차트 생성
      } catch (error) {
        console.error('KOSPI 데이터를 가져오는 중 오류가 발생했습니다:', error);
      }
    },
    createChart() {
    if (this.lineChartRef) {
      const ctx = this.lineChartRef.getContext('2d'); // ref를 사용하여 컨텍스트 가져오기

      if (!ctx) {
        console.error('Chart context is null'); // 디버깅을 위한 로그 추가
        return;
      }

      // KOSPI 데이터에서 날짜와 값 추출
      const labels = this.kospiData.map(data => data.kospiDate); // 날짜를 X축 레이블로 사용
      const dataValues = this.kospiData.map(data => data.kospiVal); // KOSPI 값을 Y축 데이터로 사용

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels, // X축 레이블
          datasets: [{
            label: 'KOSPI',
            data: dataValues, // KOSPI 데이터
            backgroundColor: 'rgba(253, 235, 234, 0.5)', // 배경색
            borderColor: 'rgba(255, 103, 103, 1)', // 선 색상
            borderWidth: 2, // 선 두께
            fill: true, // 영역 채우기
            tension: 0.4, // 라인을 부드럽게 곡선으로
            pointRadius: 0, // 점 없애기
            pointHoverRadius: 0, // 마우스 오버 시 점 없애기
            display: false // 범례(legend) 없애기
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false // 범례 표시 안함
            }
          },
          scales: {
            x: {
              display: true, // x축 숨기기
              grid: {
                display: false // X축 점선 없애기
              }
            },
            y: {
              min: 2400, // y축 최소값 설정
              max: 2800, // y축 최대값 설정
              grid: {
                display: false // Y축 점선 없애기
              }
            }
          }
        }
      });
    } else {
      console.error('lineChartRef is null or not ready');
    }
  },
    goToSlide(index) {
      this.currentSlide = index; // 현재 슬라이드를 업데이트
    },
    goToUrl(link) {
      window.open(link, '_blank'); // 새로운 탭에서 URL 열기
    },
  }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin-top:-30px;
  margin-bottom: 100px;
}

.card-slider {
  overflow: hidden;
}

.card-wrapper {
  display: flex;
  transition: transform 0.3s ease;
}

.circle-button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #999;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.circle-button:hover {
  background-color: #FFBF0A;
}

.circle-button:focus {
  outline: none;
}

.card {
  flex: 0 0 calc(50% - 10px);
}

.card-text {
  height: 105px; /* 텍스트의 높이를 고정 */
  overflow: hidden; /* 범위를 넘어가는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 '...' 표시 */
  display: -webkit-box; /* 플렉스 박스 사용 */
  -webkit-box-orient: vertical; /* 수직 방향 설정 */
  -webkit-line-clamp: 2; /* 보여줄 라인 수 설정 (여기서는 2줄) */
}

.icon {
  color: #FFBF0A;
  font-size: 2rem;
  margin-right: 0.5rem;
}

.title {
  font-size: 1.5rem;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 290px; /* 차트 높이를 설정 */
}

.title {
  font-weight: bold;
  position: relative;
  bottom: 4px;
}

.card-img-top {
  width: 100%;
  height: 105px; /* 원하는 높이로 조정 */
  object-fit: cover;
}
.news{
  position: relative;
  bottom: 20px;
  width: 100%;
  height: 350px; /* 차트 높이를 설정 */
}
.wish{
  position: relative;
  bottom: 20px;
}

</style>
