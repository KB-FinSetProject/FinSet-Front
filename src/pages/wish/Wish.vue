<template>
  <div class="wish">
    <div class="container">
      <h3 style="width:300px">예금</h3>
      <hr>

      <div v-for="(deposit, index) in depositItems.slice(0, visibleItemsCount.deposit)" :key="index" class="deposit-header">
        <div class="deposit-info d-flex align-items-center">
          <img :src="getImg(deposit.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
          <div class="detail">
            <p class="deposit-name" @click="goToDepositDetail(deposit)">{{ deposit.depositName }}</p>
            <p class="deposit-details">{{ deposit.depositBank }}</p>
            <div class="risk-info">
              <span class="deposit-high-rating">{{ deposit.depositCategory }}</span>
            </div>
          </div>
        </div>

        <div class="icon" @click="deleteDeposit(deposit)" style="margin-left: 40px;">
          <i :class="deposit.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: deposit.favorite ? '#FAB809' : '#888' }"></i>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('deposit')" class="fa-solid" :class="isMoreItemsVisible.deposit ? 'fa-caret-up' : 'fa-caret-down'"></i>
      </div>

      <h3 style="width:300px">적금</h3>
      <hr>


      <div v-for="(installment, index) in installmentItems.slice(0, visibleItemsCount.installment)" :key="index" class="installment-header">
        <div class="installment-info d-flex align-items-center">
          <img :src="getImg(installment.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
          <div class="detail">
            <p class="installment-name" @click="goToInstallmentDetail(installment)">{{ installment.installmentName }}</p>
            <p class="installment-details">{{ installment.installmentBank }}</p>
            <div class="risk-info">
              <span class="installment-high-rating">{{ installment.installmentCategory }}</span>
            </div>
          </div>
        </div>
      
        <div class="icon" @click="deleteInstallment(installment)" style="margin-left: 40px;">
          <i :class="installment.favorite ? 'fas fa-heart' : 'far fa-heart'"
             :style="{ color: installment.favorite ? '#FAB809' : '#888' }"></i>
        </div>
      </div>
      
      <div class="text-center">
        <i @click="toggleVisibility('installment')" class="fa-solid" :class="isMoreItemsVisible.installment ? 'fa-caret-up' : 'fa-caret-down'"></i>
      </div>

      <h3 style="width:300px">펀드</h3>
      <hr>

      <div v-for="(fund, index) in fundItems.slice(0, visibleItemsCount.fund)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="fund-header">
          <div class="fund-info d-flex align-items-center">
            <img :src="getImg(fund.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            <div class="detail">
              <router-link :to="`/fund/detail/${fund.fno}`" class="fund-name">{{ fund.fundName }}</router-link>
              <div class="risk-info">
                <span class="fund-high-rating">{{ fund.fundLisk }}</span>
                <span class="fund-type">{{ fund.fundType }}</span>
              </div>
            </div>
          </div>
          <div class="icon" @click="deleteFund(fund)">
            <i :class="fund.favorite ? 'fas fa-heart' : 'far fa-heart'"
               :style="{ color: fund.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>
      
      <div class="text-center">
        <i @click="toggleVisibility('fund')" class="fa-solid" :class="isMoreItemsVisible.fund ? 'fa-caret-up' : 'fa-caret-down'"></i>
      </div>

      <h2>주식</h2>
      <hr>
      <div v-for="(stock, index) in stockItems.slice(0, visibleItemsCount.stock)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="stock-header">
          <div class="stock-info d-flex align-items-center">
            <img :src="getImg(stock.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            
            <div class="stock-detail">
              <router-link :to="{ name: 'stockChart', params: { sno: stock.sno } }"  class="stock-name">{{ stock.stockName }}</router-link>
              <p class="stock-details">{{ stock.stockPrice }} 
                <span class="change" :style="{ color: getColor(stock.priceChangeRate) }">{{ stock.priceChangeRate }}</span>
              </p>
            </div>
          </div>

          <div class="stock-icon" @click="deleteStock(stock)">
            <i :class="stock.favorite ? 'fas fa-heart' : 'far fa-heart'"
              :style="{ color: stock.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('stock')" class="fa-solid" :class="isMoreItemsVisible.stock ? 'fa-caret-up' : 'fa-caret-down'"></i>
      </div>

      

      <h2>외환</h2>
      <hr>
      <div v-for="(forex, index) in forexItems.slice(0, visibleItemsCount.forex)" :key="index" class="wish-item d-flex align-items-center mt-2">
        <div class="forex-header">
          <div class="forex-info d-flex align-items-center">
            <img :src="getImg(forex.imgUrl)" alt="Thumbnail" class="rounded-circle me-3" style="width: 36px; height: 36px; object-fit: cover;">
            
            <div class="forex-detail">
              <router-link :to="{ path: '/exchange/detail', query: { feno: forex.feno } }" class="no-underline" style="text-decoration: none; color:black">
                {{ forex.forexName }}
              </router-link>
              <p class="forex-details">{{ forex.forexBasicRate }} </p>
            </div>
          </div>

          <div class="forex-icon" @click="deleteForex(forex)">
            <i :class="forex.favorite ? 'fas fa-heart' : 'far fa-heart'"
              :style="{ color: forex.favorite ? '#FAB809' : '#888' }"></i>
          </div>
        </div>
      </div>

      <div class="text-center">
        <i @click="toggleVisibility('forex')" class="fa-solid" :class="isMoreItemsVisible.forex ? 'fa-caret-up' : 'fa-caret-down'"></i>
      </div>


      

      
    </div>
  </div>
