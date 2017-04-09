// vue 文件
import Vue from 'vue'
// vue 路由
import VueRouter from 'vue-router'
// 异步路由  vux 使用的
import { sync } from 'vuex-router-sync'
// ajax 工具
import VueResource from 'vue-resource'
// 应用程序文件   主要是视图承载
import App from './App'
// 路由
import router from './router/index'
// 数据源
import store from './vuex/store'

// 添加中间件
Vue.use(VueResource)
Vue.use(VueRouter)
sync(store, router)
/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
