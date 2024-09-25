<template>
  <div class="fund-container">
    <div class="titles-container">
      <div class="title-with-divider">
        <h2 class="best-yield-title yield">수익률</h2>
        <div class="yield-divider"></div> <!-- 수익률 바 -->
      </div>
      <div class="title-with-divider">

        <h2 class="best-yield-title sales">판매액</h2>
        <div class="sales-divider"></div> <!-- 판매액 바 -->
      </div>
      <div class="title-with-divider">
        <h2 class="best-yield-title savings">적립액</h2>
        <div class="savings-divider"></div> <!-- 적립액 바 -->
      </div>
    </div>

    <div class="fund-list">
      <div v-for="fund in funds" :key="fund.id" class="fund-item">
        <div class="fund-header">
          <div class="fund-icon">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'"></i>
          </div>
          <div class="fund-info">
            <p class="fund-name">{{ fund.name }}</p>
            <p class="fund-details">{{ fund.details }}</p>
          </div>
          <div class="fund-yield">
            <span class="yield"><span class="red">{{ fund.yield }}</span></span> <!-- 숫자를 빨간색으로 -->
            <span class="period">{{ fund.period }}</span>
          </div>
        </div>
        <div class="fund-footer">
          <span class="high-rating">높은 위험</span>
          <span class="foreign-fund">해외주식</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      funds: [
        {
          id: 1,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: true,
        },
        {
          id: 2,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
        {
          id: 3,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
        {
          id: 4,
          name: '미래에셋인도중형포커스권자',
          details: '투자신탁 1(주식) 종류 C-e',
          yield: '14.76%',
          period: '3개월',
          favorite: false,
        },
      ],
    };
  },
};
</script>

<style>
.fund-container {
  padding: 16px;
}

.titles-container {
  display: flex;
  align-items: flex-start; /* 제목을 위쪽 정렬 */
  margin-bottom: 16px; /* 여백 조정 */
}

.title-with-divider {
  display: flex;
  flex-direction: column; /* 제목과 바를 세로로 배치 */
  align-items: center; /* 가운데 정렬 */
  margin-right: 16px; /* 제목 간격 */
}

.best-yield-title {
  font-size: 18px; /* 제목 글씨 크기 */
  font-weight: bold;
  margin-bottom: 8px; /* 제목과 바 간격 */
}

.yield {
  color: #000000; /* 수익률 색상 (검정색) */
}

.sales {
  color: #aeaeae; /* 판매액 색상 */
}

.savings {
  color: #aeaeae; /* 적립액 색상 */
}

.yield-divider {
  background-color: #000; /* 수익률 바 색상 */
  height: 4px; /* 바의 높이 */
  width: 150px; /* 바의 너비를 150px로 늘림 */
}

.sales-divider {
  background-color: #aeaeae; /* 판매액 바 색상 */
  height: 4px; /* 바의 높이 */
  width: 100px; /* 바의 너비 (필요에 따라 조정) */
}

.savings-divider {
  background-color: #aeaeae; /* 적립액 바 색상 */
  height: 4px; /* 바의 높이 */
  width: 100px; /* 바의 너비 (필요에 따라 조정) */
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
  color: #888; /* 기본 아이콘 색상 */
}

.fund-info {
  flex: 1;
  margin-left: 10px;
}

.fund-name {
  font-size: 16px;
  font-weight: bold;
}

.fund-details {
  font-size: 12px;
  color: #888;
}

.fund-yield {
  text-align: right;
}

.yield {
  font-size: 18px;
  font-weight: bold;
  color: #000000; /* 검정색 */
}

.red {
  color: #ff0000; /* 숫자를 빨간색으로 변경 */
}

.period {
  font-size: 12px;
  color: #888;
}

.fund-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #888;
}

.high-rating {
  color: #e74c3c; /* 빨간색 */
}

.foreign-fund {
  color: #888; /* 기본 색상 */
}
</style>
