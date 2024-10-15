<template>
  <HeaderNormal navbarTitle="주식 상세" />

  <div class="container">
    <div class="stock-detail">
      <div class="stock-header">
        <img :src="stock.imgUrl" alt="Thumbnail" class="rounded-circle me-3 thumbnail" style="width:36px; height: 36;">
        <div class="stock-info">
          <h1 class="stock-name">{{ stock.stockName }}</h1>
          <span class="stock-price">{{ formatNumber(stock.openPrice) }} 원</span>
        </div>
        <div class="stock-icon" @click="toggleFavorite">
          <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: stock.favorite ? '#FFBB00' : '#888' }"></i>
        </div>
      </div>  
    </div>

    <div class="tabs-container">
      <router-link 
        :to="{ name: 'stockChart', params: { sno: snoFromRoute } }" 
        class="tab" 
        active-class="active" 
        style="color: #DADADA;">
        차트
      </router-link>
      <router-link 
        :to="{ name: 'stockDetail', params: { sno: stock.sno } }" 
        class="tab" 
        active-class="active"
        style="color: #DADADA;">
        종목정보
      </router-link>
      <router-link 
        :to="{ name: 'stockCommunity', params: { sno: stock.sno } }" 
        class="tab" 
        active-class="active">
        커뮤니티
      </router-link>
    </div>


    <div class="sort">
      <p :class="{ active: sortType === 'latest' }" @click="setSort('latest')">최신순</p>
      <p :class="{ active: sortType === 'like' }" @click="setSort('like')">좋아요순</p>
    </div>
    
    <div class="aaaa">
    <div class="card-container">
      <div v-for="(post, index) in communityPosts" :key="post.bno" class="card">
        <div class="card-header">
          <span class="name">{{ post.name }}</span>
          <i :class="post.liked ? 'fas fa-thumbs-up like' : 'fa-regular fa-thumbs-up like'"
             @click="toggleLike(post)"
             :style="{ color: post.liked ? 'red' : '#888' }"></i>
          <span class="like-count">{{ post.likes }}</span>
          <span class="date">{{ formatDate(post.updatedAt) }}</span>
        </div>
        <p class="content">{{ post.content }}</p>
      </div>
    </div>
  </div>

  <div class="comment-input">
    <input type="text" placeholder="의견을 입력하세요" v-model="newComment" />
    <button @click="submitComment" :disabled="!newComment">등록</button>
  </div>
</div>
</template> 

<script setup>
import { onMounted, ref } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import api from "@/api/stockApi";
import communityApi from "@/api/stockCommunityApi";
import { useRoute } from 'vue-router';
import wishApi from "@/api/wishApi"; // wishApi import

const route = useRoute();
const snoFromRoute = ref(route.params.sno);
const newComment = ref('');
const communityPosts = ref([]);
const stock = ref({
  minValue: 0,
  maxValue: 0,
  openPrice: 0,
  closePrice: 0,
  tradingVol: 0,
  sales: 0,
  profit: 0,
  income: 0,
  favorite: false, // 초기값 설정
});
const sortType = ref('latest');


const loadStockSymbol = async (sno) => {
  try {
    const symbolData = await api.getSymbol(sno); // sno 사용
    stock.value = {
      ...stock.value,
      openPrice: symbolData.openPrice,
      closePrice: symbolData.closePrice,
      tradingVol: symbolData.tradingVol,
      sales: symbolData.sales,
      profit: symbolData.profit,
      income: symbolData.income,
      minValue: symbolData.minValue,
      maxValue: symbolData.maxValue,
    };
    console.log('심볼 상세 정보:', symbolData);
  } catch (error) {
    console.error('Error loading stock symbol details:', error);
  }
};
const getCommunity = async () => {
  try {
    const response = await communityApi.getCommunities(snoFromRoute.value, sortType.value);
    const data = response.data;
    console.log("API 응답 데이터:", data);

    if (Array.isArray(data)) {
      communityPosts.value = data.map(post => ({
        ...post,
        liked: post.isLiked === 1, // isLiked가 1일 경우 liked를 true로 설정
      }));
    } else {
      console.error("API 응답이 배열이 아닙니다:", data);
    }

    console.log("GET COMMUNITY", data);

    loadWishes();
    
  } catch (error) {
    console.error("Error loading COMMUNITY:", error);
  }
};

