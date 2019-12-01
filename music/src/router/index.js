import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['../components/pages/index.vue'], resolve),
    },
    {
      path: '/user',
      name: '测试',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['../components/pages/userlist.vue'], resolve),
    }
  ]
})
