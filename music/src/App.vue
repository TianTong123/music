<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html, body, input, ul, li{
  margin: 0px;
  padding: 0px;
}
html, body{
  height: 100%;
  overflow-x: hidden;
}
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* 字体抗锯齿，提升字体清晰度，不过没什么用 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
