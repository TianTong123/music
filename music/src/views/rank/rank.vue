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
              <img class="top-img" src="../../../static/images/timg1.jpg" alt="">
              <div class="operating">
                <span>喜欢</span>
                <span>收藏</span>
                <span>播放</span>
              </div>
            </div>
          </div>
          <div class="card-content">
            <ul>
              <li v-for="(e, cid) in cardList" :key="cid">
                <div :class="{'rank-num': true,
                              'icon-top':cid == 0,
                              'icon-top2':cid == 1,
                              'icon-top3':cid == 2}">{{cid>=3?cid+1:''}}</div>
                <div class="content">
                  <div class="name">{{e.musicName}}</div>
                  <div class="singer">{{e.singer}} 
                    <div class="islike"> <i class="icon-islike" @click="isLike(cid)" />{{Math.ceil(Math.random()*10)}}</div> 
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
export default {
  data(){
    return{
      rankList:[
        [
          {musicName: "Mi Amor", singer: 'ONER'},{musicName: "ソンナコトナイヨ", singer: '日向坂46'},{musicName: "拒否オロジー", singer: 'amazarash'},
          {musicName: "ぜんぶ", singer: '井上苑子'},{musicName: "ごまかし", singer: 'TrySail'},{musicName: "未来はみないで", singer: 'YELLOW'},
          {musicName: "届かない恋", singer: '上原れな'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "クラブ", singer: ' 河合佑亮'}
        ],
        [
          {musicName: "届かない恋", singer: '上原れな'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "クラブ", singer: ' 河合佑亮'},
          {musicName: "Mi Amor", singer: 'ONER'},{musicName: "ソンナコトナイヨ", singer: '日向坂46'},{musicName: "拒否オロジー", singer: 'amazarash'},
          {musicName: "ぜんぶ", singer: '井上苑子'},{musicName: "ごまかし", singer: 'TrySail'},{musicName: "未来はみないで", singer: 'YELLOW'},
        ],
        [
          {musicName: "一起走过的日子", singer: '刘德华'},{musicName: "ごまかし", singer: 'TrySail'},{musicName: "拒否オロジー", singer: 'amazarash'},
          {musicName: "届かない恋", singer: '上原れな'},{musicName: "未来はみないで", singer: 'YELLOW'},{musicName: "ぜんぶ", singer: '井上苑子'},
          {musicName: "Mi Amor", singer: 'ONER'},{musicName: "クラブ", singer: ' 河合佑亮'},{musicName: "ソンナコトナイヨ", singer: '日向坂46'},
        ],
        [
         {musicName: "Mi Amor", singer: 'ONER'},{musicName: "クラブ", singer: ' 河合佑亮'},{musicName: "ソンナコトナイヨ", singer: '日向坂46'},
          {musicName: "一起走过的日子", singer: '刘德华'},{musicName: "ごまかし", singer: 'TrySail'},{musicName: "拒否オロジー", singer: 'amazarash'},
          {musicName: "届かない恋", singer: '上原れな'},{musicName: "未来はみないで", singer: 'YELLOW'},{musicName: "ぜんぶ", singer: '井上苑子'},
        ],
        [
          {musicName: "届かない恋", singer: '上原れな'},{musicName: "Mi Amor", singer: 'ONER'},{musicName: "ぜんぶ", singer: '井上苑子'},
          {musicName: "一起走过的日子", singer: '刘德华'},{musicName: "ソンナコトナイヨ", singer: '日向坂46'},{musicName: "ごまかし", singer: 'TrySail'},
          {musicName: "クラブ", singer: ' 河合佑亮'},{musicName: "拒否オロジー", singer: 'amazarash'},{musicName: "未来はみないで", singer: 'YELLOW'},],
      ]
    }
  },
  mounted(){

  },
  methods:{
    //获取排行榜
    getRankList(){
      let parames = {
        
      }
      this.$http.getRank( parames )
      .then(({data}) => {
        if (data.code == 0){
          //this.list = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },

    //点赞
    isLike(cid){
      let parames = {
        
      }
      this.$http.setIsLikeNum( parames )
      .then(({data}) => {
        if (data.code == 0){
          //this.list = data.data;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: err.message,type: 'error'})
      })
    },

    //播放
    play(id){
      this.$router.push({
        path: `../../player/${id}`
      })
    },

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