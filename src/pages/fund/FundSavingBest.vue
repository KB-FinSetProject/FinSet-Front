<template>
  <div class="fund-container">
    <div class="titles-container">
      <router-link to="/fund" class="title-with-divider" @click.native="setActiveTab('yield')">
        <h2 class="best-yield-title yield">수익률 베스트</h2>
        <div class="yield-divider" :class="{ active: activeTab === 'yield' }"></div>
      </router-link>
      <router-link to="/fund-sales-best" class="title-with-divider" @click.native="setActiveTab('sales')">
        <h2 class="best-yield-title sales">판매액 베스트</h2>
        <div class="sales-divider" :class="{ active: activeTab === 'sales' }"></div>
      </router-link>
<div class="title-with-divider">
  <h2 class="best-yield-title savings">적립액 베스트</h2>
  <div class="savings-divider" :class="{ active: activeTab === 'savings' }"></div>
</div>

    </div>

    <div class="yellow-box" v-if="activeTab === 'savings'">
      <h2 class="best-yield-title">적립액 베스트</h2>
      <div class="mini-bar"></div>
      <p class="description white-text">최근 3개월 동안 기간별 시장에서 수익률이 가장 높은 펀드예요!</p>
    </div>

    <div class="yellow-box" v-if="activeTab === 'yield'">
      <h2 class="best-yield-title">수익률 베스트</h2>
      <div class="mini-bar"></div>
      <p class="description white-text">최근 3개월 동안 기간별 시장에서 수익률이 가장 높은 펀드예요!</p>
    </div>

    <div class="fund-list">
      <div v-for="fund in funds" :key="fund.id" class="fund-item">
        <div class="fund-header">
          <div class="fund-icon">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
          </div>
          <div class="fund-info">
            <p class="fund-name">{{ fund.name }}</p>
            <p class="fund-details">{{ fund.details }}</p>
            <div class="risk-info">
              <span class="high-rating">높은 위험</span>
              <span class="foreign-fund">해외주식형</span>
            </div>
          </div>
          <div class="fund-yield">
            <span class="period">{{ fund.period }}</span>
            <span class="yield"><span class="red">{{ fund.yield }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'yield', // 기본값을 수익률 베스트로 설정
      funds: [
        {
          id: 1,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: true,
        },
        {
          id: 2,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
        {
          id: 3,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
        {
          id: 4,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
      ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style>
.fund-container {
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
  margin-bottom: 16px;
}

.title-with-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  background: none;
  border: none;

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
  height: 4px;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  background-color: #aeaeae;
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

.fund-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fund-item {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}

.fund-info {
  flex: 1;
  margin-left: 10px;
}

.fund-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
  margin-top: 15px;
  margin-left: 8px;
}

.fund-details {
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

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 8px;
}

.foreign-fund {
  background-color: #EDF1F8;
  color: #547BC1;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 8px;
}
</style>