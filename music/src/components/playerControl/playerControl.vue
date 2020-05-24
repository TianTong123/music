<template>
  <div class="playerControl" >
    <audio  ref="cMusic" id="cMusic" ></audio>
    <!-- 控制条 -->
    <div class="player-control-wrap">
      <div class="music-name"><span v-if="playList.length != 0">{{playList[activeIndex].name}}</span></div>
      <div class="play-btn play" >
        <i v-show="isPlay == -1" class="icon-mini-loading"></i>
        <i v-show="isPlay == 1" @click="play" class="icon-mini-pause"></i>
        <i v-show="isPlay == 0" @click="play" class="icon-mini-play"></i>
      </div>
      <div class="play-btn">{{playList.length}}</div>
      <div class="play-btn" @click="playListFlag = !playListFlag"><i class="icon-mini-menu"></i></div>
      <div class="play-btn" v-if="playList.length != 0" @click="goMusic"><i class="icon-mini-extend"></i></div>
      <div class="play-btn" @click="lockBar">
        <i v-show="isLock" class="icon-mini-lock"></i>
        <i v-show="!isLock" class="icon-mini-unlock"></i>
      </div>
    </div>
    <!-- 播放列表 -->
    <div class="play-list" v-show="playListFlag && hiddenList">
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
  props:{
    hiddenList: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return{
      //isPlay: 0,//是否播放 0暂停， -1加载， 1播放
      playListFlag: false, //显示播放列表的flag
      selectMusic: '',//选中播放的音乐
      isLock: false,//锁定控制条
    }
  },
  computed:{
    playList:{
      get() {
        let tempList = util.getSession('playList');
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
        util.saveSession('playList', val);
        this.$store.state.playList = val;
      }
    },
    activeIndex:{//当前播放列表下标
      get() {
        let index = util.getSession('activeIndex');
        if(this.$store.state.activeIndex != ''){
          return this.$store.state.activeIndex
        }
        if( index != '' && this.$refs['cMusic']){//如果有歌就播放第一首
          this.select(tempList[index], index);
        }
        return index;
      },
      set(val) {
        util.saveSession('activeIndex', val);
        this.$store.state.activeIndex = val;
      }
    },
    isPlay:{//是否播放 0暂停， -1加载， 1播放
      get() {
        let num = util.getSession('isPlay');
        if(this.$store.state.isPlay != ''){
          return this.$store.state.isPlay
        }
        return num;
      },
      set(val) {
        util.saveSession('isPlay', val);
        this.$store.state.isPlay = val;
      }
    }
  },
  mounted(){
    let playList = util.getSession('playList'); //因为判断是刷新操作，所以如果是刷新 vuex必定全空，获取session肯定对
    let active = util.getSession('activeIndex');
    if(playList == ""){
      return 
    }
    if(playList.length != 0){
      this.$refs['cMusic'].src = this.$global.musicUrl+playList[active].profileUrl;
    }
    if(this.$refs['cMusic'].paused ){
     this.isPlay = 0;
    }else{
     this.isPlay = 1;
    }
  },
  methods:{
    play(){
      let music = this.$refs['cMusic'];
      if(music.src == ''){
        this.$myMsg.notify({content: '请选择一首歌再操作！', type: 'error'});
        return
      }

      if( music.paused ){
        this.isPlay = -1
        music.oncanplay = this.isPlay = 1;
        music.volume = 0.5;
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
      this.$emit('show', true);
      this.$refs['cMusic'].src = this.$global.musicUrl+val.profileUrl;
      this.isPlay = -1
      this.$refs['cMusic'].volume = 0.5;
      this.$refs['cMusic'].oncanplay = () =>{
        this.$refs['cMusic'].play();
        this.isPlay = 1;
      }
    },

    //清空播放列表，留下当前播放的
    clearPlayList(){    
      let temp = this.playList[this.activeIndex]
      this.playList = [];
      util.toPlay(temp);
      this.activeIndex = 0
    },

    //跳转播放详情页
    goMusic(){
      this.playListFlag = false;
      let id = this.playList[this.activeIndex].musicId;
      if( id == null ){
        id = this.playList[this.activeIndex].id
      }
      this.$router.push({name:'player',params:{id}});
    },

    //解锁
    lockBar(){
      this.isLock = !this.isLock;
      this.$emit('isLock', this.isLock)
    },

    //时间格式
    timeFormat: (val) => util.timeFormat(val)
  }, 
  watch:{
    $route(to, from) {
      let music = this.$refs['cMusic'];
      music.ontimeupdate = () =>{
        //结束处理
        if( music.ended ){//归零
          if(this.activeIndex == this.playList.length - 1){
            this.activeIndex = 0
          }else{
            this.activeIndex += 1
          }
          this.select(this.playList[this.activeIndex], this.activeIndex);
        }
      }
    },
  },
}
</script>

<style scoped>
@import '../../../static/css/playerControl.css';
</style>