import { req } from "./req";
import api_login from "@/views/login/api_login";
import api_home from "@/views/home/api_home";
import api_search from "@/views/search/api_search";
import api_play from "@/views/player/api_play";
import api_userInfo from "@/views/user/api_userInfo";
import api_rank from "@/views/rank/api_rank";
// import api_commodity from "@/views/commodity/api_commodity";
let api = {

  // 下载文件1
  // downLoadFile: data =>
  //   req({
  //     baseUrl: "osp",
  //     method: "post",
  //     url: "uploadFastdfs/downFile",
  //     params: data
  //   }),
  // // 下载文件
  // getFileFlow: data =>
  //   req({
  //     baseUrl: "testUrl",
  //     method: "get",
  //     url: "osp/tblResumeBase/downloadFlow",
  //     params: data,
  //     isOriginalGET: true,
  //     responseType: "arraybuffer"
  //   }),
  //搜索
  
};
api = Object.assign(
  api,
  api_login,
  api_home,
  api_search,
  api_play,
  api_userInfo,
  api_rank,
);

export default api;
