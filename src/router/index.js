
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue';
import Shop from '@/pages/Shop.vue';
import Auth from '@/pages/auth/Auth.vue';
import Board from '@/pages/board/Board.vue';
import Deposit from '@/pages/deposit/Deposit.vue';
import Dict from '@/pages/dict/Dict.vue';
import Exchange from '@/pages/exchange/Exchange.vue';
import Fund from '@/pages/fund/Fund.vue';
import Installment from '@/pages/installment/Installment.vue';
import Stock from '@/pages/stock/Stock.vue';
import Wish from '@/pages/wish/Wish.vue';
import Search from "@/pages/Search/Search.vue";


const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: '/', name: "Home", component: Home },
        { path: '/shop', name: "Shop", component: Shop },
        { path: '/auth', name: "Auth", component: Auth },
        { path: '/board', name: "Board", component: Board },
        { path: '/deposit', name: "Deposit", component: Deposit },
        { path: '/dict', name: "Dict", component: Dict },
        { path: '/exchange', name: "Exchange", component: Exchange },
        { path: '/fund', name: "Fund", component: Fund },
        { path: '/installment', name: "Installment", component: Installment },
        { path: '/stock', name: "Stock", component: Stock },
        { path: '/search', name: "Search", component: Search },
        { path: '/wish', name: "Wish", component: Wish },
    ]
});

export default router;