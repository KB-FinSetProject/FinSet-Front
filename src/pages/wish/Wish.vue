<template>
  <HeaderNormal navbarTitle="예금상품" />
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
      <div v-for="fund in filteredFunds" :key="fund.id" class="fund-item d-flex align-items-center mt-2">
        <div class="bank-logo" :style="{ backgroundColor: fund.logoColor }">
          <span class="bank-icon">{{ fund.logo }}</span>
        </div>
        <div class="fund-info d-flex align-items-center flex-grow-1">
          <div class="fund-details d-flex flex-column">
            <p class="fund-name">{{ fund.name }}</p>
            <p class="fund-details">{{ fund.details }}</p>
          </div>
          <div class="fund-yield d-flex flex-column align-items-end">
            <span class="period">{{ fund.period }}</span>
            <span class="yield"><span class="red">{{ fund.yield }}</span></span>
          </div>
          <div class="fund-icon">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
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
      funds: [
        {
          id: 1,
          name: '펀드 1 (단리)',
          details: '투자신탁 1(주식) 종류 A',
          yield: '14.76%',
          period: '3개월',
          favorite: true,
          type: 'simple',
        },
        {
          id: 2,
          name: '펀드 2 (복리)',
          details: '투자신탁 1(주식) 종류 A',
          yield: '15.20%',
          period: '3개월',
          favorite: false,
          type: 'compound',
        },
        {
          id: 3,
          name: '펀드 3 (단리)',
          details: '투자신탁 1(주식) 종류 B',
          yield: '12.30%',
          period: '3개월',
          favorite: true,
          type: 'simple',
        },
        {
          id: 4,
          name: '펀드 4 (복리)',
          details: '투자신탁 1(주식) 종류 B',
          yield: '13.50%',
          period: '3개월',
          favorite: false,
          type: 'compound',
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
      return this.funds;
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
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
  flex: 1;
  display: flex;
  justify-content: space-between;
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

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
}

.period {
  font-size: 12px;
  color: #7e7e7e;
}

.red {
  font-size: 22px;
  font-weight: bold;
  color: #ff0000;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}
</style>
