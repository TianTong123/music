<template>
  <div class="playerControl" >
    <audio  ref="cMusic" ></audio>
    <!-- 控制条 -->
    <div class="player-control-wrap">
      <div class="music-name">当前播放：<span>{{selectMusic.name}}</span></div>
      <div class="play-btn play" >
        <i v-show="isPlay == -1" class="icon-mini-loading"></i>
        <i v-show="isPlay == 1" @click="play" class="icon-mini-pause"></i>
        <i v-show="isPlay == 0" @click="play" class="icon-mini-play"></i>
      </div>
      <div class="play-btn">{{playList.length}}</div>
      <div class="play-btn" @click="playListFlag = !playListFlag"><i class="icon-mini-menu"></i></div>
      <div class="play-btn" @click="goMusic"><i class="icon-mini-extend"></i></div>
    </div>
    <!-- 播放列表 -->
    <div class="play-list" v-show="playListFlag">
      <div class="p-l-title">播放列表/{{playList.length}}</div>
      <div class="p-l-clear play-btn" @click="clearPlayList"><i class="icon-mini-clear"></i></div>
      <ul class="p-l-wrap">
        <li v-for="(e, index) in playList" 
            :key="index" 
            @click="select(e, index)"
            :class="{'active-music': index == activeIndex}">
          <div class="rank-num">{{index+1}}</div>
          <div class="music-name">{{e.name}}</div>
          <div class="time">{{timeFormat(e.timeLength)}}</div>
          <div class="singer">{{e.singer}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import util from '@/util/utils';
export default {
  data(){
    return{
      isPlay: 0,//是否播放 0暂停， -1加载， 1播放
      playListFlag: false, //显示播放列表的flag
      selectMusic: '',//选中播放的音乐
      activeIndex: 0,//选中的音乐的下标
    }
  },
  mounted(){

  },
  computed:{
    playList:{
      get() {
        let tempList = util.getStorage('playList');
        if(this.$store.state.playList.length == 0){
          return tempList==""?[]:tempList;
        }else{
          tempList = this.$store.state.playList
        }
        if(this.$refs['cMusic']){//如果有歌就播放第一首
          this.select(tempList[0], 0);
        }
        return tempList;
      },
      set(val) {
        util.saveStorage('playList', val);
        this.$store.state.playList = val;
      }
    }
  },
  methods:{
    play(){
      let music = this.$refs['cMusic'];
      if( music.paused ){
        this.isPlay = -1
        music.oncanplay = this.isPlay = 1;
        music.play();//播放音乐
			}else{
        music.pause();
        this.isPlay = 0;
      } 
    },

    //选中播放列表的音乐
    select(val, index){
      this.selectMusic = val;
      this.activeIndex = index;
      this.$refs['cMusic'].src = this.$global.musicUrl+val.profileUrl;
      this.isPlay = -1
      this.$refs['cMusic'].oncanplay = () =>{
        this.$refs['cMusic'].play();
        this.isPlay = 1;
      }
     
    },

    //清空播放列表
    clearPlayList(){
      this.playList = [];
    },

    //跳转播放详情页
    goMusic(id){
      this.play();
      this.playListFlag = false;
      this.$router.push({name:'player',params:{id: this.selectMusic.musicId}});
    },

    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  }
}
</script>

<style scoped>
@import '../../../static/css/playerControl.css';
</style>