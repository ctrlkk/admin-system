import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "/mock"
import {logo} from "@/assets/logo";
import {createI18n} from "vue-i18n";
// 导入每种语言的翻译消息对象
import zhMessages from '/i18n/zh/index.js';
import enMessages from '/i18n/en/index.js';

// 循环引入所有element icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    createApp(App).component(key, component)
}

const i18n = createI18n({
    locale: "zh",
    messages: {
        en: enMessages,
        zh: zhMessages
    }
})

createApp(App)
    .use(i18n)
    .use(router)
    .use(store)
    .mount('#app');

console.group(logo)
