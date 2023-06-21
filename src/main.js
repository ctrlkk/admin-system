import './main.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "/mock"

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {logo} from "@/assets/logo";
import i18n from "../i18n";

// 循环引入所有element icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    createApp(App).component(key, component)
}

createApp(App)
    .use(i18n)
    .use(router)
    .use(store)
    .mount('#app');

console.group(logo)
