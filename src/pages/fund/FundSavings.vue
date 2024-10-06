<template>
  <HeaderNormal navbarTitle="펀드리스트" />

  <div class="fund-container">
    <div class="tabs-container">
      <router-link to="/fund" class="tab" active-class="active" style="color: #DADADA;">수익률 Best</router-link>
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
      <div v-for="fund in filteredFunds" :key="fund.fno" class="fund-item">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="fund-icon" @click="toggleFavorite(fund)">
              <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
            </div>
            <div class="detail">
              <router-link :to="`/fund/detail/${fund.fno}`" class="fund-name">{{ fund.fundName }}</router-link>
              <div class="risk-info">
                <span class="high-rating">{{ fund.fundLisk }}</span>
                <span class="fund-type">{{ fund.fundType }}</span>
              </div>
            </div>
          </div>
          <div class="fund-yield">
            <span style="color: #7E7E7E; font-weight: bold; margin-right: 25px">3개월</span>
            <span class="max">{{ fund.fundEarningRatio }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import fundsApi from "@/api/fundApi"; // API 모듈 가져오기
import wishApi from "@/api/wishApi"; // wishApi import

const funds = ref([]);
const wishes = ref([]);
const uno = ref(null);

const filteredFunds = computed(() => {
  return funds.value; // 전체 펀드를 보여줌
});

const fetchFunds = async () => {
  try {
    const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
    uno.value = authData.uno; // uno 값 가져오기

    // 모든 펀드 상품을 먼저 불러오기
    const params = {};
    funds.value = await fundsApi.getAccList(params); // API 호출

    // 사용자 관심 목록 불러오기 (try-catch로 감싸서 오류 방지)
    try {
      const fetchedWishes = await wishApi.fetchAllWishes(); // 관심 목록 전체 조회
      wishes.value = fetchedWishes || []; // null일 경우 빈 배열로 처리
    } catch (error) {
      console.warn("No wishes found or error fetching wishes:", error); // 관심 목록이 없을 경우 로그 출력
      wishes.value = []; // 관심 목록이 없으면 빈 배열로 처리
    }

    // 관심 목록에서 tno가 3인 상품의 pno를 사용해 favorite 설정
    const favoritePnos = wishes.value
      .filter(wish => wish.tno === 3)
      .map(wish => wish.pno);

    funds.value.forEach(fund => {
      fund.favorite = favoritePnos.includes(fund.fno);
    });

  } catch (error) {
    console.error("Error fetching funds:", error); // 오류 처리
  }
};

// 즐겨찾기 토글 함수
const toggleFavorite = async (fund) => { // 매개변수 이름 수정
  try {
    fund.favorite = !fund.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (fund.favorite) {
      await wishApi.addWish({ tno: 3, uno: uno.value, pno: fund.fno }); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({ tno: 3, uno: uno.value, pno: fund.fno }); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    fund.favorite = !fund.favorite; // 원래 상태로 복구
  }
};

onMounted(() => {
  fetchFunds(); // 컴포넌트가 마운트될 때 데이터 가져오기
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

.fund-yield { /* 클래스명 변경 */
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 10px;
}

.fund-icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888; /* 기본 색상 */
  margin-left: 30px;
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
