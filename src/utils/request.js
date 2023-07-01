import axios from "axios";
import {user} from "@/store/user";
import store from "@/store";
import {error} from "@/utils/log";

const {loginInfo} = user(store);

const baseURL = "http://127.0.0.1:3000/api"

const http = axios.create({
    baseURL: baseURL,
    timeout: 10 * 1000,
});

export default http;
/**
 * 请求拦截器
 */
http.interceptors.request.use(function (config) {
    // 在请求时带上令牌
    config.headers.token = loginInfo.token;

    return config;
}, function (error) {

    return Promise.reject(error);
});

/**
 * 响应拦截器
 */
http.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        handleError(response.status);
    }
    return response;
}, function (error) {
    handleError(null, error);

    return Promise.reject(error);
});


/**
 * 统一错误处理函数
 * @param code 状态码
 * @param errorInfo 错误信息
 */
export function handleError(code, errorInfo) {
    switch (code) {
        case 400:
            error('请求参数错误', errorInfo);
            break;
        case 401:
            error('未登录或登录过期', errorInfo);
            break;
        case 403:
            error('没有权限访问', errorInfo);
            break;
        case 404:
            error('请求资源不存在', errorInfo);
            break;
        case 500:
            error('服务器内部错误', errorInfo);
            break;
        default:
            error(`请求失败：${code}`, errorInfo);
    }
}
