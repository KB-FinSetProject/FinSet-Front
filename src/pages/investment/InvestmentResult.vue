<template>
  <HeaderNormal navbarTitle="투자성향 결과" />

  <div class="result-container">
    <h5>홍길동 님의 투자 성향 점수: <span class="score">{{ totalScore.toFixed(1) }}</span> 점</h5>
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

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import authApi from '@/api/authApi'; // authApi를 가져오기

export default {
  components: {
    HeaderNormal,
  },
  setup() {
    const router = useRouter();
    const userData = ref({
      id: null,
      name: null,
      password: null,
    });

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
    const submitScore = async () => {
      try {
        const currentLevel = investmentLevels.find(level => totalScore.value <= level.maxScore);
        const typeValue = investmentLevels.indexOf(currentLevel) + 1; // 현재 투자 성향에 해당하는 type 값 설정

        const authData = JSON.parse(localStorage.getItem('auth'));
        if (authData) {
          const payload = {
            id: authData.id,              // 이메일 값 (id)
            name: authData.name,          // 사용자 이름
            password: authData.password,  // 비밀번호
            type: typeValue               // 투자 성향 type 값
          };

          // 서버로 요청 전송
          const response = await authApi.updateType(authData.id, payload);
          console.log('DB 저장 성공:', response.data);
          alert('투자 성향이 저장되었습니다.');
          router.push('/auth');
        } else {
          console.error('Auth data not found in localStorage');
          alert('로그인이 필요합니다.');
          router.push('/login');
        }
      } catch (error) {
        console.error('DB 저장 실패:', error);
        alert('저장에 실패했습니다.');
      }
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

    return {
      totalScore,
      investmentLevels,
      submitScore,
      showConfirmDialog,
      confirmRedirect,
      cancelSubmit,
    };
  },
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
