import { defineProps } from "vue";
import { isAuthenticated } from "@/util/guard.js";

export default [
    {
        path: '/stock',
        name: 'stock',
        component: () => import('../pages/stock/Stock.vue'),
    },
    {
        path: '/stock/chart/:sno',
        name: 'stockChart',
        component: () => import('../pages/stock/StockChart.vue'),
    },
    {
        path: '/stock/detail/:sno',
        name: 'stockDetail',
        component: () => import('../pages/stock/StockDetail.vue'),
    },
    {
        path: '/stock/community/:sno',
        name: 'stockCommunity',
        component: () => import('../pages/stock/StockCommunity.vue'),
    },
    {
        path: '/stockdrop',
        name: 'stockDrop',
        component: () => import('../pages/stock/StockDrop.vue'),
    },
    {
        path: '/stockhigh',
        name: 'stockHigh',  // 수정된 부분
        component: () => import('../pages/stock/StockHigh.vue'),
    },
];
