import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue'
import router from './router'

// 앱 생성
const app = createApp(App);

// 플러그인 사용
app.use(VueAwesomePaginate);
app.use(createPinia());
app.use(router);

app.mount('#app');
