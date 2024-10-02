import Vue from 'vue';
import Router from 'vue-router';
import DepositList from '@/components/DepositList.vue';
import DepositDetail from '@/components/DepositDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // 해시 모드 대신 히스토리 모드를 사용할 경우
  routes: [
    {
      path: '/deposit',
      name: 'DepositList',
      component: DepositList,
    },
    {
        path: '/deposit/detail',
        name: 'DepositDetail',
        component: DepositDetail,
    }          
  ],
});
