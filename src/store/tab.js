import {getRoutes} from "@/api";

let tab = {
    state: {
        isCollapse: false, // 控制菜单的展开与收起
        keepAliveInclude: [], // 保持活动的页面
        menuData: [], // 侧边栏数据，详见mock
    },
    actions: {
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        addKeepAliveInclude(state, name) {
            state.keepAliveInclude.push(name);
        },
        removeKeepAliveIncludeByName(state, name) {
            for (let key in state.keepAliveInclude) {
                if (state.keepAliveInclude[key] === name) {
                    state.keepAliveInclude.splice(parseInt(key), 1);
                    return;
                }
            }
        }
    },
    getters: {
        getKeepAliveInclude(state) {
            return state.keepAliveInclude;
        },
        getMenuData(state) {
            return state.menuData;
        }
    }
};

tab.state.menuData = (await getRoutes()).data;

export default tab;
