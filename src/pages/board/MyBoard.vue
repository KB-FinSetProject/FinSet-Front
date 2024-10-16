<template>
  <HeaderNormal navbarTitle="내가쓴글" />

  <div class="container">
    <div class="card-container">
      <div v-for="(item, index) in items" :key="item.bno" class="card">
        <div class="card-header">
          <span class="name">{{ item.stockName }}</span>
          <div class="buttons">
            <button v-if="!item.isEditing" @click="editItem(index)" class="edit-btn">
              <i class="fa-solid fa-gear"></i> 수정
            </button>
            <button v-if="item.isEditing" @click="saveItem(index)" class="save-btn">
              <i class="fa-solid fa-check"></i> 저장
            </button>
            <button style="margin-right:10px;" @click="showDeleteConfirm(index)" class="delete-btn">
              <i class="fa-solid fa-trash"></i> 삭제
            </button>
          </div>
          <span class="date">{{ formatDate(item.updatedAt) }}</span>
        </div>

        <div v-if="item.isEditing">
          <textarea v-model="item.editContent" class="textarea"></textarea>
        </div>
        <p v-else class="content">{{ item.content }}</p>
      </div>
    </div>
  </div>

  <!-- 수정 완료 다이얼로그 -->
  <div v-if="showEditCompleteDialog" class="confirm-overlay">
    <div class="confirm-dialog">
      <p>수정이 완료되었습니다.</p>
      <div class="dialog-button-group">
        <button @click="closeEditCompleteDialog" class="confirm-button">확인</button>
      </div>
    </div>
  </div>

  <!-- 삭제 확인 다이얼로그 -->
  <div v-if="showConfirmDialog" class="confirm-overlay">
    <div class="confirm-dialog">
      <p>삭제하시겠습니까?</p>
      <div class="dialog-button-group">
        <button @click="confirmDelete" class="confirm-button">확인</button>
        <button @click="cancelDelete" class="cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, onMounted } from 'vue';
import stockCommunityApi from '@/api/stockCommunityApi'; // API 파일을 import

const items = ref([]); // 게시글 목록 저장
const showConfirmDialog = ref(false); // 삭제 확인 다이얼로그 표시 여부
const showEditCompleteDialog = ref(false); // 수정 완료 다이얼로그 표시 여부
const postToDelete = ref(null); // 삭제할 게시물의 인덱스
const name = ref(null); // 현재 사용자 uno 저장

// 로컬 스토리지에서 uno 값 가져오기
const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
name.value = authData.name; // uno 값 가져오기
console.log('name:', name.value); // uno 값 확인

// 모든 sno에 대해 게시글 목록 불러오기
const loadAllCommunities = async () => {
  for (let sno = 1; sno <= 30; sno++) {
    try {
      const response = await stockCommunityApi.getCommunities(sno); // API 호출

      console.log(response);
      
      // 데이터가 없을 경우 예외 처리
      if (!response.data || response.data.length === 0) {
        console.log(`sno: ${sno}에 게시글이 없습니다.`);
        continue; // 다음 sno로 넘어가기
      }

      // 현재 사용자와 uno가 같은 항목만 필터링
      const userPosts = response.data.filter(item => item.name === (name.value));

      // 필터링된 항목이 있는 경우 items에 추가
      if (userPosts.length > 0) {
        for (let post of userPosts) {
          const stockResponse = await stockCommunityApi.getStock(post.sno); // 주식 정보 가져오기
          post.stockName = stockResponse.data.stockName; // stockName 추가
        }

        items.value.push(...userPosts); // 필터링된 항목을 items에 추가
      } else {
        console.log(`sno: ${sno}에 해당하는 사용자의 게시글이 없습니다.`);
      }

    } catch (error) {
      console.error(`게시글을 불러오는 중 오류 발생 (sno: ${sno}):`, error);
    }
  }
  
  // 게시글 목록을 콘솔에 출력
  console.log("리스트 : ", items.value); // items 배열 출력
};

// 페이지 로드시 호출
onMounted(() => {
  loadAllCommunities(); // 모든 게시글 목록 불러오기
});

// 항목 수정 함수
const editItem = (index) => {
  const item = items.value[index];
  item.isEditing = true;
  item.editContent = item.content; // 수정 시 현재 내용을 editContent에 복사
};

