<template>
  <div class="Header">
    <div class="content">
      <!-- logo -->
      <div class="logo">
        <div class="logo-img"></div>
        <div class="logo-font">van♂音乐</div>
      </div>

      <!--  菜单 -->
      <div class="menu">
        <ul>
          <li 
            v-for="item in menuList" 
            :key="item.id"
            @click="goMenu(item)">{{item.name}}</li>
        </ul>
      </div>

       <!-- 用户 -->
      <div class="user">
        <div class="user-login">登录</div>
        <div class="user-img">
          <img :src="user.userimg">
          <div class="msg-num">56</div>
        </div>
        <div class="triangle-down"></div>
        <div class="user-content">
          <div class="triangle-up"></div>
          <ul class="login-out">
            <li><i class="icon-phone"/>&nbsp;手机登录</li>
            <li><i class="icon-mallbox"/>邮箱登录(未开放)</li>
            <li><i class="icon-phone"/>不登录咯</li>
          </ul>
          <ul class="login">
            <li><i class="icon-user"/>我的主页</li>
            <li><i class="icon-msg"/>我的消息</li>
            <li><i class="icon-level"/>我的等级</li>
            <li><i class="icon-vip"/>VIP会员</li>
          </ul>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="search">
        <i class="icon-search" ></i>
        <input type="text" v-model="searchKey" placeholder="歌曲/歌单/歌手"/>
        <div class="preview-content"></div>
      </div>
     
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      user: {
        userimg: 'https://i0.hdslb.com/bfs/album/5684389236f958866ef0cc513667653c6a40fc8d.jpg@518w_1e_1c.jpg',
      },
      menuList:[
        {name: '首页', code: 'home', i: 8848},
        {name: '榜单', code: 'rank', i: 8848},
        {name: '歌手', code: 'musicAuthor', i: 8848},
        {name: '歌单', code: 'singForm', i: 8848},
        {name: '我的', code: 'my', i: 8848},
      ],
      restaurants: [],
      searchKey: '',
    }
  },
  mounted() {

  },
  methods: {
    goMenu(data){
      this.$router.push({
        name: data.code
      });
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/Header.css';
@import '../../../static/css/myIcon.css';
</style>

