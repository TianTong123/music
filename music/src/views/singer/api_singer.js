import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 歌手api
const api = {
  //搜索
  getSingerList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "songer/searchSinger",
    isOriginalGET: true,
    params: data
  }),
}

export default api