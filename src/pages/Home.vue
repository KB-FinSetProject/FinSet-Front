<template>
  <div class="container">

    <div class="chart-container">
      <h2><i class="fa-solid fa-magnifying-glass-chart icon"></i>TODAY KOSPI</h2>
      <h2 style="margin-top: 10px;">2,572.09</h2>
      <h6 style="color: #547BC1;">-56.51 (2.13%) ▼ 오늘</h6>

      <br>
      <canvas ref="lineChart" />
    </div>

    <br>
    <hr>
    <br>

    <div class="news">
      <i class="fa-solid fa-newspaper icon"></i> <span class="title">News</span>
      <br>
      <br>
      <div class="card-slider">
        <div class="d-flex flex-row card-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(card, index) in cards" :key="index" class="card shadow-sm me-3" style="width: calc(50% - 10px);">
            <img class="card-img-top" :src="card.imgUrl" :alt="`Thumbnail ${index + 1}`">
            <div class="card-body">
              <p class="card-text">{{ card.content }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl(card.url)">View</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br>

      <div class="d-flex justify-content-center mt-1"> <!-- margin-top을 1로 줄였습니다. -->
        <button class="circle-button" v-for="(card, index) in cards.slice(0, 3)" :key="index" @click="goToSlide(index)"></button>
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
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  data() {
    return {
      currentSlide: 0, // 슬라이드 인덱스
      cards: [
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content1',
          url: 'https://example.com/article1'
        },
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content2',
          url: 'https://example.com/article2'
        },
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content3',
          url: 'https://example.com/article3'
        },
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content4',
          url: 'https://example.com/article4'
        },
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content5',
          url: 'https://example.com/article5'
        },
        {
          imgUrl: 'https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg',
          content: 'content6',
          url: 'https://example.com/article6'
        }
      ],
      type: 'line', // 차트 타입을 'line'으로 설정
      data: {
        labels: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
        datasets: [{
          label: 'Sales',
          data: [40, 20, 30, 50, 70, 80, 50],
          backgroundColor: 'rgba(253, 235, 234, 0.5)', // 배경색
          borderColor: 'rgba(255, 103, 103, 1)', // 선 색상
          borderWidth: 2, // 선 두께
          fill: true, // 영역 채우기
          tension: 0.4, // 라인을 부드럽게 곡선으로
          pointRadius: 0, // 점 없애기
          pointHoverRadius: 0 // 마우스 오버 시 점 없애기
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // 범례(legend) 없애기
          }
        },
        scales: {
          x: {
            grid: {
              display: false // X축 점선 없애기
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false // Y축 점선 없애기
            }
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
  width: 58%;
  margin-top:70px;
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
  height: 150px; /* 원하는 높이로 조정 */
  object-fit: cover;
}
.news{
  position: relative;
  bottom: 20px;
  width: 100%;
  height: 310px; /* 차트 높이를 설정 */
}
.wish{
  position: relative;
  bottom: 20px;
}

</style>
