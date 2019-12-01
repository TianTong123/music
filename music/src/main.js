// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/store';
import httpService from './service/service';//封装axios接口强求

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)

//跨域请求
axios.defaults.baseURL = '/api'//https://api.douban.com/v2/movie 改成/api才能用proxyTable跨域
Vue.prototype.$axios = httpService; //新增，有影响就删除
Vue.prototype.$ajax = axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
