import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 登录注册api
const api = {
  //登录
  login: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/login",
    params: data
  }),
  //注册
  register: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/addAccount",
    params: data
  }),
}

export default api