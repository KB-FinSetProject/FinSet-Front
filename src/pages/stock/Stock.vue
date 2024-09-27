<template>
  <HeaderNormal navbarTitle="주식 리스트"/>
  <div class="stock-container">
    <div class="yellow-box" v-if="activeTab === 'sales'">
      <h2 class="best-yield-title">판매액 베스트</h2>
      <div class="mini-bar"></div>
      <p class="description white-text">최근 3개월 동안 기간별 시장에서 수익률이 가장 높은 펀드예요!</p>
    </div>

    <div class="titles-container">
      <div class ="title-with-divider">     <h2 class="best-yield-title yield">거래량</h2>
        <div class="yield-divider" :class="{ active: activeTab === 'yield' }"></div>
      </div>

      <router-link to="/stock-high" class="title-with-divider" @click.native="setActiveTab('sales')">
        <h2 class="best-yield-title sales">급상승</h2>
        <div class="sales-divider" :class="{ active: activeTab === 'sales' }"></div>
      </router-link>
      <router-link to="/stock-drop" class="title-with-divider" @click.native="setActiveTab('saving')">
        <h2 class="best-yield-title savings">급하락</h2>
        <div class="savings-divider" :class="{ active: activeTab === 'savings' }"></div>
      </router-link>
    </div>

    <div class="stock-list">
      <div v-for="stock in stocks" :key="stock.id" class="stock-item">
        <div class="stock-header">

          <div class="stock-info">
            <router-link to="/stock-detail">
            <p class="stock-name">{{ stock.name }}</p>
            <p class="stock-details">{{ stock.details }}</p>
            <div class="risk-info">
              <span class="high-rating">{{stock.price}} </span>
              <span class="foreign-stock">{{ stock.change }}</span>
            </div>
            </router-link>
          </div>
          <div class="stock-header">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
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
        { id: 1, name: '삼성전자', price: '67,500원', change: '-2.0%', favorite: true },
        { id: 2, name: 'DVXX', price: '3,155원', change: '+25.6%', favorite: false },
        { id: 3, name: '유한양행', price: '119,900원', change: '-4.5%', favorite: false },
        { id: 4, name: '셀루메드', price: '3,285원', change: '+1.0%', favorite: false },
        { id: 5, name: '실리콘투', price: '43,400원', change: '+10.1%', favorite: false },
      ],
    };
  },


  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
  mounted() {
    // 컴포넌트가 마운트될 때 기본값을 수익률로 설정
    this.setActiveTab('yield');
  },
};
</script>

<style>
.stock-container {
  padding: 16px;
  max-width: 390px;
}

.yellow-box {
  background-color: #FAB809;
  padding: 10px;
  margin-bottom: 16px;
  text-align: center;
}

.white-text {
  color: #fff;
}

.description {
  font-size: 12px;
  margin-top: 5px;
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

.yield-divider,
.sales-divider,
.savings-divider {
  height: 3px;
  width: 120px;
  background-color: #d6d6d6;
}

.yield-divider.active,
.sales-divider.active,
.savings-divider.active {
  background-color: #000;
}

.mini-bar {
  height: 4px;
  width: 100%;
  background-color: #fff;
  margin: 10px auto 0;
}
.stock-list {

  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stock-item {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}

.stock-info {
  width:390px;
height:50px;

  flex: 1;
  margin-left: 10px;
}

.stock-name {
  font-size: 12px;
  font-weight: bold;

}

.stock-details {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  margin-left: 8px;
}

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.yield {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}

.red {
  font-size: 22px;
  font-weight: bold;
  color: #ff0000;
}

.period {
  font-size: 12px;
  color: #7e7e7e;
  margin-bottom: 0;
  margin-right: 21px;
  margin-top: 10px;
}



.foreign-stock {
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 8px;
}

</style>