<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import HeaderNormal from '@/components/common/HeaderNormal.vue';
const router = useRouter();

// 점수 계산
const page1Score = parseFloat(localStorage.getItem('page1Score')) || 0;
const page2Score = parseFloat(localStorage.getItem('page2Score')) || 0;
const page3Score = parseFloat(localStorage.getItem('page3Score')) || 0;
const page4Score = parseFloat(localStorage.getItem('page4Score')) || 0;
const page5Score = parseFloat(localStorage.getItem('page5Score')) || 0;
const page6Score = parseFloat(localStorage.getItem('page6Score')) || 0;
const page7Score = parseFloat(localStorage.getItem('page7Score')) || 0;

const totalScore = computed(() => {
  return page1Score + page2Score + page3Score + page4Score + page5Score + page6Score + page7Score;
});

// Redirect if total score is 0
onMounted(() => {
  if (totalScore.value === 0) {
    router.push('/investment1');
  }
});

// 투자 성향 항목 정의
const investmentLevels = [
  { level: 'Level 1. 안정형', maxScore: 20 },
  { level: 'Level 2. 안정추구형', maxScore: 40 },
  { level: 'Level 3. 위험 중립형', maxScore: 60 },
  { level: 'Level 4. 적극 투자형', maxScore: 80 },
  { level: 'Level 5. 공격투자형', maxScore: Infinity }
];

// 현재 점수에 해당하는 레벨 찾기
const currentLevel = computed(() => {
  return investmentLevels.find(level => totalScore.value <= level.maxScore);
});

// 해당 레벨 활성화 여부 계산
const isLevel1Active = computed(() => totalScore.value <= 20);
const isLevel2Active = computed(() => totalScore.value > 20 && totalScore.value <= 40);
const isLevel3Active = computed(() => totalScore.value > 40 && totalScore.value <= 60);
const isLevel4Active = computed(() => totalScore.value > 60 && totalScore.value <= 80);
const isLevel5Active = computed(() => totalScore.value > 80);

// 투자 성향을 서버로 전송하는 함수
const submitScore = () => {
  const payload = { investmentLevel: currentLevel.value.level };
  console.log('투자 성향:', payload);
  axios.post('/members/{uno}/type', payload)
      .then(response => {
        console.log('DB 저장 성공:', response.data);
        alert('투자 성향이 저장되었습니다.');
      })
      .catch(error => {
        console.error('DB 저장 실패:', error);
        alert('저장에 실패했습니다.');
      });
  router.push('/profile');
};

// Confirmation Dialog
const showConfirmDialog = ref(false);

const confirmRedirect = () => {
  showConfirmDialog.value = false; // Close the dialog
  router.push('/investment1'); // Redirect to investment page
};

const cancelSubmit = () => {
  showConfirmDialog.value = true; // Show confirmation dialog
};
</script>


<template>
  <HeaderNormal navbarTitle="투자성향 결과" />
  <div class="result-container">
    <p>당신의 투자 성향과 점수입니다!</p>
    <hr>
    <p>당신의 총점수는 : {{ totalScore }}</p>

    <div class="investment-levels">
      <div :class="{ active: isLevel1Active }" class="investment-level">
        <h3>Level 1. 안정형</h3>
        <p>20점 이하</p>
      </div>
      <div :class="{ active: isLevel2Active }" class="investment-level">
        <h3>Level 2. 안정추구형</h3>
        <p>20점 초과 ~ 40점 이하</p>
      </div>
      <div :class="{ active: isLevel3Active }" class="investment-level">
        <h3>Level 3. 위험 중립형</h3>
        <p>40점 초과 ~ 60점 이하</p>
      </div>
      <div :class="{ active: isLevel4Active }" class="investment-level">
        <h3>Level 4. 적극 투자형</h3>
        <p>60점 초과 ~ 80점 이하</p>
      </div>
      <div :class="{ active: isLevel5Active }" class="investment-level">
        <h3>Level 5. 공격투자형</h3>
        <p>80점 초과</p>
      </div>
    </div>

    <!-- 저장 및 저장하지 않음을 처리하는 버튼 -->
    <div class="buttons">
      <button @click="submitScore">저장</button>
      <button @click="cancelSubmit">다시하기</button>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="confirm-dialog">
      <p>설문을 다시 하시겠습니까?</p>
      <button @click="confirmRedirect">확인</button>
      <button @click="showConfirmDialog = false">취소</button>
    </div>
  </div>
</template>


<style scoped>
/* Existing styles remain unchanged */
.result-container {
  padding: 20px;
  text-align: center;
}

.investment-levels {
  margin: 20px 0;
}

.investment-level {
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s;
}

.investment-level.active {
  background-color: #f0f0f0;
  border-color: #4a90e2;
}

h3 {
  margin: 0;
}

p {
  margin: 5px 0 0;
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #4a90e2;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #357ab7;
}

button:last-of-type {
  background-color: #e94e77;
}

button:last-of-type:hover {
  background-color: #c43458;
}
.confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000; /* Ensure it's above other elements */
  text-align: center; /* Center the text in the dialog */
}

.confirm-dialog button {
  margin: 10px; /* Add some margin between buttons */
  padding: 10px 15px;
  background-color: #4a90e2; /* Consistent button style */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-dialog button:hover {
  background-color: #357ab7; /* Darker shade on hover */
}
</style>
