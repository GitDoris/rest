import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/index.vue'
import VideoPlayer from '@/views/videoPlayer/index.vue'
import imgManage from '@/views/imgManage/index.vue'
import record from '@/views/record/index.vue'
import tagConfig from '@/views/tagConfig/index.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/videoPlayer',
      name: 'videoPlayer',
      meta: {
        title : '视频列表'
      },
      component: VideoPlayer
    },
    {
      path: '/imgManage',
      name: 'imgManage',
      meta: {
        title : '图片列表'
      },
      component: imgManage
    },
    {
      path: '/record',
      name: 'record',
      meta: {
        title : '审核记录列表'
      },
      component: record
    },
  
    {
      path: '/tagConfig',
      meta: {
        title : '标签配置'
      },
      name: 'tagConfig',
      component: tagConfig
    },
  
    
  ]
})
