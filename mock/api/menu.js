import Mock from "mockjs"
import http from "@/utils/request";

Mock.mock(`${http.getUri()}/menu`, "get", function () {
    return getMenuData();
});

function getMenuData() {
    return [
        {
            // 路由跳转位置
            // 不建议多个选项指向同一个路径
            path: "/",
            // 将会用于缓存页面，请保持与页面name一致
            // 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。
            name: "Home",
            // 标题，标签页通过label匹配，请与router中的name保持一致
            label: "首页",
            // 图标
            icon: "HomeFilled",
        },
        {
            label: "页面",
            icon: "User",
            children: [
                {
                    label: "错误页面",
                    children: [
                        {path: "/403", name: "403", label: "403", icon: ""},
                        {path: "/404", name: "404", label: "404", icon: ""},
                        {path: "/500", name: "500", label: "500", icon: ""}
                    ]
                }
            ]
        },
        {
            label: "组件测试",
            icon: "User",
            children: [
                {
                    label: "buttonTest",
                    path: "/buttonTest",
                    name: "buttonTest"
                }
            ]
        }
    ]
}
