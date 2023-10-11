import axios from 'axios'

let config = require('../config');
let baseUrl = config.url.baseUrl + config.url.baseUrlPrefix;
// 创建一个axios实例
const service = axios.create({
    baseURL: baseUrl, // url =基本url +请求url
    // 凭据:true，当跨域请求时发送cookie
    timeout: 10000 // 对超时
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么

        // if (store.persist.token) {
        //     // 让每个请求携带令牌
        //     // ['X-Token']是一个自定义头键
        //     // 请根据实际情况修改
        //     config.headers['X-Token'] = store.persist.token;
        // }
        return config
    },
    error => {
        // 处理请求错误
        // message.error(error.message);
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    /**
     * 如果您想获得http信息，例如头信息或状态信息
     * 请返回response => response
     */

    /**
     * 通过自定义代码确定请求状态
     * 这里只是一个例子
     * 您还可以通过HTTP状态代码来判断状态
     */
    response => {
        if (![200, 201].includes(response.status)) {
            // message.error(response.status)
        }
        return response.data

    },
)

export default service
