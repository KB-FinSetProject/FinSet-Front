<template>
<HeaderNormal/>
  <div class="myPage">
    <div class="container">
      <div class="userInfo">
        <input type="text" v-model="username" readonly class="usernameInput">
        <span class="emailContainer">
          <span class="email">{{ email }}</span>
        </span>
        <button class="editButton">
          <i class="fa-solid fa-edit"></i> <!-- 편집 아이콘 추가 -->
        </button>
      </div>
      <nav class="menu">
        <router-link to="/wish" class="menuItem" @click="handleMenuClick({ path: '/wish' })">
          <i class="fa-solid fa-heart"></i>
          관심 리스트
        </router-link>
        <router-link to="/investment/result" class="menuItem" @click="handleMenuClick({ path: '/investment/result' })">
          <i class="fa-solid fa-t"></i>
          투자상품 설문
        </router-link>
        <router-link to="/board" class="menuItem" @click="handleMenuClick({ path: '/board' })">
          <i class="fa-regular fa-keyboard"></i>
          내가 쓴 글
        </router-link>
        <router-link to="/dict" class="menuItem" @click="handleMenuClick({ path: '/dict' })">
          <i class="fa-regular fa-address-book"></i>
          단어장
        </router-link>
      </nav>
      <div class="bottomButtons">
        <button class="withdrawButton">탈퇴하기</button>
        <button class="logoutButton">로그아웃</button>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="confirmDialog">
      <p>설문을 시작하시겠습니까?</p>
      <button @click="confirmRedirect">확인</button>
      <button @click="showConfirmDialog = false">취소</button>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import HeaderNormal from "@/components/common/HeaderNormal.vue";

const router = useRouter();

const username = ref('홍길동');
const email = ref('danhXXX@naver.com');
const showConfirmDialog = ref(false);
let targetPath = ref('');

// Handle menu item click
const handleMenuClick = (item) => {
  if (item.path === '/investment/result') {
    showConfirmDialog.value = true; // Show confirmation dialog
    targetPath.value = item.path; // Store the target path
    return; // Prevent the default behavior
  }
  router.push(item.path); // Navigate to the clicked menu item
};

// Redirect to the target path
const confirmRedirect = () => {
  showConfirmDialog.value = false; // Close the dialog
  router.push(targetPath.value); // Redirect to the investment page
};
</script>

<style scoped>
.myPage {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: #eef2f3; /* 페이지 배경색 */
  min-height: 100vh;
  margin-bottom: 150px;
}

.container {
  background-color: white; /* 컨테이너 배경색을 하얀색으로 */
  border-radius: 15px; /* 모서리 둥글게 */
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: none; /* 그림자 제거 */
}

.userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.usernameInput {
  background-color: #ffeb3b; /* 사용자 이름 배경색 */
  border: none;
  padding: 0.75rem;
  font-size: 1.5rem; /* 글자 크기 증가 */
  font-weight: bold;
  text-align: center;
  width: 100%;
  border-radius: 10px; /* 모서리 둥글게 */
  color: black; /* 글자색 검은색 */
}

.emailContainer {
  background-color: #ffeb3b; /* 이메일 배경색 */
  padding: 0.5rem;
  border-radius: 10px; /* 모서리 둥글게 */
  width: 100%; /* 전체 너비 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

.email {
  color: black; /* 글자색 검은색 */
  font-size: 1rem; /* 글자 크기 조정 */
}

.editButton {
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1.2rem; /* 아이콘 크기 조정 */
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menuItem {
  display: flex;
  align-items: center;
  background-color: white; /* 메뉴 항목 배경색을 하얀색으로 */
  padding: 1rem;
  border-radius: 10px;
  text-align: left;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
  color: black; /* 글자색 검은색 */
  text-decoration: none;
}

.menuItem:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 */
}

.menuItem i {
  margin-right: 1rem;
  font-size: 1.5rem;
  color: #3f51b5; /* 아이콘 색상 변경 */
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

.withdrawButton:hover,
.logoutButton:hover {
  background-color: #c62828; /* 버튼 호버 시 색상 변화 */
}

/* Confirmation Dialog Styles */
.confirmDialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 다이얼로그 그림자 부드럽게 변경 */
  z-index: 1000; /* 다른 요소 위에 표시 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

.confirmDialog button {
  margin: 5px; /* 버튼 간격 추가 */
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #4caf50; /* 확인 버튼 색상 */
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirmDialog button:hover {
  background-color: #388e3c; /* 확인 버튼 호버 시 색상 변화 */
}
</style>
