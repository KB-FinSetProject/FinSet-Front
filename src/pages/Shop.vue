<template>
    <div class="hidden-placeholder">ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</div>
    
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
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-piggy-bank icon"></i>
                        <span class="button-text">적금</span>
                    </div>
                </router-link>
                <router-link to="/fund" class="btn brown-button" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="button-text">펀드</span>
                    </div>
                </router-link>
                <router-link to="/stock" class="btn brown-button" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-chart-line icon"></i>
                        <span class="button-text">주식</span>
                    </div>
                </router-link>
                <router-link to="/exchange" class="btn brown-button" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-money-bill-trend-up icon"></i>
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
    height: 200px;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease; 
}

.brown-button:hover {
    background-color: #FFBF0A; 
}

.icon {
    font-size: 40px;
}

.button-text {
    font-size: 20px; 
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px; 
}

.hidden-placeholder {
    visibility: hidden; 
    height: 20px; 
}

.container {
    margin-bottom: 150px; /* 원하는 크기로 조정 */
}

</style>
