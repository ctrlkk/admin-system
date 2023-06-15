export const getRouteData = ()=> {
    return [
        {
            // 路由跳转位置
            path: "/",
            // 将会用于缓存页面，请保持与页面name一致
            name: "home",
            // 标题，标签页通过label匹配，请与router中的name保持一致
            label: "首页",
            // 图标
            icon: "HomeFilled",
            url: ""
        },
        {
            label: "页面",
            icon: "User",
            url: "",
            children: [
                {
                    label: "错误页面",
                    url: "",
                    children: [
                        {path: "/403", name: "403", label: "403", icon: ""},
                        {path: "/404", name: "404", label: "404", icon: ""},
                        {path: "/500", name: "500", label: "500", icon: ""}
                    ]
                }
            ]
        },
    ]
}
