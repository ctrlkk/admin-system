let tab = {
    state: {
        isCollapse: false // 控制菜单的展开与收起
    },
    mutations: {
        /**
         * 修改菜单展开与收起
         */
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
            storageConfig(state);
        }
    }
};

tab.state = JSON.parse(localStorage.getItem("tab"));

function storageConfig(state) {
    localStorage.setItem("tab", JSON.stringify(state));
}

export default tab;
