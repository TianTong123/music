<template>
  <div class="singerinfo">
    <div class="wrap">
      <div class="music-list" style="width: 100%">
        <div class="title">搜索结果</div>
        <div class="list-wrap">
          <ul v-if="list.length != 0">
            <li v-for="(e, index) in list" :key="index" @click="goMusic(index)">
              <div class="rank-num">{{index+1}}</div>
              <div class="music-name">一起走过的日子</div>
              <div class="time">05:06</div>
              <div class="play-btn"></div>
            </li>
          </ul>
          <div class="null-box" v-if="list.length == 0">结果为空</div>
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
    }
  },
  beforeMount() {
    this.search();
  },
  methods:{
    search(){
      let parames = {
        value: this.$route.params.value,
      }
      this.$http.search( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.list = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
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
.null-box{
  width: 100%;
  height: 30px;
  margin: 400px 0;
  text-align: center;
  line-height: 30px;
  font-size: 22px;
  font-weight: 600;
}
</style>