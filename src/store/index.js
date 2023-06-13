import { createStore } from 'vuex'
import tab from "@/router/tab";

// 创建一个新的 store 实例
const store = createStore({
    state () {
        return {

        }
    },
    modules: {
        tab
    }
})

export default store;
