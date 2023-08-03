import {defineStore} from "pinia";

export const system = defineStore('system', {
    state: () => {
        return {
            size: "small",
            // size: "default",
        }
    },
    actions: {},
    persist: {
        // 配置缓存
        enabled: true,
        strategies: [
            {
                key: "system",
                storage: localStorage,
            },
        ]
    }
})
