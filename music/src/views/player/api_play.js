import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 用户信息api
const api = {
  //获取用户信息
  getMusic: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/getMusic",
    isOriginalGET: true,
    params: data
  }),
}

export default api