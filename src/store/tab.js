import {defineStore} from "pinia";

export const tab = defineStore('tab', {
    state: () => {
        return {
            isCollapse: false, // 控制菜单的展开与收起
            menuData: [], // 路由名单
        }
    },
    actions: {
    }
})
