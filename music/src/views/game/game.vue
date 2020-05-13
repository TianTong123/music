<template>
  <div class="game">
    <div class="wrap">
      <div class="title">游戏列表</div>
      <div class="card-wrap">
        <div class="card" v-for="e in gameList" :key="e.id">
          <div class="card-img"><img :src="e.img" alt=""></div>
          <div class="card-tittle">{{e.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      gameList:[
        {
          name: '激情贪吃蛇',
          code: 'snake',
          img: '../../../static/images/logo.png',
          id: '1'
        },
        {
          name: '你猜',
          code: 'youGuess',
          img: '../../../static/images/logo.png',
          id: '1'
        },
      ]
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/game.css';
</style>