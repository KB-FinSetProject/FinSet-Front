import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import Shop from '@/pages/Shop.vue';
import Auth from '@/pages/auth/Auth.vue';
import DepositAll from '@/pages/deposit/DepositAll.vue';
import DepositSimple from '@/pages/deposit/DepositSimple.vue';
import DepositCompound from '@/pages/deposit/DepositCompound.vue';
import DepositDetail from '@/pages/deposit/DepositDetail.vue';
import Dict from '@/pages/dict/Dict.vue';
import DictMemo from '@/pages/dict/DictMemo.vue';
import Exchange from '@/pages/exchange/Exchange.vue';
import ExchangeDetail from "@/pages/exchange/ExchangeDetail.vue";
import Fund from '@/pages/fund/Fund.vue';
import FundDetail from '@/pages/fund/FundDetail.vue';
import FundSales from '@/pages/fund/FundSales.vue';
import FundSavings from '@/pages/fund/FundSavings.vue';
import InstallmentAll from '@/pages/installment/InstallmentAll.vue';
import InstallmentSimple from '@/pages/installment/InstallmentSimple.vue';
import InstallmentCompound from '@/pages/installment/InstallmentCompound.vue';
import InstallmentDetail from '@/pages/installment/InstallmentDetail.vue';
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
import Stock from '@/pages/stock/Stock.vue';
import StockHigh from '@/pages/stock/StockHigh.vue';
import StockDrop from '@/pages/stock/StockDrop.vue';
import StockDetail from "@/pages/stock/StockDetail.vue";
import StockChart from "@/pages/stock/StockChart.vue";
import StockCommunity from "@/pages/stock/StockCommunity.vue";
import MyBoard from "@/pages/board/MyBoard.vue";
import SignIn from "@/pages/login/SignIn.vue";
import SignUp from "@/pages/login/SignUp.vue";
import loginRoutes from './login'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "Home", component: Home },
        { path: '/shop', name: "Shop", component: Shop },
        { path: '/auth', name: "Auth", component: Auth },
        { path: '/deposit', name: "DepositAll", component: DepositAll }, // 전체 예금 페이지
        { path: '/depositsimple', name: "DepositSimple", component: DepositSimple }, // 전체 예금 페이지
        { path: '/depositcompound', name: "DepositCompound", component: DepositCompound }, // 전체 예금 페이지
        { path: '/deposit/detail', name: "DepositDetail", component: DepositDetail }, // 전체 할부 페이지
        { path: '/dict', name: "Dict", component: Dict },
        { path: '/dictmemo', name: "DictMemo", component: DictMemo },
        { path: '/exchange', name: "Exchange", component: Exchange },
        { path: '/exchangedetail', name: "ExchangeDetail", component: ExchangeDetail },
        { path: '/fund', name: "Fund", component: Fund },
        { path: '/fund/detail', name: "FundDetail", component: FundDetail },
        { path: '/fundsales', name: "FundSales", component: FundSales },
        { path: '/fundsavings', name: "FundSavings", component: FundSavings }, // 적립액 베스트 페이지
        { path: '/installment', name: "InstallmentAll", component: InstallmentAll }, // 전체 할부 페이지
        { path: '/installmentsimple', name: "InstallmentSimple", component: InstallmentSimple }, // 전체 할부 페이지
        { path: '/installmentcompound', name: "InstallmentCompound", component: InstallmentCompound }, // 전체 할부 페이지
        { path: '/installment/detail', name: "InstallmentDetail", component: InstallmentDetail }, // 전체 할부 페이지
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
        { path: '/stock', name: "Stock", component: Stock },
        { path: '/stockhigh', name: "StockHigh", component: StockHigh },
        { path: '/stockdrop', name: "StockDrop", component: StockDrop },
        { path:  '/stock/detail',name:"StockDetail",component:StockDetail},
        { path:  '/stock/chart',name:"StockChart",component:StockChart},
        { path:  '/stock/community',name:"StockCommunity",component:StockCommunity},
        { path:  '/myboard',name:"MyBoard",component:MyBoard},
        ...loginRoutes,

    ]
});

export default router;
