import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// home api
const api = {
  //热门推荐
  getHotRecommend: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
  //轮播图
  getSwipeList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
}

export default api