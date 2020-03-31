<template>
  <div class="search">
    <div class="singerinfo">
      <div class="wrap">
      <div class="music-list" style="width: 100%;">
        <div class="title">搜索结果</div>
        <div class="my-min-null-box" v-if="singerList.length == 0 && musicList.length == 0">结果为空</div>
        <div class="list-wrap" style="margin-bottom: 30px" v-if="singerList.length != 0">
          <div class="search-title">歌手</div>
          <ul v-if="singerList.length != 0">
            <li v-for="(e, index) in singerList" :key="index" @click="goSingerInfo(e.id)">
              <div class="list-img"><img v-if="e.photoUrl != null" :src="`${$global.imgUrl+e.photoUrl}`" alt="图片我裂开来"></div>
              <div class="music-name singer-name">{{e.accountName}}</div>
            </li>
          </ul>
        </div>
        <div class="list-wrap" v-if="musicList.length != 0">
          <div class="search-title">歌曲</div>
          <ul v-if="musicList.length != 0">
            <li v-for="(e, index) in musicList" :key="index" @click="goMusic(e.id)">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{getTime(e.timeLength)}}</div>
              <div class="play-btn"></div>
            </li>
          </ul>
          
        </div>
      </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import util from '@/util/utils';
import Footer from "@/components/myFooter/Footer";
export default {
  components:{
    Footer
  },
  data(){
    return{
      musicList: [],
      singerList: [],
    }
  },
  beforeMount() {
    this.search();
  },
  methods:{
    search(){
      let parames = {
        keyWord: this.$route.params.value,
      }
      this.$http.searchAll( parames ).then(({data}) => {
        if (data.code == 0){
          this.musicList = data.data.musicList;
          this.singerList = data.data.singerList
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },
    
    getTime: val => {
      return util.timeFormat(val)
    },
    //播放
    goMusic(id){
      this.$router.push({name:'player',params:{id: id}});
    },

    //歌手详情
    goSingerInfo(id){
      this.$router.push({name:'singer_info',params:{id: id}});
    }
  },
  watch:{
    $route(to, from) {
      this.search();
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/singerInfo.css';
</style>