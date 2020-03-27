<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="music-list" style="width: 100%; min-height: 1000px">
        <div class="title">搜索结果</div>
        <div class="list-wrap">
          <ul v-if="list.length != 0">
            <li v-for="(e, index) in list" :key="index" @click="goMusic(e.id)">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">{{e.name}}</div>
              <div class="time">{{getTime(e.timeLength)}}</div>
              <div class="play-btn"></div>
            </li>
          </ul>
          <div class="my-min-null-box" v-if="list.length == 0">结果为空</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/util/utils';

export default {
  data(){
    return{
      list: [],
    }
  },
  beforeMount() {
    this.search();
  },
  methods:{
    search(){
      let parames = {
        keyWord: this.$route.params.value,
        type: this.$route.params.type,
      }
      this.$http.search( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.list = data.data;
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