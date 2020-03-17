import myOptionComponent from './myOption.vue'

//注册
const myOption = {
  install:(Vue)=>{
    Vue.component('my-option', myOptionComponent);
  }
}

export default myOption;