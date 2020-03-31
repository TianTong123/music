<template>
  <div class="playerControl" >
    <audio  ref="cMusic" ></audio>
    <!-- 控制条 -->
    <div class="player-control-wrap">
      <div class="music-name">当前播放：<span>{{selectMusic.name}}</span></div>
      <div class="play-btn play">
        <i v-show="isPlay" @click="play" class="icon-mini-pause"></i>
        <i v-show="!isPlay" @click="play" class="icon-mini-play"></i>
      </div>
      <div class="play-btn">{{playList.length}}</div>
      <div class="play-btn" @click="playListFlag = !playListFlag"><i class="icon-mini-menu"></i></div>
      <div class="play-btn"><i class="icon-mini-extend"></i></div>
    </div>
    <!-- 播放列表 -->
    <div class="play-list" v-show="playListFlag">
      <div class="p-l-title">播放列表/{{playList.length}}</div>
      <div class="p-l-clear play-btn"><i class="icon-mini-clear"></i></div>
      <ul class="p-l-wrap">
        <li v-for="(e, index) in playList" 
            :key="index" 
            @click="select(e)"
            :class="{'active-music': index == 1}">
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
      isPlay: false,
      playListFlag: false,
      selectMusic: '',
      
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

        }
        return this.$store.state.playList;
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
        music.play();//播放音乐
        this.isPlay = true;
			}else{
        music.pause();
        this.isPlay = false;
      }
    },

    //
    select(val){
      this.selectMusic = val;
      console.log()
      this.$refs['cMusic'].src = this.$global.musicUrl+val.profileUrl
      this.$refs['cMusic'].play();
      this.isPlay = true;
    },

    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  }
}
</script>

<style scoped>
@import '../../../static/css/playerControl.css';
</style>