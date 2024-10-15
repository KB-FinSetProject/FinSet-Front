<template>
  <HeaderNormal navbarTitle="적금 상세" />

  <div class="container">
    <div class="wish-item d-flex align-items-center mt-2">
      <div style="width: 300px;">
        <h5 class="mb-0">{{ installment.installmentName }}</h5> <!-- 예금 이름 -->
        <p class="mb-0 text-muted">{{ installment.installmentBank }}</p> <!-- 은행 이름 -->
      </div>
      <div class="installment-icon" @click="toggleFavorite(installment)">
        <i :class="installment.favorite ? 'fas fa-heart' : 'far fa-heart'"
           :style="{ color: installment.favorite ? '#FAB809' : '#888' }"></i>
      </div>
    </div>
      <img :src="installment.imgUrl" alt="Thumbnail" class="rounded-circle me-3 thumbnail">



    <div class="join-info d-flex mt-2">
      <p class="join-text join-bg">방문없이 가입</p>
      <p class="join-text join-bg">누구나 가입</p>
    </div>

    <div class="details mt-3">
      <div class="rate-info">
        <div>
          <span>최고</span>
          <br />
          <span class="rate-highlight">연 {{ installment.installmentMaxRate }}%</span> <!-- 최고 금리 -->
        </div>

        <div class="separator"></div>

        <div>
          <span>기본</span>
          <br />
          <span class="rate-highlight">연 {{ installment.installmentNormalRate }}%</span> <!-- 기본 금리 -->
          <span class="small-text" style="color: #838687;">(12개월, 세전)</span>
        </div>
      </div>

      <div class="centered-info">
        <h5>상품 안내</h5>
        <hr style="height: 4px;" />
      </div>

      <div class="fixed-info">
        <div class="info-item">
          <span class="info-label">기간</span>
          <span>{{ installment.installmentJoin }}</span> <!-- 가입 기간 -->
        </div>
        <div class="info-item">
          <span class="info-label">금액</span>
          <span>{{ Number(installment.installmentAmount).toLocaleString() }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">가입 방법</span>
          <span>{{ installment.installmentWay }}</span> <!-- 가입 방법 -->
        </div>
        <div class="info-item">
          <span class="info-label">대상</span>
          <span>{{ installment.installmentTarget }}</span> <!-- 대상 -->
        </div>
      </div>
    </div>

    <div class="button-container">
      <a :href="installment.installmentLink" target="_blank" rel="noopener noreferrer" class="join-button">지금 바로 가입하기</a> <!-- 가입 링크 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import installmentApi from '@/api/installmentApi'; // 예금 API 가져오기
import wishApi from '@/api/wishApi'; // 즐겨찾기 API 가져오기
import HeaderNormal from '@/components/common/HeaderNormal.vue';

// 데이터 정의
const route = useRoute();
const installment = ref({}); // 예금 정보 초기화
const wishes = ref([]); // 관심 목록 초기화
const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
const uno = authData?.uno; // uno 값 가져오기

// 예금 상세 정보 가져오기
onMounted(async () => {
  const ino = route.query.ino; // 쿼리에서 ino 가져오기
  console.log('ino:', ino); // ino 값을 로그로 출력
  if (ino) {
    installment.value = await installmentApi.fetchInstallmentById(ino); // 예금 정보 가져오기

    // 사용자 관심 목록 불러오기
    try {
      wishes.value = await wishApi.fetchAllWishes(); // 관심 목록 전체 조회
    } catch (error) {
      console.warn("No wishes found or error fetching wishes:", error); // 관심 목록이 없을 경우 로그 출력
      wishes.value = []; // 관심 목록이 없으면 빈 배열로 처리
    }

    // 관심 목록에서 tno가 2인 상품의 pno를 사용해 deposit.favorite 설정
    const favoritePnos = wishes.value
        .filter(wish => wish.tno === 2)
        .map(wish => wish.pno);

    installment.value.favorite = favoritePnos.includes(installment.value.ino);
  }
});

// 즐겨찾기 상태 토글 함수
async function toggleFavorite(installment) {
  try {
    installment.favorite = !installment.favorite; // favorite 상태 토글

    // API 호출하여 즐겨찾기 추가/삭제 처리
    if (installment.favorite) {
      await wishApi.addWish({tno: 2, uno: uno, pno: installment.ino}); // tno와 pno 추가
    } else {
      await wishApi.deleteWish({tno: 2, uno: uno, pno: installment.ino}); // tno와 pno 삭제
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    installment.favorite = !installment.favorite; // 원래 상태로 복구
  }
}
</script>

<style scoped>
.container {
  position: relative;
  bottom: 85px;
  margin-top: -30px;
}

.details {
  margin-top: 20px;
}

.thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  position: absolute;
  transform: translateX(450%);
}

.join-info {
  display: flex;
  margin-top: 10px;
}
.installment-icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888;
  padding-left: -50px;/* 기본 색상 */
}

.installment-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}
.join-text {
  color: #9E9E9E;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 9px;
}

.join-bg {
  background-color: #F7F7F7;
  margin-right: 5px;
}

.rate-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  right: 18px;
}

.rate-highlight {
  font-size: 20px;
  color: #FFBB00;
  font-weight: bold;
}

.separator {
  width: 1px;
  background-color: #838687;
  height: 40px;
  margin: 0 15px;
}

.small-text {
  font-size: 12px;
  margin-left: 10px;
}

.centered-info {
  text-align: center;
  margin-top: 20px;
  position: relative;
  top: 35px;
}

.fixed-info {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
  top: 50px;
}

.info-item {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.info-label {
  margin-right: 10px;
  color: #838687;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.join-button {
  background-color: #FFBB00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 3px 30px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.join-button:hover {
  background-color: #e6a600;
}

h5, p {
  position: relative;
  right: 20px;
  font-weight: bold;
  padding: 5px;
}

img {
  position: relative;
  left: 50px;
}
</style>