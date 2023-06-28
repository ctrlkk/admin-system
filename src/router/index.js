import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/view/home/Home.vue";
import Main from "@/view/Main.vue";
import store from "@/store";

// 将 路由 与组件进行映射
const routes = [
    {path: "/login", name: "login", component: () => import("@/view/login/Login.vue")},
    {
        path: "/",
        name: "main",
        component: Main,
        children: [
            {path: "/", name: "home", component: Home},
            {path: "/403", name: "403", component: () => import("@/view/error/403.vue")},
            {path: "/404", name: "404", component: () => import("@/view/error/404.vue")},
            {path: "/500", name: "500", component: () => import("@/view/error/500.vue")},
            {path: "/button", name: "button", component: () => import("@/view/test/ButtonTest.vue")}
        ],
        beforeEnter(to, form, next) {
            // 登入状态判断
            // 最大在线时间 毫秒
            let maxOnlineTime = 60 * 60 * 1000;
            if (!store.state.loginInfo.token || !store.state.loginInfo.time || store.state.loginInfo.time + maxOnlineTime < new Date().getTime()) {
                // 登入状态异常或登入状态过期
                next("login");
                return;
            }
            next();
        }
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
