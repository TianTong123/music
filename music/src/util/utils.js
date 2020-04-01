import store from '@/store/store';

const utils = {
  // 取出本地存储
  getStorage: key => {
    key = key ? key : "default";
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : '';
  },

  // 存入本地存储
  saveStorage: (key, data) => {
    key = key ? key : "default";
    return localStorage.setItem(key, JSON.stringify(data));
  },

  //移除本地存储
  removeStorage: key => {
    key = key ? key : "default";
    return localStorage.removeItem(key);
  },
  // 取出本地存储
  getSession: key => {
    key = key ? key : "default";
    return sessionStorage.getItem(key)
      ? JSON.parse(sessionStorage.getItem(key))
      : '';
  },

  // 存入本地存储
  saveSession: (key, data) => {
    key = key ? key : "default";
    return sessionStorage.setItem(key, JSON.stringify(data));
  },

  //移除本地存储
  removeSession: key => {
    key = key ? key : "default";
    return sessionStorage.removeItem(key);
  },

  // 深复制
  deepCopy: data => {
    return JSON.parse(JSON.stringify(data));
  },

  //时分秒转化
  timeFormat: time => {
    let minutes = parseInt( time  / 60);
    let seconds = parseInt( time  - minutes*60 );
    let m = minutes<10? '0'+ minutes : minutes;
    let s = seconds<10? '0' + seconds : seconds;
    return `${m}:${s}`
  },

  //添加到播放列表
  toPlay(val){
    let tempList = []
    tempList = this.getSession('playList');
    
    if(store.state.playList.length == 0){
      if( tempList==""){
        tempList = []
        tempList.unshift(val)
      }
    }else{
      tempList = store.state.playList
      let index = this.isHave(val, tempList);
      
      if( index != -1 ){
        tempList.splice(index, 1);
      }
      tempList.unshift(val);
    }
    this.saveSession('playList', tempList);
    store.state.playList = tempList;
  },

  //是否重复
  isHave(val, list){
    for(let i = 0; i < list.length; i++){
      if(val.name == list[i].name){
        return i
      }
    }
    return -1
  },


};

export default utils;
