<template>
  <HeaderNormal navbarTitle="투자성향 결과" />

  <div class="result-container">
    <h5>홍길동 님의 투자 성향 점수: <span class="score">{{ totalScore }}</span> 점</h5>
    <br>
    <div class="investment-levels">
      <div
      v-for="(level, index) in investmentLevels"
      :key="index"
      :class="{ active: totalScore > (index > 0 ? investmentLevels[index - 1].maxScore : -Infinity) && totalScore <= level.maxScore }"
      class="option-item">
    <h3>{{ level.level }}</h3>
    <p>{{ level.maxScore === Infinity ? '80점 초과' : level.maxScore + '점 이하' }}</p>
  </div>
  
    </div>

    <!-- 저장 및 저장하지 않음을 처리하는 버튼 -->
    <div class="button-group">
      <button @click="submitScore" class="back-button">저장</button>
      <button @click="cancelSubmit" class="next-button">다시하기</button>
    </div>

    <!-- Confirmation Dialog Overlay -->
    <div v-if="showConfirmDialog" class="confirm-overlay">
      <div class="confirm-dialog">
        <br>
        <p>설문을 다시 하시겠습니까?</p>
        <div class="dialog-button-group">
          <button @click="confirmRedirect" class="confirm-button">확인</button>
          <button @click="showConfirmDialog = false" class="cancel-button">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<!--<script setup>-->
<!--import { ref, computed, onMounted } from 'vue';-->
<!--import axios from 'axios';-->
<!--import { useRouter, useRoute } from 'vue-router';-->
<!--import HeaderNormal from '@/components/common/HeaderNormal.vue';-->
<!--import { useLoginStore } from "@/stores/login.js";-->

<!--// require로 jwt-decode를 동적으로 가져오기-->
<!--const jwt_decode = require('jwt-decode');-->

<!--const router = useRouter();-->
<!--const route = useRoute();-->
<!--const uno = route.params.uno;  // 라우터 파라미터에서 유저 ID를 가져옴-->

<!--// 로그인 스토어에서 토큰 정보 가져오기-->
<!--const token = useLoginStore().token;-->

<!--// token이 있는 경우, jwt-decode를 사용하여 토큰 디코딩-->
<!--let decodedToken = {};-->
<!--let userId = uno;  // 초기값을 라우트 파라미터의 유저 ID로 설정-->

<!--if (token) {-->
<!--  try {-->
<!--    // jwt-decode를 사용하여 토큰 디코딩-->
<!--    decodedToken = jwt_decode(token);-->
<!--    userId = decodedToken.id;  // 디코딩된 토큰에서 id 값을 추출-->
<!--  } catch (error) {-->
<!--    console.error("토큰 디코딩 실패:", error);-->
<!--  }-->
<!--}-->

<!--// 유저 ID가 설정되었는지 확인하고 로그 출력-->
<!--console.log("Decoded token:", decodedToken);-->
<!--console.log("userId (from token):", userId);-->

<!--// 점수 계산-->
<!--const page1Score = parseFloat(localStorage.getItem('page1Score')) || 0;-->
<!--const page2Score = parseFloat(localStorage.getItem('page2Score')) || 0;-->
<!--const page3Score = parseFloat(localStorage.getItem('page3Score')) || 0;-->
<!--const page4Score = parseFloat(localStorage.getItem('page4Score')) || 0;-->
<!--const page5Score = parseFloat(localStorage.getItem('page5Score')) || 0;-->
<!--const page6Score = parseFloat(localStorage.getItem('page6Score')) || 0;-->
<!--const page7Score = parseFloat(localStorage.getItem('page7Score')) || 0;-->

<!--const totalScore = computed(() => {-->
<!--  return page1Score + page2Score + page3Score + page4Score + page5Score + page6Score + page7Score;-->
<!--});-->

<!--// 만약 총점이 0점일 경우 투자 성향 테스트 첫 페이지로 리다이렉트-->
<!--onMounted(() => {-->
<!--  if (totalScore.value === 0) {-->
<!--    router.push('/investment1');-->
<!--  }-->
<!--});-->

<!--// 투자 성향 항목 정의-->
<!--const investmentLevels = [-->
<!--  { level: 'Level 1. 안정형', maxScore: 20 },-->
<!--  { level: 'Level 2. 안정추구형', maxScore: 40 },-->
<!--  { level: 'Level 3. 위험 중립형', maxScore: 60 },-->
<!--  { level: 'Level 4. 적극 투자형', maxScore: 80 },-->
<!--  { level: 'Level 5. 공격투자형', maxScore: Infinity }-->
<!--];-->

