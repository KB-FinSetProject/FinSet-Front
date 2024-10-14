<template>
  <HeaderSignUp />

  <div class="container text-center">
      <h1 class="mt-4">회원가입 완료!</h1>
      <p>회원가입이 성공적으로 완료되었습니다.</p>
      <img src="@/assets/kb_characters.png" alt="KB Characters" class="completion-image" />

      <router-link to="/" class="btn btn-primary">메인 페이지로 바로가기</router-link>
  </div>
</template>

<script setup>
import HeaderSignUp from '@/components/common/HeaderSignUp.vue';
</script>

<style scoped>
.container {
  margin-top: -43px;
}

h1{font-weight: bold;}
p{padding:10px;}

.completion-image {
  width: 60%; /* 이미지 너비를 60%로 조정 */
  max-width: 300px; /* 최대 너비를 300px로 설정 */
  margin: 20px 0; /* 위아래 여백 추가 */
}

.btn-primary {
  background-color: #FFBF0A; /* 노란색으로 변경 */
  color: white; /* 버튼 글씨 색상 */
  border: none; /* 테두리 없음 */
  padding: 10px 20px; /* 패딩 추가 */
  border-radius: 5px; /* 모서리 둥글게 */
}
</style>
