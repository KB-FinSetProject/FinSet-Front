<template>
  <HeaderNormal navbarTitle="주식 상품" />

  <div class="stock-container">

    <div class="tabs-container">
      <router-link to="/stock" class="tab" active-class="active">전체</router-link>
      <router-link to="/stockhigh" class="tab" active-class="active" style="color: #DADADA;">급상승 ▲</router-link>
      <router-link to="/stockdrop" class="tab" active-class="active" style="color: #DADADA;">급하락 ▼</router-link>
    </div>

    <br>

    <div class="stock-list">
      <div v-for="(stock, index) in filteredStocks" :key="stock.id" class="stock-item">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <span class="stock-rank">{{ index + 1 }}</span>
            <div class="stock-logo" :style="{ backgroundColor: stock.logoColor }">
              <span>{{ stock.logo }}</span>
            </div>
            
            <div class="stock-detail">
              <router-link :to="`/stock/chart`" class="stock-name">{{ stock.name }}</router-link>
              <p class="stock-details">{{ stock.price }} 
                <span class="change" :style="{ color: getColor(stock.change) }">{{ stock.change }}</span>
              </p>
            </div>
          </div>

          <div class="stock-icon" @click="toggleFavorite(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
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
    getColor(change) {
      return change.includes('+') ? '#FF6767' : '#547BC1'; // 양수는 빨간색, 음수는 파란색
    },
  },
};
</script>

<style scoped>
/* 스타일은 그대로 유지합니다 */
.stock-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  margin-top: -370px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: 40px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 24px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.best-yield-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px; /* 제목과 구분선 간의 간격 유지 */
  color: #000000;
  text-align: center;
  margin: 0; /* 제목 마진 초기화 */
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
  font-size: 10px;
  margin-right: 10px; /* 마진 추가 */
  margin-left: 5px;
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.stock-detail {
  margin-left: 10px;
}

.stock-details {
  font-size: 14px;
  margin: 0;
}

.change {
  margin-left: 7px;
}

.stock-icon {
  font-size: 15px;
  color: #888; /* 기본 색상 */
  margin-right: 15px;
  margin-top: 10px;
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
