<template>
  <HeaderNormal navbarTitle="투자성향 설문조사" />

  <div class="survey-container">
    <div class="progress-line"></div>
    <br>
    <h2 class="question">6. 다음 중 당신의 수입원을 가장 잘 <br>&nbsp;&nbsp;&nbsp;&nbsp;나타내고 있는 것은 어느것입니까?</h2>
    <br>

    <div class="options">
      <div v-for="duration in investmentDurations" :key="duration.id" class="option-item" @click="selectDuration(duration.id)">
        <span class="option-label">{{ duration.id }}. {{ duration.label }}</span>
        <div class="checkbox" :class="{ checked: selectedDuration === duration.id }"></div>
      </div>
    </div>

    <div class="navigation">
      <h4 class="text-md-center" style="color: #60584C;">6/7</h4>
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
  { id: 1, label: '현재 일정한 수입이 발생하고 있으며, \n    향후 현재 수준을 유지하거나 증가할 \n    것으로 예상된다',score:9.6 },
  { id: 2, label: '현재 일정한 수입이 발생하고 있으나, \n    향후 감소하거나 불안정할 것으로 \n    예상된다.',score: 6.2 },
  { id: 3, label: '현재 일정한 수입이 없으며, \n    연금이 주수입원이다.',score:3.1 },
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

</script>

<style scoped>
.survey-container {
  width: 300px;
  font-family: Arial, sans-serif;
  margin-top: -30px;
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

.text-md-center{
  font-size:15px;
  margin-top:160px;
  text-align: center;
}


.progress-line {
  height: 3px;
  background: linear-gradient(to right, 
    #FFCC00 85.68%, /* 첫 번째 구간 */
    #9B9B9B 85.68%); /* 일곱 번째 구간 */
  margin-bottom: 30px;
  margin-top: 30px;
}
</style>
