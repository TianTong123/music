<template>
  <div class="rank">
    <div class="wrap">
      <div class="title">排行榜</div>
      <div class="card-list">
        <div class="card" v-for="(cardList, id) in rankList" :key="id">
          <div 
            :class="{'head-img': true, 
                     'icon-new-music-rank': id==0,
                     'icon-person-music-rank': id==1,
                     'icon-soar-music-rank': id==2,
                     'icon-hot-music-rank': id==3,
                     'icon-all-music-rank': id==4,
                    }"></div>
          <div class="card-content">
            <ul>
              <li class="content-card" v-for="(e, id) in cardList" :key="id">
                <div class="rank-num">{{id+1}}</div>
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
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},],
        [{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},{musicName: "一起走过的日子", singer: '刘德华'},],
      ]
    }
  }
  
}
</script>
<style scoped>
@import '../../../static/css/rank.css';
@import '../../../static/css/myIcon.css';
</style>