<template>
  <div class="container">
    <header>
      <div class="header-content">
        <h1>단어사전</h1>
      </div>
      <hr>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요." />
        <button @click="performSearch" class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </header>

    <section class="info">
        <h2>미수령주식 · 배당금</h2>

          <i class="fa-solid fa-star" style="color: #ffffff;"></i>
      <hr>
      <p>
        무수증권, 배당실험 주식이 이사 등의 사유로 통지를 받지 못하거나
        주식에 대한 실질실험을 인지하지 못해 찾아가고 있지 않은 주식 또는 배당금
      </p>
    </section>

    <p class="result-count">"주식"에 대한 {{ resultsCount }}개의 용어가 검색되었습니다.</p>

    <section class="filters">
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>주식</span>
            <button class="accordion-toggle"><i class="fa-solid fa-caret-up"></i></button>
          </div>
          <div class="accordion-content">
            회사가 투자금 조달을 위하여 회사를 지분으로 나누어 판 것입니다.
          </div>
        </div>
      </div>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>주식 시장</span>
            <button class="accordion-toggle"><i class="fa-solid fa-caret-down"></i></button>
          </div>
        </div>
      </div>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>하행</span>
            <button class="accordion-toggle"><i class="fa-solid fa-caret-down"></i></button>
          </div>
        </div>
      </div>
      <button class="custom-button">
        <i class="fa-solid fa-plus"></i> 더보기
      </button>
    </section>
    <hr>
    <section class="dictionary">
      <i class="fa-solid fa-book-bookmark"></i>
      <h3>단어장</h3>
      <ul>
        <li v-for="word in dictionary" :key="word">{{ word }}</li>
      </ul>
    </section>
  </div>

</template>

<script setup>

</script>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

/* Header */
.header-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-content h1 {
  margin-left: 0px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
}

/* Search Bar */
.search-bar {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}

.search-bar input {
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}

.search-button {
  padding: 0 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.search-button i {
  font-size: 20px;
  color: #555;
}
.fa-star{
  margin-bottom: auto;
  margin-left: 300px;
}
.info {
  background-color: #8B6C42;
  padding: 15px;
  border-radius: 10px;
  color: white;
  margin-top: 20px;
}

.info h2 {
  margin: 0;
  font-size: 18px;

}

.info p {
  margin-top: 10px;
  font-size: 14px;
}

.result-count {
  margin-top: 16px;
  font-size: 14px;
}
.accordion {
  background-color: #f4f1ed;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 20px auto;
}

.accordion-item {
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: #ece8e2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  background-color: #f4f1ed;
  border-radius: 10px;
}

.accordion-toggle {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.accordion-content {
  padding: 15px;
  display: none;
  font-size: 14px;
  line-height: 1.5;
  background-color: #ece8e2;
  border-radius: 0 0 10px 10px;
}


.filters {
  margin-top: 20px;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

.filter-group select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.custom-button{
  background-color: #ffcc00;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 8px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: 150px;
}

.dictionary {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.fa-book-bookmark {
  color: #ffcc00;
}

.dictionary h3 {
  font-size: 18px;
  font-weight: bold;
}

.dictionary ul {
  list-style: none;
  padding: 0;
}

.dictionary li {
  padding: 10px;
  background-color: #f0f0f0;
  margin-top: 5px;
  border-radius: 5px;
  font-size: 14px;

}
</style>
