<template>
  <div class="user" v-loading="false">
    <div v-if="user == ''" class="my-big-null-box">你还没登录</div>
    <div v-if="user != ''" class="user-wrap">
      <!-- 资料头 -->
      <div class="info">
        <div class="user-img">
          <img v-if="user.photoUrl==null" src="../../../static/images/icon/user.png">
          <img v-if="user.photoUrl !=null" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${user.photoUrl}`"> 
        </div>
        <div class="user-info">
          <div class="user-name">{{user.accountName}}</div>
          <div class="data-bar">账号: <span>{{user.account}}</span></div>
          <div class="data-bar" v-show="userState != 1&&userType != 0">账号状态：<span>{{userState==0?'审核中':'审核不通过'}}</span></div>
          <div class="info-btn my-btn" v-show="userType==0||(userType == 1&&userState==1)" @click="openDiaEditData">修改资料</div>
          <div class="info-btn my-btn" @click="diaEditPw = true">修改密码</div>
          <div class="info-btn my-btn" v-if="userType == 1 && userState == 1" @click="diaUploadMusic = true">上传音乐</div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="music-list">
        <div class="list-title">
          <span>{{userType==1?'我的作品':'我的歌单'}}</span> 
          <div class="list-btn my-add-btn" v-if="userType == 0" @click="diaCreateSF = true"></div>
          <div class="list-btn my-full-delete-btn" v-if="userType == 0" @click="diaCreateSF = true"></div>
        </div>
        <div class="card-wrap">
          <div class="music-list-card" v-for="(e, index) in 1" :key="index" 
            @click="goList(index)">
            <div class="poster"><img src="../../../static/images/20150718092902357590.jpg" alt=""></div>
            <div class=""></div>
            <div class="card-info"><i class="play-btn icon-mini-play"></i>29</div>
            <div class="card-name">我喜欢</div>
          </div>
        </div>
      </div>

      <!-- 修改密码弹框 -->
      <my-Dialog title="修改密码" :visible="diaEditPw" @closeDia="closeDia">
        <div class="line-style"><span>旧密码：</span><my-input type="password" v-model="formEditPw.oldPassword" placeholder="请输入密码" icon="pwd"></my-input></div> 
        <div class="line-style"><span>新密码：</span><my-input type="password" v-model="formEditPw.newPassword" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div class="line-style"><span>新密码：</span><my-input type="password" v-model="rePwd" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div slot="footer" class="footer">
            <div class="info-btn my-btn" @click="editPwd">确认</div>
            <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog>

      <!-- 创建&编辑歌单弹框 -->
      <my-Dialog title="创建歌单" :visible="diaCreateSF" @closeDia="closeDia">
        <div class="line-style"><span>名字：</span><my-input type="text" v-model="formSF.name" placeholder="请输入歌单名" icon="user"></my-input></div> 
        <div slot="footer" class="footer">
            <div class="info-btn my-btn">确认</div>
            <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog>

      <!-- 上传音乐弹框 -->
      <my-Dialog title="上传音乐" :visible="diaUploadMusic" @closeDia="closeDia">
        <div class="line-style">
          <span class="line-label">音乐名：</span><my-input type="text" v-model="formUploadMusic.name" placeholder="请输入音乐名" icon="user"></my-input>
        </div> 
        <div class="line-style">
          <span class="line-label">音乐：</span>
          <div class="file-wrap">
            <my-upload
              url="http://192.168.17.126:8848/tiantong/file/upload"
              label="选择文件"
              :beforeUpload="beforeUploadFile"
              :onSuccess="successUploadMusic"
              ></my-upload>
            <div class="file-name">{{formUploadMusic.profileUrl}}</div>
          </div>
          <span class="line-label">歌词：</span>
          <div class="file-wrap">
             <my-upload
              url="http://192.168.17.126:8848/tiantong/file/upload"
              label="选择文件"
              :beforeUpload="beforeUploadFile"
              :onSuccess="successUploadLyric"
              ></my-upload>
            <div class="file-name">{{formUploadMusic.lyricUrl}}</div>
          </div>
        </div> 
        <div class="line-style">
          <span class="line-label">封面：</span>
          <div class="file-wrap">
            <my-upload
              url="http://192.168.17.126:8848/tiantong/file/upload"
              label="选择封面"
              :beforeUpload="beforeUploadImg"
              :onSuccess="successMusicSongImg"
              ></my-upload>
            <div class="preview-img-wrap">
              <img v-if="formUploadMusic.songImg != ''" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${formUploadMusic.songImg}`" alt="">
            </div>
          </div>
          <span class="line-label">海报：</span>
          <div class="file-wrap">
            <my-upload
              url="http://192.168.17.126:8848/tiantong/file/upload"
              label="选择海报"
              :beforeUpload="beforeUploadImg"
              :onSuccess="successMusicPoster"
              ></my-upload>
            <div class="preview-img-wrap">
              <img v-if="formUploadMusic.posterUrl != ''" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${formUploadMusic.posterUrl}`" alt="">
            </div>
          </div>
        </div>
        
        <div slot="footer" class="footer">
          <div class="info-btn my-btn" @click="uploadMusic">确认</div>
          <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog>

      <!-- 修改用户资料弹框 -->
      <my-Dialog title="修改资料" :visible="diaEditData" @closeDia="closeDia">
        <div class="line-style">
          <span class="line-label">用户名：</span><my-input type="text" v-model="formEditUser.accountName" placeholder="请输入用户名" icon="user"></my-input>
          <span class="line-label">性别：</span>
          <!-- <my-input type="text"  placeholder="请输入" icon="user"></my-input> -->
          <!-- <my-select v-model="formEditUser.sex">
            <my-option value="1" label="男"></my-option>
            <my-option value="0" label="女"></my-option>
          </my-select> -->
          <select style="width: 220px; border: 1px solid #242424; border-radius: 4px; outline: none"
            v-model="formEditUser.sex">
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div> 
        <div class="line-style" v-show="userType==1">
          <span class="line-label">介绍：</span><my-input type="text" v-model="formEditSinger.info" placeholder="请输入介绍" icon="user"></my-input>
          <span class="line-label">分类：</span>
          <select style="width: 220px; height: 30px; border: 1px solid #242424; border-radius: 4px; outline: none"
            v-model="formEditSinger.singerType">
            <option value="华语">华语</option>
            <option value="粤语">粤语</option>
            <option value="外语">外语</option>
          </select>
        </div> 
        <div class="line-style">
          <span class="line-label">头像：</span>
          <div class="file-wrap">
            <my-upload
              url="http://192.168.17.126:8848/tiantong/file/upload"
              label="选择头像"
              :beforeUpload="beforeUploadImg"
              :onSuccess="successUserImg"
              ></my-upload>
            <div class="preview-img-wrap">
              <img v-if="formEditUser.photoUrl != ''" :src="`http://192.168.17.126:8848/tiantong/file/imgShow/${formEditUser.photoUrl}`" alt="">
            </div>
          </div>
        </div>
        <div slot="footer" class="footer">
          <div class="info-btn my-btn" @click="editUser">确认</div>
          <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import util from '@/util/utils';

