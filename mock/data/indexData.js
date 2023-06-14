export const getRouteData = ()=> {
    return [
        {
            path: "/",
            name: "home",
            label: "首页",
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
                        {path: "/403", label: "403", icon: ""},
                        {path: "/404", label: "404", icon: ""},
                        {path: "/500", label: "500", icon: ""}
                    ]
                }
            ]
        },
    ]
}
