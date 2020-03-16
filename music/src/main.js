import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import myInput from '@/components/myInput';//引入输入框
import myUpload from '@/components/myUpload';//引入上传文件
import myDialog from '@/components/myDialog';//引入的弹框
import api from "@/service/api.js";
import message from "@/components/myMsg/index";//引入消息组价
import login from "@/views/login/login"

Vue.config.productionTip = false
Vue.prototype.$http = api;
Vue.use(myInput);//注册自己封装的输入框
Vue.use(myUpload);//同上
Vue.use(myDialog);//同上
Vue.use(message.register);
Vue.use(login.register);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
