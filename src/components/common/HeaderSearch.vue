<template>
  <div class="container">
      <header class="header">
          <nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary border-bottom">
              <div class="navbar-custom container-fluid" style="background-color: white;">
                  <i class="fa-solid fa-arrow-left icon-large"></i>
                  <span class="navbar-brand">상품검색</span>
                  <i class="fa-solid fa-magnifying-glass icon-large" style="visibility: hidden;"></i>
              </div>
          </nav>
      </header>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  navbarTitle: {
      type: String,
      default: 'Navbar', // 기본값 설정 (선택적)
  },
});
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

.navbar-brand {
  font-size: 23px;
}
.icon-large {
  font-size: 20px;
}

.navbar-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px; /* 높이를 명확히 지정하여 정렬 이슈 해결 */
  margin-left: 20px;
  margin-right: 20px;
}
</style>
