<template>
  <HeaderNormal navbarTitle="관심목록" />

  <div class="wish">
    <div class="container">
      <h3 style="width:300px">예적금</h3>
      <hr>

      <div v-for="(deposit, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="deposit-header">
        <div class="deposit-info d-flex align-items-center">
          <div class="bank-logo" :style="{ backgroundColor: deposit.logoColor }">
            <span class="bank-icon">{{ deposit.logo }}</span>
          </div>
          <div>
            <p class="deposit-name">{{ deposit.name }}</p>
            <p class="deposit-details">{{ deposit.details }}</p>
            <div class="risk-info">
              <span class="deposit-high-rating">{{ deposit.sort }}</span>
            </div>
          </div>
        </div>


        <div class="icon" @click="toggleFavorite(deposit)" style="margin-left: 40px;">

        <div class="deposit-icon" @click="toggleFavorite(deposit)">

          <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('deposit')" class="fa-solid fa-caret-down"></i>
      </div>

      <div v-show="isMoreItemsVisible.deposit" class="mt-2">
        <div v-for="(deposit, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="deposit-header">
          <div class="deposit-info d-flex align-items-center">
            <div class="bank-logo" :style="{ backgroundColor: deposit.logoColor }">
              <span class="bank-icon">{{ deposit.logo }}</span>
            </div>
            <div>
              <p class="deposit-name">{{ deposit.name }}</p>
              <p class="deposit-details">{{ deposit.details }}</p>
              <div class="risk-info">
                <span class="deposit-high-rating">{{ deposit.sort }}</span>
              </div>
            </div>
          </div>
  
          <div class="icon" @click="toggleFavorite(deposit)">
            <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <br>

      <h2>펀드</h2>
      <hr>
      <div v-for="(fund, index) in fundItems.slice(0, visibleItemsCount.fund)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <img :src="fund.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            <div class="detail">
              <router-link :to="`/fund/detail`" class="fund-name">{{ fund.name }}<br>{{fund.description}}</router-link>
              <div class="risk-info">
                <span class="fund-high-rating">{{ fund.danger }}</span>
                <span class="fund-type">{{ fund.type }}</span>
              </div>
            </div>

          </div>
          <div class="icon" @click="toggleFavorite(fund)">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('fund')" class="fa-solid fa-caret-down"></i>
      </div>

      <div v-show="isMoreItemsVisible.fund" class="mt-2">
        <div v-for="(fund, index) in fundItems.slice(visibleItemsCount.fund)" :key="'extra-fund-' + index" class="wish-item d-flex align-items-center mt-2">
          <div class="fund-header">
            <div class="fund-info d-flex align-items-center">
              <img :src="fund.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
              <div class="detail">
                <router-link :to="`/fund/detail`" class="fund-name">{{ fund.name }}<br>{{fund.description}}</router-link>
                <div class="risk-info">
                  <span class="fund-high-rating">{{ fund.danger }}</span>
                  <span class="fund-type">{{ fund.type }}</span>
                </div>
              </div>
  
            </div>
            <div class="icon" @click="toggleFavorite(fund)">
              <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'"
                 :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
            </div>
          </div>
        </div>
      </div>

      <br>

      <h2>주식</h2>
      <hr>
      <div v-for="(stock, index) in stockItems.slice(0, visibleItemsCount.stock)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <img :src="stock.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            
            <div class="stock-detail">
              <router-link :to="`/stock/chart`" class="stock-name">{{ stock.name }}</router-link>
              <p class="stock-details">{{ stock.price }} 
                <span class="change" :style="{ color: getColor(stock.change) }">{{ stock.change }}</span>
              </p>
            </div>
          </div>

          <div class="icon" @click="toggleFavorite(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('stock')" class="fa-solid fa-caret-down"></i>
      </div>

      <div v-show="isMoreItemsVisible.stock" class="mt-2">
        <div v-for="(stock, index) in stockItems.slice(visibleItemsCount.stock)" :key="'extra-stock-' + index" class="wish-item d-flex align-items-center mt-2">
          <div class="stock-header">
            <div class="stock-info d-flex align-items-center">
              <img :src="stock.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
              
              <div class="stock-detail">
                <router-link :to="`/stock/chart`" class="stock-name">{{ stock.name }}</router-link>
                <p class="stock-details">{{ stock.price }} 
                  <span class="change" :style="{ color: getColor(stock.change) }">{{ stock.change }}</span>
                </p>
              </div>
            </div>
  
            <div class="stock-icon" @click="toggleFavorite(stock)">
              <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
                 :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
            </div>
          </div>
        </div>
      </div>

      <br>

      <h2>외환</h2>
      <hr>
      <div v-for="(forex, index) in forexItems.slice(0, visibleItemsCount.forex)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="forex-header">
          <div class="forex-info d-flex align-items-center">
            <img :src="forex.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            
            <div class="forex-detail">
              <router-link :to="`/forex/chart`" class="forex-name">{{ forex.name }}</router-link>
              <p class="forex-details">{{ forex.value }} </p>
            </div>
          </div>

          <div class="icon" @click="toggleFavorite(forex)">
            <i :class="forex.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: forex.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('forex')" class="fa-solid fa-caret-down"></i>
      </div>

      <div v-show="isMoreItemsVisible.forex" class="mt-2">
        <div v-for="(forex, index) in forexItems.slice(visibleItemsCount.forex)" :key="'extra-forex-' + index" class="wish-item d-flex align-items-center mt-2">
          <div class="forex-header">
            <div class="forex-info d-flex align-items-center">
              <img :src="forex.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
              
              <div class="forex-detail">
                <router-link :to="`/forex/chart`" class="forex-name">{{ forex.name }}</router-link>
                <p class="forex-details">{{ forex.value }} </p>
              </div>
            </div>
  
            <div class="icon" @click="toggleFavorite(forex)">
              <i :class="forex.favorite ? 'fas fa-heart' : 'far fa-heart'"
                 :style="{ color: forex.favorite ? '#FAB809' : '#888' }"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNormal from '@/components/common/HeaderNormal.vue';

