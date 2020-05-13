<template>
  <div class="my-img-tailoring" ref="myImgTailoring" v-if="show">
    <div class="loading" v-show="loading">上传中</div>
    <div class="btn-wrap">
      <div class="title">选择图片</div>
       <div class="my-file-wrap my-btn">
        <div>选择文件</div>
        <input class="my-input-file" @change="changeFile" type="file">
      </div>
      <div class="my-btn" @click="saveImg">确定修改</div>
      <div class="my-btn" @click="$emit('close', false)">退出修改</div>
    </div>
    <div class="view-wrap">
      <span v-show="imgData == ''">请点击左边的选择文件</span> 
      <canvas class="myImgTailoringCanvas" ref="myImgTailoringCanvas" ></canvas>
      <!-- 工具人 -->
      <canvas class="myImgTailoringTempCanvas" ref="myImgTailoringTempCanvas" :width="imgWidth" :height="imgHeight" v-show="false"></canvas>
      <!-- 辅助线 -->
      <div ref="myImgTailoringLine" class="img-line" :style="`width: ${imgWidth}px; height: ${imgHeight}px`"></div>
      <!-- 遮罩层，用于滑动 -->
      <div class="slide-layer"  @mouseup="initPoint(false)" @mousedown="initPoint(true)"  @mouseout="outState"  @mousemove="editImg"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  props:{
    show: { //显示
      default: true, 
      type: Boolean,
    },
    imgWidth: { //要截取的图片宽度
      default: 200,
      type: Number
    },
    imgHeight: { //要截取的图片的高度
      default: 200,
      type: Number
    },
    url: { //图片 上传路径
      default: '', //user, pwd,
      type: String,
    },
    onSuccess: { //成功后执行的函数
      type: Function
    }
  },
  data(){
    return{
      imgData: '',
      dragFlag: false,//是否拖拽
      zoom: 0,//缩放值
      pointY: 0,//mousedown事件点下去鼠标的初始化坐标位置
      ponitX: 0,
      imgX: 0,//图片偏移的坐标位置
      imgY: 0,
      valueX: 0,//鼠标在相对与选择的图片的坐标位置
      valueY: 0,
      loading: false,//加载遮罩
    }
  },
  methods:{
    //选择文件
    changeFile({target}){
      if(this.beforeUploadImg(target.files[0])){
        var reader = new FileReader(); 
        //转base64
        reader.onload = (e) => {
          this.imgData = e.target.result;
          this.loadingImg( 0, 0, 550, 0, true, true);
        }
        reader.readAsDataURL(target.files[0]);
      }
    },

    //载入图片
    //saveflag 是否保存坐标
    //centerFlag,高度是否居中
    //scollFlag, 是否为滚轮放大
    loadingImg(x, y, width, zoom, centerFlag, saveFlag, scollFlag){
      let canvas = this.$refs.myImgTailoringCanvas;
      canvas.width = 550;
      canvas.height = 400;
      let ctx = canvas.getContext('2d'); 
      let img = new Image();
      img.src = this.imgData;
      img.onload = () =>{
        //清空画布
        ctx.clearRect(0, 0, 550, 400);
        // 将图片画到canvas上面上去！
        width = width * (1 + zoom *0.02);//放大倍率
        let showHeight = width / img.width * img.height; //根据宽度等比例缩放高度
        let showTop = centerFlag ? 200 - showHeight/2 : this.imgY + y;//计算偏移
        x += this.imgX;//计算偏移
        if(saveFlag){//不再拖拽时更新最后的显示坐标
          this.imgX = x; 
          this.imgY = showTop;
        } 
        if(scollFlag){ //放大不计算偏移
          ctx.drawImage(img, this.imgX, this.imgY, width, showHeight);
          return
        }
        ctx.drawImage(img, x, showTop, width, showHeight);
			}
    },

    //编辑图片
    editImg(){
      let e = event ? event : window.event;
      let position = this.$refs.myImgTailoring;
      if(this.dragFlag){ //是否拖动
        this.valueX = e.clientX - position.offsetLeft - 150 - this.ponitX;
        this.valueY = e.clientY- position.offsetTop - this.pointY;
        this.loadingImg(this.valueX, this.valueY, 550, this.zoom)
      }

      //放大缩小
      var scrollFunc = (e) => {
        //判空
        if(this.$refs.myImgTailoringCanvas == null){
          return
        }
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
          if (e.wheelDelta > 0) { //当滑轮向上滚动时
              this.zoom ++;
          }
          if (e.wheelDelta < 0) { //当滑轮向下滚动时
              this.zoom --;
          }
        } else if (e.detail) {  //Firefox滑轮事件
          if (e.detail> 0) { //当滑轮向上滚动时
              this.zoom ++;
          }
          if (e.detail< 0) { //当滑轮向下滚动时
              this.zoom --;
          }
        }
        this.zoom = this.zoom>40?40:this.zoom; //最大值
        this.zoom = this.zoom<-40?-40:this.zoom; //最小值
        if(!this.dragFlag){ 
          this.loadingImg(this.valueX, this.valueY, 550, this.zoom, false, false, true);
        }
      };
      //滚动滑轮触发scrollFunc方法
      window.onmousewheel = document.onmousewheel = scrollFunc;
    },

    //检查文件是否图片格式
    beforeUploadImg (file) {
      const isImg = file.type.substring(0,5) === 'image';
      if (!isImg) {
        this.$myMsg.notify({type: 'error',content: '请选择图片'});
      }
      return isImg;
    },

    //初始化鼠标位置
    initPoint(flag){
      let e = event ? event : window.event;
      this.dragFlag = flag;
      let position = this.$refs.myImgTailoring;
      //退出操作后执行一次loadingImg记录位置
      if(!flag){
        this.valueX = e.clientX - position.offsetLeft - 150 - this.ponitX;
        this.valueY = e.clientY- position.offsetTop - this.pointY;
        this.loadingImg(this.valueX, this.valueY, 550, this.zoom, false, true);
      }
      //执行记录位置后再刷新记录点
      this.ponitX = e.clientX - position.offsetLeft - 150;
      this.pointY = e.clientY- position.offsetTop;
      
    },
    
    //鼠标移出处理
    outState(){
      if( this.dragFlag ){
        let e = event ? event : window.event;
        let position = this.$refs.myImgTailoring;
        this.valueX = e.clientX - position.offsetLeft - 150 - this.ponitX;
        this.valueY = e.clientY- position.offsetTop - this.pointY;
        this.loadingImg(this.valueX, this.valueY, 550, this.zoom, false, true);
        //执行记录位置后再刷新记录点
        this.ponitX = e.clientX - position.offsetLeft - 150;
        this.pointY = e.clientY- position.offsetTop;
        this.dragFlag = false;
      }
    },

    //保存文件
    saveImg(){
      if(this.imgData == ''){
        return
      }
      let canvas = this.$refs.myImgTailoringCanvas;
      let tempCanvas = this.$refs.myImgTailoringTempCanvas
      let line = this.$refs.myImgTailoringLine;
      tempCanvas.width = this.imgWidth;
      tempCanvas.height = this.imgHeight;
      let ctx = canvas.getContext('2d');
      let tctx = tempCanvas.getContext('2d');
      //截取框里面的内容
      tctx.putImageData( ctx.getImageData(line.offsetLeft - this.imgWidth/2, line.offsetTop - this.imgHeight/2, this.imgWidth, this.imgHeight), 0, 0)

      //取出base64 img
      let base64Img = tempCanvas.toDataURL("image/png");
      //base64 转文件
      let imgFile = this.dataURLtoFile(base64Img); 

      //上传文件
      this.uploadImg(imgFile)
    },

    //base64格式转换为img文件
    dataURLtoFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },

    //上传图片
    uploadImg(file){
      var forms = new FormData();
      forms.append('file',file)
      let config = {
        headers:{'Content-Type':'multipart/form-data'}
      };
      this.loading = true;
      axios.post(this.url, forms, config)
      .then(res=>{
        this.loading = false
        this.$emit('close', false);
        this.onSuccess(res);  
      })
      .catch(err => {
        this.loading = false;
        //补充异常处理代码
        console.log(err)
      })
    },

  }
}
</script>

