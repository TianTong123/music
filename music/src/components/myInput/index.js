import myInputComponent from './myInput.vue'

//注册
const myInput = {
  install:(Vue)=>{
    Vue.component('my-input', myInputComponent);
  }
}

export default myInput;