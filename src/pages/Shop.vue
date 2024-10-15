<template>
  <HeaderNormal navbarTitle="금융상품" />

  <div class="container">
    <div class="button-grid">
      <router-link to="/stock" class="btn brown-button large-button" type="button" style="top: 10%; left: -20%;">
        <span class="button-text">주식</span>
      </router-link>

      <router-link to="/fund" class="btn brown-button medium-button" type="button" style="top: 5%; right: -20%;">
        <span class="button-text">펀드</span>
      </router-link>

      <router-link to="/installment" class="btn yellow-button larger-button" type="button" style="top: 52%; left: 60%; transform: translate(-50%, -50%);">
        <span class="button-text">적금</span>
      </router-link>

      <router-link to="/deposit" class="btn brown-button small-button" type="button" style="top: 55%; left: -20%;">
        <span class="button-text">예금</span>
      </router-link>

      <router-link to="/exchange" class="btn brown-button xsmall-button" type="button" style="top: 65%; right: -20%;">
        <span class="button-text">외환</span>
      </router-link>
    </div>

    <img src="@/assets/kb_characters.png" alt="KB Characters" class="character-image" />
    <p class="instruction-text">필요하신 카테고리를 선택해주세요!</p>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4px;
}

.button-grid {
  position: relative;
  height: 367px; /* 버튼 그리드 높이 조정 */
  width: 100%; /* 그리드 너비 설정 */
  bottom: 24px;
}

.brown-button, .yellow-button {
  color: #ffffff; /* 기본 글씨 색상 */
  background-color: #816843; /* 갈색 배경색 */
  border-radius: 50%; /* 둥글게 만들기 */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, outline 0.3s ease, color 0.3s ease; /* 색상 변화도 부드럽게 */
  font-size: 18px; /* 글씨 크기 조정 */
  position: absolute; /* 위치를 절대값으로 설정 */
  text-decoration: none; /* 링크 스타일 제거 */
  outline: none; /* 기본 테두리 제거 */
}

.brown-button:hover,
.brown-button:focus,
.yellow-button:hover,
.yellow-button:focus {
  background-color: #fdc938 !important; /* 호버 및 클릭 시 노란색, 우선순위 높임 */
  outline: none; /* 호버 시에도 테두리 제거 */
  border: none; /* 테두리 제거 */
  color: #ffffff; /* 호버 시에도 글씨 색상 유지 */
}

/* 각 버튼의 크기 설정 */
.large-button {
  height: 145px; /* 주식 버튼 크기 */
  width: 145px; /* 주식 버튼 크기 */
}

.medium-button {
  height: 120px; /* 펀드 버튼 크기 */
  width: 120px; /* 펀드 버튼 크기 */
}

.larger-button {
  height: 140px; /* 적금 버튼 크기 */
  width: 140px; /* 적금 버튼 크기 */
}

.small-button {
  height: 130px; /* 예금 버튼 크기 */
  width: 130px; /* 예금 버튼 크기 */
}

.xsmall-button {
  height: 110px; /* 외환 버튼 크기 */
  width: 110px; /* 외환 버튼 크기 */
}

.character-image {
  width: 192px; /* 이미지 크기 조정 */
  margin-top: -68px; /* 이미지와 버튼 간격 조정 */
  bottom: 13px;
}

.instruction-text {
  margin-top: -17px; /* 안내 텍스트 위쪽 여백 */
  font-size: 16px; /* 안내 텍스트 크기 조정 */
  text-align: center; /* 중앙 정렬 */
  font-weight: bold;
}

.button-text {
  font-weight: bold;
  font-size: 33px;
}
</style>
