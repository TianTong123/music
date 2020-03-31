import vue from 'vue'
import templateLoading from './myLoading.vue'
import './myLoading.css'

// 创建vue组件实例
const loading = vue.extend(templateLoading);

//服务式遮罩时使用
const tempHtml = document.createElement('div');
tempHtml.className = 'my-loading-wrap';

//指令式遮罩
vue.directive('loading', { 
  bind: (el, binding) => { //绑定元素
    tempHtml.className = 'my-loading'
    for(let i = 0; i < 4; i ++){
      let bubble = document.createElement('span')
      bubble.className = 'bubble'
      tempHtml.appendChild(bubble)
    }
    el.loadingDom = tempHtml //用来判断后面是否存在
    if (binding.value) {
      el.appendChild(tempHtml)
    }
  },
  update: (el, binding) => {
    if (binding.value) {//没有就显示
      if (el.loadingDom.parentNode === null) {
        el.appendChild(el.loadingDom)
      }
    } else {
      if (el === el.loadingDom.parentNode) {
        el.removeChild(el.loadingDom)
      }
    }
  },
  unbind: (el) => { //解绑
    if (el.loadingDom.parentNode === el) {
      el.removeChild(el.loadingDom)
    }
    el.loadingDom = null
  }
})


//服务式遮罩
let LOADING_COMPONENTS = "";

//生成遮罩
function generateDia(text, flag){
    // 添加节点
    const loadingDom = new loading({
      el: document.createElement('div'),
      data () {
        return {
          text,
          flag
        }
      },
    });
    document.body.appendChild(loadingDom.$el);
    LOADING_COMPONENTS = loadingDom;
};

let myLoading =  {
  open(text){ //打开
    if(LOADING_COMPONENTS == ""){//已存在则不创建，不存在则创建
      generateDia(text, true);
    }
    LOADING_COMPONENTS._data.flag = true;
    LOADING_COMPONENTS._data.text = text;
  },
  
  close(){ //关闭
    if(LOADING_COMPONENTS != ""){
      LOADING_COMPONENTS._data.flag = false
    }
  }
}

export {
  myLoading
}
