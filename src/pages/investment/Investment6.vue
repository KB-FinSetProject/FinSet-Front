<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
const selectedDuration = ref(null)
const router = useRouter();
const investmentDurations = [
  { id: 1, label: '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상된다',score:9.6 },
  { id: 2, label: '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상된다.',score: 6.2 },
  { id: 3, label: '현재 일정한 수입이 없으며, 연금이 주수입원이다.',score:3.1 },
]

const selectDuration = (id) => {
  selectedDuration.value = id
}
const saveScore = () => {
  const score = investmentDurations.find(duration => duration.id === selectedDuration.value)?.score || 0;
  localStorage.setItem('page6Score', score); // 페이지 번호에 맞게 수정
  router.push('/investment7'); // 다음 페이지로 이동
}
// 이전 페이지로 이동하는 로직
const goToPrevious = () => {
  router.push('/investment5');
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

    <h2 class="question">6. 다음 중 당신의 수입원을 가장 잘 나타내고 있는 것은 어느것입니까?</h2>

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
      <h4 class="text-md-center">6/7</h4>
    </div>

    <div class="navigation">
      <button @click="goToPrevious" class="nav-button">이전</button>
      <button @click="goToNext" class="nav-button">다음</button>
    </div>
  </div>
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