export default {
  data(){
    return{
      //弹框
      diaEditPw: false,//修改密码弹框
      diaCreateSF: false,//创建歌单按钮
      diaUploadMusic:false, //上传音乐
      diaEditData: false, //修改资料
      //表单
      formEditPw:{ //修改密码
        id: util.getSession("user").id,
        oldPassword: '',
        newPassword: '',
      },
      rePwd: '',
      formSF:{ //创建&编辑歌单
        name:'',
      },
      formUploadMusic:{//上传音乐
        name: null,
        profileUrl: null,
        lyricUrl: null,
        songerId: util.getSession("user").singerId,
        creator: util.getSession("user").accountName,
        singer: util.getSession("user").accountName,
        posterUrl: '',
        songImg: '',
      },
      formEditUser:{//修改用户资料
        photoUrl: null,
        accountName: null,
        sex: "0",
        id: util.getSession("user").id,
        type: util.getSession("user").type,
      },
      formEditSinger:{//修改歌手信息
        singerId: util.getSession("user").singerId,
        singerType: util.getSession("user").singerType,
        info: '',
      },
      //页面状态
      userType: 0,//0是用户，1歌手
      userState: 0,//歌手审核状态，0未审核，1审核通过, 2审核未通过
      user: '',//用户信息
    }
  },
  mounted(){
    this.getUserInfo();
  },
  methods:{
    //编辑用户资料
    editUser(){
      let parames = {
        ...this.formEditUser,
      }
      if(this.userType == 1){
        parames = {
          ...this.formEditUser,
          ...this.formEditSinger
        }
      }
      this.$http.editUserInfo( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.$myMsg.notify({content: '修改成功！', type: 'success'});
          this.getUserInfo();
          this.diaEditData = false;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //修改密码
    editPwd(){
      if(this.rePwd != this.formEditPw.newPassword){
        this.$myMsg.notify({content: '两次密码不一致！', type: 'error'});
        return
      }
      let parames = {
        ...this.formEditPw,
      }
      this.$http.editPwd( parames )
      .then(({data}) => {
        if (data.code == 0){
          this.$myMsg.notify({content: '修改成功！', type: 'success'});
          this.getUserInfo();
          this.diaEditPw = false;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //上传音乐
    uploadMusic(){
      let parames = {
        ...this.formUploadMusic,
      }
      this.$http.uploadMusic( parames ).then(({data}) => {
        if (data.code == 0){
          this.$myMsg.notify({content: '上传成功！', type: 'success'});
          this.getUserInfo();
          this.diaUploadMusic = false;
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //获取用户信息
    getUserInfo(){
      let id = util.getSession("user").id
      if(id == ''){
        return
      }
      let parames = {
        id: id,
      }
      this.$http.getUserInfo( parames ).then(({data}) => {
        if (data.code == 0){
          this.user = data.data;
          this.userType = data.data.type;
          this.userState = data.data.checkState;
          util.removeSession('user');
          util.saveSession('user', data.data);
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
    },

    //上传普通用户头像
    successUserImg({data}){
      this.formEditUser.photoUrl = data.data;
    },

    //上传图片前
    beforeUploadImg (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$myMsg.notify({type: 'error',content: '上传头像图片只能是 JPG 格式!'});
      }
      if (!isLt2M) {
        this.$myMsg.notify({type: 'error',content: '上传图片大小不能超过 2MB!'});
      }
      return isJPG && isLt2M;
    },

    //上传文件前
    beforeUploadFile(file){
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        this.$myMsg.notify({type: 'error',content: '上传文件大小不能超过 50MB!'});
      }
      return isLt50M;
    },

    //上传音乐成功后
    successUploadMusic({data}){
      this.formUploadMusic.profileUrl = data.data;
    },

    //上传歌词成功后
    successUploadLyric({data}){
      this.formUploadMusic.lyricUrl = data.data;
    },
    //上传封面成功后
    successMusicSongImg({data}){
      this.formUploadMusic.songImg = data.data;
    },
    //上传海报成功后
    successMusicPoster({data}){
      this.formUploadMusic.posterUrl = data.data;
    },
    //打开编辑窗
    openDiaEditData(){
      let { photoUrl,accountName,sex, id, type} = this.user;
      this.formEditUser = {photoUrl,accountName,sex, id, type}
      if(this.userType == 1){
        this.formEditSinger.info = this.user.info
      }
      this.diaEditData = true;
    },

    goList(id){
      this.$router.push({
        path: `/vanmusic/user/musicList/${id}`
      })
    },
    
    clearParame(){
      this.formEditPw = { //修改密码
        id: util.getSession("user").id,
        oldPassword: '',
        newPassword: '',
      };
      this.formEditUser = {//修改用户资料
        photoUrl: null,
        accountName: null,
        sex: "0",
        id: util.getSession("user").id,
        type: util.getSession("user").type,
      };
      this.formEditSinger = {//修改歌手信息
        singerId: util.getSession("user").singerId,
        singerType: util.getSession("user").singerType,
        info: '',
      };
      this.formUploadMusic = {//上传音乐
        name: null,
        profileUrl: null,
        lyricUrl: null,
        songerId: util.getSession("user").singerId,
        creator: util.getSession("user").accountName,
        singer: util.getSession("user").accountName,
        posterUrl: '',
        songImg: '',
      }
    },

    closeDia(val){
      this.clearParame();
      this.diaEditPw = false;
      this.diaCreateSF = false;
      this.diaUploadMusic = false;
      this.diaEditData = false;
    },
  }
}
</script>

<style scoped>
@import '../../../static/css/user.css';
</style>