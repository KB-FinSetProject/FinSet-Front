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
      <Search 
        class="search-icon absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
        size="20" 
      />
    </div>

    <div v-for="section in sections" :key="section.category" class="section mb-2 overflow-hidden">
      <div v-if="section.items.length > 0">
        <div class="section-header border-b border-gray-200 flex justify-between items-center">
          <span class="section-title font-bold text-gray-800">{{ section.category }}</span>
          <span class="section-icon text-gray-400 text-xl">+</span>
        </div>
        <div class="section-content p-3">
          <div v-if="section.items.length > 0">
            <div
              v-for="item in section.items"
              :key="item.no"
              class="card mb-2 p-3 border rounded cursor-pointer"
              @click="navigateToDetail(section.category, item)"
            >
              <p class="product-title font-bold text-gray-800">{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Search } from 'lucide-vue-next';
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { useRouter } from 'vue-router';
import searchApi from '@/api/searchApi';

const router = useRouter();
const searchQuery = ref('');
const placeholderText = ref('');
const isLoaded = ref(false);

const sections = ref([
  { category: '예금', items: [] },
  { category: '적금', items: [] },
  { category: '펀드', items: [] },
  { category: '주식', items: [] },
  { category: '외환', items: [] },
]);

const categoryMap = {
  dno: { category: '예금', name: 'deposit_name' },     // 예금
  ino: { category: '적금', name: 'installment_name' },  // 적금
  fno: { category: '펀드', name: 'fund_name' },          // 펀드
  sno: { category: '주식', name: 'stock_name' },         // 주식
  feno: { category: '외환', name: 'forex_name' },        // 외환
};


// URL에서 쿼리 파라미터를 가져오는 로직
onMounted(async () => {
  if (isLoaded.value) return;

  const urlParams = new URLSearchParams(window.location.search);
  const term = urlParams.get('term');

  const storedAuth = JSON.parse(localStorage.getItem('auth'));
  const memberId = storedAuth?.uno;

  // 쿼리 파라미터 'term'이 있으면 placeholderText에 설정
  if (term) {
    placeholderText.value = term; // ref의 값에 접근할 때는 .value를 사용
    console.log('검색어:', term); // 로그에 찍기

    // Flask 서버로 POST 요청 보내기
    try {
      const response = await axios.post('http://127.0.0.1:5000/execute', { query: term });
      console.log('서버 응답:', response.data); // 서버의 응답을 콘솔에 출력

      const result = response.data.result;
      console.log("result ::::::::::: ", result);

      result.forEach(innerArray => {
        innerArray.forEach(item => {  // 각 내부 배열의 항목에 대해 반복
          for (const [key, value] of Object.entries(categoryMap)) {
            if (item[key] !== undefined) { // 해당 키가 존재할 경우
              sections.value.find(section => section.category === value.category).items.push({
                no: item[key],                // 고유 번호
                name: item[value.name] || '정보 없음' // 이름, 없을 경우 기본값
              });
            }
          }
        });
      });

      const keyword = response.data.keyword;
      console.log(keyword);

      if (keyword && memberId) {
        try {
          console.log("key word & member id : ", keyword, memberId)
          await searchApi.createKeyword(keyword, memberId);
          console.log('키워드 저장 성공:', keyword);
        } catch (error) {
          console.error('키워드 저장 실패:', error);
        }
      }

      console.log('최종 sections:', sections.value)
      isLoaded.value = true;

    } catch (error) {
      console.error('오류 발생:', error);
    }
  }
});

const navigateToDetail = (category, item) => {
  switch (category) {
    case '예금':
      router.push({ path: `/deposit/detail`, query: { dno: item.no } });
      break;
    case '적금':
      router.push({ path: `/installment/detail`, query: { ino: item.no } });
      break;
    case '외환':
      router.push({ path: `/forex/detail`, query: { feno: item.no } });
      break;
    case '펀드':
      router.push({ path: `/fund/detail/${item.no}` });
      break;
    case '주식':
      router.push({ path: `/stock/chart/${item.no}` });
      break;
    default:
      console.error('알 수 없는 카테고리:', category);
  }
};
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
  top:4.5%;
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
