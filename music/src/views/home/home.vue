<template>
  <div class="home">
    <!-- 轮播图 -->
    <slide :slides="slides" />
    <!-- 热门推荐 -->
    <div class="content">
      <div class="content-wrap">
        <div class="title">热门推荐</div>
        <div class="card-wrap">
          <div class="card" v-for="e in hotList" :key="e.id" @click="toPlay(e)">
            <div class="music-poster"><img :src="$global.imgUrl+e.posterUrl" ></div>
            <div class="music-info">
              <!-- <div class="rank-num">{{index+1}}</div> -->
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
import slide from "@/components/mySlide/slide";
import util from '@/util/utils';
export default {
  components:{
    slide,
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

    //去到音乐详情页
    goMusic(val){
      this.$router.push({name:'player',params:{id: id}});
    },

    //播放
    toPlay: (val) => util.toPlay(val)
  }
}
</script>
<style scoped>
@import '../../../static/css/home.css'
</style>

