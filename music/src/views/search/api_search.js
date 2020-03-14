import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 搜索api
const api = {
  //搜索
  search: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "main_order/orderList",
    isOriginalGET: true,
    params: data
  }),
}

export default api