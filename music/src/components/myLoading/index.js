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
let SHOWFLAG = false;
let myLoading =  {
  open:(text)=>{ //打开
    //SHOWFLAG = true;
    const msgDom = new loading({
      el: document.createElement('div'),
      data () {
        return {
          text,
          flag: SHOWFLAG
        }
      },
    });
     // 添加节点
    document.body.appendChild(msgDom.$el);
  },
  
  close:()=>{ //关闭
    SHOWFLAG = false
    console.log(SHOWFLAG)
  }
}

export {
  myLoading
}
