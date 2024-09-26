<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from "@/components/common/HeaderNormal.vue";
const selectedDuration = ref(null)
const router = useRouter();
const investmentDurations = [
  { id: 1, label: '6개월 이내' , score: 3.1},
  { id: 2, label: '6개월 ~ 1년 이내',score: 6.2 },
  { id: 3, label: '1년 ~ 2년 이내',score: 9.3 },
  { id: 4, label: '2년 ~ 3년 이내',score: 12.5 },
  { id: 5, label: '3년 이상' ,score: 15.6},
]

const selectDuration = (id) => {
  selectedDuration.value = id
}
// 점수를 저장하는 방법
const saveScore = () => {
  const score = investmentDurations.find(duration => duration.id === selectedDuration.value)?.score || 0;
  localStorage.setItem('page2Score', score); // 페이지 번호에 맞게 수정
  router.push('/investment3'); // 다음 페이지로 이동
}
// 이전 페이지로 이동하는 로직
const goToPrevious = () => {
  router.push('/investment1')
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


    <h2 class="question">2. 투자하고자 하는 자금의 투자 가능한 기간은 얼마나 되시나요?</h2>

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
      <h4 class="text-md-center">2/7</h4>
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
}

.checkbox.checked {
  background-color: #4a90e2;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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
