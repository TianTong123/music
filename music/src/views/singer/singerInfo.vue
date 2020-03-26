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
            <li v-for="(e, index) in musicList" :key="index" @click="goMusic(e.id)">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{timeFormat(e.timeLength)}}</div>
              <div class="play-btn"></div>
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
    }
  },
  mounted(){
    this.getUserInfo();
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