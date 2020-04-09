<template>
  <div class="login" v-if="show">
    <div class="bg">
      <div class="bg-bw"></div>
      <div class="bg-cl"></div>
      <div class="line"></div>
    </div>
    <div class="wrap">
      <div class="close-btn my-close-btn" @click="close"></div>
      <div class="title">
        <span>Tiantong Music</span>
        <p>感受音乐的色彩</p> 
      </div>
      <div class="form">
        <div class="form-wrap">
          <div class="form-title">{{title}}</div>
          <my-input class="input" v-model="formData.account" type="text" @blur="accountFormat" placeholder="请输入账号" icon="user"></my-input>
          <my-input class="input" v-model="formData.password" type="password" @blur="pwdFormat" placeholder="请输入密码" icon="pwd"></my-input>
          <my-input v-show="activeName=='1'" class="input" v-model="type" type="checkbox" label="1">申请为歌手</my-input>
          <div class="login-btn" @click="btnClick(activeName)">迈进新世界的大门</div>
          <div class="underline-btn" @click="btnClick(activeName+2)">{{btnContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../../static/css/login.css';
</style>