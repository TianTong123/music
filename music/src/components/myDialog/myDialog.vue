<template>
  <div class="my-dialog">
    <div class="my-dialog-wrap">
      <div class="my-dialog-title">
        <span>弹框标题</span>
        <div class="my-dialog-close-btn"></div>
      </div>
      <slot></slot>
      <slot name="footer" :data="footFlag">
        <div class="footer" v-if="fooFlag">
        </div>
      </slot>
      
    </div> 
  </div>
</template>

<style scoped>
.my-dialog{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background-color: rgba(24, 24, 24, .6)
}
.my-dialog .my-dialog-wrap{
  position: absolute;
  display: inline-block;
  padding: 20px;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  min-height: 60px;
  min-width: 200px;
  border-radius: 4px;
  background-color: #fff;
}
.my-dialog .my-dialog-wrap .footer{
  display: block;
  height: 30px;
  border-top: 1px solid #242424;
}
</style>