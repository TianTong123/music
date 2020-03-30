<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="head">
      <Header/>
    </div>

    <!-- 内容显示 -->
    <div class="content" v-loading="loading">
      <router-view ></router-view>
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
  computed:{
    loading(){
      return this.$store.state.loading
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
  position: absolute;
  top :0;
  z-index: 99999;
  width: 100%;
  height: 70px;
}
.index .content{
  /* position: absolute;
  top: 70px;
  bottom: 60px; */
  margin-top: 70px;
  margin-bottom: -70px;
  width: 100%;
  height: 100%;
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
  background-color: #eee;
}
.index .foot{
  /* position: absolute;
  bottom: 0; */
  width: 100%;
	height: 70px;
}
</style>

