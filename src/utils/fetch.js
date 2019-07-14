// 在http.js中引入axios
import { MyVue } from '../main.js'
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到

// Vue.use(message)


axios.defaults.baseURL = 'http://wutom.club:3000'


axios.defaults.timeout = 2000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误
        if (response.status === 200) {
            MyVue.$message.error('hhh')
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if (error.message.includes('timeout')) {   // 判断请求异常信息中是否含有超时timeout字符串
            console.log(error.message);
            MyVue.$notification.open({
                message: '警告！',
                description: '请求超时',
                duration: 0,
            });
            return Promise.reject(error);          // reject这个错误信息
        }
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
* @param {String} url [请求的url地址]
* @param {Object} params [请求时携带的参数]
*/
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}