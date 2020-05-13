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
        //登录
        login(){
          if(this.accountFormat(this.formData.account) || this.pwdFormat(this.formData.password)){
            return
          }
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
              //模拟菜单管理
              let menuList = data.data.menuList;    
              //需要删除
              //menuList.push({id: 50, name: "拓展", state: 1, code: "game"})
              //需要删除结束 
              util.saveStorage("menuList", menuList);
              if(data.data.type == 1){ //歌手就跳转用户页
                router.push({name:'user'});
              } 
              this.getMusicFormList();
            }
            else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
          })
        },

        //注册
        register(){
          if(this.accountFormat(this.formData.account) || this.pwdFormat(this.formData.password)){
            return
          }
          let parames = {
            ...this.formData,
            type: this.type||"0"
          }
          this.$http.register( parames )
          .then(({data}) => {
            if (data.code == 0){
             this.$myMsg.notify({content: '注册成功！', type: 'success'});
             //this.activeName = 0;//回到注册
             this.btnClick(3)
            }
            else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
          })
        },

        //获取歌单
        getMusicFormList(){
          let parames = {
            accountId: util.getStorage('user').id,
          }
          this.$http.getMusicFormList( parames )
          .then(({data}) => {
            if (data.code == 0){
              util.saveStorage("musicFormList", data.data);
            }
            else{this.$myMsg.notify({content: data.msg, type: 'error'})}  
          })
        },
        
        //输入验证
        inputFormat(val, tip){
          let rs = false;
          if(val == null || val == ''){
            this.$myMsg.notify({content: tip+"不能为空",type: 'error'});
            rs = true;
          }  
          var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
          var reg1 = /[\uFF00-\uFFEF]/
          if (reg.test(val) || reg1.test(val)){
            this.$myMsg.notify({content: tip+"不能有中文或者中文符号",type: 'error'});
            rs = true;
          }
          return rs
        },
        
        //账号验证
        accountFormat(val){
          return this.inputFormat(val, '账号');
        },

        //密码验证
        pwdFormat(val){
          return this.inputFormat(val, '密码');
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