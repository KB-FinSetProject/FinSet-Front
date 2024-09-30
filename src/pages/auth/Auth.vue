<template>
  <HeaderMyPage />

  <div class="container">
    <div class="info" style="width: 350px">
      <hr style="border-color: white;">

      <!-- <div style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</div> -->

      <div>
        <h1>
        홍길동 <i class="fa-solid fa-pen" style="font-size:25px; margin-left:10px;"></i>
      </h1>
        </div>
      <br>
      <div class="email">
        hongildong@kb.com
      </div>
    </div>

    <br><br>
    <div class="list">
      <router-link to="/wish" class="list-item">
        <i class="fa-solid fa-heart icon"></i> <span>관심리스트</span>
      </router-link>
      <hr><br>
      <router-link to="/investment/result" class="list-item">
        <i class="fa-solid fa-file-contract icon"></i><span>투자성향설문</span>
      </router-link>
      <hr><br>
      <router-link to="/myboard" class="list-item">
        <i class="fa-solid fa-pen-to-square icon"></i><span>내가쓴글</span>
      </router-link>
      <hr><br>
      <router-link to="/dictmemo" class="list-item">
        <i class="fa-solid fa-book icon"></i><span>단어장</span>
      </router-link>
    </div>

    <br><br>
    <div class="bottomButtons">
      <button class="withdrawButton">탈퇴하기</button>
      <button class="logoutButton">로그아웃</button>
    </div>
    
  </div>
</template>

<script setup>
import HeaderMyPage from '@/components/common/HeaderMyPage.vue';
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}

.container {
  margin-top: 60px; /* 헤더 높이보다 약간 더 크게 설정 */
  padding: 20px; /* 패딩 추가 */
}


.info {
  background-color: #FFBB00; /* 배경색 설정 */
  color: white; /* 글씨색 흰색으로 설정 */
  padding: 20px; /* 패딩 추가 */
  border-radius: 10px; /* 모서리 둥글게 */
}

.email {
  background-color: rgba(255, 218, 131, 0.7); /* 더 연한 배경색 설정 */
  color: white; /* 글씨색을 검정색으로 변경 (white가 배경색과 비슷해 잘 보이지 않을 수 있음) */
  padding: 5px; /* 패딩을 좌우로 추가하여 여백 조정 */
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px; /* 모서리 둥글게 */
  display: inline-block; /* 텍스트 크기에 맞게 배경이 조정되도록 설정 */
}


.icon {
  color: #816843;
  font-size: 1.5em; /* 아이콘 크기 키우기 */
  margin-right: 20px;
}

.bottomButtons {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.withdrawButton,
.logoutButton {
  width: 48%;
  padding: 0.75rem;
  background-color: #816843; /* 버튼 배경색 변경 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}


.list {
  width: 100%; /* 리스트 전체 폭 */
  max-width: 600px; /* 최대 폭 제한 */
}

.list-item {
  display: flex; /* 아이콘과 텍스트를 가로로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 1.2em; /* 글씨 크기 키우기 */
  color: black; /* 글씨색 */
  text-decoration: none; /* 기본 링크 스타일 제거 */
}



</style>