export default {
  components: {
    HeaderNormal
  },
  data() {
    return {
      isMoreItemsVisible: {
        deposit: false,
        fund: false,
        stock: false,
        forex: false,
      },
      visibleItemsCount: {
        deposit: 3,
        fund: 3,
        stock: 3,
        forex: 3,
      },
      depositItems: [
        {
          logo: 'NH', // 은행 로고 코드
          logoColor: '#0055A6', // 로고 배경 색상
          name: 'NH 고향 사랑 기부예금', // 예금 이름
          details: 'NH 농협은행', // 세부 정보
          sort: '단리', // 예금 종류
          max: 3.75, // 최고 이율
          basic: 3.00, // 기본 이율
          favorite: false,
        },
        {
          logo: 'NH',
          logoColor: '#0055A6',
          name: 'NH 고향 사랑 기부예금',
          details: 'NH 농협은행',
          sort: '복리',
          max: 3.75,
          basic: 3.00,
          favorite: false,
        },
        {
          logo: 'NH',
          logoColor: '#0055A6',
          name: 'NH 고향 사랑 기부예금',
          details: 'NH 농협은행',
          sort: '단리',
          max: 3.75,
          basic: 3.00,
          favorite: false,
        },
        // Add more items...
      ],
      fundItems: [
        {
          name: '미래에셋인도중소형포커스증권자',
          description: '투자신탁1(주식)종류C-e',
          danger: '높은위험',
          type:'해외주식형',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        {
          name: '미래에셋인도중소형포커스증권자',
          description: '투자신탁1(주식)종류C-e',
          danger: '높은위험',
          type:'해외주식형',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        // Add more items...
      ],
      stockItems: [
        {
          name: '삼성전자',
          price: '67,500원',
          change: '+2.0',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        {
          name: '삼성전자',
          price: '67,500원',
          change: '-2.0',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        // Add more items...
      ],
      forexItems: [
        {
          name: '미국달러(USD)',
          value: '1,344.50',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        {
          name: '미국달러(USD)',
          value: '1,344.50',
          image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          favorite: false, // 추가: favorite 속성
        },
        // Add more items...
      ],
    };
  },
  computed: {
    filteredStocks() {
      if (this.activeTab === 'gain') {
        return this.stocks.filter(stock => stock.change.includes('+'));
      } else if (this.activeTab === 'drop') {
        return this.stocks.filter(stock => stock.change.includes('-'));
      }
      return this.stocks; // 전체 주식을 보여줌
    },
  },
  methods: {
    toggleVisibility(category) {
      this.isMoreItemsVisible[category] = !this.isMoreItemsVisible[category];
    },
    toggleFavorite(item) {
      item.favorite = !item.favorite;
    },
    getColor(change) {
      return change.includes('+') ? '#FF6767' : '#547BC1'; // 양수는 빨간색, 음수는 파란색
    },
  },
};
</script>

<style scoped>
.bank-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  margin-right: 20px;
}
.wish-item {
  font-weight: bold;
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding around items */
}
.deposit-yield {
  text-align: right;
  flex-direction: column;
  display: flex;
  position: relative;
  right: 10px;
  align-items: flex-end;
}
.max {
  font-size: 22px;
  color: #F8A70C;
  margin-bottom: 0;
}
.basic {
  font-size: 15px;
  color: #7e7e7e;
}

.fa-caret-down {
  cursor: pointer;
  margin: 10px 0;
}

.wish {
  margin-top: 100px;
  margin-bottom: 150px;
}

.icon {
  color: #FFBF0A;
  font-size: 1.5rem;
  position: absolute;
  transform: translateX(1030%);
}

.deposit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.deposit-info {
  position: relative;
  left: -20px;
}
.deposit-details {
  margin-bottom: 0;
}
.deposit-name {
  margin-bottom: 0;
  font-weight: bold;
}
.deposit-high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
  margin-top: 0%;
}


.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.fund-info {
  display: flex;
  align-items: center; /* 수평 정렬을 위해 추가 */
  position: relative; /* position 추가 */
  left: -20px; /* 왼쪽으로 이동시키기 위한 값 */
}

.bank-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-left: 20px;
  position: relative;
  margin-right: 20px;
}

.fund-name {
  font-size: 16px;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
  position: relative;
  margin-right: 16px;
  margin-left: 0px;
}

.fund-details {
  font-size: 14px;
  margin: 0;
}

.deposit-yield { /* 클래스명 변경 */
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  right: 10px;
}

.icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888; /* 기본 색상 */
  margin-left: 30px;
}

.deposit-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd; /* 미니바 색상 회색으로 변경 */
  margin-top: 25px;
}

