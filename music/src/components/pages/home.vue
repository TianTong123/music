<template>
  <div class="home">
    <!-- 轮播图 -->
    <slide/>
    <!-- 热门推荐 -->
    <div class="content">
      <div class="content-wrap">
        <div class="title">热门推荐</div>
        <div class="card-wrap">
          <div class="card" v-for="id in 9" :key="id">
            <div class="music-poster"><img src="../../../static/images/timg1.jpg" alt=""></div>
            <div class="music-info">
              <div class="rank-num">{{id}}</div>
              <div class="info">
                <div class="name">歌名:</div>
                <div class="info-value">一起走过的日子</div>
              </div>
              <div class="info">
                <div class="name">歌手:</div>
                <div class="info-value">刘德华</div>
              </div>
              <div class="info">
                <div class="name">播放量:</div>
                <div class="info-value">1433233</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import slide from "../common/slide"
export default {
  components:{
      slide
  },
}
</script>
<style scoped>
@import '../../../static/css/home.css'
</style>

