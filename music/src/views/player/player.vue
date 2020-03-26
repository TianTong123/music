<template>
  <div class="player">
    <div class="bg">
      <img v-if="musicInfo.posterUrl != null" :src="$global.imgUrl+musicInfo.posterUrl" alt="">
    </div>
    <div class="wrap" @click="musicListFlag = false">
      <div class="content">
        <div class="poster">
          <div class="poster-wrap"><img v-if="musicInfo.posterUrl != null" :src="$global.imgUrl+musicInfo.songImg" alt=""></div>
          <div class="more-wrap">
            <div class="more-btn"><i class="icon-islike"></i>{{musicInfo.likeNum}}</div>
            <div class="more-btn line"><i class="icon-collect"></i>{{musicInfo.collectNum}}</div>
            <div class="more-btn"><i class="icon-mini-play like"></i>{{musicInfo.playNum}}</div>
          </div>
        </div>
        <div class="info">
          <div class="music-title">{{musicInfo.name}}</div>
          <div class="singer"><span>歌手：</span>{{musicInfo.singer}}</div>
          <!-- 歌词 -->
          <div class="lyric" ref="lyricWrap" > 
            <div class="lyric-wrap">
              <p :class="{'active-line': activeLine(e, index, nowPlayTime)}" v-for="(e, index) in lyric" :key="index">{{e.LrcLine}}</p>
            </div>
          </div>
          <!-- 播放列表 -->
          <div class="play-list" v-show="musicListFlag">
            <div class="p-l-title">播放列表/12</div>
            <ul class="p-l-wrap">
              <li v-for="(e, index) in 33" :key="index" :class="{'active-music': index == 1}">
                <div class="rank-num">{{index+1}}</div>
                <div class="music-name">届かない恋</div>
                <div class="time">05:09</div>
                <div class="singer">上原れな</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <audio id="music" ref="music" :src="$global.musicUrl+musicInfo.profileUrl"></audio>
	  <div class="music-bar" ref="musicBar">
      <div class="music-bar-bg"><img v-if="musicInfo.posterUrl != null" :src="$global.imgUrl+musicInfo.posterUrl" alt=""></div>
	  	<div class="music-bar-wrap" @mouseup="dragFlag = false"  @mousemove="progressDrag">
        <!-- 控制菜单 -->
	      <div class="control">
	      	<div class="previous"><i class="icon-previous"></i></div>
	      	<div class="play" @click="playClick" ><i :class="playBtn"></i></div>
	      	<div class="previous"><i class="icon-next"></i></div>
	      </div>
	      <!-- 进度条 -->
	      <div class="progress-bar noselect" ref="mProgressBar" @click="progressClick">
	      	<div class="m-progress" ref="mProgress">
	      		<div class="m-p-icon" ref="mProgressIcon"  @mouseup="dragFlag = false" @mousedown="dragFlag = true" ></div>
	      	</div>	
	      	<span class="noselect">{{`${playTime} / ${totalDuration}`}}</span>	
	      </div>
        <!-- 音量 -->
	      <div :class="voiceIconClass" @click="voiceClick"></div>
        <!-- 播放列表 -->
        <div class="icon-music-list music-list-btn" @click="musicListFlag = !musicListFlag">33</div>
      </div>
    </div><!-- music_bar end --> 
  </div>
</template>

<script>
import util from '@/util/utils';

