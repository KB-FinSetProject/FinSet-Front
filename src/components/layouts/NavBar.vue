<template>
  <nav class="bottom-nav">
    <button
      v-for="item in navItems"
      :key="item.label"
      class="nav-item"
      @click="navigate(item.route)"
    >
      <component :is="item.icon" class="nav-icon" />
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import {
  HomeIcon,
  ShoppingBagIcon,
  HeartIcon,
  BookOpenIcon,
  UsersIcon,
} from 'lucide-vue-next';

const navItems = ref([
  { label: '홈', icon: HomeIcon, route: '/' },
  { label: '금융상품', icon: ShoppingBagIcon, route: '/products' },
  { label: '관심', icon: HeartIcon, route: '/favorites' },
  { label: '사전', icon: BookOpenIcon, route: '/dictionary' },
  { label: '마이페이지', icon: UsersIcon, route: '/mypage' },
]);

const navigate = (route) => {
  // Implement navigation logic here
  console.log(`Navigating to ${route}`);
};
</script>

<style scoped>
.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  padding: 8px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #757575;
  transition: color 0.3s ease;
}

.nav-item:hover,
.nav-item:focus {
  color: #000000;
  outline: none;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.nav-label {
  font-size: 12px;
  font-weight: 500;
}
</style>
