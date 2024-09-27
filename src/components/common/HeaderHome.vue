<template>
  <div class="container">
    <header class="header">
      <nav class="navbar navbar-expand-lg fixed-top" style="background-color: white;">
        <div class="container-fluid grid-layout">
          <!-- 첫 번째 + 두 번째 칸: 로그인/회원가입 -->
          <div class="auth-links d-flex align-items-center" style="grid-column: 1 / 3;">
            <router-link to="/signin" class="text-muted ms-3 me-2">로그인</router-link> |
            <router-link to="/signup" class="text-muted ms-2">회원가입</router-link>
          </div>

          <!-- 세 번째 칸: FINDY 로고 -->
          <div class="logo d-flex justify-content-center">
            <img src="@/assets/findy.png" alt="FINDY" class="logo-image">
          </div>

          <!-- 네 번째 칸 (비어있음) -->
          <div></div>

          <!-- 다섯 번째 칸: 돋보기 아이콘 -->
          <div class="search-icon d-flex justify-content-end align-items-center mt-2">
            <i class="fa-solid fa-magnifying-glass icon-large"></i>
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
* {
  margin: 0;
  padding: 0;
}

.header {
  text-align: center;
}

/* 로그인/회원가입 링크 스타일 */
.auth-links a {
  font-size: 11px; /* 텍스트 크기 수정 */
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
}

/* 아이콘 크기 조정 */
.icon-large {
  font-size: 20px;
  color: #6c757d;
  margin-right: 20px;
  margin-bottom: 8px;
  color: black;
}

.icon-large:hover {
  color: #000; /* 호버 시 색상 변경 */
}

/* Grid 레이아웃 설정 */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* 5등분 레이아웃 */
  align-items: center; /* 수직 정렬 */
  min-height: 50px; /* 헤더 높이 설정 */
}
</style>
