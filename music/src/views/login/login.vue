<template>
  <div class="login" v-if="loginShow">
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
          <div class="form-title">{{title}}</div>
          <my-input class="input" v-model="formData.userAccount" type="text" placeholder="请输入账号" icon="user"></my-input>
          <my-input class="input" v-model="formData.userPwd" type="password" placeholder="请输入密码" icon="pwd"></my-input>
          <my-input v-if="activeName==1" class="input" v-model="formData.userPwd" type="password" placeholder="请再次输入密码" icon="pwd"></my-input>
          <div class="login-btn" @click="btnClick(activeName)">迈进新世界的大门</div>
          <div class="underline-btn" @click="btnClick(activeName+2)">蛤！没有账号！偷偷注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    loginShow:{
      default: false,
      type: Boolean,
    }
  },
  data(){
    return{
      show: true,
      activeName: 0,//0是登录，1是注册
      title: '登录',
      formData:{
        userAccount: '',
        userPwd: ''
      },
    }
  },
  methods:{
    btnClick(flag){
      switch(flag){
        case 0://点击登录
          break;
        case 1://点击注册
          break;
        case 2://点击右下角的注册
          this.title = '注册';
          this.activeName = 1;
          break;
        case 3://点击右下角的登录
          this.title = '登录';
          this.activeName = 0;
          break;
      }
      
    },
    close(){
      this.$emit('close', false);
    },
  }
}
</script>
<style scoped>
@import '../../../static/css/login.css';
</style>