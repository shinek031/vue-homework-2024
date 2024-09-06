
// import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import './assets/main2.css'
import "./assets/all.scss";
import "bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCookies)
app.$cookies.config('1d')
app.mount('#app')
