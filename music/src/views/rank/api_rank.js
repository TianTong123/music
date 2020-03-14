import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 排行榜api
const api = {
  //获取排行榜
  getRank: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
  //点赞
  setIsLikeNum: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
}

export default api