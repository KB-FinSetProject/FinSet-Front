<template>
  <HeaderNormal navbarTitle="주식 리스트"/>

  <div :key="stocks[0].id" class="stock-top">
    <h2 class="stocks">{{ stocks[0].name }}</h2>
    <h1>{{ stocks[0].price }}</h1>
  </div>

  <div class="stock-container">
    <div class="titles-container">
      <router-link to="/stock/chart" class="title-with-divider">
        <h2 class="best-yield-title yield">차트</h2>
        <div class="yield-divider" :class="{ active: activeTab === 'yield' }"></div>
      </router-link>

      <div class="title-with-divider">
        <h2 class="best-yield-title sales">종목정보</h2>
        <div class="sales-divider" :class="{ active: activeTab === 'sales' }"></div>
      </div>

      <router-link to="/stock/community" class="title-with-divider" @click.native="setActiveTab('saving')">
        <h2 class="best-yield-title savings">커뮤니티</h2>
        <div class="savings-divider" :class="{ active: activeTab === 'savings' }"></div>
      </router-link>
    </div>

    <div class="stock-list">
      <div v-for="stock in stocks" :key="stock.id" class="stock-item">
        <div class="stock-header">
          <div class="stock-info">
            <p class="stock-name">{{ stock.name }}</p>
            <p class="stock-price">{{ stock.price }}</p>
            <div class="risk-info">
              <span class="high-rating">{{ stock.price }}</span>
              <span class="foreign-stock">{{ stock.change }}</span>
            </div>
          </div>
          <div class="stock-favorite">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 새로 추가된 시세 정보 섹션 -->
    <div class="stock-details">
      <h3>시세</h3>
      <div class="price-range">
        <span>1일 최저가</span>
        <input type="range" v-model="currentPrice" :min="minPrice" :max="maxPrice" disabled>
        <span>1일 최고가</span>
      </div>
      <div class="price-info">
        <span>{{ minPrice }}원</span>
        <span>{{ maxPrice }}원</span>
      </div>
      <div class="stock-info-grid">
        <div>
          <p>시가</p>
          <p>{{ openPrice }}원</p>
        </div>
        <div>
          <p>종가</p>
          <p>{{ closePrice }}원</p>
        </div>
        <div>
          <p>거래대금</p>
          <p>{{ tradingVolume }}주</p>
        </div>
      </div>
      <div class="additional-info">
        <div>
          <p>매출</p>
          <p>{{ revenue }}조원</p>
        </div>
        <div>
          <p>영업이익</p>
          <p>{{ operatingProfit }}조원</p>
        </div>
        <div>
          <p>순수익</p>
          <p>{{ netProfit }}조원</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";

export default {
  components: {HeaderNormal},
  data() {
    return {
      activeTab: 'yield',
      stocks: [
        {id: 1, name: '삼성전자', price: '67,500원', change: '-2.0%', favorite: true},
        // 추가적인 주식 데이터
      ],
      minPrice: 3000,
      maxPrice: 6000,
      currentPrice: 67000,
      openPrice: 67000,
      closePrice: 68000,
      tradingVolume: 30,
      revenue: 74,
      operatingProfit: 10,
      netProfit: 9.8
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  mounted() {
    this.setActiveTab('yield');
  },
};
</script>

<style scoped>
/* 기존 스타일은 그대로 유지 */

.stock-details {
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.price-range {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price-range input[type="range"] {
  flex-grow: 1;
  margin: 0 10px;
}

.price-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.stock-info-grid, .additional-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: center;
}

.stock-info-grid div, .additional-info div {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.stock-info-grid p:first-child, .additional-info p:first-child {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>