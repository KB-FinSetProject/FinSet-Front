<template>
  <HeaderNormal navbarTitle="적금상품" />

  <div class="installment-container">
    <div class="tabs-container">
      <router-link to="/installment" class="tab" active-class="active">전체</router-link>
      <router-link to="/installmentsimple" class="tab" active-class="active" style="color: #DADADA;">단리</router-link>
      <router-link to="/installmentcompound" class="tab" active-class="active" style="color: #DADADA;">복리</router-link>
    </div>


    <div class="installment-list">
      <div v-for="installment in filteredInstallments" :key="installment.ino" class="installment-item">
        <div class="installment-header">
          <div class="installment-info d-flex align-items-center">
            <img :src="getImg(installment.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover; margin-left:20px">
            <div>
              <p class="installment-name" @click="goToDetail(installment)">{{ installment.installmentName }}</p>
              <p class="installment-details">{{ installment.installmentBank }}</p>
              <div class="risk-info">
                <span class="high-rating">{{ installment.installmentCategory }}</span>
              </div>
            </div>
          </div>
          <div class="installment-yield"> <!-- 클래스명 변경 -->
            <span class="max">최고 {{ installment.installmentMaxRate }}%</span>
            <span class="basic">기본 {{ installment.installmentNormalRate }}%</span>
          </div>
          <div class="installment-icon" @click="toggleFavorite(installment)"> <!-- 클래스명 변경 -->
            <i :class="installment.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: installment.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
        <div class="mini-bar"></div> <!-- 미니바 추가 -->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import installmentApi from "@/api/installmentApi"; // installmentApi를 가져옴
import wishApi from "@/api/wishApi"; // wishApi import

export default {
  components: { HeaderNormal },
  data() {
    return {
      activeTab: 'total',
      installments: [], // API에서 받아올 데이터
      wishes: [], // 사용자 관심 목록 추가
      uno: null,
    };
  },
  computed: {
    filteredInstallments() {
      return this.installments;
    },
  },
  methods: {
    async fetchInstallments() {
      try {
        const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
        this.uno = authData.uno; // uno 값 가져오기

        // 모든 예금 상품을 먼저 불러오기
        this.installments = await installmentApi.fetchAllInstallments(); // API 호출

        // 사용자 관심 목록 불러오기 (try-catch로 감싸서 오류 방지)
        try {
          this.wishes = await wishApi.fetchAllWishes(); // 관심 목록 전체 조회
        } catch (error) {
          console.warn("No wishes found or error fetching wishes:", error); // 관심 목록이 없을 경우 로그 출력
          this.wishes = []; // 관심 목록이 없으면 빈 배열로 처리
        }

        // 관심 목록에서 tno가 1인 상품의 pno를 사용해 deposit.favorite 설정
        const favoritePnos = this.wishes
          .filter(wish => wish.tno === 2)
          .map(wish => wish.pno);

        this.installments.forEach(installment => {
          installment.favorite = favoritePnos.includes(installment.ino);
        });

      } catch (error) {
        console.error("Error fetching installments:", error); // 오류 처리
      }
    },
    async toggleFavorite(installment) {
      try {
        installment.favorite = !installment.favorite; // favorite 상태 토글

        // API 호출하여 즐겨찾기 추가/삭제 처리
        if (installment.favorite) {
          await wishApi.addWish({ tno: 2, uno: this.uno, pno: installment.ino }); // tno와 pno 추가
        } else {
          await wishApi.deleteWish({ tno: 2, uno: this.uno, pno: installment.ino }); // tno와 pno 삭제
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        installment.favorite = !installment.favorite; // 원래 상태로 복구
      }
    },
    goToDetail(installment) {
      this.$router.push({ path: `/installment/detail`, query: { ino: installment.ino } });
    },
    getImg(imgUrl) {
      return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
    },
  },
  mounted() {
    this.fetchInstallments('total'); // 페이지가 로드될 때 전체 목록을 불러옴
  },
};
</script>


<style scoped>
.installment-container {
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

.installment-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.installment-item {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  width: 360px;
}

.installment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.installment-info {
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

.installment-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 16px;
}

.installment-details {
  font-size: 14px;
  margin: 0;
}

.installment-yield { /* 클래스명 변경 */
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 10px;
}

.installment-icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888; /* 기본 색상 */
}

.installment-icon .fas {
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