.basic {
  font-size: 15px;
  color: #7e7e7e;
}

.max {
  font-size: 22px;
  color: #DD0202;
  margin-bottom: 0;
  font-weight: bold;
}

.fund-high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
  margin-right: 5px;
}

.fund-type {
  background-color: #EDF1F8;
  color: #547BC1;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}

.risk-info {
  margin-bottom: 10px;
}

.detail{
  margin-left: 10px;
}

.info-box {
  background-color: #FAB809; /* 노란색 배경 */
  padding: 10px;
  border-radius: 0; /* 테두리 반경 없앰 */
  margin-bottom: 10px;
  text-align: center;
  height: 110px;
  position: relative;
  bottom: 8px;
  width: 390px;
  margin-left: -16px;
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

.forex-header,
.stock-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.forex-info,
.stock-info {
  display: flex;
  align-items: center;
}

.forex-info,
.stock-rank {
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
}

.forex-info,
.stock-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 10px;
  margin-right: 10px; /* 마진 추가 */
  margin-left: 5px;
}

.forex-info,
.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.forex-info,
.stock-detail {
  margin-left: 10px;
}

.forex-info,
.stock-details {
  font-size: 14px;
  margin: 0;
}


.change {
  margin-left: 7px;
}

.forex-info,
.stock-icon {
  font-size: 15px;
  color: #888; /* 기본 색상 */
  margin-right: 15px;
  margin-top: 10px;
}

.forex-info .fas ,
.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}

.mini-bar {
  height: 1px;
  width: 100%;
  background-color: #dddddd;
  margin-top: 10px;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 1px 8px 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}
</style>