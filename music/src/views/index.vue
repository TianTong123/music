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

    <playerControl :style="`bottom:${top}px`" />
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
      top: 0,
    }
  },
  computed:{
    loading(){
      return this.$store.state.loading
    }
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
  margin-top: 70px;
  margin-bottom: -70px;
  width: 100%;
  height: 100%;
  background-color: #eee;
  /* position: absolute;
  top: 70px;
  bottom: 60px; */
  
  /* overflow-y: auto; */
  /* overflow-x: hidden; */
 
}
.index .foot{
  /* position: absolute;
  bottom: 0; */
  width: 100%;
	height: 70px;
}
</style>

