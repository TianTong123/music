import vue from 'vue';
import loginTemplate from './login.vue';
import util from '@/util/utils';
 
// 创建vue组件实例
const template = vue.extend(loginTemplate);

let myLogin = {
  /**
  * 
  * 确认提示框
  * @flag 显示;
  */
  show: ( 
    flag=true
  ) => {
    const loginDom = new template({
      el: document.createElement('div'),
      data(){
        return{
          show: flag,
          activeName: 0,//0是登录，1是注册
          title: '登录',
          btnContent: '蛤！没有账号！偷偷注册',
          formData:{
            accountId: '',
            password: '',
          },
          type: 0,
        }
      },
      methods:{
        login(){
          let parames = {
            ...this.formData
          }
          this.$http.login( parames )
          .then(({data}) => {
            if (data.code == 0){
              let token = res.data.data.token
              //存储
              this.$store.state.token = token;
              util.saveSession("token", token);
              util.saveSession('user', res.data.data);
              this.show = false;
            }
            else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
          })
          .catch(err => {
             this.$myMsg.notify({content: err.message,type: 'error'})
          })
        },
        register(){
          let parames = {
            ...this.formData,
            type: this.type||"0"
          }
          this.$http.register( parames )
          .then(({data}) => {
            if (data.code == 0){
             this.$myMsg.notify({content: '注册成功！', type: 'success'});
             this.activeName = 1;//回到注册
            }
            else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
          })
          .catch(err => {
            this.$myMsg.notify({content: err.message,type: 'error'})
          })
        },
        btnClick(flag){
          switch(flag){
            case 0://点击登录
              this.login();
              break;
            case 1://点击注册
              this.register();
              break;
            case 2://点击右下角的注册
              this.title = '注册';
              this.activeName = 1;
              this.btnContent = '蛤！已有账号！赶紧登录';
              break;
            case 3://点击右下角的登录
              this.title = '登录';
              this.btnContent = '蛤！已有账号！偷偷注册';
              this.activeName = 0;
              break;
          }
          
        },
        close(){
          this.show = false;
        },
        
      },
    })
     // 添加节点
    document.body.appendChild(loginDom.$el);
  },


}


//注册
function register(){
  vue.prototype.$myLogin = myLogin
}



export default {
  myLogin,
  register
}