<template>
    <HeaderNormal navbarTitle="내가쓴글" />
  
    <div class="container">
      <div class="card-container">
        <div
          v-for="(item, index) in items"
          :key="item.name + item.date"
          class="card"
        >
          <div class="card-header">
            <span class="name">{{ item.name }}</span>
            <div class="buttons">
              <button style="margin-right:10px;" @click="editItem(index)" class="edit-btn">수정</button>
              <button style="margin-right:10px;" @click="deleteItem(index)" class="delete-btn">삭제</button>
            </div>
            <span class="date">{{ item.date }}</span>
          </div>
          <p class="content">{{ item.content }}</p>
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
    },
    {
      name: '키키핑',
      date: '24.09.13',
      content: '오바티비',
    },
    {
      name: '키키핑',
      date: '24.09.13',
      content: '오바티비',
    },
    {
      name: '키키핑',
      date: '24.09.13',
      content: '오바티비',
    },
    {
      name: '키키핑',
      date: '24.09.13',
      content: '오바티비',
    },
    {
      name: '키키핑',
      date: '24.09.13',
      content: '오바티비',
    },
  ]);
  
  // 항목 수정 함수 (더미 함수)
  const editItem = (index) => {
    console.log('Edit item at index:', index);
  };
  
  // 항목 삭제 함수 (더미 함수)
  const deleteItem = (index) => {
    console.log('Delete item at index:', index);
  };
  </script>
  
  <style scoped>
  .container {
    margin-bottom: 150px;
  }
  
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 10px; /* 카드 간 간격 조정 */
  }
  
  .card {
    width: 300px;
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
    margin-right: 10px; /* 버튼들과 날짜 간격을 조정 */
  }
  
  .edit-btn,
  .delete-btn {
    padding: 4px 8px; /* 버튼 크기 작게 */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem; /* 글씨 크기 작게 */
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
  </style>
  
  