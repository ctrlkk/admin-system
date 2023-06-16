let tab = {
    state: {
        isCollapse: false, // 控制菜单的展开与收起
        tags: [], // 标签页列表
        keepAliveInclude: [], // 保持活动的页面
    },
    actions: {
        delTag(context, index) {
            context.commit("delTag", index);
        },
        addTag(context, tag) {
            context.commit("addTag", tag);
        },
        delTagAll(context) {
            context.commit("delTagAll");
        }
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
            state.keepAliveInclude.push(tag.name);
        },
        delTag(state, index) {
            state.tags.splice(index, 1);
            state.keepAliveInclude.splice(index, 1);
        },
        delTagAll(state) {
            state.tags.length = 0;
            state.keepAliveInclude.length = 0;
        },
        addKeepAliveInclude(state, name) {
            state.keepAliveInclude.push(name);
        }
    },
    getters: {
        getTags(state) {
            return state.tags;
        },
        getKeepAliveInclude(state) {
            return state.keepAliveInclude;
        }
    }
};

export default tab;
