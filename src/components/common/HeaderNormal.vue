<template>
    <div class="container">
        <header class="header">
            <nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary border-bottom">
                <div class="navbar-custom container-fluid pt-3">
                    <i class="fa-solid fa-arrow-left icon-large"></i>
                    <span class="navbar-brand">{{ navbarTitle }}</span>
                    <i class="fa-solid fa-magnifying-glass icon-large"></i>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    navbarTitle: {
        type: String,
        default: 'Navbar', // 기본값 설정 (선택적)
    },
});
</script>

<style scoped>
.navbar-brand {
    font-size: 23px;
}
.icon-large {
    font-size: 20px;
}
</style>
