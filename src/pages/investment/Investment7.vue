<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
const selectedDuration = ref(null)
const router = useRouter();
const investmentDurations = [
  { id: 1, label: '무슨 일이 있어도 투자 원금은 보전되어야 한다.',score:-6.2 },
  { id: 2, label: '10% 미만까지는 손실을 감수할 수 있을 것 같다.',score:6.2 },
  { id: 3, label: '20% 미만까지는 손실을 감수할 수 있을 것 같다.',score:12.5 },
  { id: 4, label: '기대 수익이 높다면 위험이 높아도 상관하지 않겠다',score:18.7 },
]

const selectDuration = (id) => {
  selectedDuration.value = id
}
const saveScore = () => {
  const score = investmentDurations.find(duration => duration.id === selectedDuration.value)?.score || 0;
  localStorage.setItem('page7Score', score); // 페이지 번호에 맞게 수정
  router.push('/investment/result'); // 다음 페이지로 이동
}
// 이전 페이지로 이동하는 로직
const goToPrevious = () => {
  router.push('/investment6');
}

// 다음 페이지로 이동하는 로직
const goToNext = () => {
  if (selectedDuration.value === null) {
    alert('항목을 선택해주세요');
    return;
  }
  saveScore();
}


// 뒤로가기 버튼 로직
const goBack = () => {
  console.log('뒤로가기');
}
</script>

<template>
  <HeaderNormal navbarTitle="투자성향 설문 페이지" />
  <div class="survey-container">
    <h2 class="question">7. 만약 투자원금에 손실이 발생할 경우 다음 중 감수할 수 있는 손실 수준은 어느 것입니까?</h2>

    <div class="options">
      <div
          v-for="duration in investmentDurations"
          :key="duration.id"
          class="option-item"
          @click="selectDuration(duration.id)"
      >
        <span class="option-label">
          {{ duration.id }}. {{ duration.label }}
        </span>
        <div
            class="checkbox"
            :class="{ checked: selectedDuration === duration.id }"
        ></div>
      </div>
      <h4 class="text-md-center">7/7</h4>
    </div>

    <div class="navigation">
      <button @click="goToPrevious" class="nav-button">이전</button>
      <button @click="goToNext" class="nav-button">다음</button>
    </div>
  </div>
  <h3>7/7</h3>
</template>

<style scoped>
.survey-container {
  background-color: #ffffff;
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.back-button {
  background-color: transparent;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
  margin-bottom: 15px;
}

.question {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option-item:hover {
  background-color: #f0f0f0;
}

.option-label {
  color: #333;
  font-size: 16px;
  flex-grow: 1;
}

.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #4a90e2;
  transition: background-color 0.3s;
  margin-left: 10px; /* 체크박스와 버튼 사이의 간격 */
}

.checkbox.checked {
  background-color: #4a90e2;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 이전/다음 버튼 간격 */
}

.nav-button {
  background-color: #4a90e2;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: #1c64c8;
}
.text-md-center{
  font-size:15px;
  margin-top:20px;
}
</style>
