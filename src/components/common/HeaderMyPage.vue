<template>
      <header class="header">
        <nav class="navbar fixed-top bg-body-tertiary border-bottom">
          <div class="navbar-custom container-fluid d-flex align-items-center justify-content-between">
            <!-- 왼쪽 화살표 아이콘 -->
            <i class="fas fa-arrow-left icon-large"></i>
  
            <!-- 중앙 텍스트 -->
            <span class="navbar-brand mx-auto text-center">마이페이지</span>
          </div>
        </nav>
      </header>
  </template>

  
  <style scoped>
*{
    color: black;
    margin: 0;
    padding-top: 0;
    padding-bottom: 0;
    background-color: white;
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
    height: 100%; /* 부모 컨테이너의 높이에 맞추기 */
  }
  
  .icon-large {
    font-size: 20px;
  }
  
  /* 아이콘과 텍스트 배치를 위한 레이아웃 */
  .navbar-custom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px; /* 높이를 명확히 지정하여 정렬 이슈 해결 */
  }
  </style>
  