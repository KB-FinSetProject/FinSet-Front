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
              <router-link :to="`/deposit/detail`" class="fund-name">{{ fund.name }}</router-link>
              <p class="fund-details">{{ fund.details }}</p>
              <div class="risk-info">
                <span class="high-rating">복리</span>
              </div>
            </div>
          </div>
          <div class="fund-yield">
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
      activeTab: 'all',
      funds: [
        {
          id: 1,
          name: '예금 1 (단리)',
          details: '투자신탁 1(주식) 종류 A',
          yield: '14.76%',
          period: '3개월',
          favorite: true,
          logo: 'NH', // 로고 추가
          logoColor: '#005EB8', // 로고 색상 추가
          type: 'simple',
        },
        {
          id: 2,
          name: '예금 2 (복리)',
          details: '투자신탁 1(주식) 종류 A',
          yield: '15.20%',
          period: '3개월',
          favorite: false,
          logo: 'NH',
          logoColor: '#A2D7E0',
          type: 'compound',
        },
        {
          id: 3,
          name: '예금 3 (단리)',
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
          name: '예금 4 (복리)',
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
  position: relative;
  bottom:110px;
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

.fund-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fund-item {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 360px;
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.fund-info {
  display: flex;
  align-items: center; /* 수평 정렬을 위해 추가 */
  position: relative; /* position 추가 */
  left: -20px; /* 왼쪽으로 이동시키기 위한 값 */
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
  left: 15px;
  position: relative;
}

.fund-name {
  font-size: 16px;
  font-weight: bold;
  margin: 0px;
}

.fund-details {
  font-size: 14px;
  margin: 0;
}

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 10px;
}

.fund-icon {
  font-size: 24px;
  color: #888; /* 기본 색상 */
}

.fund-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd; /* 미니바 색상 회색으로 변경 */
  margin-top: 25px;
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
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 1px 8px 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}

.risk-info {
  margin-top: 10px;
}
</style>
