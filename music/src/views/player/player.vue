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
            <div class="more-btn" @click="addIsLike"><i class="icon-islike"></i>{{musicInfo.likeNum}}</div>
            <div class="more-btn" @click="addCollect(true)"><i class="icon-collect"></i>{{musicInfo.collectNum}}</div>
            <div class="more-btn"><i class="icon-mini-play"></i>{{musicInfo.playNum}}</div>
            <div class="more-btn" @click="diaAddMusicForm = !diaAddMusicForm">
              <i class="icon-add"></i>
              <div class="my-form-wrap" v-show="diaAddMusicForm">
                <div class="my-form-card" v-for="(e, index) in addMusicFormList" @click="addCollect(false, e.id)" :key="index">
                  <span>{{index+1}}</span>
                  {{e.songFormName}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="music-title">{{musicInfo.name}}</div>
          <div class="singer"><span>歌手：</span>{{musicInfo.singer}}</div>
          <div class="my-btn l-btn" @click=" preViewLyrc = ! preViewLyrc ">{{ preViewLyrc?'退出预览':'歌词预览'}}</div>
          <!-- 歌词 -->
          <div class="lyric" ref="lyricWrap" > 
            <div class="lyric-wrap" :style="`top: ${scollTop}px`">
              <div class="my-min-null-box" v-if="lyric == null">纯音乐</div>
              <p 
                :class="{'active-line': activeLine(e, index, nowPlayTime)}" 
                v-for="(e, index) in lyric" 
                :key="index"
                v-html="fontFormat(e.LrcLine)">
              </p>
            </div>
          </div>
          <!-- 播放列表 -->
          <div class="play-list" v-show="musicListFlag">
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
      </div>
    </div>
    <audio id="music" ref="music" :src="$global.musicUrl+musicInfo.profileUrl"></audio>
	  <div class="music-bar" ref="musicBar">
      <div class="music-bar-bg"><img v-if="musicInfo.posterUrl != null" :src="$global.imgUrl+musicInfo.posterUrl" alt=""></div>
	  	<div class="music-bar-wrap" @mouseup="dragFlag = false"  @mousemove="progressDrag">
        <!-- 控制菜单 -->
	      <div class="control">
	      	<div class="previous" @click="changeMusic(true)"><i class="icon-previous"></i></div>
	      	<div class="play">
            <i v-show="isPlay == 0" @click="playClick" class="icon-play"></i>
            <i v-show="isPlay == 1" @click="playClick" class="icon-pause"></i>
            <i v-show="isPlay == -1" class="icon-mini-loading"></i>
          </div>
	      	<div class="previous" @click="changeMusic(false)"><i class="icon-next"></i></div>
	      </div>
	      <!-- 进度条 -->
	      <div class="progress-bar noselect" ref="mProgressBar" @click="progressClick">
	      	<div class="m-progress" :style="'width:' + progressValue + 'px'">
	      		<div class="m-p-icon"  @mouseup="dragFlag = false" @mousedown="dragFlag = true" ></div>
	      	</div>	
	      	<span class="noselect">{{`${playTime} / ${totalDuration}`}}</span>	
	      </div>
        <!-- 音量 -->
	      <div :class="voiceIconClass" @click="voiceClick"></div>
        <!-- 播放列表 -->
        <div class="icon-music-list music-list-btn" @click="musicListFlag = !musicListFlag">{{playList.length}}</div>
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
      scollTop: 0,
      preViewLyrc: false,//预览歌词，false不预览， true，预览
      diaAddMusicForm: false,
      addMusicFormList: [],
      mLength: 0,//音乐时长
      dragFlag: false,//拖动flag true按着鼠标不放，false就是松开鼠标
      musicListFlag: false,//播放列表
      voiceIconClass: 'icon-voice',//音量图标
      lyricIndex: 0,//当前歌词激活的下标
      lyric: [],
      /* 音乐播放器控制参数 */
      music: '',//音频文件
      nowPlayTime: "",//当前播放毫秒数(按下播放就开始以毫秒的速度自增1，暂停就停止)
      progressValue: '',//进度条数值
      mProgressBar: '',//进度条背景
      totalDuration: "00/00",//进度条右下角播放时间
      playTime: "00:00",//当前播放时长
      /* 音乐播放器控制参数 end */
    }
  },
  beforeMount(){
    this.getMusic();
    this.addMusicFormList = util.getStorage('musicFormList')
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
        return tempList;
      },
      set(val) {
        util.saveSession('playList', val);
        this.$store.state.playList = val;
      }
    },
    activeIndex:{
      get() {
        let index = util.getSession('activeIndex');
        if(this.$store.state.activeIndex != ''){
          return this.$store.state.activeIndex
        }
        return index;
      },
      set(val) {
        util.saveSession('activeIndex', val);
        this.$store.state.activeIndex = val;
      }
    },
    isPlay:{
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
  methods:{
    //获取歌
    getMusic(id, type=false){
      let parames = {
        musicId: this.$route.params.id||6,
      }
      if(id){
        parames.musicId = id
      }
      this.$http.getMusic( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicInfo = data.data;
          this.lyric = data.data.lrc;
          this.mLength = data.data.timeLength;
          this.totalDuration = util.timeFormat(this.mLength);
          if( type ){
            let musicTemp = document.getElementById('cMusic')
            musicTemp.src = this.$global.musicUrl+data.data.profileUrl
            musicTemp.play();
            musicTemp.addEventListener("canplay", ()=>{//监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
              this.isPlay = 1;
            });
            this.isPlay = -1
          }
          if(this.$route.name == 'player'){
            this.initParames();
          }  
          //增加播放量
          this.$http.addMusicPlayNum({musicId: this.musicInfo.id});
          this.musicInfo.playNum ++;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //点赞
    addIsLike(){
      let parames = {
        musicId: this.musicInfo.id,
      }
      this.musicInfo.likeNum++
      this.$http.addLikeNum( parames )
    },

    //收藏
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
          this.musicInfo.collectNum ++;
          this.$http.addCollectNum({ musicId: parames.songId });//增加收藏数
        }
        
      })
    },

    //播放
    playClick(){
      if( this.music.paused ){   
        this.music.play();//播放音乐
      
        this.music.addEventListener("canplay", ()=>{//监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
            this.isPlay = 1;
        });

        if(this.isPlay === ''){
          this.isPlay = -1;
        }else{
          this.isPlay = 1
        }

			}else{
        this.music.pause();
        this.isPlay = 0;
        return;
      }
    },

    //进度条点击
    progressClick(event){
      let e = event ? event : window.event;
      let value = e.clientX - this.mProgressBar.offsetLeft;
      this.music.currentTime = parseInt(value * this.music.duration / 650);
      this.progressValue = value;

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
            this.progressValue = value;
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
      if(index+1 >= this.lyric.length){
        return
      }
      let timeFlag = time >= e.TimeMs && time < this.lyric[index+1].TimeMs;
      if( e.type == 5 && timeFlag ){
        this.lyricIndex = index;
        return true;
      }
      return false;
    },

    //歌词滚动计算方法
    lyricScoll(){
      if(this.lyric == null){//纯音乐打断
        return
      }
      
      if(this.preViewLyrc){//预览歌词打断
        return
      }

      //计算当前歌词播放行
      let mLength = this.music.currentTime;   
      this.nowPlayTime =  parseInt( mLength  * 1000);
      for(let i = 0; i <this.lyric.length; i ++){
        if(this.lyric[i] == null){ //判空
          break
        }
        if(this.lyric[i].TimeMs >= this.nowPlayTime && this.nowPlayTime < this.lyric[i+1].TimeMs){
          this.lyricIndex = i - 1;
          break;
        }
      }

      //计算歌词整体高度
      let tempHeight = 0;
      for(let i = 0; i <this.lyricIndex; i ++){
        tempHeight += (40 + Math.ceil(this.lyric[i].LrcLine.length / 18 - 1) * 20)
      }

      //this.scollTop = - tempHeight + 150;//150是初始高度.有过渡动画
      this.$refs.lyricWrap.scrollTop =  tempHeight - 200;//没过渡动画的
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
      console.log('必定执行')
      //赋值
      this.music = document.getElementById('cMusic')
      this.mProgressBar = this.$refs.mProgressBar;
      this.music.volume = 0.5;
      this.nowPlayTime = 0;

      this.progressValue = 0;
      
      if(this.music.src == ''){
        this.music.src = this.$global.musicUrl+this.musicInfo.profileUrl
      }
      //时间处理
      let mLength = this.music.currentTime;
      this.nowPlayTime =  parseInt( mLength  * 1000);
      this.playTime = util.timeFormat(mLength);

      /*进度条百分比计算*/
      let value = mLength * 650 / this.music.duration;//得到进度条长度，650是进度条总长度
      this.progressValue = value

      //启动时间监听钩子
      this.music.ontimeupdate = () =>{
        //时间处理
        let mLength = this.music.currentTime;
        this.nowPlayTime =  parseInt( mLength  * 1000);
        this.playTime = util.timeFormat(mLength);

        //进度条处理
        /*进度条百分比计算*/
        var long = mLength * 650 / this.music.duration;//得到进度条长度，650是进度条总长度
        this.progressValue = long


        //结束处理
        if( this.music.ended ){//归零
          this.music.currentTime = 0;
          this.nowPlayTime = 0;
          this.changeMusic(false);
        }
      }

      if(this.lyric == null){//纯音乐打断
        return
      }
      
      //初始化歌词位置
      let firsIndex = "";
      for(let i = 0; i <this.lyric.length; i ++){
        if(this.lyric[i].type == 5){
          firsIndex = i;
          break;
        }
      }
      //每一行的高度为40，高亮位置放在100，所以把第一条歌词放在100 -40
      let lHeight = 100-firsIndex*40;
      this.$refs.lyricWrap.scrollTop  = -lHeight;//下面注释的，是为了适配所有情况要用的(暂时不写，没时间啊)
    },

    //选中播放列表的音乐
    select(val, index){
      this.activeIndex = index;
      if(val.musicId){
        this.getMusic(val.musicId, true)
      }else{
        this.getMusic(val.id, true)
      } 
    },

    //上下首切换
    changeMusic(flag){
      if(flag){//上一页
        if(this.activeIndex == 0){
          this.activeIndex = this.playList.length - 1;
        }else{
          this.activeIndex -= 1
        }
      }else{//下一页
        if(this.activeIndex == this.playList.length - 1){
          this.activeIndex = 0
        }else{
          this.activeIndex += 1
        }
      }
      this.select(this.playList[this.activeIndex], this.activeIndex)
    },

    //清空播放列表，留下当前播放的
    clearPlayList(){    
      let temp = this.playList[this.activeIndex]
      this.playList = [];
      util.toPlay(temp);
      this.activeIndex = 0
    },

    //时间格式
    timeFormat: (val) => util.timeFormat(val),

    //一行固定字数
    fontFormat(val){   
      if(val.length < 18){
        return val
      }

      let font = '';
      for(let i = 0; i < val.length; i+=18){
        if(val.length > i*(i/18)){
          font += val.substring(i, i +18) + '<br>' +'\r\n'
        }
        else{
          font += val.substring(i, val.length - 1);
        }
      }
      return font
    },
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