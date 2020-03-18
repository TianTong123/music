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
        {//home
          path: 'home',
          name: 'home',
          component: () => import("@/views/home/home"),
        },
        {//搜索
          path: 'search/:value/:type',
          name: 'search',
          component: () => import("@/views/search/search"),
        },
        {//排行榜
          path: 'rank',
          name: 'rank',
          component: () => import("@/views/rank/rank"),
        },
        {//歌手页面
          path: 'singer',
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
        {//播放页面
          path: 'player/:id',
          name: 'player',
          component: () => import("@/views/player/player"),
        },
        {//用户页面
          path: 'user',
          name: 'user',
          component: () => import("@/views/user/user"),
          redirect: { path: "user/userInfo" },
          children:[
            {//详情页
              path: 'userInfo',
              name: 'user_info',
              component: () => import("@/views/user/userInfo"),
            },
            {//歌单页
              path: 'musicList/:id',
              name: 'music_list',
              component: () => import("@/views/user/musicList"),
            },
          ]
        },
      ]
    },
  ]
})