<!--// 투자 성향을 서버로 전송하는 함수-->
<!--const submitScore = () => {-->
<!--  // 현재 투자 성향 수준 찾기-->
<!--  const currentLevel = investmentLevels.find(level => totalScore.value <= level.maxScore);-->

<!--  // 서버에 전송할 투자 성향 데이터-->
<!--  const payload = { utName: currentLevel.level };-->

<!--  // userId 값이 유효하지 않을 경우 경고 메시지 출력-->
<!--  if (!userId || userId === 'undefined' || userId === null) {-->
<!--    alert('유효하지 않은 유저 ID입니다. 다시 로그인해 주세요.');-->
<!--    return;-->
<!--  }-->

<!--  // API 요청 URL 및 전송 데이터 확인-->
<!--  console.log('Request URL:', `/api/member/${userId}/type`);-->
<!--  console.log('전송할 투자 성향 데이터:', payload);-->

<!--  // 서버에 투자 성향 데이터를 전송하는 API 요청-->
<!--  axios.patch(`/api/member/${userId}/type`, payload)-->
<!--      .then(response => {-->
<!--        console.log('DB 저장 성공:', response.data);-->
<!--        alert('투자 성향이 저장되었습니다.');-->
<!--        router.push('/profile');  // 성공 시 프로필 페이지로 리다이렉트-->
<!--      })-->
<!--      .catch(error => {-->
<!--        console.error('DB 저장 실패:', error);-->
<!--        alert('저장에 실패했습니다. 다시 시도해 주세요.');-->
<!--      });-->
<!--};-->

<!--// Confirmation Dialog-->
<!--const showConfirmDialog = ref(false);-->

<!--const confirmRedirect = () => {-->
<!--  showConfirmDialog.value = false; // 다이얼로그 닫기-->
<!--  router.push('/investment1'); // investment1 페이지로 이동-->
<!--};-->

<!--const cancelSubmit = () => {-->
<!--  showConfirmDialog.value = true; // 다이얼로그 열기-->
<!--};-->
<!--</script>-->
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
// 투자 성향을 서버로 전송하는 함수
const submitScore = () => {
  const currentLevel = investmentLevels.find(level => totalScore.value <= level.maxScore);
  const payload = { investmentLevel: currentLevel.level };
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


<style scoped>
.result-container {
  width: 300px;
  font-family: Arial, sans-serif;
  margin-bottom: 50px;
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

.investment-levels {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #60584C;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.option-item.active {
  background-color: #FFCC00; /* 활성화된 항목 색상 */
}

.option-item:hover {
  background-color: #f0f0f0; /* 호버 시 색상 */
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 50px; /* 버튼들과 간격 추가 */
}

.score {
  color: #FFBB00; /* 점수 색상 설정 */
}

.confirm-overlay {
  position: fixed; /* 화면에 고정 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); /* 투명한 검정 배경 */
  z-index: 10; /* 다른 요소들 위에 표시 */
}

.confirm-dialog {
  position: fixed; /* 화면에 고정 */
  top: 45%; /* 중앙보다 약간 위로 배치 */
  left: 50%; /* 중앙에 배치 */
  transform: translate(-50%, -50%); /* 중앙 정렬 */
  border: 1px solid #60584C;
  background-color: white;
  border-radius: 10px;
  padding: 20px; /* 패딩 추가 */
  text-align: center;
  z-index: 11; /* 오버레이 위에 표시 */
}

.dialog-button-group {
  display: flex; /* Flexbox를 사용하여 버튼들을 나란히 배치 */
  justify-content: space-between; /* 버튼들 간의 간격을 균등하게 배치 */
  padding-left: 20px;
  padding-right: 20px;
}

.confirm-button {
  background-color: #ffffff; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #60584C; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 100px;
  margin-top: 10px; /* 버튼 간 간격 추가 */
  position: relative;
  right:5px;
}

.cancel-button {
  background-color: #816843; /* 배경을 흰색으로 설정 */
  border: 1px solid #60584C; /* 테두리 색을 #60584C로 설정 */
  color: #ffff; /* 글씨 색을 #60584C로 설정 */
  font-size: 16px;
  text-align: center;
  padding: 5px 10px; /* 약간의 패딩 추가 */
  border-radius: 5px; /* 버튼에 둥근 모서리 추가 */
  width: 100px;
  margin-top: 10px; /* 버튼 간 간격 추가 */
  position: relative;
  left:5px;
}

.confirm-button:hover,
.cancel-button:hover {
  background-color: #f0f0f0; /* 호버 시 색상 */
}
</style>
