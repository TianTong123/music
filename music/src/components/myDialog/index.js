import myDialogComponent from './myDialog.vue'

//注册
const myDialog = {
  install:(Vue)=>{
    Vue.component('my-Dialog', myDialogComponent);
  }
}

export default myDialog;