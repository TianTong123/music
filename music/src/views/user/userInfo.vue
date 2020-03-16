<template>
  <div class="user">
    <div class="user-wrap">
      <!-- 资料头 -->
      <div class="info">
        <div class="user-img"><img src="../../../static/images/ldh.jpg" alt=""></div>
        <div class="user-info">
          <div class="user-name">甜筒</div>
          <div class="data-bar">账号: <span>13160502855</span></div>
          <div class="info-btn my-btn" v-show="userType==0||(userType == 1&&userState==1)" @click="diaEditData = true">修改资料</div>
          <div class="info-btn my-btn" v-show="userType==0||(userType == 1&&userState==1)" @click="diaEditPw = true">修改密码</div>
          <div class="info-btn my-btn" v-if="userType == 1 && userState == 1" @click="diaUploadMusic = true">上传音乐</div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="music-list">
        <div class="list-title">
          <span>{{userType==1?'我的作品':'我的歌单'}}</span> 
          <div class="list-btn my-add-btn" v-if="userType == 0" @click="diaCreateSF = true"></div>
          <div class="list-btn my-full-delete-btn" @click="diaCreateSF = true"></div>
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
        <div class="line-style"><span>新密码：</span><my-input type="password" v-model="formEditPw.password" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div class="line-style"><span>新密码：</span><my-input type="password" v-model="formEditPw.rePwd" placeholder="请输入新密码" icon="pwd"></my-input></div>
        <div slot="footer" class="footer">
            <div class="info-btn my-btn">确认</div>
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
          <span class="line-label">音乐名：</span><my-input type="text" v-model="formUploadMusic.musicName" placeholder="请输入音乐名" icon="user"></my-input>
          <span class="line-label">歌手名：</span><my-input type="text" v-model="formUploadMusic.singerName" placeholder="请输入歌手名" icon="user"></my-input>
        </div> 
        <div class="line-style">
          <span class="line-label">音乐：</span>
          <div class="file-wrap">
            <div class="file-btn my-btn">选择音乐</div>
            <!-- <input class="input-file" @change="uploadFile"  type="file"> -->
            <div class="file-name">届かない恋.mp3</div>
          </div>
          <span class="line-label">歌词：</span>
          <div class="file-wrap">
            <div class="file-btn my-btn">选择歌词</div>
            <input class="input-file" type="file">
            <div class="file-name">届かない恋.lyc</div>
          </div>
        </div> 
        <div class="line-style">
          <span class="line-label">封面：</span>
          <div class="file-wrap">
            <div class="file-btn my-btn">选择封面</div>
            <input class="input-file" type="file">
            <div class="preview-img-wrap">
              <img src="" alt="">
            </div>
          </div>
          <span class="line-label">海报：</span>
          <div class="file-wrap">
            <div class="file-btn my-btn">选择海报</div>
            <input class="input-file" type="file">
            <div class="preview-img-wrap">
              <img src="" alt="">
            </div>
          </div>
        </div>
        
        <div slot="footer" class="footer">
          <div class="info-btn my-btn">确认</div>
          <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog>

      <!-- 修改用户资料弹框 -->
      <my-Dialog title="修改资料" :visible="diaEditData" @closeDia="closeDia">
        <div class="line-style"><span class="line-label">用户名：</span><my-input type="text" v-model="formEditUser.accountName" placeholder="请输入用户名" icon="user"></my-input></div>  
        <div class="line-style"><span class="line-label">性别：</span><my-input type="text" v-model="formEditUser.sex" placeholder="请输入" icon="user"></my-input></div> 
        <div class="line-style"><span class="line-label">头像：</span>
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

      <!-- <my-Dialog title="修改资料" :visible="diaEditData" @closeDia="closeDia">
        <div class="line-style"><span class="line-style">用户名：</span><my-input type="text" placeholder="请输入用户名" icon="user"></my-input></div>  
        <div class="line-style"><span class="line-style">头像：</span>
          <div class="file-wrap">
            <div class="file-btn my-btn">选择头像</div>
            <input class="input-file" type="file">
            <div class="preview-img-wrap">
              <img src="../../../static/images/ldh.jpg" alt="">
            </div>
          </div>
        </div> 
        <div slot="footer" class="footer">
          <div class="info-btn my-btn">确认</div>
          <div class="info-btn my-btn" @click="closeDia">取消</div>
        </div>
      </my-Dialog> -->
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
      imgList:["", "", "", "", ""],
      formEditPw:{ //修改密码
        oldPassword: '',
        password: '',
        rePwd: ''
      },
      formSF:{ //创建&编辑歌单
        name:'',
      },
      formUploadMusic:{//上传音乐
        
      },
      formEditUser:{//修改用户资料
        photoUrl: '',
        accountName: '',
        sex: 0,
        id: util.getSession("user").id,
        type: util.getSession("user").type,
      },
      //页面状态
      userType: 1,//0是用户，1歌手
      userState: 1,//歌手审核状态，0未审核，1审核通过
    }
  },
  methods:{
    //编辑用户资料
    editUser(){
      let parames = {
        ...this.formEditUser,
      }
      this.$http.editUserInfo( parames )
      .then(({data}) => {
        if (data.code == 0){
         this.$myMsg.notify({content: '修改成功！', type: 'success'});
         //util.removeSession("user");
         //util.saveSession('user', )
         this.diaEditData = false
        }
        else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
      })
      .catch(err => {
        this.$myMsg.notify({content: "系统错误",type: 'error'})
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

    goList(id){
      this.$router.push({
        path: `/vanmusic/user/musicList/${id}`
      })
    },
    closeDia(val){
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