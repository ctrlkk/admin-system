import http from "@/utils/request";

/**
 * 请求路由数据
 */
export const getMenuData = () => {
    return http.get('/menu');
}
