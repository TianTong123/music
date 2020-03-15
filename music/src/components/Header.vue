<template>
  <div class="Header">
    <div class="content">
      <!-- logo -->
      <div class="logo">
        <div class="logo-img"></div>
      </div>

      <!--  菜单 -->
      <div class="menu">
        <ul>
          <li 
            v-for="item in menuList" 
            :key="item.id"
            @click="goMenu(item)"
            :class="item.class">{{item.name}}</li>
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
            <li @click="login"><i class="icon-phone"/>&nbsp;登录</li>
          </ul>
          <ul class="login">
            <li><i class="icon-user"/>我的主页</li>
          </ul>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="search">
        <i class="icon-search" ></i>
        <input type="text" v-model="searchKey" placeholder="歌曲/歌单/歌手" @keydown="search" />
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
        {name: '首页', code: 'home', id: 8848, class: 'active_menu'},
        {name: '榜单', code: 'rank', id: 8849, class: ''},
        {name: '歌手', code: 'singer', id: 8851, class: ''},
        {name: '用户', code: 'user', id: 8853, class: ''},
        {name: '播放', code: 'player', id: 8858, class: ''},
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
    },
    //激活菜单方法
    activeMenu(){
      for(let i = 0; i < this.menuList.length; i ++){
        if(this.menuList[i].code == this.$route.matched[1].name){//二级路由名字
          //控制页脚
          if(this.$route.matched[1].name == 'player') this.$emit("changeFoot", false);
          else this.$emit("changeFoot", true);
          this.menuList[i].class = 'active_menu';
        }else{
          this.menuList[i].class = '';
        }
      }
    },
    //登录
    login(){
      this.$myLogin.show();
    },
    //搜索
    search(e){
      let keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){//回车
        this.$router.push({name:'search',params:{value: this.searchKey}});
      }
    }
  },
  watch:{
    $route(to, from) {
      //激活当前处于活动页面的菜单标签
      this.activeMenu();
    }
  },
  mounted(){
    this.activeMenu();
  }
}
</script>

<style scoped>
@import '../../static/css/Header.css';
</style>

