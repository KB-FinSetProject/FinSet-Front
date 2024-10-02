import {defineProps} from "vue";
import {isAuthenticated} from "@/util/guard.js";

export default [
    {
        path:'/stock',
        name:'stock',
        component:()=> import('../pages/stock/Stock.vue'),
    },
    {
        path:'/stock/chart',
        name:'stockChart',
        component:()=> import('../pages/stock/stockChart.vue'),
    },
    {
        path:'/stock/detail/:sno',
        name:'stockDetail',
        component:()=> import('../pages/stock/stockDetail.vue'),
    },
    {
        path:'/stockdrop',
        name:'stockDrop',
        component:()=> import('../pages/stock/stockDrop.vue'),
    },
    // {
    //     path:'/auth/profile',
    //     name:'profile',
    //     component:()=> import('../pages/auth/ProfilePage.vue'),
    //     beforeEnter: isAuthenticated,
    // },
    // {
    //     path:'/auth/changePassword',
    //     name:'changePassword',
    //     component:()=> import('../pages/auth/ChangePasswordPage.vue'),
    //     beforeEnter: isAuthenticated,
    // },


];
