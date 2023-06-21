import {createI18n} from "vue-i18n";

// 导入每种语言的翻译消息对象
import zh from '/i18n/zh/index.js';
import en from '/i18n/en/index.js';

export default createI18n({
    legacy: false,
    locale: "zh",
    messages: {
        en,
        zh
    }
});
