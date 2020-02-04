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
                  <div class="singer">{{e.singer}}</div>
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
        [{musicName: "一起走过子ede哈dwswwsws", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'}],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'}],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'}],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'}],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'}],
      ]
    }
  }
  
}
</script>
<style scoped>
@import '../../../static/css/rank.css';
</style>