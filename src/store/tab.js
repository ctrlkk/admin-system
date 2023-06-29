/*let tab = {
    state: {
        isCollapse: false, // 控制菜单的展开与收起
    },
    actions: {
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        }
    },
    getters: {
    }
};

export default tab;
*/

import {defineStore} from "pinia";

export const tab = defineStore('tab', {
    state: () => {
        return {
            isCollapse: false, // 控制菜单的展开与收起
        }
    },
    actions: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse;
        }
    }
})
