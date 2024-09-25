<template>
    <div class="col-lg-6 col-xxl-4 my-5 mx-2">
        <div class="d-grid gap-2 p-3">
            <router-link to="/deposit" class="btn brown-button" type="button">
                <div class="d-flex  justify-content-center align-items-center">
                    <i class="fa-solid fa-sack-dollar icon" style="margin-right: 8px;"></i>
                    <span class="button-text">예금</span>
                </div>
            </router-link>
            <div class="d-flex justify-content-between">
                <router-link to="/installment" class="btn brown-button flex-fill mx-1" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-piggy-bank icon"></i>
                        <span class="button-text">적금</span>
                    </div>
                </router-link>
                <router-link to="/fund" class="btn brown-button flex-fill mx-1" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-chart-simple icon"></i>
                        <span class="button-text">펀드</span>
                    </div>
                </router-link>
              </div>
            <div class="d-flex justify-content-between">
                <router-link to="/stock" class="btn brown-button flex-fill mx-1" type="button">
                    <div class="d-flex flex-column align-items-center">
                        <i class="fa-solid fa-chart-line icon"></i>
                        <span class="button-text">주식</span>
                    </div>
                </router-link>
                <router-link to="/exchange" class="btn brown-button flex-fill mx-1" type="button">
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
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 
}

.icon {
    font-size: 40px;
}

.button-text {
    font-size: 20px; 
}
</style>