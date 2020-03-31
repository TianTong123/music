import {req}  from "@/service/req";
let baseUrl = 'devUrl';

// 用户信息api
const api = {
  //修改用户资料
  editUserInfo: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/editAccount",
    params: data,
  }),
  //获取用户信息
  getUserInfo: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/getUserInfo",
    params: data
  }),
  //修改密码
  editPwd: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "account/updatePassword",
    params: data,
  }),
  //上传音乐
  uploadMusic: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/addMusic",
    params: data,
  }),
  //获取歌单
  getMusicFormList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "song_form_info_table/getFormList",
    isOriginalGET: true,
    params: data
  }),
  //获取歌单的歌
  getMusicList: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "song_form_info_table/getFormMusicList",
    isOriginalGET: true,
    params: data
  }),
  //删除歌单
  deleteMusicForm: data => req({
    baseUrl: baseUrl,
    method: "delete",
    url: "song_form_info_table/removeForm",
    params: data
  }),
  //新建歌单
  addMusicForm: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "song_form_info_table/addForm",
    params: data,
  }),
  //修改歌单
  editMusicForm: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "song_form_info_table/editForm",
    params: data,
  }),
  //获取作品
  getMyWorks: data => req({
    baseUrl: baseUrl,
    method: "get",
    url: "music/getSingerMusic",
    isOriginalGET: true,
    params: data
  }),
  //修改作品
  editMyWorks: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "music/editMusic",
    params: data,
  }),
  //删除作品
  deleteMyWorks: data => req({
    baseUrl: baseUrl,
    method: "delete",
    url: "music/batchRemoveMusic",
    params: data
  }),
  //申请认证
  passSinger: data => req({
    baseUrl: baseUrl,
    method: "post",
    url: "songer/passSinger",
    params: data
  }),
}

export default api