<template>
  <HeaderNormal navbarTitle="투자성향 설문조사" />

  <div class="survey-container">
    <div class="progress-line"></div>
    <br>
    <h2 class="question">3. 다음 중 투자경험과 가장 가까운 것은 <br>&nbsp;&nbsp;&nbsp;&nbsp;어느것인가요?&nbsp;&nbsp;(중복 가능)</h2>
    <br>

    <div class="options">
      <div v-for="duration in investmentDurations" :key="duration.id" class="option-item" @click="selectDuration(duration.id)">
        <span class="option-label">{{ duration.id }}. {{ duration.label }}</span>
        <div class="checkbox" :class="{ checked: selectedDurations.includes(duration.id) }"></div> <!-- 수정된 부분 -->
      </div>
    </div>

    <div class="navigation">
      <h4 class="text-md-center" style="color: #60584C;">3/7</h4>
      <div class="button-group">
        <button @click="goToPrevious" class="back-button">이전</button>
        <button @click="goToNext" class="next-button">다음</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from "@/components/common/HeaderNormal.vue";

const selectedDurations = ref([]); // 선택된 항목을 저장할 배열
const router = useRouter();

const investmentDurations = [
  { id: 1, label: '은행의 예·적금, 국채, 지방채, 보증채, \n    MMF, CMA 등', score: 3.1 },
  { id: 2, label: '금융채, 신용도가 높은 회사채, \n    채권형펀드, 원금 보존 추구형 ELS 등', score: 6.2 },
  { id: 3, label: '신용도 중간 등급의 회사채, 원금의 \n    일부만 보장되는 ELS, 혼합형 펀드 등', score: 9.3 },
  { id: 4, label: '신용도가 낮은 회사채, 주식, 원금이 \n    보장되지 않는 ELS, 시장수익률 \n    수준의 수익을 추구하는 주식형 펀드 등', score: 12.5 },
  { id: 5, label: 'ELW, 선물옵션, 시장수익률 이상의 \n    수익을 추구하는 주식형 펀드, 파생\n    상품에 투자하는 펀드, 주식 신용거래 등', score: 15.6 },
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
  if (selectedDurations.value.length === 0) { // 선택된 항목이 없을 경우
    alert('항목을 선택해주세요');
    return;
  }
  saveScore();
}

</script>

<style scoped>
.survey-container {
  width: 300px;
  font-family: Arial, sans-serif;
  margin-top: -30px;
  margin-bottom: 150px;
}

.back-button {
  background-color: #ffffff; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #60584C; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 130px;
}

.next-button {
  background-color: #816843; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #ffff; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 130px;
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
  border: 1px solid #60584C;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option-label {
  color: #333;
  font-size: 15px;
  flex-grow: 1;
  white-space: pre-wrap;
}

.checkbox {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #D9D9D9;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.checkbox.checked {
  background-color: #FFCC00; /* 선택되었을 때의 색상 */
}

.option-item:hover {
  background-color: #f0f0f0;
}

.navigation {
  text-align: center; /* 텍스트와 버튼들을 중앙 정렬 */
  margin-top: 85px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 버튼들과 '1/7' 사이 간격 추가 */
}

.text-md-center {
  font-size: 15px;
  margin-top: 20px;
  text-align: center;
}

.progress-line {
  height: 3px;
  background: linear-gradient(to right, 
    #FFCC00 42.84%, /* 첫 번째 구간 */
    #9B9B9B 42.84%); /* 일곱 번째 구간 */
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>
