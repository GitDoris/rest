import "babel-polyfill";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/css/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/huaxia.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {
  setCookie,
  getCookie
} from "@/utils/cookie"
// setCookie('uname','admin11')
Vue.prototype.getCookie = getCookie

//视频播放器

import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')