import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
// import authRoutes from './auth';
// import boardRoutes from './board';
// import fundRoutes from './fund';
// import depositRoutes from './deposit';
// import exchangeRoutes from './exchange';
// import dictRoutes from './dict';
// import installmentRoutes from './installment';
// import stockRoutes from './stock';
// import wishRoutes from './wish';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    // ...authRoutes,
    // ...boardRoutes,
    // ...fundRoutes,
    // ...depositRoutes,
    // ...exchangeRoutes,
    // ...dictRoutes,
    // ...installmentRoutes,
    // ...stockRoutes,
    // ...wishRoutes,
  ],
});

export default router;
