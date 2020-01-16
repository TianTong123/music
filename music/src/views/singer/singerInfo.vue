<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster"><img src="../../../static/images/ldh.jpg" alt=""></div>
        <div class="name"><span>名字：</span>刘德华</div>
        <div class="detail-info"><span>介绍：</span>刘德华的父亲刘礼在启德机场做过消防员的工作。20世纪60年代刘德华获香港树仁大学颁予荣誉文学博士刘德华获香港树仁大学颁予荣誉文学博士(7张)，刘礼开了一间小吃杂货店以赚钱维持家用。刘德华在家中还有三位姐姐，一位妹妹以及一位弟弟</div>
      </div>
      <div class="music-list">
        <div class="title">他的歌曲</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in 16" :key="index">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">一起走过的日子</div>
              <div class="time">05:06</div>
              <div class="play-btn"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
@import '../../../static/css/singerInfo.css';
</style>