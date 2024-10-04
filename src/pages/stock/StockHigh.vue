<template>
  <HeaderNormal navbarTitle="주식 상품" />

  <div class="stock-container">

    <div class="tabs-container">
      <router-link to="/stock" class="tab" active-class="active" style="color: #DADADA;">전체</router-link>
      <router-link to="/stockhigh" class="tab" active-class="active">
        급상승 <span style="color: #FF6767;">▲</span>
      </router-link>
      <router-link to="/stockdrop" class="tab" active-class="active" style="color: #DADADA;">
        급하락 ▼
      </router-link>
    </div>
    

    <br>

    <div class="stock-list">
      <div v-for="(stock,index )  in stocks" :key="stock.sno" class="stock-item">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <span class="stock-rank">{{ index + 1 }}</span>

            <div class="stock-logo" :style="{ backgroundColor: stock.logoColor }">
              <span>  <img :src="getStockImg(stock.imgUrl)" alt="Stock logo" v-if="stock.imgUrl" style="width: 50px; height: 50px; object-fit: cover;"/></span>
            </div>

            </div>

            <div class="stock-detail">
              <router-link :to="{ name: 'stockChart', params: { sno: stock.sno } }"  class="stock-name">{{ stock.stockName }}</router-link>
              <p class="stock-details">{{ stock.stockPrice }}
                <span class="change" :style="{ color: getColor(stock.priceChangeRate) }">{{ stock.priceChangeRate }}</span>
              </p>
            </div>
          </div>

          <div class="stock-icon" @click="toggleFavorite(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import api from "@/api/stockApi";

export default {
  components: { HeaderNormal },
  data() {
    return {
      activeTab: 'all',
      stocks: [], // 초기 주식 데이터는 비어있음
    };
  },
  computed: {
    filteredStocks() {
      return this.stocks; // 전체 주식을 보여줌
    },
  },
  methods: {
    async getHigh() {
      try {
        const data = await api.getHigh(); // API 호출
        this.stocks = data; // 가져온 데이터를 stocks에 저장
        this.activeTab = 'gain'; // 급상승 탭으로 활성화
        console.log('High stocks:', data);
      } catch (error) {
        console.error('Error getting high stocks:', error);
      }
    },
    toggleFavorite(stock) {
      stock.favorite = !stock.favorite; // favorite 상태 토글
    },
    getColor(change) {
      // return change.includes('+') ? '#FF6767' : '#547BC1'; // 양수는 빨간색, 음수는 파란색
    },
    getStockImg(imgUrl) {
      return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
    },
  },
  async mounted() {
    await this.getHigh(); // 컴포넌트가 마운트될 때 getHigh 호출
  },
};
const getStockImg = (imgUrl) => {
  return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
};
</script>

<style scoped>
/* 스타일은 그대로 유지합니다 */
.stock-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  bottom: 110px;
  margin-top: 100px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  margin-top: -210px;
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
  margin: 0; /* 제목 마진 초기화 */
}

.divider {
  height: 2px;
  width: 100%;
  background-color: #e1e1e1;
  margin: 0; /* 마진 제거 */
}

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 10px; /* 여백 추가 */
  background-color: white; /* 배경색 추가 */
  border-radius: 8px; /* 모서리 둥글게 */
  /* border: none; */ /* 테두리 제거 */
}

.stock-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.stock-info {
  display: flex;
  align-items: center;
}

.stock-rank {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.stock-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  margin-right: 10px; /* 마진 추가 */
  margin-left: 5px;
}

.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.stock-detail {
  margin-left: 10px;
}

.stock-details {
  font-size: 14px;
  margin: 0;
}

.change {
  margin-left: 7px;
}

.stock-icon {
  font-size: 25px; /* 여기에 크기를 조정 */
  color: #888; /* 기본 색상 */
  margin-right: 15px;
  margin-top: 10px;
}

.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
  font-size: inherit; /* 부모 요소의 font-size를 상속 받도록 설정 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd;
  margin-top: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 1px 8px 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}
</style>
