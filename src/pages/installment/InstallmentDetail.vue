<template>
  <HeaderNormal navbarTitle="적금 상세" />

<div class="container">

  <div class="wish-item d-flex align-items-center mt-2">
    <div style="width: 300px;">
      <h5 class="mb-0">NH 고향사랑 기부 적금</h5>
      <p class="mb-0 text-muted">NH 농협은행</p>
    </div>
    <img
      src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800"
      alt="Thumbnail"
      class="rounded-circle me-3 thumbnail"
    />
  </div>

  <div class="join-info d-flex mt-2">
    <p class="join-text join-bg">방문없이 가입</p>
    <p class="join-text join-bg">누구나 가입</p>
  </div>


  <div class="details mt-3">
    <div class="rate-info">
      <div>
        <span>최고</span>
        <br />
        <span class="rate-highlight">연 {{ max }}%</span>
      </div>

      <div class="separator"></div>

      <div>
        <span>기본</span>
        <br />
        <span class="rate-highlight">연 {{ base }}%</span>
        <span class="small-text" style="color: #838687;">(12개월, 세전)</span>
      </div>
    </div>

    <div class="centered-info">
      <h5>상품 안내</h5>
      <hr style="height: 4px;">
    </div>
    
    <div class="fixed-info">
      <div class="info-item">
        <span class="info-label" style="margin-right: 80px;">기간</span>
        <span>{{ date }}</span>
      </div>
      <div class="info-item">
        <span class="info-label" style="margin-right: 80px;">금액</span>
        <span>{{ limit }}</span>
      </div>
      <div class="info-item">
        <span class="info-label" style="margin-right: 50px;">가입 방법</span>
        <span>{{ join }}</span>
      </div>
      <div class="info-item">
        <span class="info-label" style="margin-right: 80px;">대상</span>
        <span>{{ who }}</span>
      </div>
    </div>

  </div>

  <div class="button-container">
    <a href="당신이연결할링크" class="join-button">지금 바로 가입하기</a>
  </div>

</div>

</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';

// 데이터 정의
const max = '3.75';
const base = '3.00';
const date = '1년(12개월) 가능';
const limit = '1백만원 이상 가입 가능';
const join = '영업점 및 비대면';
const who = '개인';
</script>

<style scoped>
.container{
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
  display: flex; /* Flexbox 사용 */
  margin-top: 10px; /* 상단 여백 추가 */
}

.join-text {
  color: #9E9E9E; /* 글씨색 지정 */
  padding: 1px 4px; /* 패딩 추가 */
  border-radius: 3px; /* 모서리 둥글게 */
  font-size: 9px; /* 글씨 크기 조정 */
}

/* 각각의 배경색 지정 */
.join-bg {
  background-color: #F7F7F7; /* 배경색 지정 */
  margin-right: 5px; /* 간격 제거 */
}


.rate-info {
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 요소를 양쪽 끝에 배치 */
  width: 100%; /* 전체 너비 사용 */
  margin-bottom: 10px; /* 하단 여백 추가 */
  position: relative;
  right: 18px;
}

.rate-highlight {
  font-size: 20px; /* 글씨 크기 설정 */
  color: #FFBB00; /* 글씨 색상 설정 */
  font-weight: bold;
}

h7{
  color: #838687;
}

.separator {
  width: 1px; /* 선의 너비 */
  background-color: #838687; /* 선의 색상 */
  height: 40px; /* 선의 높이 */
  margin: 0 15px; /* 양쪽 간격 */
}

.small-text {
  font-size: 12px; /* 작게 설정하고 싶은 크기 */
  margin-left: 10px;
}

.centered-info {
  text-align: center; /* 중앙 정렬 */
  margin-top: 20px; /* 위쪽 여백 추가 */
  position: relative;
  top:35px;
}

.fixed-info {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
  top:50px;
}

.info-item {
  display: flex; /* flexbox 사용 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  margin-bottom: 10px; /* 각 항목 사이의 공백 조정 */
}

.info-label {
  margin-right: 10px; /* 레이블과 값 사이의 공백 */
  color: #838687;
}

.button-container {
  display: flex; /* flexbox 사용 */
  justify-content: center; /* 가로 중앙 정렬 */
  margin-top: 50px;
}

.join-button {
  background-color: #FFBB00; /* 버튼 배경색 */
  color: white; /* 글씨 색상 */
  border: none; /* 기본 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 3px 30px; /* 버튼 내부 여백 */
  font-size: 15px; /* 글씨 크기 */
  cursor: pointer; /* 마우스 포인터를 손가락으로 변경 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */
  text-decoration: none;
  position: relative;
  top:150px;
}

hr{
  width:100%;
}
.join-button:hover {
  background-color: #e6a600; /* 마우스 오버 시 배경색 변화 */
}
h5, p{
  position: relative;
  right: 20px;
  font-weight: bold;
  padding: 5px;
}
img{
  position: relative;
  left: 50px;
}

</style>