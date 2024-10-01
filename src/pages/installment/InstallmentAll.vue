<template>
  <HeaderNormal navbarTitle="적금상품" />

  <div class="fund-container">
    
    <div class="tabs-container">
      <router-link to="/installment" class="tab" active-class="active">전체</router-link>
      <router-link to="/installmentsimple" class="tab" active-class="active" style="color: #DADADA;">단리</router-link>
      <router-link to="/installmentcompound" class="tab" active-class="active" style="color: #DADADA;">복리</router-link>
    </div>

    <br>

    <div class="fund-list">
      <div v-for="deposit in filteredDeposits" :key="deposit.id" class="fund-item">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="bank-logo" :style="{ backgroundColor: deposit.logoColor }">
              <span class="bank-icon">{{ deposit.logo }}</span>
            </div>
            <div>
              <router-link :to="`/installment/detail`" class="fund-name">{{ deposit.name }}</router-link>
              <p class="fund-details">{{ deposit.details }}</p>
              <div class="risk-info">
                <span class="high-rating">{{ deposit.sort }}</span>
              </div>
            </div>
          </div>
          <div class="deposit-yield"> <!-- 클래스명 변경 -->
            <span class="max">최고 {{ deposit.max }}%</span>
            <span class="basic">기본 {{ deposit.basic }}%</span>
          </div>
          <div class="deposit-icon" @click="toggleFavorite(deposit)"> <!-- 클래스명 변경 -->
            <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
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
      deposits: [
        {
          id: 1,
          name: '적금 1 (단리)',
          details: 'NH 농협은행',
          sort: '단리',
          basic: '3.00',
          max: '3.75',
          favorite: true,
          logo: 'NH',
          logoColor: '#005EB8',
          type: 'simple',
        },
        {
          id: 2,
          name: '적금 2 (복리)',
          details: 'NH 농협은행',
          sort: '복리',
          basic: '3.00',
          max: '3.75',
          favorite: false,
          logo: 'NH',
          logoColor: '#A2D7E0',
          type: 'compound',
        },
        {
          id: 3,
          name: '적금 3 (단리)',
          details: 'NH 농협은행',
          sort: '단리',
          basic: '3.00',
          max: '3.75',
          favorite: true,
          logo: 'NH',
          logoColor: '#005EB8',
          type: 'simple',
        },
        {
          id: 4,
          name: '적금 4 (복리)',
          details: 'NH 농협은행',
          sort: '복리',
          basic: '3.00',
          max: '3.75',
          favorite: false,
          logo: 'NH',
          logoColor: '#A2D7E0',
          type: 'compound',
        },
      ],
    };
  },
  computed: {
    filteredDeposits() {
      if (this.activeTab === 'simple') {
        return this.deposits.filter(deposit => deposit.type === 'simple');
      } else if (this.activeTab === 'compound') {
        return this.deposits.filter(deposit => deposit.type === 'compound');
      }
      return this.deposits; // 전체 예금을 보여줌
    },
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    toggleFavorite(deposit) {
      deposit.favorite = !deposit.favorite; // favorite 상태 토글
    },
  },
};
</script>

<style scoped>
.fund-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  bottom: 110px;
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
  margin: 0; /* 제목 마진 초기화 */
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
  font-size: 20px;
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
  margin-left: 20px;
  position: relative;
  margin-right: 20px;
}

.fund-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 16px;
}

.fund-details {
  font-size: 14px;
  margin: 0;
}

.deposit-yield { /* 클래스명 변경 */
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 10px;
}

.deposit-icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888; /* 기본 색상 */
}

.deposit-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd; /* 미니바 색상 회색으로 변경 */
  margin-top: 25px;
}

.basic {
  font-size: 15px;
  color: #7e7e7e;
}

.max {
  font-size: 22px;
  color: #F8A70C;
  margin-bottom: 0;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}

.risk-info {
  margin-top: 10px;
}
</style>
