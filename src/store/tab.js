import {info} from "@/utils/log";
import router from "@/router";

let tab = {
    state: {
        isCollapse: false, // 控制菜单的展开与收起
        tags: [], // 标签页列表
    },
    mutations: {
        /**
         * 修改菜单展开与收起
         */
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        addTag(state, tag) {
            state.tags.push(tag);
        },
        delTag(state, index) {
            state.tags.splice(index, 1);
        }
    },
    actions: {

    }
};

function storageConfig(state) {
    localStorage.setItem("tab", JSON.stringify(state));
}

export default tab;
