import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_search from "@/views/search/api_search";
import api_play from "@/views/player/api_play";
import api_userInfo from "@/views/user/api_userInfo";
import api_rank from "@/views/rank/api_rank";
import api_singer from "@/views/singer/api_singer";
let baseUrl = 'devUrl';

let api = {
  //增加点赞数
  addLikeNum: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/addLikeNum",
    isOriginalGET: true,
    params: data
  }),
  //增加播放量
  addMusicPlayNum: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/addPlayNum",
    isOriginalGET: true,
    params: data
  }),
  //增加收藏数
  addCollectNum: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/addCollectNum",
    isOriginalGET: true,
    params: data
  }),
  //收藏&添加到歌单
  addCollect: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "song_form_info_table/addMusicToForm",
    params: data
  }),
  //移除歌单的歌
  deleteMusicByForm: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "song_form_info_table/removeMusicFromForm",
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
