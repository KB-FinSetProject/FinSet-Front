<template>
    <HeaderNormal navbarTitle="관심목록" />
  
    <div class="wish">
      <div class="container">
        <h3>예적금</h3>
        <hr>
        <div v-for="(item, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="wish-item d-flex align-items-center mt-2">
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
          <div>
            <p class="mb-0">{{ item.title }}</p>
            <p class="mb-0 text-muted">{{ item.bank }}</p>
          </div>
          <i class="fa-solid fa-heart icon"></i>
        </div>

        <div class="text-center">
            <i @click="toggleVisibility('deposit')" class="fa-solid fa-caret-down"></i>
        </div>

        <div v-show="isMoreItemsVisible.deposit" class="mt-2">
          <div v-for="(item, index) in depositItems.slice(visibleItemsCount.deposit)" :key="'extra-' + index" class="wish-item d-flex align-items-center mt-2">
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
            <div>
              <p class="mb-0">{{ item.title }}</p>
              <p class="mb-0 text-muted">{{ item.bank }}</p>
            </div>
            <i class="fa-solid fa-heart icon"></i>
          </div>
        </div>
  
        <br>
  
        <h2>펀드</h2>
        <hr>
        <div v-for="(item, index) in fundItems.slice(0, visibleItemsCount.fund)" :key="index" class="wish-item d-flex align-items-center mt-2">
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
          <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
            <img :src="item.image" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
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
            title: 'NH 고향사랑 기부 예금',
            bank: 'NH 농협은행',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: 'NH 고향사랑 기부 예금',
            bank: 'NH 농협은행',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: 'NH 고향사랑 기부 예금',
            bank: 'NH 농협은행',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: 'NH 고향사랑 기부 예금',
            bank: 'NH 농협은행',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          },
          {
            title: 'NH 고향사랑 기부 예금',
            bank: 'NH 농협은행',
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800',
          }
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
    },
  };
  </script>
  
  <style scoped>
  .wish-item {
    
    border-radius: 5px; /* Rounded corners */
    padding: 10px; /* Padding around items */
    background-color: #f9f9f9; /* Light background */
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
    margin-left: 3.5rem;
}
  </style>
  

  <script setup>
  import HeaderNormal from '@/components/common/HeaderNormal.vue';
  </script>