import axios from 'axios';
import msg from "@/components/myMsg";
import router from "@/router";
import {myLoading} from '@/components/myLoading';//引入loading指令
import store from "@/store/store";
import util from "@/util/utils";

let myMsg = msg.myMsg;

/**
 * @url 地址
 * @method 请求方法
 * @params 参数
 * @timeout 超时时间
 * @responseType 响应的数据类型
 * @isOriginalGET 是否get传参
 * @isFullLoading 是否启动全局遮罩
 * @isHalfLoading 是否启动局部遮罩
 */

// 封装请求方法
export const http = ({
  url,
  method,
  params,
  timeout,
  isOriginalGET,
  responseType,
  isFullLoading,
  isHalfLoading,
}) => {

  //遮罩启动
  if(isFullLoading){//全局遮罩
    myLoading.open("加载中");
  }else{//局部遮罩
    if(isHalfLoading) {
      store.state.loading = true;
    }
  }

  // axios response拦截器
  axios.interceptors.response.use(
    response => {
      //关闭遮罩
      myLoading.close();
      store.state.loading = false;

      //登录失效的时候重定向为登录页面
      if(response.data.code == 2){
        myMsg.confirm({
          type: 'error',
          content: '用户数据失效！请登录后重试！',
          callback: ()=>{
            util.removeStorage('user');
            util.removeStorage('token');
            util.removeStorage('menuList');
            util.removeStorage('musicFormList');
            store.state.user = '';
            // this.menuList = [
            //       { name: '首页', code: 'home', id: 8848, class: 'active_menu'},
            //       { name: '榜单', code: 'rank', id: 8849,  class: ''},
            //       { name: '歌手', code: 'singer', id: 8851, class: ''},
            // ]
            // util.saveStorage("menuList", menuList);
            router.push({name: 'home'})
          }
        })
        reject(response);
      }
      if(response.data.code == 3){
        myMsg.confirm({
          type: 'error',
          content: response.data.msg,
        })
        reject(response);
      }else {
        return response
      }
    },
    //接口错误状态处理
    error => {
      if(error.response.status != null || error.response.status != ""){
        //关闭遮罩
        myLoading.close();
        store.state.loading = false;
        let message = "";
        switch (error.response.status) {
          case 400:
            message = '请求参数错误！'
            break
          case 404:
            message = '地址找不到，404错误'
            break
          case 405:
            message = '请求方法错误'
            break
          case 500:
            message = '服务器端出错'
            break
          case 501:
            message = '网络未实现'
            break
          case 502:
            message = '网络错误'
            break
          case 503:
            message = '服务不可用'
            break
          case 504:
            message = '网络超时'
            break
          case 505:
            message = 'http版本不支持该请求'
            break
          default:
            message = `这个错误，是后台的锅！`
        };
        myMsg.confirm({
          type: 'error',
          content: message,//显示返回的错误信息
        });
      } 
      return error
    }
  )

  !params && (params = {});
  let config = {
    method: method,
    url: url,
    timeout: 20000,
    headers: {}
  };
  
  // 用来覆盖默认的超时时间
  if (timeout) {
    config.timeout = timeout;
  }
  
  let token = util.getStorage("token");

  if (token) {
    config.headers.uid = util.getStorage("user").account;
    config.headers.token = token;
  }

  //get方法拼接参数
  method = method.toUpperCase();
  if (method == 'GET') {
    if (isOriginalGET) {
      config.params = params;
    } else {
      // 有参数才在地址后面拼字符串
      if(Object.keys(params).length > 0){
          config.url += `/${encodeURIComponent(JSON.stringify(params))}`;
      }
    }
  } else {
    config.data = params;
  }

  //在请求地址后面加时间戳
  if(config.params){
    config.params.ts = `${(new Date()).getTime()}`;
  } else {
    config.params = {
      ts: `${(new Date()).getTime()}`,
    };
  }
  
  //请求返回类型
  if(responseType){
    config.responseType = responseType
  }

  
  return axios(config);
}
