<template>
  <HeaderNormal navbarTitle="적금 상품" />
  <div class="fund-container">
    <div class="titles-container">
      <router-link to="#" class="title-with-divider" @click.native="setActiveTab('all')">
        <h2 class="best-yield-title">전체</h2>
        <div class="divider" :class="{ active: activeTab === 'all' }"></div>
      </router-link>
      <router-link to="/installment/simple" class="title-with-divider" @click.native="setActiveTab('simple')">
        <h2 class="best-yield-title">단리</h2>
        <div class="divider" :class="{ active: activeTab === 'simple' }"></div>
      </router-link>
      <router-link to="/installment/compound" class="title-with-divider" @click.native="setActiveTab('compound')">
        <h2 class="best-yield-title">복리</h2>
        <div class="divider" :class="{ active: activeTab === 'compound' }"></div>
      </router-link>
    </div>

    <div class="yellow-box" v-if="activeTab === 'all'">
      <h2 class="best-yield-title">전체 예금</h2>
      <div class="mini-bar"></div>
      <p class="description white-text">전체 예금 관련 정보입니다.</p>
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
import HeaderNormal from "@/components/common/HeaderNormal.vue";

export default {
  components: {HeaderNormal},
  data() {
    return {
      activeTab: 'all', // 기본값을 전체로 설정
      funds: [
        // 전체 펀드 데이터
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

<style>
.fund-container {
  padding: 16px;
  max-width: 390px;
  height: 600px; /* 필요에 따라 고정 높이 설정 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 가능 */
}

.fund-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1; /* 남은 공간을 채우도록 설정 */
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
  text-decoration: none;
}

.best-yield-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
}

.divider {
  height: 4px;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
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


</style>
