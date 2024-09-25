
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
import Search from "@/pages/search/Search.vue";
import Investment1 from "@/pages/investment/Investment1.vue";
import Investment2 from "@/pages/investment/Investment2.vue";
import Investment3 from "@/pages/investment/Investment3.vue";
import Investment4 from "@/pages/investment/Investment4.vue";
import Investment5 from "@/pages/investment/Investment5.vue";
import Investment6 from "@/pages/investment/Investment6.vue";
import Investment7 from "@/pages/investment/Investment7.vue";
import InvestmentResult from "@/pages/investment/InvestmentResult.vue";

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
        { path: '/investment1',name:"Investment1", component: Investment1},
        { path: '/investment2',name:"Investment2", component: Investment2},
        { path: '/investment3',name:"Investment3", component: Investment3},
        { path: '/investment4',name:"Investment4", component: Investment4},
        { path: '/investment5',name:"Investment5", component: Investment5},
        { path: '/investment6',name:"Investment6", component: Investment6},
        { path: '/investment7',name:"Investment7", component: Investment7},
        {path:'/investment/result',name:"InvestmentResult",component:InvestmentResult}
    ]
});

export default router;