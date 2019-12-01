import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    count: 2,
    options: [],//新开tab集合
    userInfo:{}//用户信息
  },
  
  mutations: {
    mutationsAddCount(state, n = 0) {
        return (state.count += n)
    },
    mutationsReduceCount(state, n = 0) {
        return (state.count -= n)
    },
    // 添加tabs
    add_tabs(state, data) {
      this.state.options.push(data);
    },
  }

})

export default store