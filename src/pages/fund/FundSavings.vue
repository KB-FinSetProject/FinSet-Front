<template>
  <HeaderNormal navbarTitle="펀드리스트" />

  <div class="fund-container">
    <div class="tabs-container">
      <router-link to="/fund" class="tab" active-class="active"  style="color: #DADADA;">수익률 Best</router-link>
      <router-link to="/fundsales" class="tab" active-class="active" style="color: #DADADA;">판매액 Best</router-link>
      <router-link to="/fundsavings" class="tab" active-class="active">적립액 Best</router-link>
    </div>

    <br>
    <div class="info-box">
      <h4>적립액 Best</h4>
      <hr>
      <p>최근 3개월 동안 적립액이 가장 높은 펀드예요!</p>
    </div>

    <br>
    <div class="fund-list">
      <div v-for="deposit in filteredDeposits" :key="deposit.id" class="fund-item">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="deposit-icon" @click="toggleFavorite(deposit)"> <!-- 클래스명 변경 -->
              <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
                 :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
            </div>
            <div class="detail">
              <router-link :to="`/fund/detail`" class="fund-name">{{ deposit.name }}</router-link>
              <div class="risk-info">
                <span class="high-rating">{{ deposit.danger }}</span>
                <span class="fund-type">{{ deposit.type }}</span>
              </div>
            </div>

          </div>
          <div class="deposit-yield"> <!-- 클래스명 변경 -->
            <span style="color: #7E7E7E; font-weight:bold; margin-right:25px">3개월</span>
            <span class="max">{{ deposit.rate }}%</span>
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
      deposits: [
        {
          id: 1,
          name: '미래에셋인도중형포커스증권자투자신탁 1(주식) 종류 C-e',
          rate: '14.76',
          danger:'높은위험',
          type:'해외주식형'
        },
        {
          id: 2,
          name: '미래에셋인도중형포커스증권자투자신탁 1(주식) 종류 C-e',
          rate: '14.76',
          danger:'높은위험',
          type:'해외주식형'
        },
        {
          id: 3,
          name: '미래에셋인도중형포커스증권자투자신탁 1(주식) 종류 C-e',
          rate: '14.76',
          danger:'높은위험',
          type:'해외주식형'
        },
        {
          id: 4,
          name: '미래에셋인도중형포커스증권자투자신탁 1(주식) 종류 C-e',
          rate: '14.76',
          danger:'높은위험',
          type:'해외주식형'
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
  margin-top: 130px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}


.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 19px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

.best-yield-title {
  margin: 0; /* 제목 마진 초기화 */
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
  gap: 20px;
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
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 16px;
  margin-left: 0px;
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
  margin-left: 30px;
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
  color: #DD0202;
  margin-bottom: 0;
  font-weight: bold;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
  margin-right: 5px;
}

.fund-type {
  background-color: #EDF1F8;
  color: #547BC1;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}

.risk-info {
  margin-top: 10px;
}

.detail{
  margin-left: 20px;
}

.info-box {
  background-color: #FAB809; /* 노란색 배경 */
  padding: 10px;
  border-radius: 0; /* 테두리 반경 없앰 */
  margin-bottom: 10px;
  text-align: center;
  height: 110px;
  position: relative;
  bottom: 8px;
  width: 390px;
  margin-left: -16px;
}

.info-box h4 {
  margin: 0;
  color: #FFFFFF; /* 텍스트 색상 */
}

.info-box p {
  margin: 5px 0 0; /* 제목과 내용 사이의 간격 */
  color: #FFFFFF; /* 텍스트 색상 */
}

.mini-bar {
  height: 4px; /* 미니 바 높이 */
  background-color: #ffffff; /* 미니 바 색상 */
  margin-top: 5px; /* 제목과 미니 바 사이의 간격 */
}


</style>
