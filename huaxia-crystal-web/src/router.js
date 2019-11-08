import VueRouter from 'vue-router'

// 导入对应的路由组件
import Crystal from '@/views/crystal.vue'

// 创建路由对象
var router = new VueRouter({
  routes: [
   
    { path: '/',redirect: '/crystal' },
    { path: '/crystal', component: Crystal },
    
  ]
})
// 把路由对象暴露出去
export default router