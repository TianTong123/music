import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 用户信息api
const api = {
  //修改用户资料
  editUserInfo: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/editAccount",
    params: data
  }),
}

export default api