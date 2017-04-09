import Vue from 'vue'
// 状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
// vux 的解码支持   如果不添加会报错
import app from './modules/app'
import home from './modules/home'
import vuexI18n from 'vuex-i18n'
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store,
    app,
    home
  }
})
// 加入中间件
Vue.use(vuexI18n.plugin, store)
export default store
