<template>
  <HeaderNormal navbarTitle="펀드 리스트" />

  <div class="container">
    <div class="options">
      <div class="option" @click="selectOption('수익률베스트')" :class="{ active: selected === '수익률베스트' }">
        수익률베스트
        <hr :class="{ active: selected === '수익률베스트' }" />
      </div>
      <div class="option" @click="selectOption('판매액 베스트')" :class="{ active: selected === '판매액 베스트' }">
        판매액 베스트
        <hr :class="{ active: selected === '판매액 베스트' }" />
      </div>
      <div class="option" @click="selectOption('적립액 베스트')" :class="{ active: selected === '적립액 베스트' }">
        적립액 베스트
        <hr :class="{ active: selected === '적립액 베스트' }" />
      </div>
    </div>

    <div v-if="selected === '적립액 베스트'" class="product-list">
      <div v-for="(item, index) in savingProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} %</h5>
          <p6>기본 {{ item.normal }} %</p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;" />
    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref } from 'vue';

const selected = ref('적립액 베스트');

const savingProducts = ref([
  {
    title: '적립액 베스트 상품 1',
    bank: '은행 1',
    max: '4.10',
    normal: '3.60',
  },
  {
    title: '적립액 베스트 상품 2',
    bank: '은행 2',
    max: '4.05',
    normal: '3.55',
  },
  // 추가 상품 목록
]);

const selectOption = (option) => {
  selected.value = option;
};
</script>

<style>
.fund-container {
  padding: 16px;
  max-width: 390px;
}

.yellow-box {
  background-color: #FAB809;
  padding: 10px;
  margin-bottom: 16px;
  text-align: center;
}

.white-text {
  color: #fff;
}

.description {
  font-size: 12px;
  margin-top: 5px;
}

.titles-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
}

.title-with-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
  background: none;
  border: none;
}

.best-yield-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #000000;
}

.yield-divider,
.sales-divider,
.savings-divider {
  height: 4px;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  background-color: #aeaeae;
}

.yield-divider.active,
.sales-divider.active,
.savings-divider.active {
  background-color: #000;
}

.mini-bar {
  height: 4px;
  width: 100%;
  background-color: #fff;
  margin: 10px auto 0;
}

.fund-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fund-item {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fund-icon {
  font-size: 24px;
  color: #888;
}

.fund-info {
  flex: 1;
  margin-left: 10px;
}

.fund-name {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 2px;
  margin-top: 15px;
  margin-left: 8px;
}

.fund-details {
  font-size: 14px;
  font-weight: bold;
  margin-top: 0;
  margin-left: 8px;
}

.fund-yield {
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.yield {
  font-size: 15px;
  font-weight: bold;
  color: #000000;
}

.red {
  font-size: 22px;
  font-weight: bold;
  color: #ff0000;
}

.period {
  font-size: 12px;
  color: #7e7e7e;
  margin-bottom: 0;
  margin-right: 21px;
  margin-top: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 8px;
}

.foreign-fund {
  background-color: #EDF1F8;
  color: #547BC1;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 8px;
}
</style>