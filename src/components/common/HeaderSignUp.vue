<template>
  <div class="container">
    <header class="header">
      <nav class="navbar fixed-top bg-body-tertiary border-bottom">
        <div class="navbar-custom container-fluid d-flex align-items-center" style="background-color: white;">
          <!-- 왼쪽 화살표 아이콘 -->
          <div class="nav-item flex-fill d-flex">
            <i class="fas fa-arrow-left icon-large"></i>
          </div>
  
          <!-- 중앙 텍스트 -->
          <div class="nav-item flex-fill d-flex justify-content-center">
            <span class="navbar-brand">회원가입</span>
          </div>

          <!-- 오른쪽 빈 칸 (필요 시 사용) -->
          <div class="nav-item flex-fill d-flex justify-content-center">
            <!-- 여기에 추가 아이콘이나 요소를 배치할 수 있습니다. -->
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>
</script>

<style scoped>
* {
  color: black;
  margin: 0;
  padding: 0;
}

/* navbar 관련 스타일 */
.navbar {
  margin: 0;
}

.navbar-brand {
  font-size: 23px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.icon-large {
  font-size: 20px;
  margin-left: 20px;
}

.navbar-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px; /* 높이를 명확히 지정하여 정렬 이슈 해결 */
}

.nav-item {
  flex: 1; /* 각 칸을 동일한 너비로 설정 */
}
</style>

  