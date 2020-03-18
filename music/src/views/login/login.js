import vue from 'vue';
import loginTemplate from './login.vue';
import util from '@/util/utils';
import store from '@/store/store';
import router from "@/router";
 
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
            account: '',
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
              let token = data.data.token

              //存储
              store.state.user = data.data;
              util.saveStorage("token", token);
              util.saveStorage('user', data.data);
              this.show = false;
              this.$myMsg.notify({content: "登录成功",type: 'success'});
              //模拟菜单管理，可删
              let menuList = [];
              if(data.data.type == 1){
                menuList = [{ name: '用户', code: 'user', id: 8853, class: 'active_menu'}]
              }else{
                menuList = [
                  { name: '首页', code: 'home', id: 8848, class: 'active_menu'},
                  { name: '榜单', code: 'rank', id: 8849,  class: ''},
                  { name: '歌手', code: 'singer', id: 8851, class: ''},
                  { name: '用户', code: 'user', id: 8853, class: ''},
                  { name: '播放', code: 'player', id: 8858, class: ''},
                ]
              }
              util.saveStorage("menuList", menuList);
              if(data.data.type == 1){ //歌手就跳转用户页
                router.push({name:'user'});
              } 
              //模拟菜单管理，可删-结束
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
             this.activeName = 0;//回到注册
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