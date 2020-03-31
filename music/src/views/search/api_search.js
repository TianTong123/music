import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 搜索api
const api = {
  //搜索
  search: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/search",
    isOriginalGET: true,
    params: data
  }),
  //全局搜索
  searchAll: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/searchSingerAndMusic",
    isOriginalGET: true,
    params: data
  }),
}

export default api