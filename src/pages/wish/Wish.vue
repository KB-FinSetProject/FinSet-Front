<template>
    <HeaderNormal navbarTitle="관심목록" />
  
    <div class="wish">
      <div class="container">
        <h3 style="width:300px">예적금</h3>
        <hr>

        <div v-for="(deposit, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <div class="bank-logo" :style="{ backgroundColor: deposit.logoColor }">
              <span class="bank-icon">{{ deposit.logo }}</span>
            </div>
            <div>
<!--              <router-link :to="`/deposit/detail`" class="fund-name">{{ deposit.name }}</router-link>-->
              <p class="fund-name">{{ deposit.name }}</p>
              <p class="fund-details">{{ deposit.details }}</p>
              <div class="risk-info">
                <span class="high-rating">{{ deposit.sort }}</span>
              </div>
            </div>
          </div>
          <div class="deposit-yield">
            <span class="max">최고 {{ deposit.max }}%</span>
            <span class="basic">기본 {{ deposit.basic }}%</span>
          </div>
          <div class="deposit-icon" @click="toggleFavorite(deposit)">
            <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
        <div class="text-center">
          <i @click="toggleVisibility('deposit')" class="fa-solid fa-caret-down"></i>
        </div>

        <div v-show="isMoreItemsVisible.deposit" class="mt-2">
          <div v-for="(deposit, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="fund-header">
            <div class="fund-info d-flex align-items-center">
              <div class="bank-logo" :style="{ backgroundColor: deposit.logoColor }">
                <span class="bank-icon">{{ deposit.logo }}</span>
              </div>
              <div>
                <!--              <router-link :to="`/deposit/detail`" class="fund-name">{{ deposit.name }}</router-link>-->
                <p class="fund-name">{{ deposit.name }}</p>
                <p class="fund-details">{{ deposit.details }}</p>
                <div class="risk-info">
                  <span class="high-rating">{{ deposit.sort }}</span>
                </div>
              </div>
            </div>
            <div class="deposit-yield">
              <span class="max">최고 {{ deposit.max }}%</span>
              <span class="basic">기본 {{ deposit.basic }}%</span>
            </div>
            <div class="deposit-icon" @click="toggleFavorite(deposit)">
              <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'" :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
            </div>
          </div>
        </div>

        <br>
  
        <h2>펀드</h2>
        <hr>
        <div v-for="(item, index) in fundItems.slice(0, visibleItemsCount.fund)" :key="index" class="wish-item d-flex align-items-center mt-2">
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
          <div>
            <p class="mb-0">{{ item.title }}</p>
            <p class="mb-0 text-muted">{{ item.description }}</p>
            <p class="mb-0 text-muted">{{ item.risk }}</p>
          </div>

          <i class="fa-solid fa-heart icon"></i>
        </div>

        <div class="text-center">
            <i @click="toggleVisibility('fund')" class="fa-solid fa-caret-down"></i>
        </div>
  
        <div v-show="isMoreItemsVisible.fund" class="mt-2">
          <div v-for="(item, index) in fundItems.slice(visibleItemsCount.fund)" :key="'extra-fund-' + index" class="wish-item d-flex align-items-center mt-2">
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
            <div>
              <p class="mb-0">{{ item.title }}</p>
              <p class="mb-0 text-muted">{{ item.description }}</p>
              <p class="mb-0 text-muted">{{ item.risk }}</p>
            </div>
            <i class="fa-solid fa-heart icon"></i>
          </div>
        </div>
  
        <br>
  
        <h2>주식</h2>
        <hr>
        <div v-for="(item, index) in stockItems.slice(0, visibleItemsCount.stock)" :key="index" class="wish-item d-flex align-items-center mt-2">
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
          <div>
            <p class="mb-0">{{ item.title }}</p>
            <p class="mb-0 text-muted">{{ item.price }} ~{{ item.rate }}%</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>

        <div class="text-center">
            <i @click="toggleVisibility('stock')" class="fa-solid fa-caret-down"></i>
        </div>
  
        <div v-show="isMoreItemsVisible.stock" class="mt-2">
          <div v-for="(item, index) in stockItems.slice(visibleItemsCount.stock)" :key="'extra-stock-' + index" class="wish-item d-flex align-items-center mt-2">
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
            <div>
              <p class="mb-0">{{ item.title }}</p>
              <p class="mb-0 text-muted">{{ item.price }} ~{{ item.rate }}%</p>
            </div>
            <i class="fa-solid fa-heart icon"></i>
          </div>
        </div>
  
        <br>
  
        <h2>외환</h2>
        <hr>
        <div v-for="(item, index) in forexItems.slice(0, visibleItemsCount.forex)" :key="index" class="wish-item d-flex align-items-center mt-2">
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
          <div>
            <p class="mb-0">{{ item.title }}</p>
            <p class="mb-0 text-muted">{{ item.value }}</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>

        <div class="text-center">
            <i @click="toggleVisibility('forex')" class="fa-solid fa-caret-down"></i>
        </div>
  
        <div v-show="isMoreItemsVisible.forex" class="mt-2">
          <div v-for="(item, index) in forexItems.slice(visibleItemsCount.forex)" :key="'extra-forex-' + index" class="wish-item d-flex align-items-center mt-2">
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 45px; height: 45px; object-fit: cover;">
            <div>
                <p class="mb-0">{{ item.title }}</p>
                <p class="mb-0 text-muted">{{ item.value }}</p>
            </div>
            <i class="fa-solid fa-heart icon"></i>
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
            logo: 'NH', // 은행 로고 코드
            logoColor: '#0055A6', // 로고 배경 색상
            name: 'NH 고향 사랑 기부예금', // 예금 이름
            details: 'NH 농협은행', // 세부 정보
            sort: '복리', // 예금 종류
            max: 3.75, // 최고 이율
            basic: 3.00, // 기본 이율
            favorite: false,
          },
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
          // Add more items...
        ],
        fundItems: [
          {
            title: '미래에셋인도중소형포커스증권자',
            description: '투자신탁1(주식)종류C-e',
            risk: '높은위험 해외주식형',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미래에셋인도중소형포커스증권자',
            description: '투자신탁1(주식)종류C-e',
            risk: '높은위험 해외주식형',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미래에셋인도중소형포커스증권자',
            description: '투자신탁1(주식)종류C-e',
            risk: '높은위험 해외주식형',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미래에셋인도중소형포커스증권자',
            description: '투자신탁1(주식)종류C-e',
            risk: '높은위험 해외주식형',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미래에셋인도중소형포커스증권자',
            description: '투자신탁1(주식)종류C-e',
            risk: '높은위험 해외주식형',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          }
          // Add more items...
        ],
        stockItems: [
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '삼성전자',
            price: '67,500원',
            rate: '2.0',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          }
          // Add more items...
        ],
        forexItems: [
          {
            title: '미국달러(USD)',
            value: '1,344.50',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미국달러(USD)',
            value: '1,344.50',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미국달러(USD)',
            value: '1,344.50',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미국달러(USD)',
            value: '1,344.50',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: '미국달러(USD)',
            value: '1,344.50',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          }
          // Add more items...
        ],
      };
    },
    methods: {
      toggleVisibility(category) {
        this.isMoreItemsVisible[category] = !this.isMoreItemsVisible[category];
      },
      toggleFavorite(deposit) {
        deposit.favorite = !deposit.favorite;
      },
    },
  };
  </script>
  
  <style scoped>
  .bank-logo{
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
    background-color: #f9f9f9; /* Light background */
  }
  .deposit-yield{
    text-align: right;
    flex-direction: column;
    display: flex;
    position: relative;
    right: 10px;
    align-items: flex-end;
  }
  .max{
    font-size: 22px;
    color: #F8A70C;
    margin-bottom: 0;
  }
.basic{
  font-size: 15px;
  color: #7e7e7e;
}

  .fa-caret-down {
    cursor: pointer;
    margin: 10px 0;
  }

  .wish{
    margin-top: 100px;
    margin-bottom: 150px;
  }

  .icon {
    color: #FFBF0A;
    font-size: 1.5rem;
    position: absolute; 
    transform: translateX(1100%);
}
  .fund-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .fund-info{
    position: relative;
    left: -20px;
  }
  .fund-details {
    margin-bottom: 0;
  }
  .fund-name{
    margin-bottom: 0;
    font-weight: bold;
  }
  .high-rating {
    background-color: #FDEBEA;
    color: #FF6767;
    padding: 3px 8px;
    font-size: 10px;
    border-radius: 6px;
  }
  </style>
  

  <script setup>
  import HeaderNormal from '@/components/common/HeaderNormal.vue';
  </script>