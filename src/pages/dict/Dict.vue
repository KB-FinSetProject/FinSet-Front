<template>
  <HeaderNormal navbarTitle="사전" />

  <div class="container">
    <div class="search-bar">
      <div class="input-container">
        <input type="text" v-model="searchQuery" placeholder="검색어를 입력하세요." />
        <i class="fas fa-search search-icon" @click="performSearch"></i>
      </div>
    </div>

    <br>

    <div class="card-container">
      <div class="card" v-if="searchResult">
        <div class="card-header">
          <span class="title">{{ searchResult.title }}</span>
          <i class="fa-solid fa-star icon" :class="{ active: isStarActive }" @click="toggleStar"></i>
        </div>
        <br>
        <p class="description">{{ searchResult.content }}</p>
      </div>

      <h6 style="color: black; font-weight: 350; margin-left: 10px">
        "{{ searchQuery }}"에 대한 <span style="color: #FFBB00;">{{ items.length }}</span>개 용어가 검색되었습니다.
      </h6>

      <div v-for="(item, index) in displayedItems" :key="item.title" class="card cardelse">
        <div class="card-header" @click="toggleDescription(index)">
          <span class="title">{{ item.title }}</span>
          <i class="fa-solid" :class="[isActive(index) ? 'fa-caret-up' : 'fa-caret-down', 'arrow']"></i>
        </div>
        <div v-if="isActive(index)">
          <br>
          <p class="description">{{ item.content }}</p>
        </div>
      </div>

      <button v-if="!showAll" @click="showAllItems" class="load-more-button">+</button>
      <button v-if="showAll" @click="hideAllItems" class="load-more-button">-</button> <!-- 접기 버튼 추가 -->

      <hr>

      <div class="icon-title-container">
        <i class="fa-solid fa-book-bookmark icon-large"></i>
        <span class="title">단어장</span>
        <router-link to="/dictmemo">
          <i class="fa-solid fa-arrow-right"></i>
        </router-link>
      </div>

      <div class="item-container" v-for="(wishItem, index) in wishItems" :key="index">
        <router-link :to="{ path: '/dictmemo' }" class="item-text">
          <span class="item-text">{{ wishItem.word }}</span>
        </router-link>
        <i class="fa-solid fa-star icon2" :class="{ active: isListStarActive(index) }" @click="toggleListStar(index)"></i>
      </div>

    </div>
  </div>
</template>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
import { ref, computed, onMounted } from 'vue';
import dictApi from '@/api/dictApi'; 
import dictWishApi from '@/api/dictWishApi';

// 상태 관리 변수 정의
const items = ref([]); // 사전 항목 리스트
const list = ref([]); // 단어 리스트
const showAll = ref(false); // 더보기 버튼 상태
const activeIndices = ref([]); // 아코디언 활성 상태
const searchQuery = ref(''); // 검색어 상태
const isStarActive = ref(false); // 전체 별 아이콘 상태
const listStarStates = ref([]); // 리스트 아이템 별 상태
const searchResult = computed(() => items.value.find(item => item.title === searchQuery.value));
const filteredItems = computed(() => items.value.filter(item => item.title !== searchQuery.value));
const wishItems = ref([]); // 단어장 항목 리스트
const uno = ref(null); // uno 값 저장

// 모든 사전 항목 조회 함수
const fetchDictionaryItems = async () => {
  try {
    const data = await dictApi.getAll(); // dictApi를 통해 모든 항목 조회
    items.value = data.map(item => ({
      title: item.word,
      content: item.content,
    }));
    list.value = data.map(item => item.word); // 단어 리스트 초기화
    listStarStates.value = Array(data.length).fill(true); // 모든 리스트 상태를 활성화(true)로 설정
    console.log('사전 항목 조회 성공:', data);
  } catch (error) {
    console.error('사전 항목 조회 오류:', error);
  }
};

