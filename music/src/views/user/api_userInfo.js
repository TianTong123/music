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
  //获取用户信息
  getUserInfo: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/getUserInfo",
    params: data
  }),
  //修改密码
  editPwd: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/updatePassword",
    params: data
  }),
  //上传音乐
  uploadMusic: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/addMusic",
    params: data
  }),
}

export default api