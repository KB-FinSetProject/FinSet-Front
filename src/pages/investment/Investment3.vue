<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from "@/components/common/HeaderNormal.vue";

const selectedDurations = ref([]); // 선택된 항목을 저장할 배열
const router = useRouter();

const investmentDurations = [
  { id: 1, label: '은행의 예·적금, 국채, 지방채, 보증채, MMF, CMA 등', score: 3.1 },
  { id: 2, label: '금융채, 신용도가 높은 회사채, 채권형펀드, 원금 보존 추구형 ELS 등', score: 6.2 },
  { id: 3, label: '신용도 중간 등급의 회사채, 원금의 일부만 보장되는 ELS, 혼합형 펀드 등', score: 9.3 },
  { id: 4, label: '신용도가 낮은 회사채, 주식, 원금이 보장되지 않는 ELS, 시장수익률 수준의 수익을 추구하는 주식형 펀드 등', score: 12.5 },
  { id: 5, label: 'ELW, 선물옵션, 시장수익률 이상의 수익을 추구하는 주식형 펀드, 파생상품에 투자하는 펀드, 주식 신용거래 등', score: 15.6 },
];

// 선택된 항목을 추가하거나 제거하는 함수
const selectDuration = (id) => {
  if (selectedDurations.value.includes(id)) {
    // 이미 선택된 경우 제거
    selectedDurations.value = selectedDurations.value.filter(durationId => durationId !== id);
  } else {
    // 선택되지 않은 경우 추가
    selectedDurations.value.push(id);
  }
}

// 점수를 저장하는 방법
const saveScore = () => {
  // 선택된 점수 합산
  const totalScore = selectedDurations.value.reduce((acc, durationId) => {
    const duration = investmentDurations.find(item => item.id === durationId);
    return acc + (duration?.score || 0);
  }, 0);

  localStorage.setItem('page3Score', totalScore); // 페이지 번호에 맞게 수정
  router.push('/investment4'); // 다음 페이지로 이동
}

// 이전 페이지로 이동하는 로직
const goToPrevious = () => {
  router.push('/investment2')
}

// 다음 페이지로 이동하는 로직
const goToNext = () => {
  if (selectedDurations.value === null) {
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


    <h2 class="question">3. 다음 중 투자경험과 가장 가까운 것은 어느것인가요?(중복 가능)</h2>

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
            :class="{ checked: selectedDurations.includes(duration.id) }"
        ></div>
      </div>
      <h4 class="text-md-center">3/7</h4>
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
