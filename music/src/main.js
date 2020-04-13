import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store';
import myInput from '@/components/myInput';//引入输入框
import myUpload from '@/components/myUpload';//引入上传文件
import myDialog from '@/components/myDialog';//引入的弹框
import {myLoading} from '@/components/myLoading';//引入loading指令
import mySelect from '@/components/mySelect';//引入选择框
import myOption from '@/components/myOption';//引入选择框的option
import api from "@/service/api.js";
import message from "@/components/myMsg/index";//引入消息组价
import login from "@/views/login/login"
import global from './store/global.js' ; //全局变量

Vue.config.productionTip = false
Vue.prototype.$global = global;
Vue.prototype.$http = api;
Vue.prototype.$myLoading = myLoading;//引入loading服务
Vue.use(myInput);//注册自己封装的输入框
Vue.use(myUpload);//同上
Vue.use(myDialog);//同上
Vue.use(mySelect);
Vue.use(myOption);
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
