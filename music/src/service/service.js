import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router';

//import {baseUrl}  from '../config/env'


// 线上环境配置axios.defaults.baseURL，生产环境则用proxy代理
//if (process.env.NODE_ENV === 'production') {
//  axios.defaults.baseURL = baseUrl;
//}

// 超时时间 axios.defaults.timeout = 30000; 
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //console.log(config);
  if (sessionStorage.getItem('access_token')) {
    if ('post' == config.method || 'put' == config.method) {
      config.data = config.data + '&token=' + sessionStorage.getItem('access_token');
    } else if ('get' == config.method) {
      config.params = {
        token: sessionStorage.getItem('access_token'),
        ...config.params,
      }
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  //console.log("我错了啥！");
  return Promise.reject(error);
});


//添加响应拦截器
axios.interceptors.response.use(function (response) {
  //alert("拦截成功？？？");  
  //显示响应信息
  messageShow(response.data);

  //如果code为2003则token 已过期,让他失效，重定向到登录页（要求用户重新）
  if (2003 == response.data.code) {
    //清除本地、sessionStorage的数据
    localStorage.clear();
    sessionStorage.clear();
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

function messageShow( data ){
  if( data.code == 0 )
    Message.error( data.msg );
  else if( data.code == 1 )
    Message({
      message: data.msg,
      type: 'success'
    });

}

export default {
  post(url, params) {
    return axios({
      method: 'post',
      url: `${url}`,
      data: params || {}
    });
  },
  get(url, params) {
    //console.log(params);
    let tempParams = {
      ...(params || {}),
      _timer: +(new Date()), // 解决IE缓存添加一个随机时间戳
    }
    return axios({
      method: 'get',
      params: tempParams,
      url: `${url}`
    });
  },
  put(url, params) {
    return axios({
      method: 'put',
      url: `${url}`,
      data: params || {}
    });
  },
  delete(url, params) {
    return axios({
      method: 'delete',
      params: params || {},
      url: `${url}`
    });
  }

}
