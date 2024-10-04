<template>
  <HeaderNormal navbarTitle="커뮤니티" />

  <div class="community-container">
    <div class="comment-input">
      <input type="text" placeholder="의견을 입력하세요" v-model="newComment" />
      <button @click="submitComment" :disabled="!newComment">등록</button>
    </div>
    <div class="tabs-container">
      <router-link :to="{ name: 'stockChart', params: { sno: snoFromRoute } }" class="tab" active-class="active" style="color: #DADADA;">차트</router-link>
      <router-link :to="{ name: 'stockDetail', params: { sno: snoFromRoute } }" class="tab" active-class="active" style="color: #DADADA;">종목정보</router-link>
      <router-link to="/stock/community" class="tab" active-class="active">커뮤니티</router-link>
    </div>
    <br>
    <div class="card-container">
      <div v-for="(post, index) in communityPosts" :key="post.bno" class="card">
        <div class="card-header">
          <span class="name">{{ post.likes }}</span>
          <span class="like-container">
            <div class="like-box">
              <i class="fa-regular fa-thumbs-up like" @click="incrementLikeCount(post)"></i>
              <span class="like-count" style="margin-left: 5px;">{{ post.likeCount }}</span>
            </div>
          </span>
          <div class="buttons">
            <button style="margin-right:10px;" @click="editItem(index)" class="edit-btn">
              <i class="fa-solid fa-gear"></i> 수정
            </button>
            <button style="margin-right:10px;" @click="deleteItem(index)" class="delete-btn">
              <i class="fa-solid fa-trash"></i> 삭제
            </button>
            {{post.wirter}}
          </div>
          <span class="date">{{ post.createdAt }}</span>
        </div>
        <p class="content">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
import api from "@/api/stockApi";
import { useRoute } from 'vue-router';

const route = useRoute();
const snoFromRoute = ref(route.params.sno);
const newComment = ref('');
const communityPosts = ref([]);

const getCommunity = async () => {
  try {
    const data = await api.getCommunity(snoFromRoute.value); // API 호출
    communityPosts.value = data; // API에서 받아온 데이터로 설정
    console.log("GET COMMUNITY", data);
  } catch (error) {
    console.error("Error loading COMMUNITY:", error);
  }
};

const submitComment = async () => {
  if (newComment.value) {
    try {
      const commentData = { content: newComment.value }; // 댓글 데이터 형식
      await api.submitComment(snoFromRoute.value, commentData); // API 호출
      newComment.value = ''; // 제출 후 초기화
      await getCommunity(); // 댓글 제출 후 커뮤니티 데이터 다시 가져오기
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  }
};

// 페이지가 로드될 때 커뮤니티 데이터를 가져옵니다.
onMounted(() => {
  getCommunity(); // sno로 커뮤니티 데이터를 가져옵니다.
});
</script>


<style scoped>
.stock-detail {
  font-family: Arial, sans-serif;
  width: 390px;
  padding: 20px;
  margin-top: 60px;
  margin-bottom: 120px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  font-size: 20px;
}

.tab.active {
  border-bottom: 2px solid #000;
  font-weight: bold;
}

/* 카드 관련 스타일 통합 */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 카드 간 간격 조정 */
  background-color: rgba(110, 96, 83, 0.11);
  width: 390px;
  margin-left: -20px;
  padding: 10px;
  padding-top: 25px;
  margin-top: -41px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  color: black; /* 카드 내부 텍스트 색상 */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
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
  margin-right: 2px; /* 버튼들과 날짜 간격을 조정 */
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
  width: 390px;
  margin-left: -20px;
  position: fixed;
  bottom: 80px;
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

.like{
  margin-left: 1px;
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


</style>
