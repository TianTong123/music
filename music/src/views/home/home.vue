<template>
  <div class="home">
    <!-- 轮播图 -->
    <slide :slides="slides" />
    <!-- 热门推荐 -->
    <div class="content">
      <div class="content-wrap">
        <div class="title">热门推荐</div>
        <div class="card-wrap">
          <div class="card" v-for="id in 9" :key="id">
            <div class="music-poster"><img src="../../../static/images/timg1.jpg" alt=""></div>
            <div class="music-info">
              <!-- <div class="rank-num">{{id}}</div> -->
              <div class="info">
                <div class="name">歌名:</div>
                <div class="info-value">一起走过的日子</div>
              </div>
              <div class="info">
                <div class="name">歌手:</div>
                <div class="info-value">刘德华</div>
              </div>
              <div class="info">
                <div class="name">播放:</div>
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
import slide from "@/components/slide"
export default {
  components:{
    slide
  },
  data(){
    return{
      slides:[
        {imgSrc:"../../static/images/timg1.jpg", mid:'123456'},
        {imgSrc:"../../static/images/timg2.jpg", mid:'123456'},
        {imgSrc:"../../static/images/timg3.jpg", mid:'123456'},
        {imgSrc:"../../static/images/timg4.jpg", mid:'123456'},
        {imgSrc:"../../static/images/timg5.jpg", mid:'123456'},
      ],
      hotList: [],
    }
  },
  methods:{
    //获取轮播图
    getSlides(){
      let parames = {
        
      }
      this.$http.getRank( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.slides = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },

    //获取热门推荐
    getHotList(){
      let parames = {
        
      }
      this.$http.getRank( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.hotList = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    }
  }
}
</script>
<style scoped>
@import '../../../static/css/home.css'
</style>

