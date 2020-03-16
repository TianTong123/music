<template>
  <div class="my-file-wrap">
    <div class="my-file-btn">{{label}}</div>
    <input class="my-input-file" @change="uploadFile" type="file">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props:{
    url: {
      default: '', //user, pwd,
      type: String,
    },
    label: {
      default: '',
      type: String
    },
    beforeUpload: {
      default: true,
      type: Function
    },
    onSuccess: {
      default: false,
      type: Function
    }
  },
  methods:{
    uploadFile({target}){
      if(this.beforeUpload(target.files[0])){
        this.uploadImg(target.files[0]);
      }
    },
     //上传图片
    uploadImg(file){
      var forms = new FormData();
      forms.append('file',file)
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      axios.post(this.url, forms, config).then(res=>{
        this.onSuccess(res);  
      })
    },
  }
 
}
</script>


<style scoped>
.my-file-wrap{
  position: relative;
}
.my-file-wrap .my-input-file{
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
}
.my-file-wrap .my-file-btn{
  padding: 1px 10px;
  width: 198px;
  height: 24px;
  line-height: 26px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #242424;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>