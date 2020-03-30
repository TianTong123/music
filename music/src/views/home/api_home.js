import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// home api
const api = {
  //热门推荐
  getHotRecommend: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "song-recommend-table/getSingerList",
    isOriginalGET: true,
    params: data,
    isFullLoading: true
  }),
  //轮播图
  getSwipeList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "slide-img/getSlideImgList",
    isOriginalGET: true,
    params: data
  }),
}

export default api