export default {
  data(){
    return{
      musicInfo: '',
      mLength: 0,//音乐时长
      dragFlag: false,//拖动flag true按着鼠标不放，false就是松开鼠标
      musicListFlag: false,//播放列表
      voiceIconClass: 'icon-voice',//音量图标
      lyricIndex: 0,//当前歌词激活的下标
      lyric: [],
      /* 音乐播放器控制参数 */
      music: '',//音频文件
      nowPlayTime: "",//当前播放毫秒数(按下播放就开始以毫秒的速度自增1，暂停就停止)
      mProgress: '',//进度条（会动的那条）
      mProgressIcon: '',//进度条头上的那个点
      mProgressBar: '',//进度条背景
      playBtn: 'icon-play',
      totalDuration: "00/00",//进度条右下角播放时间
      playTime: "00:00",//当前播放时长
      progressWidth: 0,//当前播放的进度条长度
      /* 音乐播放器控制参数 end */
    }
  },
  methods:{
    //获取歌
    getMusic(){
      let parames = {
        musicId: this.$route.params.id||6,
      }
      this.$http.getMusic( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicInfo = data.data;
          this.lyric = data.data.lrc;
          this.mLength = data.data.timeLength;
          this.totalDuration = util.timeFormat(this.mLength);
          this.initParames();
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },
    
    //播放
    playClick(){
      if( this.music.paused ){
        this.music.play();//播放音乐
        this.playBtn = "icon-pause";
			}else{
        this.music.pause();
        this.playBtn = "icon-play"
        return;
      }

      //启动时间监听钩子
      this.music.ontimeupdate = () =>{
        //时间处理
        let mLength = this.music.currentTime;
        this.nowPlayTime =  parseInt( mLength  * 1000);
        this.playTime = util.timeFormat(mLength);

        //进度条处理
        /*进度条百分比计算*/
				var long = mLength * 650 / this.music.duration;//得到进度条长度，650是进度条总长度
				this.mProgress.style.width = long + "px";
				this.mProgressIcon.style.left = long + "px";


        //结束处理
				if( this.music.ended ){//归零
          this.music.currentTime = 0;
          this.nowPlayTime = 0;
        }
      }
    },

    //进度条点击
    progressClick(event){
      let e = event ? event : window.event;
      let value = e.clientX - this.mProgressBar.offsetLeft;
      this.music.currentTime = parseInt(value * this.music.duration / 650);
			this.mProgress.style.width = value + "px";
      this.mProgressIcon.style.left = value + "px";
      //歌词位置刷新
      this.lyricScoll();
    },

    //进度条拖动
    progressDrag(event){
      let e = event ? event : window.event;
      if(this.dragFlag){ //是否拖动
        let value = e.clientX - this.mProgressBar.offsetLeft;
        let valueY = e.clientY- this.$refs.musicBar.offsetTop;
        if(valueY <= 10 || valueY >= 70){//判断鼠标是否远离（为什么不用鼠标的移出事件？因为有bug）
          this.dragFlag = false;
          return;
        }else{
          if( value >=0 && value <= 650){
          this.music.currentTime = parseInt(value * this.music.duration / 650);
			      this.mProgress.style.width = value + "px";
            this.mProgressIcon.style.left = value + "px";
          }else if(value < 0){
            this.music.currentTime = 0;
          }else{
            this.music.currentTime = this.music.duration -1;
          }
        }
      }
      
    },

    //激活歌词
    activeLine(e, index, time){
      let timeFlag = time >= e.TimeMs && time < this.lyric[index+1].TimeMs;
      if( e.type == 5 && timeFlag ){
        this.lyricIndex = index;
        return true;
      }
      return false;
    },

    //歌词滚动计算方法
    lyricScoll(){
      let mLength = this.music.currentTime;
      this.nowPlayTime =  parseInt( mLength  * 1000);
      for(let i = 0; i <this.lyric.length; i ++){
        if(this.lyric[i].TimeMs >= this.nowPlayTime){
          this.lyricIndex = i;
          break;
        }
      }
      this.$refs.lyricWrap.scrollTop = this.lyricIndex * 40 - 210;
    },

    //音量点击
    voiceClick(){
      switch (this.voiceIconClass){
        case 'icon-voice':
          this.music.volume = 1;
          this.voiceIconClass = 'icon-max-voice';
          break;
        case 'icon-max-voice':
          this.music.volume = 0;
          this.voiceIconClass = 'icon-not-voice';
          break;
        case 'icon-not-voice':
          this.music.volume = 0.5;
          this.voiceIconClass = 'icon-voice';
          break;
      }
    },

    //初始化参数
    initParames(){
      //赋值
      this.music = document.getElementById('music'); //this.$refs.music;
      this.mProgress = this.$refs.mProgress;
      this.mProgressIcon = this.$refs.mProgressIcon;
      this.mProgressBar = this.$refs.mProgressBar;
      this.music.volume = 0.5;
      console.log()
      //初始化歌词位置
      let firsIndex = "";
      for(let i = 0; i <this.lyric.length; i ++){
        if(this.lyric[i].type == 5){
          firsIndex = i;
          break;
        }
      }
      //每一行的高度为35，高亮位置放在210，所以把第一条歌词放在245
      let lHeight = 210-firsIndex*35;
      this.$refs.lyricWrap.scrollTop  = -lHeight;//下面注释的，是为了适配所有情况要用的(暂时不写，没时间啊)
      // if( lHeight >= 0 ){//当前面很长很长时，要做什么
      //   this.lyricTop = lHeight;
      // }else{
      //   this.lyricTop = lHeight;
      // }
    }

  },
  beforeMount(){
    this.getMusic();
  },
  mounted(){
    
   
    

   
    
  },
  watch:{
    //监听激活的歌词是否变化，如果有变化就移动歌词
    lyricIndex(){
      //滚动歌词
      //this.$refs.lyricWrap.scrollTop  += 35;
      this.lyricScoll();
    },
  }
}
</script>

<style scoped>
@import '../../../static/css/play.css';
</style>