import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from './App'
export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home')
  },
  {
    path: '/contracFirst',
    name: 'contracFirst',
    meta: {
      title : '合同开立一级审核'
    },
    component: Layout,
    children: [{
      path: 'contracFirst',
      component:() => import('@/views/contract/first'),
      meta: {
          title: '担保合同开立'
      }
    }]
  }
]
export default new Router({
  routes: constantRouterMap
})
