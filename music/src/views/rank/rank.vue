<template>
  <div class="rank">
    <div class="wrap">
      <div class="title">排行榜</div>
      <div class="card-list">
        <div class="card" v-for="(cardList, id) in rankList" :key="id">
          <div :class="{'head-img': true, 
                     'icon-new-music-rank': id==0,
                     'icon-person-music-rank': id==1,
                     'icon-soar-music-rank': id==2,
                     'icon-hot-music-rank': id==3,
                     'icon-all-music-rank': id==4,
                    }"></div>
          <div class="rank-operating">
            <div class="rank-msg">
              人气榜
              <span>TianTong</span>
            </div>
            <div class="operating-wrap">
              <!-- <img class="top-img" src="../../../static/images/timg1.jpg" alt=""> -->
              <div class="operating">
                <span @click="tip">喜欢</span>
                <span @click="tip">收藏</span>
                <span @click="tip">播放</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(e, cid) in cardList" :key="cid" @click="toPlay(e)">
                <div :class="{'rank-num': true,
                              'icon-top':cid == 0,
                              'icon-top2':cid == 1,
                              'icon-top3':cid == 2}">{{cid>=3?cid+1:''}}</div>
                <div class="content">
                  <div class="name">{{e.name}}</div>
                  <div class="singer">{{e.singer}} 
                    <!-- <div class="islike"> <i class="icon-islike" @click="isLike(cid)" />{{Math.ceil(Math.random()*10)}}</div>  -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
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
      rankList:[]
    }
  },
  mounted(){
    this.getRankList();
  },
  methods:{
    //获取排行榜
    getRankList(){
      this.$http.getRank().then(({data}) => {
        if (data.code == 0){
          this.rankList = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //播放
    toPlay: (val) => util.toPlay(val),

    //一键喜欢
    allLike(index){
      let list = this.rankList[index];
      let parames = {
        idList: list.map(v=>v.id),
      }
      this.$http.setIsLikeNum( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.$myMsg.notify({content: "操作成功！", type: 'success'})  
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },

    tip(){
      this.$myMsg.notify({content: '这个是不可能做的了！~(￣▽￣)~*',type: 'success'})
    },

    //一键收藏
    allCollection(index){
      let list = this.rankList[index];
      let parames = {
        idList: list.map(v=>v.id),
      }
      this.$http.setIsLikeNum( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.$myMsg.notify({content: "收藏成功！", type: 'success'})  
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
@import '../../../static/css/rank.css';
</style>