import {defineProps} from "vue";
import {isAuthenticated} from "@/util/guard.js";

export default [
    {
        path:'/signin',
        name:'login',
        component:()=> import('../pages/login/signIn.vue'),
    },
    {
        path:'/signup',
        name:'join',
        component:()=> import('../pages/login/signUp.vue'),
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
