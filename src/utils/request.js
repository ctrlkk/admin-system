import axios from "axios";

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
