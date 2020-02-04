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
          <div class="list-btn"></div>
        </div>
        <div class="music-list-wrap">
          <div class="card-wrap">
            <div class="music-list-card">
              <div class="poster"><img src="" alt=""></div>
              <div class="card-info"><i class="icon-min-play"></i></div>
              <div class="card-name">我喜欢</div>
            </div>
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
  }
}
</script>

<style scoped>
@import '../../../static/css/user.css';
</style>