<template>
    <div class="container">
       <header>
         <h1>단어사전</h1>
         <hr>
         <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요.">
         <button @click="performSearch" class="search-button">
         <i class="fas fa-search"></i>
       </button>
       </header>
      <br>
      <section class="info">
        <h2>미수령주식 · 배당금</h2>
        <hr>
        <p>
          무수증권, 배당실험 주식이 이사 등의 사유로 통지를 받지 못하거나
          주식에 대한 실질실험을 인지하지 못해 찾아가고 있지 않은 주식 또는 배당금
        </p>
        <p>*주식에 대한 {{ resultsCount }}개의 용어가 검색되었습니다.</p>
      </section>

      <section class="filters">
        <label for="stock">주식</label>
        <select id="stock" v-model="selectedStock">
          <option v-for="option in stockOptions" :key="option">{{ option }}</option>
        </select>
        <br>
        <label for="market">주식 시장</label>
        <select id="market" v-model="selectedMarket">
          <option v-for="option in marketOptions" :key="option">{{ option }}</option>
        </select>
      </section>

      <section class="dictionary">
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
header {
  text-align: center;
}
input{
  border-radius: 10px;
}
</style>