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
      <div v-for="fund in filteredFunds" :key="fund.id" class="fund-item">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="bank-logo" :style="{ backgroundColor: fund.logoColor }">
              <span class="bank-icon">{{ fund.logo }}</span>
            </div>
            <div>
              <p class="fund-name">{{ fund.name }}</p>
              <p class="fund-bank">{{ fund.bank }}</p>
            </div>
          </div>
          <div class="fund-yield d-flex flex-column align-items-end">
            <span class="period">{{ fund.period }}</span>
            <span class="yield"><span class="red">{{ fund.yield }}</span></span>
          </div>
          <div class="fund-icon">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
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
      activeTab: 'all', // 기본값을 전체로 설정
      funds: [
        {
          id: 1,
          name: '펀드 1 (단리)',
          bank: 'NH 농협은행',
          details: '투자신탁 1(주식) 종류 A',
          yield: '14.76%',
          period: '3개월',
          favorite: true,
          logo: 'NH',
          logoColor: '#005EB8',
          type: 'simple', // 단리 타입 추가
        },
        {
          id: 2,
          name: '펀드 2 (복리)',
          bank: 'NH 농협은행',
          details: '투자신탁 1(주식) 종류 A',
          yield: '15.20%',
          period: '3개월',
          favorite: false,
          logo: 'NH',
          logoColor: '#A2D7E0',
          type: 'compound', // 복리 타입 추가
        },
        {
          id: 3,
          name: '펀드 3 (단리)',
          bank: 'NH 농협은행',
          details: '투자신탁 1(주식) 종류 B',
          yield: '12.30%',
          period: '3개월',
          favorite: true,
          logo: 'NH',
          logoColor: '#005EB8',
          type: 'simple',
        },
        {
          id: 4,
          name: '펀드 4 (복리)',
          bank: 'NH 농협은행',
          details: '투자신탁 1(주식) 종류 B',
          yield: '13.50%',
          period: '3개월',
          favorite: false,
          logo: 'NH',
          logoColor: '#A2D7E0',
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
      return this.funds; // 기본적으로 모든 펀드를 보여줌
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
  margin-top: -50px;
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
  flex-direction: column;
  padding: 10px;
  background-color: transparent;
  border: none;
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.fund-info {
  display: flex;
  align-items: center;
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

.fund-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.fund-bank {
  font-size: 14px;
  color: #7e7e7e;
}

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}

.mini-bar {
  height: 4px;
  width: 100%;
  background-color: #FFD700;
  margin-top: 5px;
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
}

</style>
