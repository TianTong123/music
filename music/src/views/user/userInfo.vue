<template>
  <div class="user">
    <div class="user-wrap">
      <!-- 资料头 -->
      <div class="info">
        <div class="user-img"><img src="../../../static/images/ldh.jpg" alt=""></div>
        <div class="user-info">
          <div class="user-name">甜筒</div>
          <div class="data-bar">账号: <span>13160502855</span></div>
          <div class="info-btn my-btn">修改资料</div>
          <div class="info-btn my-btn" @click="diaEditPw = true">修改密码</div>
          <div class="info-btn my-btn" @click="diaUploadMusic = true">上传音乐</div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="music-list">
        <div class="list-title">
          <span>我的歌单</span> 
          <div class="list-btn my-add-btn" @click="diaCreateSF = true"></div>
        </div>
        <div class="card-wrap">
          <div class="music-list-card" v-for="(e, index) in 12" :key="index" 
            @click="goList(index)">
            <div class="poster"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
            <div class="card-info"><i class="play-btn icon-mini-play"></i>29</div>
            <div class="card-name">我喜欢</div>
          </div>
        </div>
      </div>

      <!-- 修改密码弹框 -->
      <my-Dialog title="修改密码" :visible="diaEditPw" @closeDia="closeEditPwDia">
        <div class="line-style"><span>旧密码：</span><my-input type="password" placeholder="请输入密码" icon="pwd"></my-input></div> 
        <div class="line-style"><span>新密码：</span><my-input type="password" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div class="line-style"><span>新密码：</span><my-input type="password" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div slot="footer">
          <div class="footer">
            <div class="info-btn my-btn">确认</div>
            <div class="info-btn my-btn" @click="closeEditPwDia">取消</div>
          </div>
        </div>
      </my-Dialog>

      <!-- 创建歌单弹框 -->
      <my-Dialog title="创建歌单" :visible="diaCreateSF" @closeDia="closeCreateDia">
        <div class="line-style"><span>名字：</span><my-input type="text" placeholder="请输入歌单名" icon="user"></my-input></div> 
        <div slot="footer">
          <div class="footer">
            <div class="info-btn my-btn">确认</div>
            <div class="info-btn my-btn" @click="closeCreateDia">取消</div>
          </div>
        </div>
      </my-Dialog>

      <!-- 上传音乐弹框 -->
      <my-Dialog title="上传音乐" :visible="diaCreateSF" @closeDia="closeCreateDia">
      </my-Dialog>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      diaEditPw: false,//修改密码弹框
      diaCreateSF: false,//创建歌单按钮
      diaUploadMusic:false, //上传音乐
    }
  },
  methods:{
    goList(id){
      this.$router.push({
        path: `/vanmusic/user/musicList/${id}`
      })
    },
    closeEditPwDia(val){
      this.diaEditPw = false;
    },
    closeCreateDia(val){
      this.diaCreateSF = false;
    }
  }
}
</script>

<style scoped>
@import '../../../static/css/user.css';
</style>