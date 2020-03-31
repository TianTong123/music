<template>
  <div class="home">
    <!-- 轮播图 -->
    <slide :slides="slides" />
    <!-- 热门推荐 -->
    <div class="content">
      <div class="content-wrap">
        <div class="title">热门推荐</div>
        <button @click="test">测试服务式加载遮罩</button>
        <div class="card-wrap">
          <div class="card" v-for="(e, index) in hotList" :key="e.id" @click="goMusic(e.musicId)">
            <div class="music-poster"><img :src="$global.imgUrl+e.posterUrl" ></div>
            <div class="music-info">
              <div class="rank-num">{{index+1}}</div>
              <div class="info">
                <div class="name">歌名:</div>
                <div class="info-value">{{e.name}}</div>
              </div>
              <div class="info">
                <div class="name">歌手:</div>
                <div class="info-value">{{e.singer}}</div>
              </div>
              <div class="info">
                <div class="name">播放:</div>
                <div class="info-value">{{e.playNum}}</div>
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
      slides:[],
      hotList: [],
    }
  },
  mounted(){
    this.getSlides();
    this.getHotList();
    
  },
  methods:{
    test(){
      this.$myLoading.open('我是第一个遮罩');
      this.$myLoading.open('我是第二个遮罩');
    setTimeout(() => {
      this.$myLoading.close();
    }, 2000);
    },
    //获取轮播图
    getSlides(){
      this.$http.getSwipeList().then(({data}) => {
        if (data.code == 0){
          this.slides = data.data;
        }else{
          this.$myMsg.notify({content: data.msg, type: 'error'})
        }  
      })
    },

    //获取热门推荐
    getHotList(){
      this.$http.getHotRecommend().then(({data}) => {
        if (data.code == 0){
          this.hotList = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

     //播放
    goMusic(id){
      this.$router.push({name:'player',params:{id: id}});
    },
  }
}
</script>
<style scoped>
@import '../../../static/css/home.css'
</style>

