import { createRouter,createWebHashHistory } from 'vue-router'
import Home from "@/view/home/Home.vue";
import Main from "@/view/Main.vue";

// 将 路由 与组件进行映射
const routes = [
    {
        path: "/",
        component: Main,
        children: [
            { path: "/", component: Home}
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
