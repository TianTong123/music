import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 登录注册api
const api = {
  //登录
  login: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/login",
    params: data,
    isFullLoading: true,
  }),
  //注册
  register: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/addAccount",
    params: data,
    isFullLoading: true,
  }),
}

export default api