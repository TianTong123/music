<template>
  <div class="player">
    <div class="bg"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
    <div class="wrap" @click="musicListFlag = false">
      <div class="content">
        <div class="poster"><div class="poster-wrap"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div></div>
        <div class="info">
          <div class="music-title">届かない恋</div>
          <div class="singer"><span>歌手：</span>上原れな</div>
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
    <audio id="music" ref="music" src="../../../static/images/届かない恋 .mp3"></audio>
	  <div class="music-bar" ref="musicBar">
      <div class="music-bar-bg"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
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
export default {
  data(){
    return{
      dragFlag: false,//拖动flag true按着鼠标不放，false就是松开鼠标
      musicListFlag: false,//播放列表
      voiceIconClass: 'icon-voice',//音量图标
      lyricIndex: 0,//当前歌词激活的下标
      lyric: [
             {
          "type": 1,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "届かない恋 "
        },
        {
          "type": 0,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "上原れな"
        },
        {
          "type": 3,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "Vine"
        },
        {
          "type": 5,
          "Time": "00:00.53",
          "TimeMs": 53,
          "LrcLine": "「届かない恋 ’13」"
        },
        {
          "type": 5,
          "Time": "00:03.53",
          "TimeMs": 3053,
          "LrcLine": "作詞∶須谷尚子"
        },
        {
          "type": 5,
          "Time": "00:06.53",
          "TimeMs": 6053,
          "LrcLine": "作曲∶石川真也"
        },
        {
          "type": 5,
          "Time": "00:09.53",
          "TimeMs": 9053,
          "LrcLine": "編曲∶小林俊太郎"
        },
        {
          "type": 5,
          "Time": "00:12.53",
          "TimeMs": 12053,
          "LrcLine": "歌∶上原れな"
        },
        {
          "type": 5,
          "Time": "00:16.53",
          "TimeMs": 16053,
          "LrcLine": "TVアニメ「WHITE ALBUM2」OPテーマ"
        },
        {
          "type": 5,
          "Time": "00:24.53",
          "TimeMs": 24053,
          "LrcLine": "孤独なふりをしてるの?"
        },
        {
          "type": 5,
          "Time": "00:31.52",
          "TimeMs": 31052,
          "LrcLine": "なぜだろう 気になっていた"
        },
        {
          "type": 5,
          "Time": "00:38.64",
          "TimeMs": 38064,
          "LrcLine": "気づけば いつのまにか"
        },
        {
          "type": 5,
          "Time": "00:45.71",
          "TimeMs": 45071,
          "LrcLine": "誰より 惹かれていた"
        },
        {
          "type": 5,
          "Time": "00:54.20",
          "TimeMs": 54020,
          "LrcLine": "どうすれば この心は 鏡に映るの?"
        },
        {
          "type": 5,
          "Time": "01:07.98",
          "TimeMs": 67098,
          "LrcLine": "届かない恋をしていても"
        },
        {
          "type": 5,
          "Time": "01:15.05",
          "TimeMs": 75005,
          "LrcLine": "映しだす日がくるかな"
        },
        {
          "type": 5,
          "Time": "01:21.10",
          "TimeMs": 81010,
          "LrcLine": "ぼやけた答えが"
        },
        {
          "type": 5,
          "Time": "01:24.68",
          "TimeMs": 84068,
          "LrcLine": "見え始めるまでは"
        },
        {
          "type": 5,
          "Time": "01:29.89",
          "TimeMs": 89089,
          "LrcLine": "今もこの恋は 動き出せない"
        },
        {
          "type": 5,
          "Time": "01:56.89",
          "TimeMs": 116089,
          "LrcLine": "初めて声をかけたら"
        },
        {
          "type": 5,
          "Time": "02:03.93",
          "TimeMs": 123093,
          "LrcLine": "振り向いてくれたあの日"
        },
        {
          "type": 5,
          "Time": "02:11.08",
          "TimeMs": 131008,
          "LrcLine": "あなたは 眩しすぎて"
        },
        {
          "type": 5,
          "Time": "02:18.11",
          "TimeMs": 138011,
          "LrcLine": "まっすぐ見れなかった"
        },
        {
          "type": 5,
          "Time": "02:26.63",
          "TimeMs": 146063,
          "LrcLine": "どうすれば その心に 私を写すの?"
        },
        {
          "type": 5,
          "Time": "02:40.41",
          "TimeMs": 160041,
          "LrcLine": "叶わない恋をしていても"
        },
        {
          "type": 5,
          "Time": "02:47.34",
          "TimeMs": 167034,
          "LrcLine": "写しだす日がくるかな"
        },
        {
          "type": 5,
          "Time": "02:53.51",
          "TimeMs": 173051,
          "LrcLine": "ぼやけた答えが"
        },
        {
          "type": 5,
          "Time": "02:57.10",
          "TimeMs": 177010,
          "LrcLine": "少しでも見えたら"
        },
        {
          "type": 5,
          "Time": "03:02.35",
          "TimeMs": 182035,
          "LrcLine": "きっとこの恋は 動き始める"
        },
        {
          "type": 5,
          "Time": "03:34.16",
          "TimeMs": 214016,
          "LrcLine": "どうすれば この心は 鏡に映るの?"
        },
        {
          "type": 5,
          "Time": "03:47.95",
          "TimeMs": 227095,
          "LrcLine": "届かない恋をしていても"
        },
        {
          "type": 5,
          "Time": "03:54.83",
          "TimeMs": 234083,
          "LrcLine": "映しだす日がくるかな"
        },
        {
          "type": 5,
          "Time": "04:01.08",
          "TimeMs": 241008,
          "LrcLine": "ぼやけた答えが"
        },
        {
          "type": 5,
          "Time": "04:04.67",
          "TimeMs": 244067,
          "LrcLine": "見え始めるまでは"
        },
        {
          "type": 5,
          "Time": "04:09.94",
          "TimeMs": 249094,
          "LrcLine": "今もこの恋は 動き出せない"
        },
        {
          "type": 5,
          "Time": "04:40.65",
          "TimeMs": 280065,
          "LrcLine": "Lrc By VINE (C) www.22lrc.com"
        },
        {
          "type": 5,
          "Time": "04:45.65",
          "TimeMs": 285065,
          "LrcLine": "終わり"
        },
        {
          "type": 5,
          "Time": "10:00.00",
          "TimeMs": 600000,
          "LrcLine": "LRC歌词下载：www.22lrc.com "
        }
      ],
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
        let play_minutes = parseInt( mLength  / 60);
        let play_seconds = parseInt( mLength  - play_minutes*60 );
        let m = play_minutes<10? '0'+ play_minutes : play_minutes;
        let s = play_seconds<10? '0' + play_seconds : play_seconds;
        this.playTime = `${m}:${s}`;

        //进度条处理
        /*进度条百分比计算*/
				var long = mLength * 650 /this.music.duration;//得到进度条长度，650是进度条总长度
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
      this.$refs.lyricWrap.scrollTop = this.lyricIndex * 35 - 210;
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
    }

  },
  mounted(){
    //赋值
    this.music = this.$refs.music;
    this.mProgress = this.$refs.mProgress;
    this.mProgressIcon = this.$refs.mProgressIcon;
    this.mProgressBar = this.$refs.mProgressBar;
    this.music.volume = 0.5;
    //计算总时长,等后台返回数据，有数据的话，这段可以弃之不用了
    setTimeout(() => { //避免出现NaN的问题
      let audio = document.getElementById("music");
      let mLength = audio.duration;//总时长
      let minutes = parseInt( mLength / 60 );
      let seconds = parseInt( mLength - minutes*60 );
      let m = minutes<10? '0'+ minutes : minutes;
      let s = seconds<10? '0' + seconds : seconds;
      this.totalDuration = `${m}:${s}`;
    }, 200);

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