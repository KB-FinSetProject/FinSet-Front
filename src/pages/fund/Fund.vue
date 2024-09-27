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

    <div v-if="selected === '수익률베스트'" class="product-list">
      <div class="info-box">
        <h4>수익률 베스트</h4>
        <p>최근 3개월 동안 기간별 시점에서 수익률이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in allProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 5px; display: inline-block;">{{ item.type }}</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
          <p6>기본 {{ item.normal }} % </p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;"/>
    </div>

    <div v-if="selected === '판매액 베스트'" class="product-list">
      <div class="info-box">
        <h4>판매액 베스트</h4>
        <p>최근 3개월 동안 판매액이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in salesBestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 5px; display: inline-block;">단리</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
          <p6>기본 {{ item.normal }} % </p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;"/>
    </div>

    <div v-if="selected === '적립액 베스트'" class="product-list">
      <div class="info-box">
        <h4>적립액 베스트</h4>
        <p>최근 3개월 동안 적립액이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in savingsBestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 5px; display: inline-block;">복리</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
          <p6>기본 {{ item.normal }} % </p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;"/>
    </div>

    <div v-if="selected === '단리'" class="product-list">
      <div class="info-box">
        <h4>단리 상품 리스트</h4>
        <p>단리 상품에 대한 정보를 확인하세요!</p>
      </div>
      <div v-for="(item, index) in simpleInterestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 5px; display: inline-block;">단리</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
          <p6>기본 {{ item.normal }} % </p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;"/>
    </div>

    <div v-if="selected === '복리'" class="product-list">
      <div class="info-box">
        <h4>복리 상품 리스트</h4>
        <p>복리 상품에 대한 정보를 확인하세요!</p>
      </div>
      <div v-for="(item, index) in compoundInterestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 5px; display: inline-block;">복리</p>
        </div>
        <div class="product-rate">
          <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
          <p6>기본 {{ item.normal }} % </p6>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;"/>
    </div>
  </div>
</template>








<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref } from 'vue';

const selected = ref('수익률베스트');

const allProducts = ref([
  {
    title: 'NH 고향사랑 기부 예금',
    bank: 'NH 농협은행',
    type: '단리',
    max: '3.75',
    normal: '3.00',
  },
  {
    title: 'NH 정기예금',
    bank: 'NH 농협은행',
    type: '단리',
    max: '3.50',
    normal: '2.80',
  },
  {
    title: 'NH 특별예금',
    bank: 'NH 농협은행',
    type: '단리',
    max: '4.00',
    normal: '3.20',
  },
]);

const salesBestProducts = ref([
  {
    title: 'NH 판매액 베스트 상품 1',
    bank: 'NH 농협은행',
    max: '4.00',
    normal: '3.50',
  },
  {
    title: 'NH 판매액 베스트 상품 2',
    bank: 'NH 농협은행',
    max: '4.20',
    normal: '3.70',
  },
  {
    title: 'NH 판매액 베스트 상품 3',
    bank: 'NH 농협은행',
    max: '4.50',
    normal: '4.00',
  },
]);

const savingsBestProducts = ref([
  {
    title: 'NH 적립액 베스트 상품 1',
    bank: 'NH 농협은행',
    max: '4.50',
    normal: '4.00',
  },
  {
    title: 'NH 적립액 베스트 상품 2',
    bank: 'NH 농협은행',
    max: '4.70',
    normal: '4.20',
  },
  {
    title: 'NH 적립액 베스트 상품 3',
    bank: 'NH 농협은행',
    max: '5.00',
    normal: '4.50',
  },
]);

const simpleInterestProducts = ref([
  {
    title: 'NH 단리 예금 상품 1',
    bank: 'NH 농협은행',
    max: '3.75',
    normal: '3.00',
  },
  {
    title: 'NH 단리 예금 상품 2',
    bank: 'NH 농협은행',
    max: '3.85',
    normal: '3.10',
  },
]);

const compoundInterestProducts = ref([
  {
    title: 'NH 복리 예금 상품 1',
    bank: 'NH 농협은행',
    max: '3.75',
    normal: '3.00',
  },
  {
    title: 'NH 복리 예금 상품 2',
    bank: 'NH 농협은행',
    max: '3.95',
    normal: '3.20',
  },
]);

const selectOption = (option) => {
  selected.value = option;
};
</script>




<style scoped>
.container {
  margin-top: -130px; /* 위로 올리기 위해 margin 조정 */
  width: 60%;
}

.options {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px; /* 위로 올리기 위해 margin 조정 */
}

.option {
  text-align: center;
  cursor: pointer;
  position: relative;
  font-size: 1.2em;
  color: gray;
  flex: 1;
  transition: color 0.3s ease;
}

.option:hover {
  color: black;
}

.option.active {
  color: black;
}

hr {
  border: none;
  height: 3px;
  background-color: gray;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 5px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-card {
  display: flex;
  border-radius: 6px;
  align-items: center;
  gap: 10px;
}

.icon {
  color: #FFBB00;
  font-size: 1.5rem;
}

.product-info {
  flex-grow: 1;
}

.product-rate {
  display: flex;
  flex-direction: column;
}

.product-info h5 {
  font-size: small;
  margin: 0;
}

.product-info p {
  font-size: 0.9em;
}

.product-rate h5 {
  font-size: 1.1em;
}

.product-rate p6 {
  font-size: 0.9em;
}

.product-separator {
  width: 600px;
  visibility: hidden;
}

/* 노란색 박스 스타일 */
.info-box {
  background-color: #FFCC00; /* 노란색 배경 */
  padding: 10px;
  border-radius: 0; /* 테두리 반경 없앰 */
  margin-bottom: 10px;
  text-align: center;
}

.info-box h4 {
  margin: 0;
  color: #FFFFFF; /* 텍스트 색상 */
}

.info-box p {
  margin: 5px 0 0; /* 제목과 내용 사이의 간격 */
  color: #FFFFFF; /* 텍스트 색상 */
}
</style>



