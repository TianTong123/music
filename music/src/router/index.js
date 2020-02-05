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
      path: '/test',
      name: 'test',
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
          path: 'rank',//排行榜
          name: 'rank',
          component: () => import("@/views/rank/rank"),
        },
        {
          path: 'singer',//歌手页面
          name: 'singer',
          component: () => import("@/views/singer/singer"),
          redirect: { name: "singer_list" },
          children:[
            {
              path: 'singerList',//排行榜
              name: 'singer_list',
              component: () => import("@/views/singer/singerList"),
            },
            {
              path: 'info/:id',//用户详细页
              name: 'singer_info',
              component: () => import("@/views/singer/singerInfo"),
            },
          ]
        },
        {
          path: 'player',//播放页面
          name: 'player',
          component: () => import("@/views/player/player"),
        },
        {
          path: 'user',//用户页面
          name: 'user',
          component: () => import("@/views/user/user"),
          redirect: { path: "user/userInfo/13160502844" },
          children:[
            {
              path: 'userInfo/:id',//排行榜
              name: 'user_info',
              component: () => import("@/views/user/userInfo"),
            },
            {
              path: 'musicList/:id',//用户详细页
              name: 'music_list',
              component: () => import("@/views/user/musicList"),
            },
          ]
        },
      ]
    },
  ]
})
