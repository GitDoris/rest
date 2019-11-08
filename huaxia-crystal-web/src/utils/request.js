import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// import baseUrl from '../config/setBaseUrl'

// 
// axios.defaults.baseURL = baseUrl
let baseUrl ='/api'
switch (process.env.VUE_APP_TYPE) {
  case 'development':
    //baseUrl = 'https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/'
    baseUrl = 'http://192.168.9.49:20000/huaxia-crystal_ball/'
    break
  case 'sit':
    baseUrl = 'http://incsit.huaxiafinance.com/huaxia-crystal_ball/'
    break
  case 'uat':
    baseUrl = 'https://incuat.huaxiafinance.com/huaxia-crystal_ball/'
    break
  case 'production':
    baseUrl = 'https://puv.huaxiafinance.com/huaxia-crystal_ball/'
    break
}

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 30000 ,
// 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
 
    /**
    * 单点登陆（嵌套到整个系统中时需要的）
    */
    if(response.data.ssotype == true && response.data.redirect){
      let url = decodeURIComponent(response.data.redirect);
      // 替换url中的redirect内容，不是AJAX使用POST提交的地址，而是页面本身的地址。
      var pos = url.indexOf("redirect=");
      if(pos >0){
        url = url.substring(0, pos) + "redirect="+encodeURIComponent(window.location.href);
      }
      window.location.href = url;
      return Promise.reject('ssoRedirect');
    }

    // 后台接口导出application/json;charset=UTF-8
    const headers = response.headers
    if (headers['content-type'] === 'application/json;charset=UTF-8') {
      return response.data
    }
    return response.data;
    
     /**
      * code为非0000是抛错 可结合自己业务进行修改
      */
    const res = response.data
    if (res.code !== "0000") {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload()// 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
