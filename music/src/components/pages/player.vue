<template>
  <div class="player">
    <div class="bg"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
    <div class="wrap">
      <div class="content">
        <div class="poster"><div class="poster-wrap"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div></div>
        <div class="info">
          <div class="music-title">届かない恋</div>
          <div class="singer"><span>歌手：</span>上原れな</div>
          <div class="lyric">
            <div class="lyric-wrap">
              <p :class="{'active-line': activeLine(e, index, nowPlayTime)}" v-for="(e, index) in lyric" :key="index">{{e.LrcLine}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio id="music" ref="music" src="../../../static/images/届かない恋 .mp3"></audio>
	  <div class="music-bar" id="music_bar">
      <div class="music-bar-bg"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
	  	<div class="music-bar-wrap">
        <!-- 控制菜单 -->
	      <div id="control">
	      	<div class="previous" id="previous"><i class="icon-previous"></i></div>
	      	<div class="play" id="play" @click="playClick" ><i :class="playBtn"></i></div>
	      	<div class="previous" id="next"><i class="icon-next"></i></div>
	      </div>
	      <!-- 进度条 -->
	      <div class="progress-bar" id="progress_bar" ref="mProgressBar" @click="progressClick">
	      	<div class="m-progress" id="m_progress" ref="mProgress">
	      		<div class="m-p-icon" id="m_p_icon" ref="mProgressIcon"></div>
	      	</div>	
	      	<span id="m_time">{{`${playTime}:${totalDuration}`}}</span>	
	      </div>
	      <!-- 音量 -->
	      <div class="voice">
	      	<div class="v_icon"><i class="icon-voice"></i></div>
	      	<div id="v_progress">
	      		<div id="v_value"></div>
	      	</div>		
	      </div>
      </div>
    </div><!-- music_bar end --> 
  </div>
</template>

<script>
// import play from '@/util/play'
export default {
  data(){
    return{
      lyricIndex: 0,
      lyric: [
             {
          "type": 1,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "届かない恋 ’13"
        },
        {
          "type": 0,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "上原れな"
        },
        {
          "type": 2,
          "Time": null,
          "TimeMs": 0,
          "LrcLine": "届かない恋 ’13"
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
				this.mProgressIcon.style.left = (long - 12) + "px";

				if( this.music.ended )//归零
          this.music.currentTime = 0;
          //this.nowPlayTime = 0;
      }
    },


    //进度条点击
    progressClick(event){
      let e = event ? event : window.event;
      let value = e.clientX - this.mProgressBar.offsetLeft;
      document.getElementById("music").currentTime = parseInt(value * this.music.duration / 650);
      //console.log(parseInt(value * this.music.duration / 650))
			this.mProgress.style.width = value + "px";
			this.mProgressIcon.style.left = (value - 12) + "px";
    },


    //激活歌词
    activeLine(e, index, time){
      // let timeFlag = time >= e.TimeMs;
      // console.log( timeFlag, time, e.TimeMs, e.type);
      // if( e.type == 5 && timeFlag ){
      //   return true;
      // }
      return false;
    }
  },
  mounted(){
    //赋值
    this.music = this.$refs.music;
    this.mProgress = this.$refs.mProgress;
    this.mProgressIcon = this.$refs.mProgressIcon;
    this.mProgressBar = this.$refs.mProgressBar;
    //计算总时长
    setTimeout(() => { //避免出现NaN的问题
      let audio = document.getElementById("music");
      let mLength = audio.duration;//总时长
      let minutes = parseInt( mLength / 60 );
      let seconds = parseInt( mLength - minutes*60 );
      let m = minutes<10? '0'+ minutes : minutes;
      let s = seconds<10? '0' + seconds : seconds;
      this.totalDuration = `${m}:${s}`;
    }, 200);

  },
  computed:{
  
  },
  watch:{
    nowPlayTime(){
      
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/myIcon.css';
@import '../../../static/css/play.css';
</style>