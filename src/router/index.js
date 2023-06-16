import { createRouter,createWebHashHistory } from 'vue-router'
import Home from "@/view/home/Home.vue";
import Main from "@/view/Main.vue";

// 将 路由 与组件进行映射
const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
        children: [
            {path: "/", name: "home", component: Home},
            {path: "/403", name: "403", component: () => import("@/view/error/403.vue")},
            {path: "/404", name: "404", component: () => import("@/view/error/404.vue")},
            {path: "/500", name: "500", component: () => import("@/view/error/500.vue")}
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
