import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 登录注册api
const api = {
  //登录
  login: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
  //注册
  register: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "main_order",
    params: data
  }),
}

export default api