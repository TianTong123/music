import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_search from "@/views/search/api_search";
import api_play from "@/views/player/api_play";
import api_userInfo from "@/views/user/api_userInfo";
import api_rank from "@/views/rank/api_rank";
import api_singer from "@/views/singer/api_singer";

let api = {
  //增加点赞数
  addLikeNum: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/addLikeNum",
    params: data
  }),
  //增加播放量
  addMusicPlayNum: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/addPlayNum",
    params: data
  }),
  //增加收藏数
  addMusicPlayNum: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/addCollectNum",
    params: data
  }),
};
api = Object.assign(
  api,
  api_login,
  api_home,
  api_search,
  api_play,
  api_userInfo,
  api_rank,
  api_singer,
);

export default api;
