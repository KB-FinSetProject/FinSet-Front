import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Shop from '@/pages/Shop.vue';
import Auth from '@/pages/auth/Auth.vue';
import Board from '@/pages/board/Board.vue';
import DepositAll from '@/pages/deposit/DepositAll.vue';
import DepositCompound from '@/pages/deposit/DepositCompound.vue';
import DepositSimple from '@/pages/deposit/DepositSimple.vue';
import Dict from '@/pages/dict/Dict.vue';
import DictMemo from '@/pages/dict/DictMemo.vue';
import Exchange from '@/pages/exchange/Exchange.vue';
import Fund from '@/pages/fund/Fund.vue';
import FundSalesBest from '@/pages/fund/FundSalesBest.vue';
import FundSavingBest from '@/pages/fund/FundSavingBest.vue';
import InstallmentAll from '@/pages/installment/InstallmentAll.vue';
import InstallmentCompound from '@/pages/installment/InstallmentCompound.vue';
import InstallmentSimple from '@/pages/installment/InstallmentSimple.vue';
import Stock from '@/pages/stock/Stock.vue';
import Wish from '@/pages/wish/Wish.vue';
import Search from "@/pages/Search/Search.vue";
import Investment1 from "@/pages/investment/Investment1.vue";
import Investment2 from "@/pages/investment/Investment2.vue";
import Investment3 from "@/pages/investment/Investment3.vue";
import Investment4 from "@/pages/investment/Investment4.vue";
import Investment5 from "@/pages/investment/Investment5.vue";
import Investment6 from "@/pages/investment/Investment6.vue";
import Investment7 from "@/pages/investment/Investment7.vue";
import InvestmentResult from "@/pages/investment/InvestmentResult.vue";
import StockHighSuddenly from "@/pages/stock/StockHighSuddenly.vue";
import StockDropSuddenly from "@/pages/stock/StockDropSuddenly.vue";
import StockDetailPage from "@/pages/stock/StockDetailPage.vue";
import StockChartPage from "@/pages/stock/StockChartPage.vue";
import StockCommunityPage from "@/pages/stock/StockCommunityPage.vue";
import MyBoard from "@/pages/board/MyBoard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "Home", component: Home },
        { path: '/shop', name: "Shop", component: Shop },
        { path: '/auth', name: "Auth", component: Auth },
        { path: '/board', name: "Board", component: Board },
        { path: '/deposit', name: "DepositAll", component: DepositAll }, // 전체 예금 페이지
        { path: '/deposit/compound', name: "DepositCompound", component: DepositCompound }, // 복리 예금 페이지
        { path: '/deposit/simple', name: "DepositSimple", component: DepositSimple }, // 단리 예금 페이지
        { path: '/dict', name: "Dict", component: Dict },
        { path: '/dictmemo', name: "DictMemo", component: DictMemo },
        { path: '/exchange', name: "Exchange", component: Exchange },
        { path: '/fund', name: "Fund", component: Fund },
        { path: '/fund-sales-best', name: "FundSalesBest", component: FundSalesBest },
        { path: '/fund-saving-best', name: "FundSavingBest", component: FundSavingBest }, // 적립액 베스트 페이지
        { path: '/installment', name: "Inst6allmentAll", component: InstallmentAll }, // 전체 할부 페이지
        { path: '/installment/compound', name: "InstallmentCompound", component: InstallmentCompound }, // 복리 할부 페이지
        { path: '/installment/simple', name: "InstallmentSimple", component: InstallmentSimple }, // 단리 할부 페이지
        { path: '/stock', name: "Stock", component: Stock },
        { path: '/search', name: "Search", component: Search },
        { path: '/wish', name: "Wish", component: Wish },
        { path: '/investment1', name: "Investment1", component: Investment1 },
        { path: '/investment2', name: "Investment2", component: Investment2 },
        { path: '/investment3', name: "Investment3", component: Investment3 },
        { path: '/investment4', name: "Investment4", component: Investment4 },
        { path: '/investment5', name: "Investment5", component: Investment5 },
        { path: '/investment6', name: "Investment6", component: Investment6 },
        { path: '/investment7', name: "Investment7", component: Investment7 },
        { path: '/investment/result', name: "InvestmentResult", component: InvestmentResult },
        { path:  '/stock-high',name:"StockHighSuddenly",component:StockHighSuddenly},
        { path:  '/stock-drop',name:"StockDropHighSuddenly",component:StockDropSuddenly},
        { path:  '/stock-detail',name:"StockDetailPage",component:StockDetailPage},
        { path:  '/stock-chart',name:"StockChartPage",component:StockChartPage},
        { path:  '/stock-community',name:"StockCommunity",component:StockCommunityPage},
        { path:  '/myboard',name:"MyBoard",component:MyBoard},
    ]
});

export default router;
