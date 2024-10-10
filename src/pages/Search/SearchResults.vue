<template>
  <HeaderNormal navbarTitle="검색상세 " />
  <div class="container mx-auto p-4 bg-white" style="min-height: 844px;">
    <div class="relative mb-4">
      <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholderText"
          class="search-input w-full p-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFA500] bg-white"
      />
      <Search class="search-icon" size="20" />
    </div>

    <div v-for="section in sections" :key="section.title" class="section mb-2 overflow-hidden shadow-sm">
      <div class="section-header border-b border-gray-200 flex justify-between items-center"> <!-- 패딩 제거 -->
        <span class="section-title font-bold text-gray-800">{{ section.title }}</span>
        <span class="section-icon text-gray-400 text-xl">+</span>
      </div>
      <div class="section-content p-3">
        <h3 class="product-title font-bold text-gray-800">{{ section.product }}</h3>
        <p class="product-description text-sm text-gray-600">{{ section.description }}</p>
        <p class="product-details text-sm mt-1">
          <span class="product-term font-medium text-gray-700">{{ section.term }}, </span>
          <span class="product-rate text-[#FFA500] font-medium">{{ section.rate }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<<script setup>
import { ref, onMounted } from 'vue'
import { Search } from 'lucide-vue-next'
import HeaderNormal from '@/components/common/HeaderNormal.vue';

const searchQuery = ref('')
const placeholderText = ref('');

// 섹션 데이터
const sections = [
  { title: '예금', product: 'KB STAR 국민', description: 'Digital KB의 대표 정기예금', rate: '연 2.7% ~ 3.4%', term: '1~36개월' },
  { title: '펀드', product: 'KB STAR 국민', description: 'Digital KB의 대표 정기예금', rate: '연 2.7% ~ 3.4%', term: '1~36개월' },
  { title: '채권', product: 'KB STAR 국민', description: 'Digital KB의 대표 정기예금', rate: '연 2.7% ~ 3.4%', term: '1~36개월' },
  { title: '주식', product: 'KB STAR 국민', description: 'Digital KB의 대표 정기예금', rate: '연 2.7% ~ 3.4%', term: '1~36개월' },
  { title: '외환', product: 'KB STAR 국민', description: 'Digital KB의 대표 정기예금', rate: '연 2.7% ~ 3.4%', term: '1~36개월' },
];

// URL에서 쿼리 파라미터를 가져오는 로직
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const term = urlParams.get('term');

  // 쿼리 파라미터 'term'이 있으면 placeholderText에 설정
  if (term) {
    placeholderText.value = term; // ref의 값에 접근할 때는 .value를 사용
  }
});
</script>

<style scoped>
.container {
  width: 390px;
  background-color: white;
  position: relative;
  margin-top: 50px;
  margin-bottom: 60px;
}

.search-input {
  width: 100%;
  height: 50px;
  padding-right: 40px; /* 아이콘을 위한 패딩 */
  border: 2px solid #000000 !important; /* 테두리를 검정색으로 설정 */
  border-radius: 8px; /* 테두리를 둥글게 설정 */
  background-color: #ffffff;
}

.search-input:focus {
  outline: none;
  border-color: #FFA500 !important;
  box-shadow: 0 0 0 2px rgba(255, 165, 0, 0.2);
}

.search-icon {
  position: absolute;
  right: 15px; /* 아이콘 위치 조정 */
  top:4%;
  right:10%;
  color: #000000;
}

.section {
  margin-bottom: 8px; /* 섹션 간 간격 조정 */
  background-color: #FFF9E5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 44px; /* 고정 높이 설정 */
  border-bottom: 1px solid #e5e7eb;
}

.section-title {
  font-weight: 900; /* 글자 굵기 더 두껍게 */
  color: #1f2937;
  position: relative;
  left: 18px;
}

.section-icon {
  color: #9ca3af;
  font-size: 20px; /* 아이콘 크기 */
  position: relative;
  right: 18px;
}

.section-content {
  padding: 12px; /* 섹션 컨텐츠 패딩 (픽셀 단위) */
}

.product-title {
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 4px; /* 마진 조정 */
}

.product-description {
  font-size: 14px; /* 글씨 크기 조정 */
  color: #4b5563;
  margin-bottom: 4px; /* 글씨와 바 사이 간격을 좁히기 위해 margin 감소 */
}

.product-details {
  font-size: 14px; /* 글씨 크기 조정 */
}

.product-term {
  font-weight: 500;
  color: #374151;
}

.product-rate {
  color: #FFA500;
  font-weight: 500;
}
</style>
