<p align="center">
  <img width="320" src="https://wpimg.wallstcn.com/ecc53a42-d79b-42e2-8852-5126b810a4c8.svg">
</p>

# vue-element-admin

[![vue](https://img.shields.io/badge/vue-2.5.10-brightgreen.svg)](https://github.com/vuejs/vue)
[![element-ui](https://img.shields.io/badge/element--ui-2.0.8-brightgreen.svg)](https://github.com/ElemeFE/element)
[![Build Status](https://travis-ci.org/PanJiaChen/vue-element-admin.svg?branch=master)](https://travis-ci.org/PanJiaChen/vue-element-admin)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/PanJiaChen/vue-element-admin.svg)]()

**A magical vue admin.**

- [线上地址](http://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/#/)

- [English Document](https://github.com/PanJiaChen/vue-element-admin/blob/master/README-en.md)

- [wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)

- [donate](https://panjiachen.github.io/vue-element-admin-site/#/donate)

**本项目的定位是后台集成方案，不适合当基础模板来开发。**
 - 模板建议使用: [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template)  
 - 桌面端: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

**注意：该项目使用 element-ui@2.0.0+ 版本，所以最低兼容 vue@2.5.0**

## 前序准备

你的本地环境需要安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。我们的技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 和 [element-ui](https://github.com/ElemeFE/element)，提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套一个系列的教程文章，如何从零构建后一个完整的后台项目，建议大家先看完这些文章再来实践本项目
 - [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
 - [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
 - [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
 - [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
 - [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
 - [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

 响应需求，开了一个qq群 `591724180` 方便大家交流

 或者加入该群主 **[圈子](https://jianshiapp.com/circles/1209)** 楼主会经常分享一些技术相关的东西

 **如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**

 **本项目并不是一个脚手架，更倾向于是一个集成解决方案**

 **该项目不支持低版本游览器(如ie)，有需求请自行添加polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

 <p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## 功能
- 登录/注销
- 权限验证
- 多环境发布
- 动态侧边栏（支持多级路由）
- 动态面包屑
- 国际化多语言
- 多种动态换肤
- 快捷导航(标签页 支持右键操作)
- 富文本编辑器
- Markdown编辑器
- JSON编辑器
- Screenfull全屏
- 列表拖拽
- Svg Sprite 图标
- Dashboard
- 本地mock数据
- Echarts 图表
- Clipboard(剪贴复制)
- 401/404错误页面
- 错误日志
- 导出excel
- 导出zip
- 前端可视化excel
- Table example
- 动态table example
- 拖拽table example
- 内联编辑table example
- Form example
- 二步登录
- SplitPane
- Dropzone
- Sticky
- CountTo
- Markdown to html

## 开发
```bash
	# 克隆项目
	git clone https://xieyuying@git.huaxiafinance.com/post-carloan/huaxia-post-carloan-web.git

	# 安装依赖
	npm install
	   
	# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
	npm install --registry=https://registry.npm.taobao.org

	# 启动服务
	npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash
	# 构建测试环境
	npm run build:sit

	# 构建生成环境
	npm run build:prod
```

## 其它
```bash
	# --report to build with bundle size analytics
	npm run build:prod --report

	# --preview to start a server in local to preview
	npm run build:prod --preview

	# lint code
	npm run lint
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/#/deploy)

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 图片等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目svg icons
│   ├── lang                   // 国际化 lang
│   ├── mock                   // 项目mock 模拟数据
│   ├── router                 // 路由
│   ├── store                  // 全局 store
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                  // views
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口js 初始化 加载组件等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── .eslintrc.js               // eslint 配置项
├── .postcssrc.js              // postcss 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/PanJiaChen/vue-element-admin/releases).

## Online Demo
[查看更多demo](http://panjiachen.github.io/vue-element-admin)

## License

MIT


