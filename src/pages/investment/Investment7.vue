<template>
  <HeaderNormal navbarTitle="투자성향 설문조사" />

  <div class="survey-container">
    <div class="progress-line"></div>
    <br>
    <h2 class="question">7. 만약 투자원금에 손실이 발생할 경우 <br>&nbsp;&nbsp;&nbsp;&nbsp;다음 중 감수할 수 있는 손실 수준은 <br>&nbsp;&nbsp;&nbsp;&nbsp;어느 것입니까?</h2>
    <br>

    <div class="options">
      <div v-for="duration in investmentDurations" :key="duration.id" class="option-item" @click="selectDuration(duration.id)">
        <span class="option-label">{{ duration.id }}. {{ duration.label }}</span>
        <div class="checkbox" :class="{ checked: selectedDuration === duration.id }"></div>
      </div>
    </div>

    <div class="navigation">
      <h4 class="text-md-center" style="color: #60584C;">7/7</h4>
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
const selectedDuration = ref(null)
const router = useRouter();
const investmentDurations = [
  { id: 1, label: '무슨 일이 있어도 투자 원금은 보전\n    되어야 한다.',score:-6.2 },
  { id: 2, label: '10% 미만까지는 손실을 감수할 수 \n    있을 것 같다.',score:6.2 },
  { id: 3, label: '20% 미만까지는 손실을 감수할 수 \n    있을 것 같다.',score:12.5 },
  { id: 4, label: '기대 수익이 높다면 위험이 높아도 \n    상관하지 않겠다',score:18.7 },
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
    #FFCC00 100%, /* 첫 번째 구간 */
    #9B9B9B 0% /* 두 번째 구간 */); /* 일곱 번째 구간 */
  margin-bottom: 30px;
  margin-top: 30px;
}

</style>
