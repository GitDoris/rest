import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    //baseURL: 'https://chedai.huihengfinancelease.com/carloan-web', // 生产环境
    //baseURL: 'http://incsit.huaxiafinance.com/post-carloan-api', // sit环境的base_url
    //baseURL: 'http://192.168.9.9:9090/post-carloan-web', // api的base_url 车贷贷后测试  李 对公还款
    //baseURL: 'http://192.168.8.164:9090/post-carloan-web', // api的base_url 车贷贷后测试  原
    //baseURL: 'http://192.168.13.163:9090', // api的base_url 车贷贷后测试  雷
    //baseURL: 'http://192.168.8.250:9090/post-carloan-web/', // api的base_url 车贷贷后测试  吴 财列表
    baseURL: process.env.BASE_API, // api的base_url
    withCredentials: true, //跨域
    timeout: 50000 // 请求超时时间
})
service.commonUrl = process.env.BASE_API;
//service.commonUrl = 'https://chedai.huihengfinancelease.com/carloan-web'; //生产环境
//service.commonUrl='http://incsit.huaxiafinance.com/post-carloan-api';//sit环境
// request拦截器
service.interceptors.request.use(config => {
    // Do something before request is sent
    if (store.getters.token) {
        config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
// service.interceptors.response.use(
//   response => response,
//   /**
//    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//    */
//     //  const res = response.data;
//     //     if (res.code !== 20000) {
//     //       Message({
//     //         message: res.message,
//     //         type: 'error',
//     //         duration: 5 * 1000
//     //       });
//     //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//     //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//     //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//     //           confirmButtonText: '重新登录',
//     //           cancelButtonText: '取消',
//     //           type: 'warning'
//     //         }).then(() => {
//     //           store.dispatch('FedLogOut').then(() => {
//     //             location.reload();// 为了重新实例化vue-router对象 避免bug
//     //           });
//     //         })
//     //       }
//     //       return Promise.reject('error');
//     //     } else {
//     //       return response.data;
//     //     }
//   error => {
//     console.log('err' + error)// for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   })
service.interceptors.response.use(
    response => {
        //console.log(response)
        //console.log("request: response="+JSON.stringify(response) );
        if (response.data.ssotype == true && response.data.redirect) {
            let url = decodeURIComponent(response.data.redirect);
            // 替换url中的redirect内容，不是AJAX使用POST提交的地址，而是页面本身的地址。
            var pos = url.indexOf("redirect=");
            if (pos > 0) {
                url = url.substring(0, pos) + "redirect=" + encodeURIComponent(window.location.href);
            }
            console.log("request: handleSsoRedirect: url=" + url);
            window.location.href = url;
            return Promise.reject('ssoRedirect');
        }
        return response;
    },
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    //  const res = response.data;
    //     if (res.code !== 20000) {
    //       Message({
    //         message: res.message,
    //         type: 'error',
    //         duration: 5 * 1000
    //       });
    //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //           confirmButtonText: '重新登录',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           store.dispatch('FedLogOut').then(() => {
    //             location.reload();// 为了重新实例化vue-router对象 避免bug
    //           });
    //         })
    //       }
    //       return Promise.reject('error');
    //     } else {
    //       return response.data;
    //     }
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service