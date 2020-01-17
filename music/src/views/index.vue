<template>
  <div class="index">
    <!-- 导航条 -->
    <div class="head">
      <Header @changeLogin="changeLogin"/>
    </div>
    
    <!-- 登录 -->
    <login :loginShow="loginShow" @close='close'></login>

    <!-- 内容显示 -->
    <div class="content" ref="content">
      <router-view></router-view>
    </div>

    <!-- 页脚 -->
    <div class="foot">
      <Footer v-if="footFlag"/>
    </div>    
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import login from '@/views/login/login';
export default {
  components:{
    Header, Footer, login
  },
  data(){
    return{
      footFlag: true,
      loginShow: false,
    }
  },
  methods:{
    changeLogin(val){
      this.loginShow = val;
    },
    close(val){
      this.loginShow = val;
    }
  },
  
  watch:{
    // $route(to, from) {
    //  console.log(to.path)
    // }
  }
}
</script>

<style scoped>
/* 绝对定位法上中下三栏式布局 */
.index {
  width: 100%;
  height: 100%;
}
.head{
  position: absolute;
  top :0;
  width: 100%;
  height: 70px;
}
.index .content{
  position: absolute;
  top: 70px;
  bottom: 60px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #eee;
}
.index .foot{
  position: absolute;
  bottom: 0;
  width: 100%;
	height: 60px;
}
</style>

