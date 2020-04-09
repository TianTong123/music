<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    window.L2Dwidget.init({
      "display":{
        'superSample': 2,
        "width": 200,
        "height": 400,
        "position": "left",
        "hOffset": 0,
        "vOffset": 0
      }
    })
  }
}
</script>

<style>
@import '../static/css/public.css';
@import '../static/css/myIcon.css';
</style>
