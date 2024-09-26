<template>
    <div class="container">
        <div class="card-container">
            <div v-for="item in cards" :key="item.title" class="card">
              <div class="card-header">
                <i class="fa-regular fa-star"></i>
                <span class="title">{{ item.title }}</span>
              </div>
              <p class="description">{{ item.description }}</p>
              <div class="memo">
                <p>Memo</p>
                <textarea :value="item.memo" readonly/>
              </div>
            </div>
          </div>
      <!-- <div>
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.title }}
            </li>
        </ul>
      </div> -->
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  
  // 아코디언 데이터 설정
  const items = ref([
    {
      title: '미수령주식 · 배당금',
      content: '무상증자, 배당사실을 주주가 이사 등의 사유로 통지를 받지 못했거나 상속인이 상속사실을 인지하지 못하여 찾아가고 있지 않은 주식 또는 배당금',
      memo: '이거 진짜 어렵다...ㅠㅠㅠ 금융상품 공부하기 어려워용...'
    },
    {
      title: '주식',
      content: '회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다',
      memo: '주식이 뭐더라'
    },
    {
      title: '주식시장',
      content: '',
      memo: ''
    },
    {
      title: '예금',
      content: '',
      memo: ''
    },
    {
      title: '재테크',
      content: '',
      memo: ''
    }
  ]);
  
  // 아코디언 상태 관리
  const activeIndex = ref(null);
  
  // 특정 인덱스가 active 상태인지 확인
  const isActive = (index) => activeIndex.value === index;
  
  // 아코디언 토글 함수
  const toggle = (index) => {
    activeIndex.value = (activeIndex.value === index) ? null : index;
  };
  </script>
  
  <style scoped>
  
  </style>
  