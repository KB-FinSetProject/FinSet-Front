<template>
  <HeaderNormal navbarTitle="주식 상세" />

  <div class="stock-detail">

    <div class="stock-header">
      <div class="stock-info">
        <h1 class="stock-name">삼성전자</h1>
        <span class="stock-price">67,500원</span>
      </div>
      <div class="stock-icon" @click="toggleFavorite">
        <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart' "
           :style="{ color: stock.favorite ? '#FFBB00' : '#888', borderColor: stock.favorite ? '#FFBB00' : 'transparent' }"></i>
      </div>
    </div>

    <div class="tabs-container">
      <router-link to="/stock/chart" class="tab" active-class="active" style="color: #DADADA;">차트</router-link>
      <router-link to="/stock/detail" class="tab" active-class="active" style="color: #DADADA;">종목정보</router-link>
      <router-link to="/stock/community" class="tab" active-class="active">커뮤니티</router-link>
    </div>
    <br>

    <!-- 커뮤니티 탭 내용 -->
    <div v-if="activeTab === 'community'" class="community-posts">
      <div class="card-container">
        <div v-for="(post, index) in communityPosts" :key="post.id" class="card">
          <div class="card-header">
            <span class="name">{{ post.author }}</span>
            <span class="like-container">
              <div class="like-box">
                <i class="fa-regular fa-thumbs-up like" @click="incrementLikeCount(post)"></i>
                <span class="like-count" style="margin-left: 5px;">{{ post.likeCount }}</span>
              </div>
            </span>            
            
            <span class="date">{{ post.date }}</span>
          </div>
          <div v-if="post.isEditing" class="edit-container">
            <textarea v-model="post.editContent" rows="3" style="width: 100%; resize: none;"></textarea>
          </div>
          <p v-else class="content">{{ post.content }}</p>
        </div>
      </div>
    </div>

    <!-- 댓글 입력 -->
    <div v-if="activeTab === 'community'" class="comment-input">
      <input type="text" placeholder="의견을 입력하세요" v-model="newComment" />
      <button @click="submitComment" :disabled="!newComment">등록</button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderNormal from "@/components/common/HeaderNormal.vue";

const activeTab = ref('community');
const newComment = ref('');
const stock = ref({ favorite: false });
const showConfirmDialog = ref(false); // 삭제 확인 다이얼로그 표시 여부
const showEditCompleteDialog = ref(false); // 수정 완료 다이얼로그 표시 여부
const postToDelete = ref(null); // 삭제할 게시물의 인덱스

const communityPosts = ref([
  { id: 1, author: '악동핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?', likeCount: 0 },
  { id: 2, author: '악동핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?', likeCount: 0 },
  { id: 3, author: '라라핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?', likeCount: 0 },
  { id: 4, author: '키키핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?', likeCount: 0 },
  { id: 5, author: '김호룡', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?', likeCount: 0 },
]);

const submitComment = () => {
  if (newComment.value) {
    console.log('Submitted comment:', newComment.value);
    newComment.value = ''; // 제출 후 초기화
  }
};

const toggleFavorite = () => {
  stock.value.favorite = !stock.value.favorite;
};

// 좋아요 수 증가 함수
const incrementLikeCount = (post) => {
  post.likeCount += 1;
};

// 수정 모드 활성화 함수
const editItem = (index) => {
  const post = communityPosts.value[index];
  post.isEditing = true;
  post.editContent = post.content; // 수정 시 현재 내용을 editContent에 복사
};

// 수정 저장 함수
const saveItem = (index) => {
  const post = communityPosts.value[index];
  post.content = post.editContent; // editContent에 입력된 내용을 저장
  post.isEditing = false;

  // 수정 완료 다이얼로그 표시
  showEditCompleteDialog.value = true;
};

// 수정 완료 다이얼로그 닫기 함수
const closeEditCompleteDialog = () => {
  showEditCompleteDialog.value = false;
};

// 삭제 다이얼로그 표시 함수
const showDeleteConfirm = (index) => {
  postToDelete.value = index;
  showConfirmDialog.value = true;
};

// 삭제 확인 버튼 클릭 시 호출
const confirmDelete = () => {
  if (postToDelete.value !== null) {
    communityPosts.value.splice(postToDelete.value, 1);
  }
  showConfirmDialog.value = false;
  postToDelete.value = null;
};

// 삭제 취소 버튼 클릭 시 호출
const cancelDelete = () => {
  showConfirmDialog.value = false;
  postToDelete.value = null;
};

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

.save-btn,
.edit-btn,
.delete-btn {
  padding: 4px 8px; /* 버튼 크기 작게 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.6rem; /* 글씨 크기 작게 */
}

.save-btn{
  background-color: #d9edf7; /* 저장 버튼 배경색 */
  color: #31708f; /* 저장 버튼 글씨색 */
  margin-right: 5px;
}

.edit-btn {
  background-color: #edf1f8; /* 수정 버튼 배경색 */
  color: #547bc1; /* 수정 버튼 글씨색 */
  margin-right: 5px;
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
  margin-left: -210px;
  width: 45px;
  color: #6E6053;
}

.confirm-overlay {
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* 투명한 검정 배경 */
  z-index: 10; /* 다른 요소들 위에 표시 */
}

.confirm-dialog {
  position: fixed; /* 화면에 고정 */
  top: 45%; /* 중앙보다 약간 위로 배치 */
  left: 50%; /* 중앙에 배치 */
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  border: 1px solid #60584C;
  background-color: white;
  border-radius: 10px;
  padding: 20px; /* 패딩 추가 */
  text-align: center;
  z-index: 11; /* 오버레이 위에 표시 */
}

.dialog-button-group {
  display: flex; /* Flexbox를 사용하여 버튼들을 나란히 배치 */
  justify-content: space-between; /* 버튼들 간의 간격을 균등하게 배치 */
  padding-left: 20px;
  padding-right: 20px;
}

.confirm-button {
  background-color: #816843; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #ffffff; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 100px;
  margin-top: 10px; /* 버튼 간 간격 추가 */
  position: relative;
  right: 5px;
  
}

.cancel-button {
  background-color: #ffffff; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #60584C; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 100px;
  margin-top: 10px; /* 버튼 간 간격 추가 */
  position: relative;
  left:5px;
}

.confirm-button:hover,
.cancel-button:hover {
  background-color: #f0f0f0; /* 호버 시 색상 */
}

</style>