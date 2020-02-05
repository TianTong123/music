import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import myInput from '@/components/myInput';
import api from "@/service/api.js";
import message from "@/components/myMsg/index"

Vue.config.productionTip = false
Vue.prototype.$http = api;
Vue.use(myInput);//注册自己封装的输入框
Vue.use(message.register);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
