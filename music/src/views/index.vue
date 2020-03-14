<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="head">
      <Header/>
    </div>

    <!-- 内容显示 -->
    <div class="content" ref="content">
      <router-view></router-view>
    </div>

    <!-- 页脚 -->
    <div class="foot">
      <Footer v-show="footFlag"/>
    </div>    
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components:{
    Header, Footer
  },
  data(){
    return{
      footFlag: true,
    }
  },
  methods:{
    //页脚控制
    changeFoot(val){
      this.footFlag = val;
    },
  },

}
</script>

<style scoped>
/* 绝对定位法上中下三栏式布局(暂时不用) */
.index {
  width: 100%;
  height: 100%;
}
.head{
  /* position: absolute;
  top :0; */
  width: 100%;
  height: 70px;
}
.index .content{
  /* position: absolute;
  top: 70px;
  bottom: 60px; */
  width: 100%;
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
  background-color: #eee;
}
.index .foot{
  /* position: absolute;
  bottom: 0; */
  width: 100%;
	height: 60px;
}
</style>

