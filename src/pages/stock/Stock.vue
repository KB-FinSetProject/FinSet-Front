<template>
  <HeaderNormal navbarTitle="주식 상품" />

  <div class="stock-container">

    <div class="tabs-container">
      <router-link to="/stock" class="tab" active-class="active">전체</router-link>
      <router-link to="/stockhigh" class="tab" active-class="active" style="color: #DADADA;">급상승 ▲</router-link>
      <router-link to="/stockdrop" class="tab" active-class="active" style="color: #DADADA;">급하락 ▼</router-link>
    </div>
    <br>
    <!--    <table class="table table-striped">-->
    <!--      <tr v-for="stock in stocks" :key="stock.sno">-->
    <!--        <td>{{stock.sno}}</td>-->
    <!--        <td>{{stock.stockPrice}}</td>-->

    <!--&lt;!&ndash;        <td>&ndash;&gt;-->
    <!--&lt;!&ndash;          <router-link :to="{name: 'board/detail',params:{no:p=},query:cr.query}">&ndash;&gt;-->
    <!--&lt;!&ndash;            {{article.title}}&ndash;&gt;-->
    <!--&lt;!&ndash;          </router-link>&ndash;&gt;-->
    <!--&lt;!&ndash;        </td>&ndash;&gt;-->
    <!--&lt;!&ndash;        <td>{{article.writer}}</td>&ndash;&gt;-->
    <!--&lt;!&ndash;        <td>{{moment(article.regDate).format('YYYY-MM-DD') }}</td>&ndash;&gt;-->
    <!--      </tr>-->
    <!--    </table>-->

    <div class="stock-list">
      <div v-for="(stock,index )  in stocks" :key="stock.sno" class="stock-item">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <span class="stock-rank">{{ index + 1 }}</span>
            <div class="stock-logo" :style="{ backgroundColor: stock.logoColor }">
              <span>{{ stock.stockSymbol }}</span>
            </div>
            <img src="" alt="">
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
  </div>
</template>

<script setup>
import api from '@/api/stockApi'
import {ref,reactive,computed,onMounted} from "vue";
import moment from 'moment';
import {useRouter,useRoute} from "vue-router";
import {VueAwesomePaginate} from "vue-awesome-paginate";
import HeaderNormal from "@/components/common/HeaderNormal.vue";
const cr=useRoute();
const router=useRouter();

const stocks=ref({

});

const articles=computed(()=> page.value.list);


// const addWish=async ()=>{
//
//
// };
const addWish = async(stock)=>{
  stocks.value=await api.addWish(stock);
  console.log(stocks.value);
};
const removeWish=async (stock)=>{
  stocks.value=await api.removeWish(stock);
  console.log(stock.value);
}
const load = async (query) => {
  try {
    // API에서 주식 리스트를 가져오는 함수
    stocks.value = await api.getList(query);
    console.log(stocks.value);
  } catch (error) {
    console.error("Error loading stocks:", error);
  }
};

onMounted(() => {
  load();
});
console.log("Route Params:", cr.params);
console.log("Stocks:", stocks.value);
// 즐겨찾기 토글 메서드
const toggleFavorite = async (stock) => {
  try {
    stock.favorite = !stock.favorite; // favorite 상태 토글

    // 주식이 favorite에 추가되었으면 addWish 호출
    if (stock.favorite) {
      await addWish(stock); // 즐겨찾기 추가
      console.log('WISH POST', stock);
      // 페이지 리다이렉트
      router.push({ path: '/stock' }); // 예: '/stock' 또는 원하는 경로로 변경
    } else {
      const data = await removeWish(stock); // 즐겨찾기에서 삭제
      console.log('WISH DELETE', data);
    }
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
  }
};
// 변동률에 따라 색상을 반환하는 메서드
const getColor = (change) => {
  // return change.includes('+') ? '#FF6767' : '#547BC1'; // 양수는 빨간색, 음수는 파란색
};

</script>


<style scoped>
/* 스타일은 그대로 유지합니다 */
.stock-container {
  padding: 16px;
  max-width: 390px;
  position: relative;
  margin-top: -370px;
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
  font-size: 15px;
  color: #888; /* 기본 색상 */
  margin-right: 15px;
  margin-top: 10px;
}

.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
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

야그래도안되자난

