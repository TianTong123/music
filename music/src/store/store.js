import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: '',
    // user: {
    //   account: "",
    //   accountName: "",
    //   checkState: 0,
    //   id: '',
    //   info: "",
    //   password: "",
    //   photoUrl: "",
    //   sex: 1,
    //   singerId: '',
    //   singerType: "粤语",
    //   state: 0,
    //   token: "",
    //   type: 1
    // },//当前登陆人信息
  },
});
  
export default store;