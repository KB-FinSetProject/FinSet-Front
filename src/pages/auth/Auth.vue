<template>
  <HeaderMyPage />

  <div class="container">
    <div class="info" style="width: 390px">
      <div>
        <h1 style="margin-top: 25px;">
          {{ userName }}
          <RouterLink to="/signup">
            <i class="fa-solid fa-pen" style="font-size:25px; margin-left:10px; color:white"></i>
          </RouterLink>
        </h1>
      </div>
      <br>
      <div class="email">
        {{ userId }}
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

<script>
export default {
  data() {
    return {
      userName: '',
      userId: ''
    };
  },
  mounted() {
    // localStorage에서 저장된 auth 정보 가져오기
    const storedAuth = localStorage.getItem('auth');

    if (storedAuth) {
      const authData = JSON.parse(storedAuth);

      // authData에서 user 정보를 추출해 data에 할당
      if (authData) {
        this.userName = authData.name;
        this.userId = authData.id;
      } else {
        console.error("User 정보가 존재하지 않습니다.");
      }
    } else {
      console.error("localStorage에 저장된 auth 정보가 없습니다.");
    }
  },
};
</script>


<script setup>
import HeaderMyPage from '@/components/common/HeaderMyPage.vue';
</script>

<style scoped>
.container {
  margin-bottom: 50px;
}

.container {
  margin-top: 100px; /* 헤더 높이보다 약간 더 크게 설정 */
  padding: 20px; /* 패딩 추가 */
}


.info {
  background-color: #FFBB00; /* 배경색 설정 */
  color: white; /* 글씨색 흰색으로 설정 */
  padding: 20px; /* 패딩 추가 */
  margin-top: -100px;
  height: 170px;
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
  margin-top: 130px;
  margin-left: 10px;
  margin-right: 10px;
}

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

.withdrawButton{
  width: 48%;
  padding: 0.75rem;
  border-color: #816843;
  background-color: white;
  color: #816843;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid;
}

.list {
  width: 100%; /* 리스트 전체 폭 */
  max-width: 600px; /* 최대 폭 제한 */
  margin-left: 20px;
  margin-right: 20px;
}

.list-item {
  display: flex; /* 아이콘과 텍스트를 가로로 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 1.2em; /* 글씨 크기 키우기 */
  color: black; /* 글씨색 */
  text-decoration: none; /* 기본 링크 스타일 제거 */
}


hr{
  width: 350px;
}
</style>