const setSort = (type) => {
  sortType.value = type;
  getCommunity(); // 정렬 변경 시 커뮤니티 데이터 다시 가져오기
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 10); // yyyy-mm-dd 형식으로 자르기
};

const toggleLike = async (post) => {
  const likeData = { bno: post.bno, uno: uno.value }; // 필요한 데이터 구성

  if (post.liked) {
    // 좋아요 취소
    await communityApi.deleteLike(snoFromRoute.value, likeData);
    post.liked = false; // 상태 업데이트
    post.likes -= 1; // 좋아요 수 감소
  } else {
    // 좋아요 추가
    await communityApi.addLike(snoFromRoute.value, likeData);
    post.liked = true; // 상태 업데이트
    post.likes += 1; // 좋아요 수 증가
  }
};

const submitComment = async () => {
  if (newComment.value) {
    try {
      const commentData = { 
        uno: uno.value,       // 사용자 ID 추가
        sno: snoFromRoute.value, // 종목 ID 추가
        content: newComment.value  // 댓글 내용 추가
      };
      await api.submitComment(snoFromRoute.value, commentData); // API 호출
      newComment.value = ''; // 제출 후 초기화
      await getCommunity(); // 댓글 제출 후 커뮤니티 데이터 다시 가져오기
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  }
};

const getStockDetails = async (query) => {
  try {
    stock.value = await api.get(query);
    console.log('stock value', stock.value);
  } catch (error) {
    console.error(`error`, error);
  }
};

// 페이지가 로드될 때 커뮤니티 데이터를 가져옵니다.
onMounted(() => {
  getStockDetails(snoFromRoute.value);
  getCommunity(); // sno로 커뮤니티 데이터를 가져옵니다.
  console.log("Received sno:", snoFromRoute.value); // sno 확인
  loadStockSymbol(snoFromRoute.value); // sno를 인자로 전달
});

const formatNumber = (value) => {
  if (value != null) {
    return value.toLocaleString('ko-KR');
  }
  return value;
};

const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
const uno = ref(authData ? authData.uno : null); // uno 값을 가져오기
console.log("uno : ", uno.value);

// 즐겨찾기 토글 함수
const toggleFavorite = async () => {
  try {
    stock.value.favorite = !stock.value.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (stock.value.favorite) {
      await wishApi.addWish({ tno: 4, uno: uno.value, pno: stock.value.sno }); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({ tno: 4, uno: uno.value, pno: stock.value.sno }); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    stock.value.favorite = !stock.value.favorite; // 원래 상태로 복구
  }
};

// 데이터 로드 함수
const loadWishes = async () => {
  try {
    const wishes = await wishApi.fetchAllWishes(uno.value); // wishes 데이터를 가져옵니다.
    console.log("wish : ", wishes);

    // 관심 목록에서 tno가 4인 상품의 pno를 사용해 stock.favorite 설정
    const favoritePnos = wishes
      .filter(wish => wish.tno === 4) // tno가 4인 항목 필터링
      .map(wish => wish.pno); // pno 추출

    stock.value.favorite = favoritePnos.includes(stock.value.sno); // 현재 주식이 즐겨찾기인지 확인
  } catch (error) {
    console.error("Error loading wishes:", error);
  }
};
</script>



<style scoped>
.container {
  margin-bottom: 0px;
  margin-top: 0px;
}

.aaaa{margin:2px;}
.stock-detail {
  font-family: Arial, sans-serif;
  max-width: 390px;
  padding: 20px;
  margin-bottom: 100px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  position: fixed; /* 고정 */
  top: 80px; /* 화면 최상단에 위치 */
  left: 0;
  width: 100%; /* 화면 너비만큼 확장 */
  background-color: white; /* 배경 색상을 줘서 스크롤 시 내용이 겹치지 않도록 */
  z-index: 10; /* 다른 요소 위에 표시 */
  padding: 10px 15px;
}

.stock-name{
  margin:0;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  left: -77px; /* 기존 10px에서 20px로 변경 */
}

.stock-price {
  font-size: 28px;
  font-weight: bold;
}

.stock-icon {
  font-size: 30px;
  cursor: pointer;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-top: -160px;
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

/* 카드 관련 스타일 통합 */
.card-container {

  height: auto; /* 고정된 높이 대신 자동으로 조정되도록 설정 */
  max-height: 400px; /* 최대 높이를 설정해 스크롤 가능 */
  overflow-y: auto;
  position: relative;
  bottom: 0; /* 하단에서 위치 고정 */
  display: flex;
  flex-direction: column;
  gap: 10px; /* 카드 간 간격 조정 */
  width: 390px;
  overflow-y: auto; /* 세로 스크롤 가능 */
  position: relative;
  padding-top: 20px;
  margin-top: -20px;
  height: 400px;
}


.card {
  border: 1px solid #dadada;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  color: black; /* 카드 내부 텍스트 색상 */
  background-color: #fff8e67e;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff8e67e;
  padding-top: 0%;
}

.name {
  font-weight: bold;
  flex: 1; /* name 영역을 차지 */
}

.date {
  font-size: 12px;
  color: black;
  margin-left: auto; /* 날짜를 오른쪽 끝으로 밀기 */
}

.content {
  margin-left: 10px;
  margin-top: 10px;
  font-size: 16px;
  color: black;
  margin-bottom: 0%;
}

.buttons {
  display: flex;
  align-items: center;
  margin-right: -20px; /* 버튼들과 날짜 간격을 조정 */
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

.edit-btn,
.delete-btn {
  padding: 4px 8px; /* 버튼 크기 작게 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.6rem; /* 글씨 크기 작게 */
}

.edit-btn {
  background-color: #edf1f8; /* 수정 버튼 배경색 */
  color: #547bc1; /* 수정 버튼 글씨색 */
}

.edit-btn:hover {
  background-color: #dce2ef; /* 수정 버튼 호버 배경색 */
}

.delete-btn {
  background-color: #fdebea; /* 삭제 버튼 배경색 */
  color: #ff6767; /* 삭제 버튼 글씨색 */
}

.delete-btn:hover {
  background-color: #f9d8d6; /* 삭제 버튼 호버 배경색 */
}

.comment-input {
  display: flex;
  background-color: #f7f7f7f7;
  padding: 15px;
  width: 100%; /* 전체 너비로 설정 */
  position: fixed; /* 고정 위치 설정 */
  bottom: 80px; /* 화면 하단에서 푸터 위로 위치 */
  left: 0; /* 왼쪽 끝에 위치 */
  z-index: 10; /* 다른 요소 위에 표시 */
}

.comment-input input {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc; 
  border-radius: 10px;
}

.comment-input button {
  margin-left: 10px;
  padding: 10px 20px;
  color: #4A483F;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.comment-input button:disabled {
  background-color: #FAB809;
  cursor: not-allowed;
}

.like {
  margin-right: 7px;
}

.like-count {
  margin-right: 13px;
}

.like-container {
  display: flex;
  align-items: center;
}

.like-box {
  display: flex;
  align-items: center;
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 4px; /* 안쪽 여백 */
  margin-left: -100px;
  width: 45px;
  color: #6E6053;
}

.sort {
  display: flex;
  gap: 5px; /* 두 항목 간의 간격 조절 */
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.sort p {
  cursor: pointer;
  margin: 0;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.sort p.active {
  color: #FAB809;
}

</style>
