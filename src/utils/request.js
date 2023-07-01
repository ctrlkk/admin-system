import axios from "axios";
import {user} from "@/store/user";
import store from "@/store";


let {loginInfo} = user(store);

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

    return response;
}, function (error) {

    return Promise.reject(error);
});