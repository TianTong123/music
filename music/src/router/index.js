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
      component: () => import("@/views/test"),
    },
    {
      path: '/vanmusic',
      name: 'vanmusic',
      component: () => import("@/views"),
      redirect: { name: "home" },
      children:[
        {
          path: 'home',
          name: 'home',
          component: () => import("@/views/home/home"),
        },
        {
          path: 'rank',
          name: 'rank',
          component: () => import("@/views/rank/rank"),
        },
        {
          path: 'singer',
          name: 'singer',
          component: () => import("@/views/singer/singer"),
          children:[
            {
              path: 'info/:id',
              name: 'singerInfo',
              component: () => import("@/views/singer/singerInfo.vue"),
            },
          ]
        },
        {
          path: 'player',
          name: 'player',
          component: () => import("@/views/player/player"),
        },
      ]
    },
  ]
})
