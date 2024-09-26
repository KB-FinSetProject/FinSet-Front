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
          <div class="fund-info">
            <p class="fund-name">{{ fund.name }}</p>
            <p class="fund-details">{{ fund.details }}</p>
            <div class="risk-info">
              <span class="high-rating">복리</span>
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
  components: {HeaderNormal},
  data() {
    return {
      activeTab: 'all', // 기본값을 전체로 설정
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
  margin-top:-50px;
}

.titles-container {
  display: flex;
  justify-content: space-between; /* 버튼 간의 간격을 균등하게 배분 */
  margin-bottom: 16px;
}

.title-with-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* 버튼이 동일한 너비를 가지도록 설정 */
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
  text-align: center; /* 중앙 정렬 */
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
  gap: 10px; /* 아이템 간의 간격 설정 */
}

.fund-item {
  display: flex; /* Flexbox로 변경 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  padding: 10px; /* 패딩 추가 */
  background-color: transparent; /* 배경색 투명 */

}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 전체 폭을 사용 */

}

.fund-info {
  flex: 1; /* 정보를 차지하는 공간을 유동적으로 설정 */

}

.fund-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
}

.fund-details {
  font-size: 14px;
  margin-top: 0;
}

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fund-icon {
  font-size: 24px; /* 아이콘 크기 */
  color: #888;
}

.mini-bar {
  height: 4px; /* 미니바의 높이 */
  width: 100%; /* 미니바의 너비 */
  background-color: #FFD700; /* 미니바 색상 */
  margin-top: 5px; /* 상단 여백 */
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
  padding: 9px 8px;
  font-size: 10px;
  margin-left: 6px;
  border-radius: 0; /* 둥근 모서리 제거 */
}

</style>
