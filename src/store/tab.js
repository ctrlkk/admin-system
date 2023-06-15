let tab = {
    state: {
        isCollapse: false, // 控制菜单的展开与收起
        tags: [], // 标签页列表
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        addTag(state, tag) {
            for (let key in state.tags) {
                if (tag.name === state.tags[key].name) {
                    return;
                }
            }
            state.tags.push(tag);
        }
    },
    getters: {
    },
    actions: {
    }
};

export default tab;
