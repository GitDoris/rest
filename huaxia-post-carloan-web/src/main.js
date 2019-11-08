import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import './assets/css/main.css'
import App from './App'
import router from './router'
import store from './store'

import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data generator

import dateUtils from 'date-utils'

import * as filters from './filters' // global filter

Vue.use(Element)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
