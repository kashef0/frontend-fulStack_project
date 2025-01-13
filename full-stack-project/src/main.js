import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import store from './stores';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(createPinia())
.use(router)
app.use(store);
app.mount('#app');
