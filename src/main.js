import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'vue-awesome-paginate/dist/style.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueAwesomePaginate from 'vue-awesome-paginate';
import App from './App.vue';
import router from './router'; // 라우터 import

// Vue 애플리케이션 생성
const app = createApp(App);

// 플러그인 사용
app.use(VueAwesomePaginate);
app.use(createPinia());
app.use(router); // 라우터 추가

// 애플리케이션 마운트
app.mount('#app');
