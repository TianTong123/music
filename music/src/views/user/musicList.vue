<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster"><img src="../../../static/images/ldh.jpg" alt=""></div>
      </div>
      <div class="music-list">
        <div class="title">我喜欢</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in 16" :key="index">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">一起走过的日子</div>
              <div class="time">05:06</div>
              <div class="my-delete-btn btn"></div>
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
  data(){
    return{

    }
  },
  methods:{
    
  }
}
</script>
<style scoped>
@import '../../../static/css/singerInfo.css';
</style>