<template>
  <HeaderNormal navbarTitle="적금 상품" />
  <div class="fund-container">
    <div class="titles-container">
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('all')">
        <h2 class="best-yield-title">전체</h2>
        <div class="divider" :class="{ active: activeTab === 'all' }"></div>
      </router-link>
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('simple')">
        <h2 class="best-yield-title">단리</h2>
        <div class="divider" :class="{ active: activeTab === 'simple' }"></div>
      </router-link>
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('compound')">
        <h2 class="best-yield-title">복리</h2>
        <div class="divider" :class="{ active: activeTab === 'compound' }"></div>
      </router-link>
    </div>

    <div class="fund-list">
      <div v-for="(fund, index) in filteredFunds" :key="index" class="fund-item d-flex align-items-center mt-2">
        <div class="bank-logo" :style="{ backgroundColor: fund.logoColor }">
          <span class="bank-icon">{{ fund.logo }}</span>
        </div>
        <div class="fund-info d-flex align-items-center justify-content-between w-100">
          <div class="fund-details">
            <p class="fund-name">적금 상품</p>
            <p class="fund-bank">NH 농협은행</p>
          </div>
          <div class="fund-yield-info text-right">
            <p class="fund-yield">최고 {{ fund.maxYield }}</p>
            <p class="fund-base-yield">기본 {{ fund.baseYield }}</p>
          </div>
          <div class="fund-icon">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
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
      activeTab: 'all', // 기본값을 전체로 설정
      funds: [
        {
          id: 1,
          logo: 'NH',
          logoColor: '#005EB8',
          favorite: true,
          type: 'simple', // 단리
          maxYield: '3.75%',
          baseYield: '3.00%',
        },
        {
          id: 2,
          logo: 'NH',
          logoColor: '#A2D7E0',
          favorite: false,
          type: 'compound', // 복리
          maxYield: '4.00%',
          baseYield: '3.50%',
        },
        {
          id: 3,
          logo: 'NH',
          logoColor: '#005EB8',
          favorite: true,
          type: 'simple', // 단리
          maxYield: '3.80%',
          baseYield: '3.10%',
        },
        {
          id: 4,
          logo: 'NH',
          logoColor: '#A2D7E0',
          favorite: false,
          type: 'compound', // 복리
          maxYield: '4.20%',
          baseYield: '3.70%',
        },
      ],
    };
  },
  computed: {
    filteredFunds() {
      if (this.activeTab === 'simple') {
        return this.funds.filter(fund => fund.type === 'simple');
      } else if (this.activeTab === 'compound') {
        return this.funds.filter(fund => fund.type === 'compound');
      }
      return this.funds; // 전체 적금을 보여줌
    },
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
}

.best-yield-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
  text-align: center;
}

.divider {
  height: 4px;
  width: 100%;
  background-color: #aeaeae;
}

.divider.active {
  background-color: #000;
}

.fund-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fund-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: transparent;
  border: none;
}

.bank-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
}

.fund-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%; /* 전체 너비를 차지하게 설정 */
}

.fund-details {
  display: flex;
  flex-direction: column;
}

.fund-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.fund-bank {
  font-size: 14px;
  color: #7e7e7e;
}

.fund-yield-info {
  text-align: right;
}

.fund-yield {
  font-size: 14px;
  font-weight: bold;
}

.fund-base-yield {
  font-size: 12px;
  color: #7e7e7e;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}
</style>
