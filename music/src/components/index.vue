<template>
  <div class="index">
    <!-- 导航条 -->
    <Header/>
    <div class="content">
      <div class="content-wrap">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./common/Header"
export default {
  components:{
    Header
  },
  data(){
    return{
      
    }
  },
  methods:{

  },
  watch:{
    $route(to, from) {
     console.log(to.path)
    }
  }
}
</script>

<style scoped>
.index .content{
    width: 100%;
}
</style>

