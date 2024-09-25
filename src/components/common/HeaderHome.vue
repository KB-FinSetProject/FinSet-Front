<template>
    <div class="container">
      <header class="header">
        <nav class="navbar navbar-expand-lg border-bottom fixed-top">
          <div class="container-fluid d-flex justify-content-between align-items-center">
            <!-- 왼쪽: 로그인/회원가입 -->
            <div class="auth-links d-flex align-items-center">
              <router-link to="/signin" class="text-muted ms-3 me-2">로그인</router-link> |
              <router-link to="/signup" class="text-muted ms-2">회원가입</router-link>
            </div>
  
            <!-- 중앙: FINDY 로고 -->
            <div class="logo mx-auto">
              <img src="@/assets/findy.png" alt="FINDY" class="logo-image me-5">
            </div>
  
            <!-- 오른쪽: 돋보기 아이콘 -->
            <div class="search-icon d-flex align-items-center mt-2 me-2">
              <i class="fas fa-search icon-large"></i>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* 전체 헤더 관련 스타일 */
  *{
    margin:0;
    padding:0;
  }
  .header {
    text-align: center;
  }
  
  /* 로그인/회원가입 링크 스타일 */
  .auth-links a {
    font-size: 10px; /* 텍스트 크기 수정 */
    text-decoration: none;
    color: #6c757d; /* Bootstrap의 muted 색상 */
  }
  
  .auth-links a:hover {
    color: #000; /* 호버 시 색상 변경 */
  }
  
  /* FINDY 로고 이미지 */
  .logo-image {
    height: 40px; /* 로고 크기 조정 */
    display: block;
    margin: 0 auto; /* 로고를 중앙에 정렬 */
  }
  
  /* 아이콘 크기 조정 */
  .icon-large {
    font-size: 24px;
    color: #6c757d;
  }
  
  .icon-large:hover {
    color: #000; /* 호버 시 색상 변경 */
  }
  </style>
  