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
            v-for="(item, index) in menuList" 
            :key="item.id"
            @click="goMenu(item)"
            :class="{'active_menu': index == activeTabIndex}">{{item.name}}</li>
        </ul>
      </div>

       <!-- 用户 -->
      <div class="user">
        <div class="user-login" v-show="user==''" @click="login">登录</div>
        <div v-show="user != ''">
          <div class="user-img">
            <img v-if="user.photoUrl==null" src="../../static/images/icon/user.png">
            <img v-if="user.photoUrl !=null" :src="`${$global.imgUrl + user.photoUrl}`"> 
            <div class="msg-num"></div>
          </div>
          <div class="triangle-down"></div>
          <div class="user-content">
            <div class="triangle-up"></div>
            <ul class="login-out">
              <li @click="logout"><i class="icon-phone"/>&nbsp;退出</li>
            </ul>
            <ul class="login">
              <li><i class="icon-user"/>我的主页</li>
            </ul>
          </div>
        </div>
        
      </div>

      <!-- 搜索 -->
      <div class="search" :style="`width:${width}px`">
        <i class="icon-search" ></i>
        <input type="text" v-model="searchKey" placeholder="歌曲/歌手" @keydown="search" />
        <div class="preview-content"></div>
      </div>
     
    </div>
  </div>
</template>

<script>
import util from '@/util/utils';

export default {
  name: "Header",
  data(){
    return{
      menuList:util.getStorage('menuList'),
      restaurants: [],
      searchKey: '',
      activeTabIndex: 0,
      width: 30,
    }
  },
  computed:{
    user:{
      get() {
        this.menuList = util.getStorage('menuList');
        let userInfo = '';
        if( util.getStorage('user') != "" && this.$store.state.user == ""){
          return util.getStorage('user')
        }
        return this.$store.state.user//用户信息
      },
      set(newValue) {
        this.$store.state.user = newValue
      }
    }
  },
  mounted(){
    this.activeMenu();
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
          //if(this.$route.matched[1].name == 'player') this.$emit("changeFoot", false);
          //else this.$emit("changeFoot", true);
          this.menuList[i].class = 'active_menu';
          this.activeTabIndex = i;
        }else{
          this.menuList[i].class = '';
        }
      }
    },

    //登录
    login(){
      this.$myLogin.show();
    },

    //注销
    logout(){
      util.removeStorage('user');
      util.removeStorage('token');
      util.removeStorage('menuList');
      util.removeStorage('musicFormList');
      this.$store.state.user = '';
      this.user = "";
      this.$myMsg.notify({content: "退出成功",type: 'success'});
      
      this.menuList = [
            { name: '首页', code: 'home', id: 8848, class: 'active_menu'},
            { name: '榜单', code: 'rank', id: 8849,  class: ''},
            { name: '歌手', code: 'singer', id: 8851, class: ''},
      ]
      this.$router.push({name: 'home'})
      util.saveStorage("menuList", this.menuList);
    },

    //搜索
    search(e){
      let keyCode = window.event? e.keyCode:e.which;
      if(keyCode == 13){//回车
        this.$router.push({name:'search',params:{value: this.searchKey}});
      }
    },

  },
  watch:{
    $route(to, from) {
      //激活当前处于活动页面的菜单标签
      this.activeMenu();
    },
    searchKey(val){
      this.width = val == ''?30:220
    }
  },
  
}
</script>

<style scoped>
@import '../../static/css/Header.css';
</style>

