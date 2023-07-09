import './main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/dist/index.css'
import "/mock"

import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import {logo} from "@/assets/logo";
import i18n from "../i18n";
import store from "@/store";

createApp(App)
    .use(i18n)
    .use(store)
    .use(router)
    .mount('#app');

console.group(logo)
