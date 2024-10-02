<template>
  <HeaderNormal navbarTitle="적금상품" />

  <div class="fund-container">
    
    <div class="tabs-container">
      <router-link to="/installment" class="tab" active-class="active" style="color: #DADADA;">전체</router-link>
      <router-link to="/installmentsimple" class="tab" active-class="active" >단리</router-link>
      <router-link to="/installmentcompound" class="tab" active-class="active" style="color: #DADADA;">복리</router-link>
    </div>

    <br>

    <div class="installment-list">
      <div v-for="installment in filteredInstallments" :key="installment.ino" class="installment-item">
        <div class="installment-header">
          <div class="installment-info d-flex align-items-center">
            <div class="bank-logo" :style="{ backgroundColor: installment.logoColor }">
              <span class="bank-icon">{{ installment.logo }}</span>
            </div>
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

export default {
  components: { HeaderNormal },
  data() {
    return {
      activeTab: 'total',
      installments: [], // API에서 받아올 데이터
    };
  },
  computed: {
    filteredInstallments() {
      return this.installments;
    },
  },
  methods: {
    async fetchInstallments(type) {
      this.activeTab = type;
      try {
        let data;
        if (type === 'simple') {
          data = await installmentApi.fetchSimpleInstallments();
        } else if (type === 'compound') {
          data = await installmentApi.fetchCompoundInstallments();
        } else {
          data = await installmentApi.fetchAllInstallments();
        }
        this.installments = data;
      } catch (error) {
        console.error("Error fetching installments:", error);
      }
    },
    goToDetail(installment) {
      this.$router.push({ path: `/installment/detail`, query: { ino: installment.ino } });
    },
    toggleFavorite(installment) {
      installment.favorite = !installment.favorite; // favorite 상태 토글
    },
  },
  mounted() {
    this.fetchInstallments('total'); // 페이지가 로드될 때 전체 목록을 불러옴
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
