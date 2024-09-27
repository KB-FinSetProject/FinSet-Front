<template>
  <HeaderNormal navbarTitle="주식 상품" />

  <div class="stock-container">
    <div class="titles-container">
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('all')">
        <h2 class="best-yield-title">전체</h2>
        <div class="divider" :class="{ active: activeTab === 'all' }"></div>
      </router-link>
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('gain')">
        <h2 class="best-yield-title">급상승</h2>
        <div class="divider" :class="{ active: activeTab === 'gain' }"></div>
      </router-link>
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('drop')">
        <h2 class="best-yield-title">급하락</h2>
        <div class="divider" :class="{ active: activeTab === 'drop' }"></div>
      </router-link>
    </div>

    <div class="stock-list">
      <div v-for="(stock, index) in filteredStocks" :key="stock.id" class="stock-item">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <span class="stock-rank">{{ index + 1 }}</span>
            <div class="stock-logo" :style="{ backgroundColor: stock.logoColor }">
              <span class="stock-icon">{{ stock.logo }}</span>
            </div>
            <div>
              <router-link :to="`/stock/detail/${stock.id}`" class="stock-name">{{ stock.name }}</router-link>
              <p class="stock-details">{{ stock.price }} <span class="change">{{ stock.change }}</span></p>
            </div>
          </div>
          <div class="stock-icon" @click="toggleFavorite(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
        <div class="mini-bar"></div> <!-- 미니바 추가 -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";

export default {
  components: { HeaderNormal },
  data() {
    return {
      activeTab: 'all',
      stocks: [
        {
          id: 1,
          name: '삼성전자',
          price: '67,500원',
          change: '-2.0%',
          favorite: true,
          logo: '삼성',
          logoColor: '#005EB8',
        },
        {
          id: 2,
          name: 'DXVXX',
          price: '3,155원',
          change: '+25.6%',
          favorite: false,
          logo: 'DX',
          logoColor: '#A2D7E0',
        },
        {
          id: 3,
          name: '유한양행',
          price: '119,900원',
          change: '-4.5%',
          favorite: true,
          logo: '유한',
          logoColor: '#005EB8',
        },
        {
          id: 4,
          name: '셀루메드',
          price: '3,285원',
          change: '+1.0%',
          favorite: false,
          logo: '셀',
          logoColor: '#A2D7E0',
        },
        // 추가 주식 데이터...
      ],
    };
  },
  computed: {
    filteredStocks() {
      if (this.activeTab === 'gain') {
        return this.stocks.filter(stock => stock.change.includes('+'));
      } else if (this.activeTab === 'drop') {
        return this.stocks.filter(stock => stock.change.includes('-'));
      }
      return this.stocks; // 전체 주식을 보여줌
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    toggleFavorite(stock) {
      stock.favorite = !stock.favorite; // favorite 상태 토글
    },
  },
};
</script>

<style scoped>
.stock-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  bottom: 110px;
}

.titles-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title-with-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  cursor: pointer;
  background: none;
  border: none;
  text-decoration: none;
  margin: 0; /* 마진 제거 */
}

.best-yield-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px; /* 제목과 구분선 간의 간격 유지 */
  color: #000000;
  text-align: center;
}

.divider {
  height: 2px;
  width: 100%;
  background-color: #e1e1e1;
  margin: 0; /* 마진 제거 */
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 10px; /* 여백 추가 */
  background-color: white; /* 배경색 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  /* border: none; */ /* 테두리 제거 */
}

.stock-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stock-info {
  display: flex;
  align-items: center;
}

.stock-rank {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.stock-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px; /* 마진 추가 */
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.stock-details {
  font-size: 14px;
  margin: 0;
}

.change {
  font-weight: bold;
}

.stock-icon {
  font-size: 24px;
  color: #888; /* 기본 색상 */
}

.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd;
  margin-top: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 1px 8px 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}
</style>
