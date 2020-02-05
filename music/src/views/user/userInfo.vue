<template>
  <div class="user">
    <div class="user-wrap">
      <!-- 资料头 -->
      <div class="info">
        <div class="user-img"><img src="../../../static/images/ldh.jpg" alt=""></div>
        <div class="user-info">
          <div class="user-name">甜筒</div>
          <div class="data-bar">账号: <span>13160502855</span></div>
          <div class="info-btn my-btn">修改资料</div>
          <div class="info-btn my-btn">修改密码</div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="music-list">
        <div class="list-title">
          <span>我创建的歌单</span> 
          <div class="list-btn my-add-btn"></div>
        </div>
        <div class="card-wrap">
          <div class="music-list-card" v-for="(e, index) in 12" :key="index" 
            @click="goList(index)">
            <div class="poster"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
            <div class="card-info"><i class="play-btn icon-mini-play"></i>29</div>
            <div class="card-name">我喜欢</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goList(id){
      this.$router.push({
        path: `/vanmusic/user/musicList/${id}`
      })
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/user.css';
</style>