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
            label: "标签页测试",
            icon: "MessageBox",
            children: [
                {path: "/tabs-test/tabsTest1", name: "TabsTest1", label: "TabsTest1", icon: "FullScreen"},
                {path: "/tabs-test/tabsTest2", name: "TabsTest2", label: "TabsTest2", icon: "FullScreen"},
                {path: "/tabs-test/tabsTest3", name: "TabsTest3", label: "TabsTest3", icon: "FullScreen"},
                {path: "/tabs-test/tabsTest4", name: "TabsTest4", label: "TabsTest4", icon: "FullScreen"},
                {path: "/tabs-test/tabsTest5", name: "TabsTest5", label: "TabsTest5", icon: "FullScreen"},
            ]
        },
        {
            label: "组件测试",
            icon: "FullScreen",
            children: [
                {label: "昼夜switch", path: "/ButtonTest", name: "ButtonTest", icon: "Open"},
                {label: "标签页组件", path: "/TabsTest", name: "TabsTest", icon: "More"},
                {label: "图片裁切组件", path: "/UploadImage", name: "UploadImage", icon: "UploadFilled"}
            ]
        },
        {
            "path": "",
            "children": [
                {
                    "path": "",
                    "children": [
                        {
                            "path": "",
                            "children": [
                                {
                                    "path": "",
                                    "children": [
                                        {
                                            "path": "",
                                            "children": [
                                                {
                                                    "path": "",
                                                    "children": [
                                                        {
                                                            "path": "",
                                                            "children": [
                                                                {
                                                                    "path": "",
                                                                    "children": [
                                                                        {
                                                                            "path": "",
                                                                            "children": [
                                                                                {
                                                                                    "path": "",
                                                                                    "children": [
                                                                                        {
                                                                                            "path": "",
                                                                                            "children": [
                                                                                                {
                                                                                                    "path": "/test/test1",
                                                                                                    "name": "Test1",
                                                                                                    "icon": "Link",
                                                                                                    "id": 33,
                                                                                                    "label": "测试页1"
                                                                                                },
                                                                                                {
                                                                                                    "path": "/test/test2",
                                                                                                    "name": "Test2",
                                                                                                    "icon": "Link",
                                                                                                    "id": 34,
                                                                                                    "label": "测试页2"
                                                                                                }
                                                                                            ],
                                                                                            "name": "",
                                                                                            "icon": "",
                                                                                            "id": 24,
                                                                                            "label": "10级"
                                                                                        }
                                                                                    ],
                                                                                    "name": "",
                                                                                    "icon": "",
                                                                                    "id": 23,
                                                                                    "label": "9级"
                                                                                }
                                                                            ],
                                                                            "name": "",
                                                                            "icon": "",
                                                                            "id": 22,
                                                                            "label": "8级"
                                                                        }
                                                                    ],
                                                                    "name": "",
                                                                    "icon": "",
                                                                    "id": 21,
                                                                    "label": "7级"
                                                                }
                                                            ],
                                                            "name": "",
                                                            "icon": "",
                                                            "id": 20,
                                                            "label": "6级"
                                                        }
                                                    ],
                                                    "name": "",
                                                    "icon": "",
                                                    "id": 19,
                                                    "label": "5级"
                                                }
                                            ],
                                            "name": "",
                                            "icon": "",
                                            "id": 18,
                                            "label": "4级"
                                        }
                                    ],
                                    "name": "",
                                    "icon": "",
                                    "id": 17,
                                    "label": "3级"
                                }
                            ],
                            "name": "",
                            "icon": "",
                            "id": 16,
                            "label": "2级"
                        }
                    ],
                    "name": "",
                    "icon": "",
                    "id": 15,
                    "label": "1级"
                }
            ],
            "name": "",
            "icon": "Menu",
            "id": 14,
            "label": "无限分级"
        }
    ]
}
