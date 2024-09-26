<template>
  <HeaderNormal navbarTitle="단어장" />

  <div class="container">
    <div class="card-container">
      <div v-for="(item, index) in items" :key="item.title" class="card">
        <div class="card-header" @click="toggleDescription(index)">
          <i class="fa-solid fa-star icon"></i>
          <span class="title">{{ item.title }}</span>
          <i class="fa-solid fa-caret-down arrow" :class="{ active: isActive(index) }"></i>
        </div>
        <!-- description 및 memo 부분을 active 상태에 따라 함께 보여줌 -->
        <div v-if="isActive(index)">
          <p class="description">{{ item.content }}</p>
          <div class="memo">
            <p>Memo</p>
            <textarea :value="item.memo" readonly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref } from 'vue';

// 아코디언 데이터 설정
const items = ref([
  {
    title: '미수령주식 · 배당금',
    content: '무상증자, 배당사실을 주주가 이사 등의 사유로 통지를 받지 못했거나 상속인이 상속사실을 인지하지 못하여 찾아가고 있지 않은 주식 또는 배당금',
    memo: '이거 진짜 어렵다...ㅠㅠㅠ 금융상품 공부하기 어려워용...',
  },
  {
    title: '주식',
    content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
    memo: '주식이 뭐더라',
  },
  {
    title: '주식시장',
    content: '',
    memo: '',
  },
  {
    title: '예금',
    content: '',
    memo: '',
  },
  {
    title: '재테크',
    content: '',
    memo: '',
  },
]);

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
</script>

<style scoped>
.container {
  margin-bottom: 150px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 카드 간 간격 조정 */
  color: #6e6053; /* 기본 글씨 색상 */
}

.card {
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  background-color: #6e6053; /* 카드 배경색을 #6E6053로 설정 */
  color: white; /* 카드 내부 텍스트 색상을 흰색으로 설정 */
}

.card-header {
  display: flex;
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
}

.title {
  font-size: 1.2em; /* 제목 크기 조정 */
}

.memo {
  margin-top: 10px;
  background-color: white; /* 메모 배경색을 흰색으로 설정 */
  color: black; /* 메모 글씨 색상을 검정색으로 설정 */
  padding: 10px; /* 메모 영역 패딩 추가 */
  border-radius: 4px; /* 모서리 둥글게 */
}

textarea {
  width: 100%;
  height: 50px; /* 높이 조정 */
  border: none;
  background-color: #f0f0f0; /* textarea 배경색 */
  border-radius: 4px;
  color: black; /* textarea 텍스트 색상 검정으로 설정 */
}

.icon {
  color: #ffbf0a; /* 아이콘 색상 설정 */
}

.arrow{
  margin-left: 10px;
  position: absolute;
  transform: translateX(3100%);
}
</style>
