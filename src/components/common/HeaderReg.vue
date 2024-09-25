<template>
    <div class="container">
      <header class="header">
        <nav class="navbar fixed-top bg-body-tertiary border-bottom">
          <div class="navbar-custom container-fluid d-flex align-items-center justify-content-between">
            
  
            <!-- 중앙 텍스트 -->
            <span class="navbar-brand mx-auto text-center">회원가입</span>
          </div>
        </nav>
      </header>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
*{
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
}
  /* navbar 관련 스타일 */
  .navbar {
    margin: 0;
  }
  
  .navbar-brand {
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;    
    height: 100%; /* 부모 컨테이너의 높이에 맞추기 */
  }
  

  
  /* 아이콘과 텍스트 배치를 위한 레이아웃 */
  .navbar-custom {
    display: flex;
    justify-content: space-between;   
    align-items: center;
    width: 100%;
    padding-top: 20px;
  }
  </style>
  