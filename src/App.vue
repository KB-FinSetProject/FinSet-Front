<template>
  <div>
    <!-- <Header/> -->
     <HeaderHome />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import HeaderHome from '@/components/common/HeaderHome.vue';
import Footer from '@/components/common/Footer.vue'

</script>

<style scoped>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
</style>