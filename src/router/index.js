import Vue from 'vue'
import Router from 'vue-router'

// import Error404 from '@/views/error/404'
import Login from '@/views/login/index'
import Home from '@/views/home/index'

// 布局页面
// import Layout from '@/components/layout/index.vue'

// 账号管理
// const AccountUser = () => import('@/views/account/user/index')
// const AccountRole = () => import('@/views/account/role/index')
// const AccountOplog = () => import('@/views/account/oplog')

Vue.use(Router)

// 公共基础路由
export const publicRouter = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]
/*
* 动态nav路由
* icon: 路由icon图标
* authority: 访问路由所需权限, Array
* keepAlivePath: 菜单栏高亮路由
* hide: 是否隐藏子路由
*/
// export const navRouter = [
//   {
//     path: '/account',
//     redirect: '/account/user',
//     component: Layout,
//     meta: {
//       title: '账号管理',
//       children: true,
//       authority: ['ZHGL']
//     },
//     children: [
//       {
//         path: 'user',
//         name: 'AccountUser',
//         meta: {
//           title: '用户管理',
//           authority: ['YHGL']
//         },
//         component: AccountUser
//       },
//       {
//         path: 'role',
//         name: 'AccountRole',
//         meta: {
//           title: '角色管理',
//           authority: ['JSGL']
//         },
//         component: AccountRole
//       },
//       {
//         path: 'oplog',
//         name: 'AccountOplog',
//         meta: {
//           title: '操作日志',
//           authority: ['CZRZ']
//         },
//         component: AccountOplog
//       }
//     ]
//   },
//   {
//     path: '*',
//     redirect: '/404',
//     component: Layout,
//     meta: {
//       hide: true
//     },
//     children: [
//       {
//         path: '',
//         name: 'Error404',
//         meta: {
//           title: '404页面'
//         },
//         component: Error404
//       }
//     ]
//   }
// ]

export default new Router({
  auth: true,
  routes: publicRouter
})
