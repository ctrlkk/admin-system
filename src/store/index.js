/*import {createStore} from 'vuex'
import tab from "@/store/tab";

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {
            // 登入信息
            loginInfo: {
                // 登入时间
                time: null,
                // 令牌
                token: null
            }
        }
    },
    modules: {
        tab
    }
})

export default store;
*/

import {createPinia} from "pinia";

export const store = createPinia();
