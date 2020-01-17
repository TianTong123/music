<template>
  <div class="login">
    <div class="bg">
      <div class="bg-bw"></div>
      <div class="bg-cl"></div>
      <div class="line"></div>
    </div>
    <div class="wrap">
      <div class="close-btn" @click="close">X</div>
      <div class="title">
        <span>Tiantong Music</span>
        <p>感受音乐的色彩</p> 
      </div>
      <div class="form">
        <div class="form-wrap">
          <div class="form-title">登录</div>
          <my-input class="input" v-model="formData.userAccount" type="text" placeholder="请输入账号" icon="user"></my-input>
          <my-input class="input" v-model="formData.userPwd" type="password" placeholder="请输入账号" icon="pwd"></my-input>
          <div class="login-btn" @click="test">迈进新世界的大门</div>
          <div class="underline-btn">蛤！没有账号！偷偷注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      show: true,
      formData:{
        userAccount: '',
        userPwd: ''
      },
    }
  },
  methods:{
    close(){
      this.$emit('show', false);
    }
  }
}
</script>
<style scoped>
@import '../../../static/css/login.css';
</style>