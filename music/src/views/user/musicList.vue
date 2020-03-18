<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="info">
        <div class="poster">
          <img v-if="poster == null" src="../../../static/images/logo.png">
          <img v-if="poster != null" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${poster}`">
        </div>
      </div>
      <div class="music-list" style="width: 100%; min-height: 1000px">
        <div class="title">我喜欢</div>
        <div class="list-wrap">
          <ul>
            <li v-for="(e, index) in list" :key="index">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{e.timeLength}}</div>
              <div class="my-delete-btn btn"></div>
              <div class="play-btn" @click="goMusic(e.id)"></div>
            </li>
          </ul>
          <div class="my-min-null-box" v-if="list.length == 0">这个歌单没有歌</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   data(){
    return{
      list: [],
      poster: null,
    }
  },
  beforeMount() {
    this.getMusicList();
  },
  methods:{
    //获取音乐列表
    getMusicList(){
      let parames = {
        formId: this.$route.params.id,
      }
      this.$http.getMusicList( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.list = data.data.musicList;
          this.poster = data.data.posterUrl;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },
    //播放
    goMusic(id){
      this.$router.push({name:'player',params:{id: id}});
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