</template>

<script>
// wishApi.js를 가져옵니다.
import wishApi from '@/api/wishApi'; 

export default {
  name: 'WishComponent',
  data() {
    return {
      depositItems: [], // 예금 상품 목록
      installmentItems: [],
      fundItems: [],
      stockItems: [],
      forexItems: [],
      visibleItemsCount: {
        deposit: 3, // 처음에 보일 예금 상품 개수
        installment:3,
        fund:3,
        stock:3,
        forex:3,
      },
      isMoreItemsVisible: {
        deposit: false, // 예금 상품 더 보기 상태
        installment:false,
        fund:false,
        stock:false,
        forex:false,
      },
      uno: null, // 사용자 식별 번호
    };
  },

  // Vue 컴포넌트의 라이프사이클 훅
  mounted() {
    this.logAllWishes(); // 컴포넌트가 마운트될 때 전체 관심 목록을 로그에 출력
  },

  methods: {
    // 관심 목록을 가져와 로그에 출력하는 함수
    async logAllWishes() {
      try {
        // LocalStorage에서 uno 값 가져오기
        const authData = JSON.parse(localStorage.getItem('auth')); // 로컬 스토리지에서 auth 데이터 가져오기
        this.uno = authData.uno; // uno 값 가져오기
        console.log('UNO:', this.uno); // uno 값 확인
        
        // 전체 관심 목록 API 호출
        const wishes = await wishApi.fetchAllWishes();
        console.log("전체 관심 목록:", wishes); // 콘솔에 전체 데이터를 출력

        // tno가 1인 상품의 pno를 활용하여 예금 상품 정보 가져오기
        const depositWishes = wishes.filter(wish => wish.tno === 1); // tno가 1인 모든 항목 찾기

        // 각 depositWish에 대해 API 호출하여 예금 정보 가져오기
        for (const depositWish of depositWishes) {
          const depositInfo = await wishApi.fetchDepositById(depositWish.pno); // pno를 사용하여 예금 정보 가져오기
          this.depositItems.push(depositInfo); // 예금 상품 정보를 배열에 추가
          depositInfo.favorite = true;
          console.log("예금 상품 정보:", depositInfo);
        }

        if (this.depositItems.length === 0) {
          console.log("tno가 1인 예금 상품이 없습니다.");
        }

        // tno가 2인 상품의 pno를 활용하여 적금 상품 정보 가져오기
        const installmentWishes = wishes.filter(wish => wish.tno === 2); // tno가 1인 모든 항목 찾기

        // 각 depositWish에 대해 API 호출하여 예금 정보 가져오기
        for (const installmentWishe of installmentWishes) {
          const installmentInfo = await wishApi.fetchInstallmentById(installmentWishe.pno); // pno를 사용하여 예금 정보 가져오기
          this.installmentItems.push(installmentInfo); // 예금 상품 정보를 배열에 추가
          installmentInfo.favorite = true;
          console.log("적금 상품 정보:", installmentInfo);
        }

        if (this.installmentItems.length === 0) {
          console.log("tno가 2인 예금 상품이 없습니다.");
        }

        // tno가 3인 상품의 pno를 활용하여 펀드 상품 정보 가져오기
        const fundWishes = wishes.filter(wish => wish.tno === 3); // tno가 1인 모든 항목 찾기

        // 각 depositWish에 대해 API 호출하여 예금 정보 가져오기
        for (const fundWishe of fundWishes) {
          const fundInfo = await wishApi.fetchFundById(fundWishe.pno); // pno를 사용하여 예금 정보 가져오기
          this.fundItems.push(fundInfo); // 예금 상품 정보를 배열에 추가
          fundInfo.favorite = true;
          console.log("펀드 상품 정보:", fundInfo);
        }

        if (this.fundItems.length === 0) {
          console.log("tno가 3인 펀드 상품이 없습니다.");
        }

        // tno가 4인 상품의 pno를 활용하여 주식 상품 정보 가져오기
        const stockWishes = wishes.filter(wish => wish.tno === 4); // tno가 1인 모든 항목 찾기

        // 각 depositWish에 대해 API 호출하여 예금 정보 가져오기
        for (const stockWishe of stockWishes) {
          const stockInfo = await wishApi.fetchStockById(stockWishe.pno); // pno를 사용하여 예금 정보 가져오기
          this.stockItems.push(stockInfo); // 예금 상품 정보를 배열에 추가
          stockInfo.favorite = true;
          console.log("주식 상품 정보:", stockInfo);
        }

        if (this.stockItems.length === 0) {
          console.log("tno가 4인 주식 상품이 없습니다.");
        }

        // tno가 5인 상품의 pno를 활용하여 외환 상품 정보 가져오기
        const forexWishes = wishes.filter(wish => wish.tno === 5); // tno가 1인 모든 항목 찾기

        // 각 depositWish에 대해 API 호출하여 예금 정보 가져오기
        for (const forexWishe of forexWishes) {
          const forexInfo = await wishApi.fetchForexById(forexWishe.pno); // pno를 사용하여 예금 정보 가져오기
          this.forexItems.push(forexInfo); // 예금 상품 정보를 배열에 추가
          forexInfo.favorite = true;
          console.log("외환 상품 정보:", forexInfo);
        }

        if (this.forexItems.length === 0) {
          console.log("tno가 5인 외환 상품이 없습니다.");
        }

      } catch (error) {
        console.error("관심 목록을 가져오는 도중 오류가 발생했습니다:", error);
      }
    },

    toggleVisibility(category) {
      this.isMoreItemsVisible[category] = !this.isMoreItemsVisible[category];
      this.visibleItemsCount[category] = this.isMoreItemsVisible[category] ? this.depositItems.length : 3; // 모든 항목을 표시
    },

    async deleteDeposit(item) {
      console.log("Deleting deposit:", item.dno);
      // 현재 사용자의 유저 인덱스와 pno 값을 포함한 wish 객체 생성
      const wish = {
        tno: 1, // 예금 상품 타입 (예: 1)
        uno: this.uno, // 현재 로그인한 사용자의 유저 인덱스
        pno: item.dno // 삭제할 상품의 pno
      };

      // 즐겨찾기 상태 변경
      item.favorite = !item.favorite;

      // 즐겨찾기가 해제된 경우, deleteWish 호출
      if (!item.favorite) {
        try {
          const response = await wishApi.deleteWish(wish); // API 호출
          console.log(response); // 서버 응답 확인

          // 콘솔로 남은 데이터 확인
          console.log(this.depositItems);
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      }
    },

    async deleteInstallment(item) {
      console.log("Deleting installment:", item.ino);
      // 현재 사용자의 유저 인덱스와 pno 값을 포함한 wish 객체 생성
      const wish = {
        tno: 2, // 예금 상품 타입 (예: 1)
        uno: this.uno, // 현재 로그인한 사용자의 유저 인덱스
        pno: item.ino // 삭제할 상품의 pno
      };

      // 즐겨찾기 상태 변경
      item.favorite = !item.favorite;

      // 즐겨찾기가 해제된 경우, deleteWish 호출
      if (!item.favorite) {
        try {
          const response = await wishApi.deleteWish(wish); // API 호출
          console.log(response); // 서버 응답 확인

          // 콘솔로 남은 데이터 확인
          console.log(this.installmentItems);
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      }
    },

    async deleteFund(item) {
      console.log("Deleting fund:", item.fno);
      // 현재 사용자의 유저 인덱스와 pno 값을 포함한 wish 객체 생성
      const wish = {
        tno: 3, // 예금 상품 타입 (예: 1)
        uno: this.uno, // 현재 로그인한 사용자의 유저 인덱스
        pno: item.fno // 삭제할 상품의 pno
      };

      // 즐겨찾기 상태 변경
      item.favorite = !item.favorite;

      // 즐겨찾기가 해제된 경우, deleteWish 호출
      if (!item.favorite) {
        try {
          const response = await wishApi.deleteWish(wish); // API 호출
          console.log(response); // 서버 응답 확인

          // 콘솔로 남은 데이터 확인
          console.log(this.fundItems);
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      }
    },

    async deleteStock(item) {
      console.log("Deleting stock:", item.sno);
      // 현재 사용자의 유저 인덱스와 pno 값을 포함한 wish 객체 생성
      const wish = {
        tno: 4, // 예금 상품 타입 (예: 1)
        uno: this.uno, // 현재 로그인한 사용자의 유저 인덱스
        pno: item.sno // 삭제할 상품의 pno
      };

      // 즐겨찾기 상태 변경
      item.favorite = !item.favorite;

      // 즐겨찾기가 해제된 경우, deleteWish 호출
      if (!item.favorite) {
        try {
          const response = await wishApi.deleteWish(wish); // API 호출
          console.log(response); // 서버 응답 확인

          // 콘솔로 남은 데이터 확인
          console.log(this.stockItems);
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      }
    },

    async deleteForex(item) {
      console.log("Deleting forex:", item.feno);
      console.log("Deleting forex:", this.uno);
      // 현재 사용자의 유저 인덱스와 pno 값을 포함한 wish 객체 생성
      const wish = {
        tno: 5, // 예금 상품 타입 (예: 1)
        uno: this.uno, // 현재 로그인한 사용자의 유저 인덱스
        pno: item.feno // 삭제할 상품의 pno
      };

      // 즐겨찾기 상태 변경
      item.favorite = !item.favorite;

      // 즐겨찾기가 해제된 경우, deleteWish 호출
      if (!item.favorite) {
        try {
          const response = await wishApi.deleteWish(wish); // API 호출
          console.log(response); // 서버 응답 확인

          // 콘솔로 남은 데이터 확인
          console.log(this.forexItems);
        } catch (error) {
          console.error("Error deleting wish:", error);
        }
      }
    },

    getColor(change) {
      return change > 0 ? '#FF6767' : change < 0 ? '#547BC1' : '#888888'; // 양수는 빨간색, 음수는 파란색, 0은 회색
    },

    getImg(imgUrl) {
      return imgUrl ? `src${imgUrl}` : ''; // 절대 URL로 수정
    },

    goToDepositDetail(deposit) {
    // 클릭한 예금의 dno를 저장하고 상세 페이지로 이동
    this.$router.push({ path: '/deposit/detail', query: { dno: deposit.dno } });
    },

    goToInstallmentDetail(installment) {
      this.$router.push({ path: `/installment/detail`, query: { ino: installment.ino } });
    },
  }
};
</script>







<style scoped>
/* 스타일을 필요에 따라 추가 */
</style>

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


.fa-caret-down {
  cursor: pointer;
  margin: 10px 0;
}

.wish {
  margin-top: 80px;
  margin-bottom: 130px;
  width: 370px;

}

.icon {
  color: #FFBF0A;
  font-size: 1.5rem;
  position: absolute;
  transform: translateX(1133%);
}


.icon { /* 클래스명 변경 */
  font-size: 24px;
  color: #888; /* 기본 색상 */
  margin-left: 30px;
}


.installment-header,
.deposit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.installment-info,
.deposit-info {
  position: relative;
  left: -20px;
}

.installment-details,
.deposit-details {
  margin-bottom: 0;
}

.installment-name,
.deposit-name {
  margin-bottom: 0;
  font-weight: bold;
}

.installment-high-rating,
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


.deposit-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
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



.info-box h4 {
  margin: 0;
  color: #FFFFFF; /* 텍스트 색상 */
}

.info-box p {
  margin: 5px 0 0; /* 제목과 내용 사이의 간격 */
  color: #FFFFFF; /* 텍스트 색상 */
}



.forex-header,
.stock-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: -20px;
}

.forex-info,
.stock-info {
  display: flex;
  align-items: center;
}



.forex-name,
.stock-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  text-decoration: none;
  color: black;
}

.forex-detail,
.stock-detail {
  margin-left: 10px;
}

.forex-details,
.stock-details {
  font-size: 14px;
  margin: 0;
}


.change {
  margin-left: 7px;
}


.forex-icon .fas ,
.stock-icon .fas {
  color: #FAB809; /* 하트 아이콘 노란색 */
}


.forex-icon ,
.stock-icon {
  position: absolute;
  transform: translateX(1338%);
  font-size: 24px;
}

.exchangedetail{
  color:black;
  text-decoration: none;
}
.rounded-circle{
  position: relative;
  left: 14px;
  border: 0.5px solid black;
}
</style>