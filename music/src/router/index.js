import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/vanmusic"
    },
    {
      path: '/user',
      name: 'test',
      meta: {
        keepAlive: true // 需要被缓存
      },
      component: resolve => require(['../components/pages/userlist.vue'], resolve),
    },
    {
      path: '/vanmusic',
      name: 'vanmusic',
      component: () => import("@/components/"),
      redirect: { name: "home" },
      children:[
        {
          path: 'home',
          name: 'home',
          component: () => import("@/components/pages/home.vue"),
        },
        {
          path: 'rank',
          name: 'rank',
          component: () => import("@/components/pages/rank.vue"),
        },
        {
          path: 'singer',
          name: 'singer',
          component: () => import("@/components/pages/singer.vue"),
        },
      ]
    },
  ]
})
