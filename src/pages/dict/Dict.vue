<template>
  <HeaderNormal navbarTitle="사전" />

  <div class="container">

    <div class="search-bar">
      <div class="input-container">
        <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요." />
        <i class="fas fa-search search-icon" @click="performSearch"></i>
      </div>
    </div>

    <br>

    <div class="card-container">

      <div class="card">
        <div class="card-header">
          <span class="title">미수령주식 · 배당금</span>
          <i class="fa-solid fa-star icon"></i>
        </div>
        <p class="description">무상증자, 배당사실을 주주가 이사 등의 사유로 통지를 받지 못했거나 상속인이 상속사실을 인지하지 못하여 찾아가고 있지 않은 주식 또는 배당금</p>
      </div>

      <h6 style="color: black; font-weight: 350; margin-left: 10px">
        "주식"에 대한 <span style="color: #FFBB00;">538</span>개 용어가 검색되었습니다. 
      </h6>

      <div v-for="(item, index) in displayedItems" :key="item.title" class="card cardelse">
        <div class="card-header" @click="toggleDescription(index)">
          <span class="title">{{ item.title }}</span>
          <i class="fa-solid fa-caret-down arrow" :class="{ active: isActive(index) }"></i>
        </div>
        <div v-if="isActive(index)">
          <p class="description">{{ item.content }}</p>
        </div>
      </div>
  
      <!-- 더보기 버튼 -->
      <button v-if="!showAll" @click="showAllItems" class="load-more-button">+ 더보기</button>

      <hr>
      <br>

      <div class="icon-title-container">
        <i class="fa-solid fa-book-bookmark icon-large"></i>
        <span class="title">단어장</span>
      </div>

      <!-- list 아이템 표시 -->
      <div class="item-container" v-for="(item, index) in list" :key="index">
        <router-link :to="{ path: '/dictmemo' }" class="item-text">
          <span class="item-text">{{ item }}</span>
        </router-link>
        <i class="fa-solid fa-star icon2"></i>
      </div>

    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, computed } from 'vue';

// 아코디언 데이터 설정
const items = ref([
  {
    title: '미수령주식 · 배당금',
    content: '무상증자, 배당사실을 주주가 이사 등의 사유로 통지를 받지 못했거나 상속인이 상속사실을 인지하지 못하여 찾아가고 있지 않은 주식 또는 배당금',
  },
  {
    title: '주식',
    content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
  },
  {
    title: '주식시장',
    content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
  },
  {
    title: '예금',
    content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
  },
  {
    title: '재테크',
    content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
  },
]);

const list = ref([
  '미수령주식 · 배당금',
  '주식시장',
  '하위',
  '바위'
]);

// "더보기" 상태 관리
const showAll = ref(false);

// 처음에 3개만 보여줌
const displayedItems = computed(() => (showAll.value ? items.value : items.value.slice(0, 3)));

// "더보기" 버튼 클릭 시 모든 항목을 보여줌
const showAllItems = () => {
  showAll.value = true;
};

// 아코디언 상태 관리
const activeIndices = ref([]); // active 상태를 저장하는 배열

// 특정 인덱스가 active 상태인지 확인
const isActive = (index) => activeIndices.value.includes(index);

// 아코디언 토글 함수
const toggleDescription = (index) => {
  if (isActive(index)) {
    // 이미 열려있으면 닫기
    activeIndices.value = activeIndices.value.filter(i => i !== index);
  } else {
    // 열려있지 않으면 추가
    activeIndices.value.push(index);
  }
};

const searchQuery = ref('');

const performSearch = () => {
  // 검색 기능 구현
  console.log('검색어:', searchQuery.value);
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
  color: black; /* 기본 글씨 색상 */
}

.card {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #816843; /* 카드 배경색을 #6E6053로 설정 */
  color: white; /* 카드 내부 텍스트 색상을 흰색으로 설정 */
}

.card-header {
  display: flex;
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
}

.title {
  font-size: 1.2em; /* 제목 크기 조정 */
  font-weight: bold;
}

.icon {
  color: #ffbf0a; /* 아이콘 색상 설정 */
  position: absolute;
  transform: translateX(1100%);
}

.arrow{
  margin-left: 10px;
  position: absolute;
  transform: translateX(3100%);
}

.cardelse{
  background-color: #E0E0E0;
  color: black;
}

.description{
  margin-left: 10px;
  margin-right: 10px;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.input-container {
  position: relative;
  width: 100%;
}

input[type="text"] {
  width: 100%;
  padding: 10px 40px 10px 10px; /* 아이콘을 위한 오른쪽 패딩 */
  border: 1px solid black;
  border-radius: 10px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}

.load-more-button {
  background-color: #FFBB00; /* 배경색을 FFBB00으로 설정 */
  color: white; /* 글씨 색상을 흰색으로 설정 */
  border: none;
  border-radius: 12px; /* 모서리를 둥글게 설정 */
  padding: 5px 10px; /* 버튼 크기를 더보기 텍스트에 맞게 줄임 */
  font-size: 14px; /* 글씨 크기 조금 줄임 */
  cursor: pointer;
  margin-top: 10px;
  width: 100px;
  margin-left: 120px;
}

/* 버튼에 hover 효과 추가 */
.load-more-button:hover {
  background-color: #e0a800; /* hover 시 배경색을 조금 어둡게 */
}

.icon-title-container {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
}

.icon-large {
  margin-left: 10px;
  margin-right: 10px; /* 아이콘과 텍스트 사이에 여백 추가 */
  color: #FFBB00;
  font-size: x-large;
}

.item-container {
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 양쪽 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  margin: 10px 0; /* 아이템 간격 조정 */
}

.item-text {
  font-size: 1em; /* 텍스트 크기 조정 */
  color: black;
  text-decoration: none;
}

.icon2 {
  color: #ffbf0a; /* 아이콘 색상 설정 */
  position: absolute;
  transform: translateX(2100%);
}
</style>
