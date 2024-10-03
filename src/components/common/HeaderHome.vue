<template>
  <div class="container">
    <header class="header">
      <nav class="navbar navbar-expand-lg fixed-top" style="background-color: white;">
        <div class="container-fluid grid-layout">
          <!-- 첫 번째 + 두 번째 칸: 로그인/회원가입 또는 로그아웃 -->
          <div class="auth-links d-flex align-items-center" style="grid-column: 1 / 3;">
            <!-- 로그인 상태에 따라 다른 링크 표시 -->
            <template v-if="isLoggedIn">
              <span class="text-muted ms-3 me-2">{{ userName }}님</span> |
              <a href="#" class="text-muted ms-2" @click="logout">로그아웃</a>
            </template>
            <template v-else>
              <router-link to="/signin" class="text-muted ms-3 me-2">로그인</router-link> |
              <router-link to="/signup" class="text-muted ms-2">회원가입</router-link>
            </template>
          </div>

          <!-- 세 번째 칸: FINDY 로고 -->
          <div class="logo d-flex justify-content-center">
            <img src="@/assets/findy.png" alt="FINDY" class="logo-image">
          </div>

          <!-- 네 번째 칸 (비어있음) -->
          <div></div>

          <!-- 다섯 번째 칸: 돋보기 아이콘 -->
          <div class="search-icon d-flex justify-content-end align-items-center mt-2">
            <router-link to="/search"><i class="fa-solid fa-magnifying-glass icon-large"></i></router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,  // 로그인 여부
      userName: '',       // 사용자 이름
    };
  },
  mounted() {
    // localStorage에서 저장된 auth 정보 가져오기
    const storedAuth = localStorage.getItem('auth');
    
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);

      // authData에서 user 정보를 추출해 data에 할당
      if (authData && authData.name) {
        this.userName = authData.name;
        this.isLoggedIn = true; // 로그인 상태를 true로 설정
      } else {
        console.error("User 정보가 존재하지 않습니다.");
      }
    } else {
      console.error("localStorage에 저장된 auth 정보가 없습니다.");
    }
  },
  methods: {
    logout() {
      // 로그아웃 처리
      localStorage.removeItem('auth');  // localStorage에서 auth 정보 삭제
      this.isLoggedIn = false;          // 로그인 상태를 false로 변경

      // 로그아웃 후 로그인 페이지로 이동
      this.$router.push('/signin');
    },
  },
};
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
