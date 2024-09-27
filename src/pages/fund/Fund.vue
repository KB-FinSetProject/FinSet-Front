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
        <hr class="mini-bar" />
        <p>최근 3개월 동안 수익률이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in allProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"
           :style="{ color: item.isFavorited ? '#FFBB00' : 'gray' }"
           @click="toggleFavorite(item)"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <div>
            <p style="background-color: #ffebed; color: red; border-radius: 5px; padding: 2px 5px; display: inline-block;">높은 위험</p>
            <p style="background-color: #e5f6fd; color: #0033ff; border-radius: 5px; padding: 2px 5px; display: inline-block;">해외주식형</p>
          </div>
        </div>
        <div class="product-rate">
          <p6 style="color: gray;">3개월</p6>
          <h5 style="color: red;">14.76%</h5>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;" />
    </div>

    <div v-if="selected === '판매액 베스트'" class="product-list">
      <div class="info-box">
        <h4>판매액 베스트</h4>
        <hr class="mini-bar" />
        <p>최근 3개월 동안 판매액이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in salesBestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"
           :style="{ color: item.isFavorited ? '#FFBB00' : 'gray' }"
           @click="toggleFavorite(item)"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <div>
            <p style="background-color: #ffebed; color: red; border-radius: 5px; padding: 2px 5px; display: inline-block;">높은 위험</p>
            <p style="background-color: #e5f6fd; color: #0033ff; border-radius: 5px; padding: 2px 5px; display: inline-block;">해외주식형</p>
          </div>
        </div>
        <div class="product-rate">
          <p6 style="color: gray;">3개월</p6>
          <h5 style="color: red;">14.76%</h5>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;" />
    </div>

    <div v-if="selected === '적립액 베스트'" class="product-list">
      <div class="info-box">
        <h4>적립액 베스트</h4>
        <hr class="mini-bar" />
        <p>최근 3개월 동안 적립액이 가장 높은 펀드예요!</p>
      </div>
      <div v-for="(item, index) in savingsBestProducts" :key="index" class="product-card">
        <i class="fa-solid fa-heart icon"
           :style="{ color: item.isFavorited ? '#FFBB00' : 'gray' }"
           @click="toggleFavorite(item)"></i>
        <div class="product-info">
          <h5>{{ item.title }}</h5>
          <p>{{ item.bank }}</p>
          <div>
            <p style="background-color: #ffebed; color: red; border-radius: 5px; padding: 2px 5px; display: inline-block;">높은 위험</p>
            <p style="background-color: #e5f6fd; color: #0033ff; border-radius: 5px; padding: 2px 5px; display: inline-block;">해외주식형</p>
          </div>
        </div>
        <div class="product-rate">
          <p6 style="color: gray;">3개월</p6>
          <h5 style="color: red;">14.76%</h5>
        </div>
      </div>
      <hr class="product-separator" style="width: 600px; visibility: hidden;" />
    </div>
  </div>
</template>
<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref } from 'vue';

const selected = ref('수익률베스트');

// 제품 데이터
const allProducts = ref([
  {
    title: '미래에셋증권자',
    bank: 'NH 농협은행',
    max: '3.75',
    normal: '3.00',
    isFavorited: false, // 하트 상태 추가
  },
  {
    title: '삼성전자 주식형 펀드',
    bank: '삼성자산운용',
    max: '5.50',
    normal: '4.20',
    isFavorited: false,
  },
  {
    title: 'LG화학 주식형 펀드',
    bank: 'LG자산운용',
    max: '6.00',
    normal: '5.00',
    isFavorited: false,
  },
  {
    title: 'SK텔레콤 주식형 펀드',
    bank: 'SK자산운용',
    max: '4.80',
    normal: '3.90',
    isFavorited: false,
  },
]);

const salesBestProducts = ref([
  {
    title: '미래에셋증권자',
    bank: 'NH 농협은행',
    max: '4.00',
    normal: '3.50',
    isFavorited: false,
  },
  {
    title: '삼성전자 주식형 펀드',
    bank: '삼성자산운용',
    max: '5.00',
    normal: '4.00',
    isFavorited: false,
  },
  {
    title: 'LG화학 주식형 펀드',
    bank: 'LG자산운용',
    max: '5.50',
    normal: '4.50',
    isFavorited: false,
  },
]);

const savingsBestProducts = ref([
  {
    title: '미래에셋증권자',
    bank: 'NH 농협은행',
    max: '4.50',
    normal: '4.00',
    isFavorited: false,
  },
  {
    title: '삼성전자 주식형 펀드',
    bank: '삼성자산운용',
    max: '5.20',
    normal: '4.20',
    isFavorited: false,
  },
  {
    title: 'LG화학 주식형 펀드',
    bank: 'LG자산운용',
    max: '5.80',
    normal: '4.80',
    isFavorited: false,
  },
]);

const selectOption = (option) => {
  selected.value = option;
};

const toggleFavorite = (item) => {
  item.isFavorited = !item.isFavorited;
};
</script>

<style scoped>
.container {
  margin-top: -60px; /* 위로 올리기 위해 margin 조정 */
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
  color: #000000;
  flex: 1;
  transition: color 0.3s ease;
  font-weight: bold;
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

hr.active {
  background-color: #000000; /* 선택되면 검정색으로 변경 */
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
  font-size: 1.5rem; /* 아이콘 크기 줄이기 */
  position: relative;
  bottom: 20px; /* 하트 위치 조정 */
}

.product-info {
  flex-grow: 1;
}

.product-rate {
  display: flex;
  flex-direction: column;
}

.product-info h5 {
  font-size: 18px; /* 글씨 크기 키우기 */
  font-weight: bold;
  margin: 0;

}

.product-info p {
  font-size: 1em; /* 글씨 크기 키우기 */
}

.product-rate h5 {
  font-size: 25px;
  color: red; /* 빨간색 */
  font-weight: bold;
  position: relative;
  right:10px;
  bottom: 10px;
}

.product-rate p6 {
  font-size: 0.9em;
  color: gray; /* 회색 */
  position: relative;
  left:10px;
  bottom: 18px;
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
  height: 100px;
  position: relative;
  bottom: 8px;
}

.info-box h4 {
  margin: 0;
  color: #FFFFFF; /* 텍스트 색상 */
}

.info-box p {
  margin: 5px 0 0; /* 제목과 내용 사이의 간격 */
  color: #FFFFFF; /* 텍스트 색상 */
}

.mini-bar {
  height: 4px; /* 미니 바 높이 */
  background-color: #ffffff; /* 미니 바 색상 */
  margin-top: 5px; /* 제목과 미니 바 사이의 간격 */
}
h4{
  font-weight: bold;
}

</style>
