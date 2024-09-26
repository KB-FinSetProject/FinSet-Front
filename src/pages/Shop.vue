<template>
    <HeaderNormal navbarTitle="금융상품" />

    <div style="visibility: hidden;">ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</div>
    <div class="container">
        <div class="d-grid gap-2 p-3">
            <router-link to="/deposit" class="btn brown-button" type="button">
                <div class="d-flex justify-content-center align-items-center">
                    <i class="fa-solid fa-sack-dollar icon" style="margin-right: 8px;"></i>
                    <span class="button-text">예금</span>
                </div>
            </router-link>

            <div class="button-grid">
                <router-link to="/installment" class="btn brown-button" type="button">
                    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
                        <i class="fa-solid fa-piggy-bank icon" style="margin-left: 20px;"></i>
                        <span class="button-text">적금</span>
                    </div>
                </router-link>
                <router-link to="/fund" class="btn brown-button" type="button">
                    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
                        <i class="fa-solid fa-chart-simple icon" style="margin-left: 20px;"></i>
                        <span class="button-text">펀드</span>
                    </div>
                </router-link>
                <router-link to="/stock" class="btn brown-button" type="button">
                    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
                        <i class="fa-solid fa-chart-line icon" style="margin-left: 20px;"></i>
                        <span class="button-text">주식</span>
                    </div>
                </router-link>
                <router-link to="/exchange" class="btn brown-button" type="button">
                    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100%;">
                        <i class="fa-solid fa-money-bill-trend-up icon" style="margin-left: 20px;"></i>
                        <span class="button-text">외환</span>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.brown-button {
    color: #ffff; 
    background-color: #816843;
    height: 200px; /* 버튼 높이 설정 */
    display: flex; /* flexbox 사용 */
    justify-content: center; /* 수평 중앙 정렬 */
    align-items: center; /* 수직 중앙 정렬 */
    transition: background-color 0.3s ease; 
}

.brown-button:hover {
    background-color: #FFBF0A; 
}

.icon {
    font-size: 40px;
    color: white;
}

.button-text {
    font-size: 20px; 
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px; 
}

.container {
    margin-bottom: 150px; 
}
</style>

<script setup>
import HeaderNormal from '@/components/common/HeaderNormal.vue';
</script>
