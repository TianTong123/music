<template>
<!-- :style="{ background: activeColor}" -->
  <div class="index-banner">
    <div class="bg">
      <img :src="activeImg" alt="">
    </div>
    <div class="wrap">
      <div class="left btn" @click="move(1, 0)"></div>
      <div class="right btn"  @click="move(2, 0)"></div>
      <div class="slides" ref="slides">
        <div class="slide" 
          v-for="(e, id) in slides"
          :key="id">
          <img :src="e.imgSrc" alt=""/>
        </div>
      </div> 
     <div class="progress-bar">
       <div class="progress" 
        v-for="(e, id) in slides"
        :key="id"
        @click="move(3, id)">
        <div class="progress_bg"></div>
        <div class="left half">
          <div class="left-progress"></div>
        </div>
        <div class="right-half half">
          <div class="right-progress"></div>
        </div>
      </div>
     </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "slide",
  data () {
    return {
      mov: 0,//轮播图移动距离
      pageId: 0,//当前显示的轮播图id
      activeImg: "../static/images/timg1.jpg",//轮播图横幅背景颜色
      sTimer: Object,//轮播图定时器
      leftpProgs: document.getElementsByClassName("left-progress"),
      rightpProgs: document.getElementsByClassName("right-progress"),
      play:{
        name1: "",
        name2: ""
      },
      /* slideWidth: 0,//+播图宽度 */
      slides:[
        {imgSrc:"../../../static/images/timg1.jpg", mid:'123456'},
        {imgSrc:"../../../static/images/timg2.jpg", mid:'123456'},
        {imgSrc:"../../../static/images/timg3.jpg", mid:'123456'},
        {imgSrc:"../../../static/images/timg4.jpg", mid:'123456'},
        {imgSrc:"../../../static/images/timg5.jpg", mid:'123456'},
      ]
    }
  },
  computed:{
    //整个轮播图的宽度
    slideWidth() { 
      return (this.slides.length - 1) * 1100;
    } 
  },
  methods:{
    /**
     * 定时器，每隔5秒播放动画
     */
    moveTimer(){
      this.sTimer = setInterval(() => {
        this.move(1, 0);
      }, 5000); 
    },

    /**
     * 轮播图左右移动方法方法
     *    flag:1 为向左滚一下， 2相反， 3滚到制定的@prame：id的位置
     *    id: 当前需要跳的位置
     */
    move( flag, id ){
      clearInterval(this.sTimer);//清除定时器
      if( flag == 1 && this.mov > -1*this.slideWidth){//向左滚
        this.pageId ++;
        this.mov -= 1100;
      }else if( flag == 2 && this.mov < 0){//向右滚
        this.pageId --;
        this.mov += 1100;
      }else if( flag == 3 ){//跳到指定位置
        this.pageId = id;
        this.mov = id * (-1100);
       
      }else if( this.mov == -1*this.slideWidth){//移动到了最左边
        this.pageId = 0;
        this.mov = 0;
      }else if( this.mov == 0 ){//移动到了最右边
        this.pageId = this.slides.length - 1;
        this.mov = this.pageId * (-1100);
      }
      
      this.moveTimer();//重新启动定时器
      this.progressPlay();//播放下面小圈圈动画
      this.activeImg = this.slides[this.pageId].imgSrc;//更改背景图片
      this.$refs.slides.style.left = this.mov + "px";
    },

    /**
     * 所有小圈圈的动画处理
     */
    progressPlay() {    
      //播放对应动画
      this.circleAnimation(1, this.pageId);
      //将剩下的特效归位
      for(let i = 0; i < this.slides.length; i ++){
        if( i == this.pageId ){//跳过当前动画
          continue;
        }  
        //关闭剩下动画
        this.circleAnimation(2, i);
      } 
    },

    /**
     * 小圈圈动画播放控制
     *  flag: 1 为播放动画，2为关闭动画
     *  sid: 关闭/播放那对应id的圈圈的动画
     */
    circleAnimation( flag, sid ) {
      switch(flag){
        case 1: //播放动画
          this.leftpProgs[sid].style.transform = "rotate(315deg)";
          this.rightpProgs[sid].style.transform = "rotate(45deg)";
          this.leftpProgs[sid].style.transition = "all 2.5s linear 2.5s";
          this.rightpProgs[sid].style.transition = "all 2.5s linear";
          break;
        case 2: //关闭过渡
          this.leftpProgs[sid].style.transform = "rotate(135deg)";
          this.leftpProgs[sid].style.transition = "all 0s linear";
          this.rightpProgs[sid].style.transform = "rotate(-135deg)";
          this.rightpProgs[sid].style.transition = "all 0s linear";
          //结束那些用动画播放的
          this.leftpProgs[sid].style.animationDuration="0s"
          this.rightpProgs[sid].style.animationDuration="0s"
          break;
      }
    }
   
  },
  mounted() {
    this.activeColor = this.slides[0].color;//更改背景颜色
    this.moveTimer();//播放轮播图
  },
  beforeDestroy(){
    clearInterval(this.sTimer);
  },
}
</script>
<style scoped>
@import '../../../static/css/slide.css';
</style>
