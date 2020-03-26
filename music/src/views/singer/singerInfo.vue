<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster"><img v-if="user.photoUrl" :src="$global.imgUrl+user.photoUrl" alt=""></div>
        <div class="name"><span>名字：</span>{{user.accountName}}</div>
        <div class="detail-info"><span>介绍：</span>{{user.info}}</div>
      </div>
      <div class="music-list" style=" min-height: 1000px">
        <div class="title">他的歌曲</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in musicList" :key="index" >
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{timeFormat(e.timeLength)}}</div>
              <div class="play-btn" @click="goMusic(e.id)"><i class="icon-mini-play"></i></div>
              <div class="play-btn" @click="diaAddMusicForm = !diaAddMusicForm">
                <i class="icon-add"></i>
                <div class="my-form-wrap" v-show="diaAddMusicForm">
                  <div class="my-form-card" v-for="(e, index) in addMusicFormList" @click="addCollect(false, e.id)" :key="index">
                    <span>{{index+1}}</span>
                    {{e.songFormName}}
                  </div>
                </div>
              </div>
              <div class="play-btn" @click="addLike()"><i class="icon-like"></i></div>
              <div class="play-btn" @click="addCollect(true)"><i class="icon-collect"></i></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import util from '@/util/utils';

export default {
  data(){
    return{
      user: {},
      musicList: [],
      diaAddMusicForm: false,
      addMusicFormList: [],
    }
  },
  mounted(){
    this.getUserInfo();
    this.addMusicFormList = util.getStorage('musicFormList')
  },
  methods:{

    //获取用户信息
    getUserInfo(){
      let parames = {
        id: this.$route.params.id,
      }
      this.$http.getUserInfo( parames ).then(({data}) => {
        if (data.code == 0){
          this.user = data.data; 
          this.getMyWorks(this.user.singerId);   
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      });
    },

    //获取作品
    getMyWorks(id){
      let parames = {
        flag: 1,
        songerId: id,
      }
      this.$http.getMyWorks( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicList = data.data;
          
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //收藏&添加到歌单
    addCollect(flag, id){
      if(util.getStorage('user') == ''){
        this.$myMsg.notify({content: '请登录后再操作！', type: 'error'})
        return
      }
      let parames = {
        formId: flag?util.getStorage('musicFormList')[1].id:id,
        songId: this.musicInfo.id,
      }
      this.$http.addCollect( parames ).then(({data}) => {
        this.$myMsg.notify({content: '添加成功', type: 'success'})
        if(flag){
          this.$http.addCollectNum({ musicId: parames.songId });//增加收藏数
        }
        
      })
    },
    //我喜欢
    addLike(){
      if(util.getStorage('user') == ''){
        this.$myMsg.notify({content: '请登录后再操作！', type: 'error'})
        return
      }
      let parames = {
        formId: util.getStorage('musicFormList')[0].id,
        songId: this.musicInfo.id,
      }
      this.$http.addCollect( parames ).then(({data}) => {
        this.$myMsg.notify({content: '添加成功', type: 'success'})
      })
    },
    goMusic(index){
      this.$router.push({
        path: `../../player/${index}`
      })
    },
    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  }
}
</script>
<style scoped>
@import '../../../static/css/singerInfo.css';
</style>