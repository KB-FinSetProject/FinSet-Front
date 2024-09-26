<template>
    <HeaderNormal navbarTitle="적금 리스트" />
  
    <div class="container">
      <div class="options">
        <div class="option" @click="selectOption('전체')">
          전체
          <hr :class="{ active: selected === '전체' }" />
        </div>
        <div class="option" @click="selectOption('단리')">
          단리
          <hr :class="{ active: selected === '단리' }" />
        </div>
        <div class="option" @click="selectOption('복리')">
          복리
          <hr :class="{ active: selected === '복리' }" />
        </div>
      </div>
  
      <div v-if="selected === '전체'" class="product-list">
        <div v-for="(item, index) in allProducts" :key="index" class="product-card">
          <img :src="item.image" alt="상품 이미지" class="product-image" />
          <div class="product-info">
            <h5>{{ item.title }}</h5>
            <p>{{ item.bank }}</p>
            <p style="background-color: #EDF1F8; color: gray; border-radius: 5px; padding: 2px 7px; display: inline-block;">{{ item.type }}</p>
          </div>
          <div class="product-rate">
            <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
            <p6>기본 {{ item.normal }} % </p6>
            <p style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁ</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>
        <hr class="product-separator" style="width: 600px;"/>
      </div>

      <!-- 단리 상품 리스트 표시 -->
      <div v-if="selected === '단리'" class="product-list">
        <div v-for="(item, index) in simpleInterestProducts" :key="index" class="product-card">
          <img :src="item.image" alt="상품 이미지" class="product-image" />
          <div class="product-info">
            <h5>{{ item.title }}</h5>
            <p>{{ item.bank }}</p>
          </div>
          <div class="product-rate">
            <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
            <p6>기본 {{ item.normal }} % </p6>
            <p style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁ</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>
        <hr class="product-separator" style="width: 600px;"/>
      </div>

      <div v-if="selected === '복리'" class="product-list">
        <div v-for="(item, index) in compoundInterestProducts" :key="index" class="product-card">
          <img :src="item.image" alt="상품 이미지" class="product-image" />
          <div class="product-info">
            <h5>{{ item.title }}</h5>
            <p>{{ item.bank }}</p>
          </div>
          <div class="product-rate">
            <h5 style="color: #FFBB00;">최고 {{ item.max }} % </h5>
            <p6>기본 {{ item.normal }} % </p6>
            <p style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁ</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>
        <hr class="product-separator" style="width: 600px;"/>
      </div>

    </div>
  </template>
  
  <script setup>
  import HeaderNormal from '@/components/common/HeaderNormal.vue';
  import { ref } from 'vue';
  
  // 선택된 옵션을 관리
  const selected = ref('전체');
  
  // 상품 데이터
  const allProducts = ref([
    {
      title: 'NH 고향사랑 기부 예금',
      bank: 'NH 농협은행',
      type: '단리',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 고향사랑 기부 예금',
      bank: 'NH 농협은행',
      type: '단리',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 고향사랑 기부 예금',
      bank: 'NH 농협은행',
      type: '단리',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 고향사랑 기부 예금',
      bank: 'NH 농협은행',
      type: '단리',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
  ]);
  
  const simpleInterestProducts = ref([
    {
      title: 'NH 단리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 단리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 단리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 단리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    // 추가 단리 상품 데이터...
  ]);
  
  const compoundInterestProducts = ref([
    {
      title: 'NH 복리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 복리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 복리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    {
      title: 'NH 복리 예금 상품',
      bank: 'NH 농협은행',
      max : '3.75',
      normal : '3.00',
      image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
    },
    // 추가 복리 상품 데이터...
  ]);
  
  // 옵션 선택 함수
  const selectOption = (option) => {
    selected.value = option;
  };
  </script>
  
  <style scoped>
.container {
  margin-bottom: 150px; /* 패딩 증가 */
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px; /* 하단 여백 증가 */
}

.option {
  flex: 1; /* 각 옵션을 균등하게 나눔 */
  text-align: center;
  cursor: pointer;
  position: relative; /* 선의 위치 조정을 위해 relative로 설정 */
  font-size: 1.5em; /* 글자 크기 증가 */
}

hr {
  border: none;
  height: 3px; /* 선의 두께 증가 */
  background-color: gray; /* 기본 선 색상 */
  transition: background-color 0.3s ease; /* 색상 변화에 애니메이션 효과 */
  width: 200px;
}

.active {
  background-color: black; /* 활성화된 옵션의 선 색상 */
}

.option hr {
  margin: 0; /* hr의 기본 마진 제거 */
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 카드 간격 */
}

.product-card {
  display: flex;

  border-radius: 8px;
  padding: 10px;
  align-items: center; /* 아이콘을 중앙 정렬하기 위해 추가 */
}

.product-image {
  width: 100px; /* 이미지 크기 조정 */
  height: 100px; /* 이미지 크기 조정 */
  border-radius: 50%; /* 원형으로 만들기 */
}

.product-info {
  margin-left: 10px; /* 텍스트와 이미지 간 간격 */
  flex-grow: 1; /* 여유 공간 차지 */
}

.product-rate {
  margin-left: 20px; /* product-info와의 간격 */
  display: flex;
  flex-direction: column;
}

.icon {
  margin-left: 20px; /* 아이콘과의 간격 */
  display: flex;
  align-items: center; /* 아이콘 수직 중앙 정렬 */
  color: #FFBB00;
  font-size: 2rem;
}

.product-separator {
    border: none;
    height: 1px; /* 선의 두께 */
    background-color: lightgray; /* 선 색상 */
    margin: 10px 0; /* 위아래 마진 */
  }
</style>