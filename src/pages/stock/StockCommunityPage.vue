<template>
  <div class="stock-detail">

    <div class="stock-header">
      <h1 class="stock-name">삼성전자</h1>
      <div class="stock-price-container">
        <span class="stock-price">67,500원</span>
        <i class="far fa-heart"></i>
      </div>
    </div>
    <div class="stock-container">
      <div class="titles-container">
        <router-link to="/stock-chart" class="title-with-divider">
          <h2 class="best-yield-title yield">차트</h2>
          <div class="yield-divider" :class="{ active: activeTab === 'yield' }"></div>
        </router-link>

        <router-link to="/stock-detail" class="title-with-divider" @click.native="setActiveTab('saving')">
          <h2 class="best-yield-title sales">종목정보</h2>
          <div class="sales-divider" :class="{ active: activeTab === 'sales' }"></div>
        </router-link>

     <div class="title-with-divider">
          <h2 class="best-yield-title savings">커뮤니티</h2>
          <div class="savings-divider" :class="{ active: activeTab === 'savings' }"></div>
      </div>
      </div>
      </div>
    <!-- 탭 -->
<!--    <div class="tabs-container">-->
<!--      <div class="tab" :class="{ active: activeTab === 'chart' }" @click="setActiveTab('chart')">차트</div>-->
<!--      <div class="tab" :class="{ active: activeTab === 'info' }" @click="setActiveTab('info')">종목정보</div>-->
<!--      <div class="tab" :class="{ active: activeTab === 'community' }" @click="setActiveTab('community')">커뮤니티</div>-->
<!--    </div>-->

    <!-- 커뮤니티 탭 내용 -->
    <div v-if="activeTab === 'community'" class="community-posts">
      <div v-for="post in communityPosts" :key="post.id" class="post">
        <div class="post-header">
          <span class="post-author">{{ post.author }}</span>
          <span class="post-type" :class="post.type">{{ post.type }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
        <p class="post-content">{{ post.content }}</p>
      </div>
    </div>

    <!-- 댓글 입력 -->
    <div v-if="activeTab === 'community'" class="comment-input">
      <input type="text" placeholder="의견을 입력하세요" v-model="newComment" />
      <button @click="submitComment" :disabled="!newComment">등록</button>
    </div>

    <!-- 하단 네비게이션 -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'community', // 초기 탭을 community로 설정
      newComment: '',
      communityPosts: [
        { id: 1, author: '악동핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?' },
        { id: 2, author: '악동핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?' },
        { id: 3, author: '라라핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?' },
        { id: 4, author: '키키핑', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?' },
        { id: 5, author: '김호룡', type: '수익', date: '24.09.10', content: '혹시 10월에 다 같이 살까요?' },
      ]
    }
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab !== tab) {
        this.activeTab = tab;
      }
    },
    submitComment() {
      if (this.newComment) {
        console.log('Submitted comment:', this.newComment);
        this.newComment = '';
      }
    }
  }
}
</script>

<style scoped>
.stock-detail {
  font-family: Arial, sans-serif;
  max-width: 390px;
  margin: 0 auto;
  padding: 20px;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stock-name {
  font-size: 24px;
  font-weight: bold;
}

.stock-price-container {
  display: flex;
  align-items: center;
}

.stock-price {
  font-size: 28px;
  font-weight: bold;
  margin-right: 10px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 2px solid #ccc;
}

.tab.active {
  border-bottom: 2px solid #000;
}

.community-posts {
  margin-bottom: 20px;
}

.post {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.post-type {
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}

.post-type.수익 {
  background-color: #e6f3ff;
  color: #0066cc;
}

.post-date {
  color: #888;
  font-size: 12px;
}

.comment-input {
  display: flex;
  margin-bottom: 20px;
}

.comment-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
}

.comment-input button {
  padding: 10px 20px;
  background-color: #fab809;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}

.comment-input button:disabled {
  background-color: #ccc;
}

.bottom-nav {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>
