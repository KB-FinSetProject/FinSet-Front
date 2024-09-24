<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">FINDY</h1>
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </header>

    <main>
      <section class="news-section">
        <h2>뉴스</h2>
        <div class="news-carousel">
          <div class="news-item">
            <p class="news-title">삼성-LG 'AI홈' 가전 패러다임 전환...</p>
          </div>
          <div class="news-item">
            <p class="news-title">트럼프 "선거 조작도 말...</p>
          </div>
        </div>
      </section>

      <section class="watchlist-section">
        <h2><i class="fas fa-heart"></i> 관심목록</h2>
        <div class="watchlist-item">
          <span class="company-name">NH 고배사업 기부해금</span>
        </div>
        <div class="watchlist-item">
          <span class="company-name">삼성전자</span>
        </div>
      </section>

      <section class="stock-chart">
        <h2>2,572.09</h2>
        <p class="stock-change">+15.23 (+0.60%)</p>
        <!-- 여기에 차트 컴포넌트를 추가할 수 있습니다 -->
        <div class="chart-placeholder"></div>
      </section>
    </main>

    <nav class="bottom-nav">
      <button><i class="fas fa-home"></i></button>
      <button><i class="fas fa-shopping-cart"></i></button>
      <button><i class="fas fa-heart"></i></button>
      <button><i class="fas fa-book"></i></button>
      <button><i class="fas fa-user"></i></button>
    </nav>
  </div>
</template>

<script setup>
// 여기에 필요한 로직을 추가할 수 있습니다
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 414px;
  margin: 0 auto;
  border: 1px solid #ccc;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
}

.app-title {
  font-size: 24px;
  font-weight: bold;
}

.search-button {
  background: none;
  border: none;
  font-size: 20px;
}

main {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.news-section,
.watchlist-section,
.stock-chart {
  margin-bottom: 20px;
}

.news-carousel {
  display: flex;
  overflow-x: auto;
}

.news-item {
  margin-right: 10px;
  width: 150px;
}

.news-image {
  width: 100%;
  height: auto;
}

.watchlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.company-logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.chart-placeholder {
  height: 200px;
  background-color: #f0f0f0;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f8f8f8;
}

.bottom-nav button {
  background: none;
  border: none;
  font-size: 20px;
}
</style>
