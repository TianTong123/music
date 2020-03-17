import mySelectComponent from './mySelect.vue'

//注册
const mySelect = {
  install:(Vue)=>{
    Vue.component('my-select', mySelectComponent);
  }
}

export default mySelect;