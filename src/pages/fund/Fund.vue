<template>
  <HeaderNormal navbarTitle="펀드리스트" />

  <div class="fund-container">
    <div class="tabs-container">
      <router-link to="/fund" class="tab" active-class="active">수익률 Best</router-link>
      <router-link to="/fundsales" class="tab" active-class="active" style="color: #DADADA;">판매액 Best</router-link>
      <router-link to="/fundsavings" class="tab" active-class="active" style="color: #DADADA;">적립액 Best</router-link>
    </div>

    <br>
    <div class="info-box">
      <h4>수익률 Best</h4>
      <hr>
      <p>최근 3개월 동안 수익률이 가장 높은 펀드예요!</p>
    </div>

    <br>
    <div class="fund-list">
      <div v-for="deposit in filteredDeposits" :key="deposit.fno" class="fund-item">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="deposit-icon" @click="toggleFavorite(deposit)">
              <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
            </div>
            <div class="detail">
              <router-link :to="`/fund/detail/${deposit.fno}`" class="fund-name">{{ deposit.fundName }}</router-link>
              <div class="risk-info">
                <span class="high-rating">{{ deposit.fundRisk }}</span>
                <span class="fund-type">{{ deposit.fundType }}</span>
              </div>
            </div>
          </div>
          <div class="deposit-yield">
            <span style="color: #7E7E7E; font-weight: bold; margin-right: 25px">3개월</span>
            <span class="max">{{ deposit.fundEarningRatio }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import fundsApi from "@/api/FundApi"; // API 모듈 가져오기

const deposits = ref([]);

const filteredDeposits = computed(() => {
  return deposits.value; // 전체 예금을 보여줌
});

const fetchDeposits = async () => {
  try {
    const params = {}; // 필요한 파라미터를 설정
    deposits.value = await fundsApi.getList(params); // 수익률 Best API 호출
  } catch (error) {
    console.error('Failed to fetch deposits:', error);
  }
};

const toggleFavorite = (deposit) => {
  deposit.favorite = !deposit.favorite; // favorite 상태 토글
};

onMounted(() => {
  fetchDeposits(); // 컴포넌트가 마운트될 때 데이터 가져오기
});
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