// 단어장 항목 조회 함수
const fetchWishItems = async (userUno) => {
  try {
    const response = await dictWishApi.getAll(userUno); 
    if (response && Array.isArray(response)) {
      wishItems.value = response; 
      console.log('Fetched wish items:', wishItems.value);
      for (let wishItem of wishItems.value) {
        const data = await dictApi.getByDino(wishItem.dino); 
        wishItem.word = data.word;
      }
    } else {
      console.error('API 응답 형식이 올바르지 않습니다.', response);
    }
  } catch (error) {
    console.error('Error fetching wish items:', error.message || error); 
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
};

// 검색 기능 함수
const performSearch = async () => {
  try {
    const result = await dictApi.search(searchQuery.value); 
    items.value = result.map(item => ({
      title: item.word,
      content: item.content,
      dino: item.dino,
      status: item.status // status 추가
    }));

    // searchResult 업데이트
    isStarActive.value = items.value.some(item => item.status === 1); // status가 1인 경우 활성화
    console.log('item.value', items.value);
    
    list.value = result.map(item => item.word);
    console.log('검색 결과:', result);
  } catch (error) {
    console.error('검색 오류:', error);
  }
};



// 컴포넌트 마운트 시 사전 항목 조회
onMounted(() => {
  fetchDictionaryItems();
  const authData = JSON.parse(localStorage.getItem('auth')); 
  uno.value = authData.uno; 
  console.log('UNO:', uno.value); 
  fetchWishItems(uno.value); 
});

// 더보기 버튼 클릭 시 전체 항목 표시
const showAllItems = () => {
  showAll.value = true;
};
// 접기 버튼 클릭 시 항목 숨기기
const hideAllItems = () => {
  showAll.value = false;
};


// 특정 인덱스가 아코디언 활성화 상태인지 확인
const isActive = (index) => activeIndices.value.includes(index);

// 아코디언 토글 함수
const toggleDescription = (index) => {
  if (isActive(index)) {
    activeIndices.value = activeIndices.value.filter(i => i !== index);
  } else {
    activeIndices.value.push(index);
  }
};

// 전체 별 아이콘 클릭 시 상태 토글
const toggleStar = async () => {
  isStarActive.value = !isStarActive.value;

  if (searchResult.value) {
    const title = searchResult.value.title;

    try {
      const searchData = await dictApi.search(title);

      if (searchData && searchData.length > 0) {
        const dino = searchData[0].dino;

        const dict = { ...searchResult.value, status: isStarActive.value ? 0 : 1 };

        // API 호출 최적화
        await dictApi.updateStatus(dino, dict);
        console.log(`${isStarActive.value ? 'Activated' : 'Deactivated'} star for item with dino: ${dino}`);
      } else {
        console.error('No data found for the searched title.');
      }
    } catch (error) {
      console.error('Error searching for title or updating wish item:', error);
    }
  } else {
    console.error('No search result found.');
  }
};





// 리스트 아이템 별 클릭 시 상태 토글 및 삭제 처리
const toggleListStar = async (index) => {
  const currentState = listStarStates.value[index];
  listStarStates.value[index] = !currentState;

  const dino = wishItems.value[index].dino; // 현재 아이템의 dino 값 가져오기
  console.log('dino : ', dino);

  const dict = { ...wishItems.value[index], status: listStarStates.value[index] ? 0 : 1 }; // 새로운 상태에 따라 dict 객체 생성
  console.log('dict : ', dict);
  try {
    // 별을 활성화 할 경우
    if (listStarStates.value[index]) {
      await dictApi.updateStatus(dino, dict); // API 호출하여 상태 업데이트
      console.log(`Activated star for item with dino: ${dino}`);
    } else {
      // 별을 비활성화 할 경우
      await dictApi.updateStatus(dino, dict); // API 호출하여 상태 업데이트
      console.log(`Deactivated star for item with dino: ${dino}`);
    }
  } catch (error) {
    console.error('Error updating wish item:', error);
  }
};




// 리스트 아이템의 별 상태 확인
const isListStarActive = (index) => listStarStates.value[index];

// 더보기 버튼이 활성화되었을 때 표시할 항목
const displayedItems = computed(() => (showAll.value ? items.value : items.value.slice(0, 3)));
</script>


<style scoped>
.container {
  margin-bottom: 150px;
  margin-top: -80px;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 10px; /* 카드 간 간격 조정 */
  color: black; /* 기본 글씨 색상 */
  bottom: -59px;
    position: relative;
}

.card {
  width: 350px;
  border: 1px solid #CAC4B7;
  border-radius: 8px;
  padding: 15px;
  background-color: #816843; /* 카드 배경색 */
  color: white; /* 카드 내부 텍스트 색상 */
}

.card-header {
  display: flex;
  justify-content: space-between; /* 텍스트와 별 아이콘을 양쪽으로 배치 */
  align-items: center;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
  padding-bottom: 10px;
  padding-top: 0px;
  background-color: transparent;
}

.title {
  font-size: 1.2em; /* 제목 크기 조정 */
  font-weight: bold;
}

.icon {
  color: gray; /* 기본 별 색상 - 회색 */
}

.icon.active {
  color: #ffbf0a; /* 활성화된 별 색상 - 노란색 */
}

.fa-arrow-right {
  color: #ffbf0a;
  position: relative;
  left: 100px;
  font-size: 20px;
}

.arrow {
  margin-left: 10px;
  position: absolute;
  transform: translateX(3100%);
}

.cardelse {
  background-color: rgba(110, 96, 83, 0.17);
  color: black;
}

.description {
  margin-left: 10px;
  margin-right: 10px;
}

.search-bar {
  position: fixed; /* 검색 바를 화면에 고정 */
  top: 85px; /* 화면 상단에 고정 */
  display: flex;
  align-items: center;
  width: 350px;
  background-color: white; /* 흰색 배경 추가 */
  z-index: 999; /* 검색바가 다른 요소 위에 위치하도록 설정 */
}

.input-container {
  position: relative;
bottom:40px;
  width: 100%;
  background-color: rgb(255, 255, 255);
  height:60px;
}

input[type="text"] {
  width: 100%;
  padding: 10px 40px 10px 10px; /* 아이콘을 위한 오른쪽 패딩 */
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  top:30px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 53px;
  transform: translateY(-50%);
  color: black;
}

.load-more-button {
  background-color: #816843; /* 갈색으로 변경 */
  color: white; /* 글씨 색상 */
  border: none;
  border-radius: 8px; /* 모서리를 둥글게 설정 */
  font-size: 18px; /* 글씨 크기를 조금 더 크게 설정 */
  font-weight: bold; /* 글씨 두께를 더 두껍게 설정 */
  cursor: pointer;
  width: 50px; /* 버튼의 폭을 줄임 */
  margin-left: auto; /* 왼쪽 여백 자동으로 설정 */
  margin-right: auto; /* 오른쪽 여백 자동으로 설정 */
  display: block; /* block으로 설정하여 중앙 정렬 */
}

.add-word-button {
  background-color: #FFBB00; /* 노란색 배경 */
  color: white; /* 글씨 색상 */
  border: none;
  border-radius: 5px; /* 모서리를 둥글게 설정 */
  font-size: 20px; /* 글씨 크기를 조금 더 크게 설정 */
  font-weight: bold; /* 글씨 두께를 더 두껍게 설정 */
  cursor: pointer;
  width: 25px; /* 원하는 가로 길이 설정 (예: 40px로 변경) */
  height: 25px; /* 높이 조정 */
  position: relative; /* 필요 시 위치 조정 */
  left: 100px; /* 필요에 따라 조정 */
  line-height: 40px; /* 텍스트를 세로 중앙에 위치시킴 (높이와 같게 설정) */
  text-align: center; /* 텍스트를 수평 중앙에 위치시킴 */
}

.icon-title-container {
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  margin: 10px 0; /* 위 아래 여백 추가 */
}

.icon-title-container .title {
  font-size: 24px; /* 글씨 크기를 24px로 설정 */
  font-weight: bold; /* 글씨 두께를 두껍게 설정 */
  position: relative;
  right: 107px;
}

.icon-large {
  margin-left: 10px;
  margin-right: 10px; /* 아이콘과 텍스트 사이에 여백 추가 */
  color: #FFBB00;
  font-size: x-large;
  position: relative;
  right: 108px;
}

.item-container {
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 아이템을 양쪽 끝으로 배치 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 10px; /* 아이템 패딩 */
}

.item-text {
  color: black; /* 아이템 텍스트 색상 */
  text-decoration: none; /* 링크 텍스트 밑줄 제거 */
  font-size: 18px;
}

.icon2 {
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
  color: gray;
  font-size: 19px /* 비활성화 상태 색상 */
}

.icon {
  font-size: 19px;
  position: relative;
  left: 5px;
}

.icon2.active {
  color: #ffbf0a; /* 활성화된 별 색상 - 노란색 */
}

h6{
  position: relative;
    bottom: -3px;
}
</style>
