<template>
  <HeaderNormal navbarTitle="금융상품" />

  <div style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</div>
  <div class="container">
    <div class="d-grid gap-2 p-3">
      <router-link to="/deposit" class="btn brown-button" type="button">
        <div class="d-flex justify-content-center align-items-center">
          <i class="fa-solid fa-sack-dollar icon" style="margin-right: 8px;"></i>
          <span class="button-text">예금</span>
        </div>
      </router-link>

      <div class="button-grid">
        <router-link to="/installment" class="btn brown-button" type="button">
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-piggy-bank icon icon-offset"></i> <!-- 오른쪽으로 미룰 아이콘 -->
            <span class="button-text offset-text">적금</span>
          </div>
        </router-link>
        <router-link to="/fund" class="btn brown-button" type="button">
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-chart-simple icon icon-offset"></i> <!-- 오른쪽으로 미룰 아이콘 -->
            <span class="button-text offset-text">펀드</span>
          </div>
        </router-link>
        <router-link to="/stock" class="btn brown-button" type="button">
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-chart-line icon icon-offset"></i> <!-- 오른쪽으로 미룰 아이콘 -->
            <span class="button-text offset-text">주식</span>
          </div>
        </router-link>
        <router-link to="/exchange" class="btn brown-button" type="button">
          <div class="d-flex flex-column align-items-center">
            <i class="fa-solid fa-money-bill-trend-up icon icon-offset"></i> <!-- 오른쪽으로 미룰 아이콘 -->
            <span class="button-text offset-text">외환</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.brown-button {
  color: #ffff;
  background-color: #816843;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.brown-button:hover {
  background-color: #FFBF0A;
}

.icon {
  font-size: 40px;
  color: #ffffff; /* 아이콘 색상을 흰색으로 설정 */
}

.icon-offset {
  margin-right: 5px; /* 아이콘을 오른쪽으로 조금 미룸 */
}

.button-text {
  font-size: 28px; /* 글씨 크기를 더 키움 */
}

.offset-text {
  margin-left: -10px; /* 왼쪽으로 밀기 */
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.container {
  margin-top: -55px; /* 원하는 크기로 조정 */
}
</style>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
</script>
