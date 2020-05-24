<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="head">
      <Header/>
    </div>

    <!-- 内容显示 -->
    <div class="content" v-loading="loading" @mouseover="hiddenControl()">
      <router-view ></router-view>
      <Footer></Footer>
    </div>
      
    <!-- 空气墙 -->
    <div class="control-bar"  @mouseover="showControl" ></div>
    
    <playerControl 
      :style="`bottom:${top}px`" 
      @mouseover="showControl" 
      @show="showChange" 
      @isLock="lockChange"
      :hiddenList="hiddenList" />
  </div>
</template>
<script>
import Header from "@/components/myHeader/Header";
import Footer from "@/components/myFooter/Footer";
import playerControl from "@/components/playerControl/playerControl";
export default {
  components:{
    Header, Footer, playerControl
  },
  data(){
    return{
      top: -45,
      hiddenList: true,
      isLock: false,
    }
  },
  computed:{
    loading(){
      return this.$store.state.loading
    }
  },
  methods:{
    //显示控制条
    showControl(){
      this.top = 0;
      this.hiddenList = true;
    },
    //隐藏控制条
    hiddenControl(){
      if(!this.isLock){
        this.top = -45;
        this.hiddenList = false;
      }
    },
    //监听是否要自己显示
    showChange(val){
      if(val){
        this.showControl();
      }
    },
    //监听是否锁住
    lockChange(val){
      this.isLock = val;
    }
  }
}
</script>

<style scoped>
/* 绝对定位法上中下三栏式布局(暂时不用) */
.index {
  position: relative;
  width: 100%;
  height: 100%;
}
.head{
  position: relative;
  z-index: 99999;
  width: 100%;
  height: 70px;
  /* position: absolute;
  top :0; */
}
.index .content{
  
  width: 100%;
  height: auto;
  /* overflow-y: auto;
  overflow-x: hidden; */
  /* margin-top: 70px;
  margin-bottom: -70px; */
}
.index .foot{
  /* position: absolute;
  bottom: 0; */
  width: 100%;
	height: 70px;
}
.index .control-bar{
  position: fixed;
  bottom: 0px;
  height: 20px;
  width: 100%;
}
</style>

