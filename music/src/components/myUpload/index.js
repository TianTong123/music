import myUploadComponent from './myUpload.vue'

//注册
const myUpload = {
  install:(Vue)=>{
    Vue.component('my-upload', myUploadComponent);
  }
}

export default myUpload;