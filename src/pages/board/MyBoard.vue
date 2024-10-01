<template>
  <HeaderNormal navbarTitle="내가쓴글" />

  <div class="container">
    <div class="card-container">
      <div v-for="(item, index) in items" :key="item.name + item.date" class="card">
        <div class="card-header">
          <span class="name">{{ item.name }}</span>
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
          <span class="date">{{ item.date }}</span>
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
import { ref } from 'vue';

// 데이터 설정
const items = ref([
  {
    name: '키키핑',
    date: '24.09.13',
    content: '오바티비',
    editContent: '',
    isEditing: false,
  },
  {
    name: '키키핑',
    date: '24.09.13',
    content: '오바티비',
    editContent: '',
    isEditing: false,
  },
  {
    name: '키키핑',
    date: '24.09.13',
    content: '오바티비',
    editContent: '',
    isEditing: false,
  },
]);

const showConfirmDialog = ref(false); // 삭제 확인 다이얼로그 표시 여부
const showEditCompleteDialog = ref(false); // 수정 완료 다이얼로그 표시 여부
const postToDelete = ref(null); // 삭제할 게시물의 인덱스

// 항목 수정 함수
const editItem = (index) => {
  const item = items.value[index];
  item.isEditing = true;
  item.editContent = item.content; // 수정 시 현재 내용을 editContent에 복사
};

// 항목 저장 함수
const saveItem = (index) => {
  const item = items.value[index];
  item.content = item.editContent; // editContent에 입력된 내용을 저장
  item.isEditing = false;

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
    items.value.splice(postToDelete.value, 1);
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
right: 5px;
}

.cancel-button {
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
left: 5px;
}

.confirm-button:hover,
.cancel-button:hover {
background-color: #f0f0f0; /* 호버 시 색상 */
}
</style>
