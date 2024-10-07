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
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl(news.link)" style="margin-top: -20px;">View</button>
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
        <div class="wish-list flex-grow-1">
          <template v-if="wishList.length > 0"> <!-- wishList가 비어있지 않을 때 -->
            <div v-for="(wish, index) in wishList.slice(0, 2)" :key="index" class="wish-item d-flex justify-content-between align-items-center">
              <div class="wish-header d-flex align-items-center">
                <div class="wish-info d-flex align-items-center">
                  <img :src="wish.imgUrl" alt="Thumbnail" class="rounded-circle me-3" style="width: 30px; height: 30px; object-fit: cover;">
                  <div>
                    <router-link :to="`/wish`" class="wish-name" style="text-decoration: none; color: black;">
                      <h6>{{ wish.name }}</h6>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="wish-icon icon"> <!-- toggleFavorite 함수 호출은 여기에서 수행 -->
                <i class="fas fa-heart" style="color: #FAB809;"></i>
              </div>
            </div>
            <div class="mini-bar"></div> <!-- 미니바 추가 -->
          </template>
          <template v-else> <!-- wishList가 비어있을 때 -->
            <div class="no-wishes-message" style="text-align: center; color: gray;">
              관심 목록이 없어요 <br> 관심목록을 채워주세요!
            </div>
          </template>
        </div>
      </div>
      
      
    </div>
  </div>
</template>

<script>
import HeaderHome from '@/components/common/HeaderHome.vue';
import api from '@/api/homeApi'; // Axios 인스턴스 가져오기
import wishApi from '@/api/wishApi'; // Wish API 가져오기
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
      wishes: [], // 전체 위시 리스트를 저장할 배열
      lineChartRef: null, // lineChart에 대한 ref
      wishList:[],
    };
  },
  mounted() {
    this.lineChartRef = this.$refs.lineChart; // ref 이름에 맞게 수정
    this.fetchNews(); // 뉴스 가져오기
    this.fetchKospiData(); // KOSPI 데이터 가져오기
    this.logAllWishes(); // 전체 위시 리스트 가져오기
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
    async logAllWishes() {
      try {
        // LocalStorage에서 uno 값 가져오기
        const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
        this.uno = authData.uno; // uno 값 가져오기
        console.log('UNO:', this.uno); // uno 값 확인

        // 전체 관심 목록 API 호출
        const wishes = await wishApi.fetchAllWishes();
        console.log("전체 관심 목록:", wishes); // 콘솔에 전체 데이터를 출력

        // 각 tno에 대해 반복하면서 상품 정보를 가져오기
        const productTypes = [
          { tno: 1, fetchFunction: wishApi.fetchDepositById, name: 'deposit' },
          { tno: 2, fetchFunction: wishApi.fetchInstallmentById, name: 'installment' },
          { tno: 3, fetchFunction: wishApi.fetchFundById, name: 'fund' },
          { tno: 4, fetchFunction: wishApi.fetchStockById, name: 'stock' },
          { tno: 5, fetchFunction: wishApi.fetchForexById, name: 'forex' },
        ];

        for (const product of productTypes) {
          const wishesOfType = wishes.filter(wish => wish.tno === product.tno); // 각 tno에 해당하는 항목 찾기

          if (wishesOfType.length === 0) {
            console.log(`tno가 ${product.tno}인 상품이 없습니다.`);
            continue; // 다음 항목 검색
          }

          // 각 wish에 대해 API 호출하여 정보 가져오기
          for (const wish of wishesOfType) {
            const productInfo = await product.fetchFunction(wish.pno); // pno를 사용하여 정보 가져오기

            const wishListItem = {
              name: productInfo[`${product.name.toLowerCase()}Name`], // 이름 가져오기
              imgUrl: productInfo.imgUrl, // 이미지 URL 가져오기
            };

            // 상품 정보를 배열에 추가
            this.wishList.push(wishListItem);

            // console.log에서 정보를 출력
            console.log(`${product.name} 상품 정보:`, this.wishList);
          }
        }

        console.log('wishList : ', this.wishList);

      } catch (error) {
        console.error("관심 목록을 가져오는 도중 오류가 발생했습니다:", error);
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
    getImg(imgUrl) {
      return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
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
  font-size: 1.5rem;
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
