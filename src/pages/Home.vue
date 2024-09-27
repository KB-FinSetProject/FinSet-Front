<template>
    <div class="container">
        <div class="news">
            <i class="fa-solid fa-newspaper icon"></i> <span class="title">News</span>
            <br>
            <br>
            <div class="card-slider">
                <div class="d-flex flex-row card-wrapper" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                    <div class="card shadow-sm me-3" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail">
                        <div class="card-body">
                            <p class="card-text">content1</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article1')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm me-3" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail">
                        <div class="card-body">
                            <p class="card-text">content2</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article2')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm me-3" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail">
                        <div class="card-body">
                            <p class="card-text">content3</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article3')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm me-3" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail" >
                        <div class="card-body">
                            <p class="card-text">content4</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article4')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm me-3" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail">
                        <div class="card-body">
                            <p class="card-text">content5</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article5')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card shadow-sm" style="width: calc(50% - 10px);">
                        <img class="card-img-top" src="https://i.pinimg.com/474x/fd/29/9a/fd299aac8ae19c908fac63c9407a8460.jpg" alt="Thumbnail" >
                        <div class="card-body">
                            <p class="card-text">content6</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" @click="goToUrl('https://example.com/article6')">View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br>

            <div class="d-flex justify-content-center mt-3">
                <button class="circle-button" @click="goToSlide(0)"></button>
                <button class="circle-button" @click="goToSlide(1)"></button>
                <button class="circle-button" @click="goToSlide(2)"></button>
            </div>
        </div>

        <br>
        <hr>
        <br>

        <div class="wish">
            <i class="fa-solid fa-heart icon"></i> <span class="title">관심목록</span>
            <br>
            <br>
            
            <div class="wish-item d-flex align-items-center mt-2">
                <img src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <p class="mb-0">NH 고향사랑 기부 예금</p>
                    <p class="mb-0 text-muted">NH 농협은행</p>
                </div>
            </div>
        
            <div class="wish-item d-flex align-items-center mt-2">
                <img src="https://mblogthumb-phinf.pstatic.net/MjAxOTEwMjdfOTIg/MDAxNTcyMTU4OTA2NjU5.hW_OqQAvt2PNI2IFnSWrLGkmD_va9wkMkQ-6_jYK17Mg.vfwxXS7Je9S2-z4MRgMDZIdpG26pwh9o3SJwXvVOn-8g.JPEG.msjin93/IMG_8422.JPG?type=w800" alt="Thumbnail" class="rounded-circle me-3" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <p class="mb-0">삼성전자</p>
                    <p class="mb-0 text-muted">
                        67,500원 <span style="color: #547BC1;">~2.0%</span>
                    </p>                    
                </div>
            </div>
        </div>
        
        <br>
        <hr>
        <br>

        <div class="chart-container">
            <h2>2,572.09</h2>
            <canvas ref="lineChart" />
        </div>
        


    </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
    data() {
        return {
            currentSlide: 0, // 슬라이드 인덱스
            type: 'line', // 차트 타입을 'line'으로 설정
            data: {
                labels: ['January', ' February', ' March', ' April', ' May', 'June', 'July'],
                datasets: [{
                    label: 'Sales',
                    data: [40, 20, 30, 50, 70, 80, 50],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: true, // 영역 채우기
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            new Chart(this.$refs.lineChart, {
                type: this.type, // 'line' 차트를 생성
                data: this.data,
                options: this.options
            });
        },
        goToSlide(index) {
            this.currentSlide = index; // 클릭한 버튼에 따라 슬라이드 변경
        },
        goToUrl(url) {
            window.location.href = url; // 해당 URL로 이동
        },
    }
}
</script>


<style scoped>
.container {
    width: 60%;
  margin-top:-90px
}

.card-slider {
    overflow: hidden;
}

.card-wrapper {
    display: flex;
    transition: transform 0.3s ease;
}

.circle-button {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #FFBF0A;
    border: none;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.circle-button:hover {
    background-color: #999;
}

.circle-button:focus {
    outline: none;
}

.card {
    flex: 0 0 calc(50% - 10px);
}

.icon {
    color: #FFBF0A;
    font-size: 2rem;
    margin-right: 0.5rem;
}

.title {
    font-size: 1.5rem;
}

.chart-container {
    position: relative;
    width: 100%;
    height: 400px; /* 차트 높이를 설정 */
}

.card-img-top {
    width: 100%;
    height: 150px; /* 원하는 높이로 조정 */
    object-fit: cover;
}
</style>