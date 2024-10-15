import { isAuthenticated } from "@/util/guard.js";

export default [
    {
        path: '/signin',
        name: 'login',
        component: () => import('../pages/login/SignIn.vue'),
    },
    {
        path: '/signup',
        name: 'join',
        component: () => import('../pages/login/SignUp.vue'),
    },
    {
        path: '/signup/complete',
        name: 'SignUpComplete',
        component: () => import('../pages/login/SignUpComplete.vue'), // SignUpComplete.vue의 경로
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
