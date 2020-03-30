<template>
  <div class="my-loading" style="z-index: 999999" v-show="flag">
    <span class="bubble"></span>
    <span class="bubble"></span>
    <span class="bubble"></span>
    <span class="bubble"></span>
    <p>{{text}}</p>
  </div>
</template>

<style scoped>
@import './myLoading.css'
</style>