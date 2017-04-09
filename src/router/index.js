import Router from 'vue-router'
// 惰性加载 主页
const Home = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置
  // (代码分块)
  require.ensure([], () => {
    resolve(require('views/home.vue'))
  })
}
// 影片详情
const Details = resolve => {
  require.ensure([], () => {
    resolve(require('components/details/details.vue'))
  })
}
// 影评
const Comment = resolve => {
  require.ensure([], () => {
    resolve(require('components/comment/comment.vue'))
  })
}
// 短评
const SmallComment = resolve => {
  require.ensure([], () => {
    resolve(require('components/comment/small_comment.vue'))
  })
}
// 演员 与导演信息
const ActorInfo = resolve => {
  require.ensure([], () => {
    resolve(require('components/actorinfo/actor_info.vue'))
  })
}
// top 250
const Top = resolve => {
  require.ensure([], () => {
    resolve(require('views/top.vue'))
  })
}
// me
const Me = resolve => {
  require.ensure([], () => {
    resolve(require('views/me.vue'))
  })
}
export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: '主页',
      component: Home
    },
    {
      path: '/top',
      name: 'Top250',
      component: Top
    },
    {
      path: '/details/:id',
      name: '电影详情',
      component: Details
    },
    {
      path: '/comment/:id',
      name: '影片评论',
      component: Comment
    },
    {
      path: '/smallcomment/:id',
      name: '影片短评',
      component: SmallComment
    },
    {
      path: '/actorinfo/:id',
      name: '演员信息',
      component: ActorInfo
    },
    {
      path: '/me',
      name: '我的个人信息',
      component: Me
    }
  ]
})
