<template>
  <div class="index">
    <!-- 导航条 -->
    <Header/>
    <!-- 内容显示 -->
    <div class="content">
      <div class="content-wrap">
        <router-view></router-view>
      </div>
    </div>
    <!-- 页脚 -->
    <Footer/>
  </div>
</template>
<script>
import Header from "./common/Header";
import Footer from "./common/Footer"
export default {
  components:{
    Header, Footer
  },
  data(){
    return{
      
    }
  },
  methods:{

  },
  watch:{
    // $route(to, from) {
    //  console.log(to.path)
    // }
  }
}
</script>

<style scoped>
.index .content{
  width: 100%;
  background-color: #eee;
}
</style>