<style scoped>
.my-img-tailoring{
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin: -300px 0 0 -350px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 700px;
  height: 400px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .5);
}
.my-img-tailoring .loading{
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin: -300px 0 0 -350px;
  width: 700px;
  height: 400px;
  background-color: rgba(255, 255, 255, .9);
  text-align: center;
  line-height: 400px;
  font-size: 20px;
}
.my-img-tailoring .btn-wrap{
  position: relative;
  display: inline-block;
  width: 150px;
  height: 400px;
  background-color: #eee;
}
.my-img-tailoring .btn-wrap .title{
  margin: 20px 0 100px 0;
  display: block;
  width: 150px;
  text-align: center;
  line-height: 20px;
  font-size: 18px;
  user-select: none;
}
.my-img-tailoring .btn-wrap .my-file-wrap{
  position: relative;
  overflow: hidden;
}
.my-img-tailoring .btn-wrap .my-file-wrap .my-input-file{
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
}
.my-img-tailoring .btn-wrap .my-btn{
  padding: 1px;
  margin: 0 auto 20px auto;
  width: 120px;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #242424;
  border-radius: 2px;
  cursor: pointer;
  user-select:none;
}
.my-img-tailoring .btn-wrap .my-btn:hover{
  border-color: #3D8A0A;
}
.my-img-tailoring .btn-wrap .my-btn:active{
  color: #fff;
  border-color: #242424;
  background-color: #3D8A0A;
}
.my-img-tailoring .view-wrap{
  position: relative;
  display: inline-block;
  width: 550px;
  height: 400px;
  line-height: 400px;
  text-align: center;
  color: #fff;
  background-color: #666;
}
.my-img-tailoring .view-wrap .myImgTailoringCanvas{
  position: absolute;
  top: 0;
  left: 0;
  width: 550px;
  height: 400px;
  cursor: pointer;
}
.my-img-tailoring .view-wrap .img-line{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 2px solid #ED7861;
}
.my-img-tailoring .view-wrap .slide-layer{
  position: absolute;
  top: 0;
  left: 0;
  width: 550px;
  height: 400px;
  user-select: none;
  cursor: pointer;
}
</style>