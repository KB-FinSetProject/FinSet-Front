<template>
  <HeaderNormal navbarTitle="주식 리스트"/>
  <div v-for="stock in stocks" :key="stock.id" class="stock-top">
    <h2 class="stocks" key="stock.id">{{ stock.name }}</h2>
    <h2>삼성전자</h2>
    <div class="stock-header">
      <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
    </div>
    <h1>{{stock.price}}</h1>
  </div>

  <div class="stock-container">
    <div class="titles-container">
      <div class="title-with-divider">
        <h2 class="best-yield-title yield">차트</h2>
      </div>

      <router-link to="/stock-detail" class="title-with-divider">
        <h2 class="best-yield-title sales">종목정보</h2>
      </router-link>
      <router-link to="/stock-community" class="title-with-divider">
        <h2 class="best-yield-title savings">커뮤니티</h2>
      </router-link>
    </div>

    <!-- 차트를 그리기 위한 canvas 요소 -->
    <canvas id="stockChart"></canvas>

  </div>
</template>

<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import { Chart } from 'chart.js/auto';

export default {
  components: { HeaderNormal },
  data() {
    return {
      stocks: [
        { date: '2024-09-13', price: 74500 },
        { date: '2024-09-12', price: 64000 },
        { date: '2024-09-11', price: 60000 },
        { date: '2024-09-10', price: 65500 },
        { date: '2024-09-09', price: 63000 },
        { date: '2024-09-06', price: 64000 },
        { date: '2024-09-05', price: 67000 },
        { date: '2024-09-04', price: 62000 },
        { date: '2024-09-03', price: 65000 },
        { date: '2024-09-02', price: 66000 },
        { date: '2024-08-30', price: 64000 },
        // 추가 데이터...
      ],
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('stockChart').getContext('2d');

      new Chart(ctx, {
        type: 'line', // 차트 유형
        data: {
          labels: this.stocks.map(stock => stock.date),
          datasets: [
            {
              label: '주식 가격 (삼성전자)',
              data: this.stocks.map(stock => stock.price),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: this.stocks.map(stock => stock.date),
            },
            y: {
              beginAtZero: false,
            },
          },
        },
      });
    },
  },
};
</script>

<style>
#stockChart {
  max-width: 600px;
  max-height: 400px;
}
.stock-top {
  margin-top: -330px;
}
.stock-container {
  padding: 16px;
  max-width: 390px;
}
.titles-container {
  display: flex;
  align-items: flex-start;
}
.title-with-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: none;
}
.best-yield-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
}
</style>
