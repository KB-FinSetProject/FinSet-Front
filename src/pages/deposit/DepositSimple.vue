<template>
  <HeaderNormal navbarTitle="예금상품" />

  <div class="deposit-container">

    <div class="tabs-container">
      <router-link to="/deposit" class="tab" active-class="active" style="color: #DADADA;">전체</router-link>
      <router-link to="/depositsimple" class="tab" active-class="active" @click="fetchDeposits('simple')">단리</router-link>
      <router-link to="/depositcompound" class="tab" active-class="active" @click="fetchDeposits('compound')" style="color: #DADADA;">복리</router-link>
    </div>
  

    <div class="deposit-list">
      <div v-for="deposit in filteredDeposits" :key="deposit.id" class="deposit-item">
        <div class="deposit-header">
          <div class="deposit-info d-flex align-items-center">
            <img :src="getImg(deposit.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover; margin-left:20px">
            <div>
              <p class="deposit-name" @click="goToDetail(deposit)">{{ deposit.depositName }}</p>
              <p class="deposit-details">{{ deposit.depositBank }}</p>
              <div class="risk-info">
                <span class="high-rating">{{ deposit.depositCategory }}</span>
              </div>
            </div>
          </div>
          <div class="deposit-yield">
            <span class="max">최고 {{ deposit.depositMaxRate }}%</span>
            <span class="basic">기본 {{ deposit.depositNormalRate }}%</span>
          </div>
          <div class="deposit-icon" @click="toggleFavorite(deposit)">
            <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
        <div class="mini-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import depositApi from "@/api/depositApi"; // depositApi import
import wishApi from "@/api/wishApi"; // wishApi import

export default {
  components: { HeaderNormal },
  data() {
    return {
      activeTab: 'simple', // 기본 탭을 단리로 설정
      deposits: [],
      wishes: [], // 사용자 관심 목록 추가
      uno: null,
    };
  },
  computed: {
    filteredDeposits() {
      return this.deposits; // 선택된 탭에 따른 deposits를 반환
    },
  },
  methods: {
    async fetchDeposits() {
      try {
        const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
        this.uno = authData.uno; // uno 값 가져오기

        // 모든 예금 상품을 먼저 불러오기
        this.deposits = await depositApi.fetchSimpleDeposits(); // API 호출

        // 사용자 관심 목록 불러오기 (try-catch로 감싸서 오류 방지)
        try {
          this.wishes = await wishApi.fetchAllWishes(); // 관심 목록 전체 조회
        } catch (error) {
          console.warn("No wishes found or error fetching wishes:", error); // 관심 목록이 없을 경우 로그 출력
          this.wishes = []; // 관심 목록이 없으면 빈 배열로 처리
        }

        // 관심 목록에서 tno가 1인 상품의 pno를 사용해 deposit.favorite 설정
        const favoritePnos = this.wishes
          .filter(wish => wish.tno === 1)
          .map(wish => wish.pno);

        this.deposits.forEach(deposit => {
          deposit.favorite = favoritePnos.includes(deposit.dno);
        });

      } catch (error) {
        console.error("Error fetching deposits:", error); // 오류 처리
      }
    },

    async toggleFavorite(deposit) {
      try {
        deposit.favorite = !deposit.favorite; // favorite 상태 토글

        // API 호출하여 즐겨찾기 추가/삭제 처리
        if (deposit.favorite) {
          await wishApi.addWish({ tno: 1, uno: this.uno, pno: deposit.dno }); // tno와 pno 추가
        } else {
          await wishApi.deleteWish({ tno: 1, uno: this.uno, pno: deposit.dno }); // tno와 pno 삭제
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        deposit.favorite = !deposit.favorite; // 원래 상태로 복구
      }
    },
    goToDetail(deposit) {
      // 클릭한 예금의 dno를 저장하고 상세 페이지로 이동
      this.$router.push({ path: '/deposit/detail', query: { dno: deposit.dno } });
    },
    getImg(imgUrl) {
      return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
    },
  },
  mounted() {
    this.fetchDeposits('simple'); // 컴포넌트가 마운트될 때 단리 상품 데이터 가져오기
  },
};
</script>


<style scoped>
.deposit-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  bottom: 110px;
  margin-top: 110px;
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

.deposit-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.deposit-item {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 360px;
}

.deposit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.deposit-info {
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

.deposit-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 16px;
}

.deposit-details {
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
  margin-bottom: -10px;
}
</style>