// 항목 저장 함수
const saveItem = async (index) => {
  const item = items.value[index];
  const communityDTO = {
    content: item.editContent, // 사용자가 수정한 내용
    uno: item.uno, // 사용자 ID (필요시)
    sno: item.sno, // 주식 ID
    bno: item.bno  // 게시글 ID
  };

  try {
    // 서버로 수정된 데이터를 보내는 API 호출
    const response = await stockCommunityApi.updateCommunity(item.sno, item.bno, communityDTO);
    if (response.data === 'update success') {
      // 수정 성공 시, 표시된 데이터를 업데이트하고 수정 모드를 종료
      item.content = item.editContent;
      item.isEditing = false;
      showEditCompleteDialog.value = true;
    } else {
      console.error('수정 실패:', response.data);
    }
  } catch (error) {
    console.error('수정 요청 중 오류 발생:', error);
  }
};

// 수정 완료 다이얼로그 닫기 함수
const closeEditCompleteDialog = () => {
  showEditCompleteDialog.value = false;
};

// 삭제 다이얼로그 표시 함수
const showDeleteConfirm = (index) => {
  postToDelete.value = items.value[index]; // 삭제할 게시글 데이터를 저장
  showConfirmDialog.value = true; // 삭제 확인 다이얼로그를 표시
};

const deletePost = async () => {
  const item = postToDelete.value; // 삭제할 게시글 데이터

  try {
    // API를 통해 삭제 요청을 보냅니다.
    const response = await stockCommunityApi.deleteCommunity(item.sno, item.bno);
    console.log(item.sno, item.bno);

    // 응답 데이터가 'delete success'인 경우
    if (response.data === 'delete success') {
      // 해당 항목을 목록에서 제거합니다.
      items.value = items.value.filter(i => i.bno !== item.bno);
      showConfirmDialog.value = false; // 다이얼로그 닫기
      postToDelete.value = null; // 삭제할 게시글 초기화
    } else {
      console.error('삭제 실패:', response.data);
      alert('삭제 실패: ' + response.data); // 실패 메시지
    }
  } catch (error) {
    console.error('삭제 요청 중 오류 발생:', error);
    alert('삭제 요청 중 오류 발생: ' + error.message); // 오류 메시지
  }
};

// 삭제 확인 버튼 클릭 시 호출
const confirmDelete = () => {
  if (postToDelete.value !== null) {
    deletePost(); // 삭제 요청을 수행
  }
};

// 삭제 취소 버튼 클릭 시 호출
const cancelDelete = () => {
  showConfirmDialog.value = false;
  postToDelete.value = null;
};

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, '0');
  
  // YYYY-MM-DD 형식으로 반환
  return `${year}-${month}-${day}`;
};

</script>




<style scoped>
.container {
margin-bottom: 150px;
margin-top: -100px;
}

.card-container {
display: flex;
flex-direction: column;
gap: 10px; /* 카드 간 간격 조정 */
}

.card {
width: 370px;
border: 1px solid #ccc;
border-radius: 8px;
color: black; /* 카드 내부 텍스트 색상 */
}

.card-header {
display: flex;
align-items: center;
justify-content: space-between; /* name과 date를 양쪽 끝으로 배치 */
}

.name {
flex: 1; /* name 영역을 차지 */
}

.buttons {
margin-right: 5px; /* 버튼들과 날짜 간격을 조정 */
}

.save-btn,
.edit-btn,
.delete-btn {
padding: 4px 8px; /* 버튼 크기 작게 */
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 0.85rem; /* 글씨 크기 작게 */
}

.save-btn{
  background-color: #d9edf7; /* 저장 버튼 배경색 */
  color: #31708f; /* 저장 버튼 글씨색 */
  margin-right: 5px;
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

.date {
margin-left: auto; /* 날짜를 오른쪽 끝으로 밀기 */
}

.content {
margin-left: 10px;
margin-top: 10px;
color: black;
}

.textarea {
width: calc(100% - 20px);
height: 60px;
margin: 10px;
border-radius: 4px;
border: 1px solid #ccc;
}


/* 다이얼로그 스타일 */
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
  left: 5px;
}

.confirm-button:hover,
.cancel-button:hover {
background-color: #f0f0f0; /* 호버 시 색상 */
}
</style>
