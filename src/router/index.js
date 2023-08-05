import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/view/home/Home.vue";
import Main from "@/view/Main.vue";
import {user} from "@/store/user";
import store from "@/store";

let {loginInfo} = user(store);

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
            {path: "/ButtonTest", name: "ButtonTest", component: () => import("@/view/test/ButtonTest.vue")},
            {path: "/TabsTest", name: "TabsTest", component: () => import("@/view/test/TabsTest.vue")},
            {path: "/UploadImage", name: "UploadImage", component: () => import("@/view/test/UploadImage.vue")},
            {path: "/test/test1", name: "Test1", component: () => import("@/view/test/Test1.vue")},
            {path: "/test/test2", name: "Test2", component: () => import("@/view/test/Test2.vue")},
            {
                path: "/tabs-test/tabsTest1",
                name: "TabsTest1",
                component: () => import("@/view/tabs-test/TabsTest1.vue")
            },
            {
                path: "/tabs-test/tabsTest2",
                name: "TabsTest2",
                component: () => import("@/view/tabs-test/TabsTest2.vue")
            },
            {
                path: "/tabs-test/tabsTest3",
                name: "TabsTest3",
                component: () => import("@/view/tabs-test/TabsTest3.vue")
            },
            {
                path: "/tabs-test/tabsTest4",
                name: "TabsTest4",
                component: () => import("@/view/tabs-test/TabsTest4.vue")
            },
            {
                path: "/tabs-test/tabsTest5",
                name: "TabsTest5",
                component: () => import("@/view/tabs-test/TabsTest5.vue")
            },
        ],
        beforeEnter(to, form, next) {
            // 登入状态判断
            // 最大在线时间 毫秒
            let maxOnlineTime = 60 * 60 * 1000;
            if (!loginInfo.token || !loginInfo.time || loginInfo.time + maxOnlineTime < new Date().getTime()) {
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
