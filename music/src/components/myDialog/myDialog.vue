<template>
  <div class="my-dialog" v-if="visible">
    <div class="my-dialog-wrap">
      <div class="my-dialog-title">
        <span>{{title}}</span>
        <div v-if="showCloseBtn" @click="close" class="my-dialog-btn my-close-btn"></div>
      </div>
      <slot></slot>
      <slot name="footer"></slot>
    </div> 
  </div>
</template>

<script>
export default {
  props:{
    visible: {
      type: Boolean,
      default: false
    },
    showCloseBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods:{
    close(){
      this.$emit('closeDia', false);
    }
  }
}
</script>
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
.my-dialog .my-dialog-wrap .my-dialog-title{
  display: block;
  margin-bottom: 16px;
  height: 29px;
  width: 100%;
  line-height: 22px;
  border-bottom: 1px solid #242424;
}
.my-dialog .my-dialog-wrap .footer{
  display: flex;
  flex-direction: row-reverse;
  margin-top: 16px;
  padding-top: 10px;
  height: 30px;
  border-top: 1px solid #242424;
}
.my-dialog .my-dialog-wrap .my-dialog-btn{
  position: relative;
  float: right;
  height: 20px;
  width: 20px;
}
.my-dialog .my-dialog-wrap .my-close-btn{
  border: 1px solid #242424;
  border-radius: 2px;
  cursor: pointer;
  user-select:none;
}
.my-dialog .my-dialog-wrap .my-close-btn::before{
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  height: 65%;
  width: 2px;
  background-color: #242424;
}
.my-dialog .my-dialog-wrap .my-close-btn::after{
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  height: 2px;
  width: 65%;
  background-color: #242424;
}
.my-dialog .my-dialog-wrap .my-close-btn:hover{
  border-color: #3D8A0A;
}
.my-dialog .my-dialog-wrap .my-close-btn:active{
  border-color: #242424;
  background-color: #3D8A0A;
}
.my-dialog .my-dialog-wrap .my-close-btn:active::before{
  background-color: #fff;
}
.my-dialog .my-dialog-wrap .my-close-btn:active::after{
  background-color: #fff;
}
</style>