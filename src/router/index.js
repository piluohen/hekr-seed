import Vue from 'vue'
import Router from 'vue-router'

// import Error404 from '@/views/error/404'
import Login from '@/views/login/index'
import Home from '@/views/home/index'

// 布局页面
// import Layout from '@/components/layout/index.vue'

Vue.use(Router)

// 账号管理
// const AccountUser = () => import('@/views/account/user/index')
// const AccountRole = () => import('@/views/account/role/index')
// const AccountOplog = () => import('@/views/account/oplog')

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

export default new Router({
  auth: true,
  routes: publicRouter
})

/*
* 动态nav路由
* icon: 路由icon图标
* authority: 访问路由所需权限, Array
* keepAlivePath: 菜单栏高亮路由
* hide: 是否隐藏子路由
*/
export const navRouter = [
  // {
  //   path: '/survey',
  //   redirect: '/survey/index',
  //   component: Layout,
  //   meta: {
  //     authority: ['XMGK']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Survey',
  //       meta: {
  //         title: '项目概况'
  //       },
  //       component: Survey
  //     }
  //   ]
  // },
  // {
  //   path: '/device',
  //   redirect: '/device/list',
  //   component: Layout,
  //   meta: {
  //     authority: ['SBLB']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'DeviceList',
  //       meta: {
  //         title: '设备列表',
  //         authority: ['SBLB']
  //       },
  //       component: DeviceList
  //     },
  //     {
  //       path: 'detail/:id',
  //       name: 'DeviceDetail',
  //       meta: {
  //         title: '设备详情',
  //         authority: ['SBLB', 'SBGL'],
  //         keepAlivePath: '/device/list',
  //         hide: true
  //       },
  //       component: DeviceDetail
  //     }
  //   ]
  // },
  // {
  //   path: '/alarm',
  //   redirect: '/alarm/list',
  //   component: Layout,
  //   meta: {
  //     authority: ['BJGL']
  //   },
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'Alarm',
  //       meta: {
  //         title: '报警管理'
  //       },
  //       component: Alarm
  //     }
  //   ]
  // },
  // {
  //   path: '/production',
  //   redirect: '/production/ageing',
  //   component: Layout,
  //   meta: {
  //     title: '生产管理',
  //     authority: ['SCGL'],
  //     children: true
  //   },
  //   children: [
  //     {
  //       path: 'ageing',
  //       name: 'ProductionAgeing',
  //       meta: {
  //         title: '老化监测'
  //       },
  //       component: ProductionAgeing
  //     },
  //     {
  //       path: 'history',
  //       name: 'ProductionHistory',
  //       meta: {
  //         title: '历史统计',
  //         hide: true
  //       },
  //       component: ProductionHistory
  //     },
  //     {
  //       path: 'device',
  //       name: 'ProductionDevice',
  //       meta: {
  //         title: '设备管理'
  //       },
  //       component: ProductionDevice
  //     },
  //     {
  //       path: 'curve',
  //       name: 'ProductionCurve',
  //       meta: {
  //         title: '曲线分析',
  //         hide: true
  //       },
  //       component: ProductionCurve
  //     }
  //   ]
  // },
  // {
  //   path: '/report',
  //   redirect: '/report/collect',
  //   component: Layout,
  //   meta: {
  //     title: '报表分析',
  //     authority: ['BBFX'],
  //     children: true
  //   },
  //   children: [
  //     {
  //       path: 'collect',
  //       name: 'ReportCollect',
  //       meta: {
  //         title: '汇总分析',
  //         authority: ['HZTJ']
  //       },
  //       component: ReportCollect
  //     },
  //     {
  //       path: 'alarm',
  //       name: 'ReportAlarm',
  //       meta: {
  //         title: '报警分析',
  //         authority: ['BJFX']
  //       },
  //       component: ReportAlarm
  //     },
  //     {
  //       path: 'fault',
  //       name: 'ReportFault',
  //       meta: {
  //         title: '故障分析',
  //         authority: ['GZFX']
  //       },
  //       component: ReportFault
  //     },
  //     {
  //       path: 'max',
  //       name: 'ReportMax',
  //       meta: {
  //         title: '最值分析',
  //         authority: ['ZZTJ']
  //       },
  //       component: ReportMax
  //     }
  //   ]
  // },
  // {
  //   path: '/feedback',
  //   redirect: '/feedback/index',
  //   component: Layout,
  //   meta: {
  //     authority: ['YHFK']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Feedback',
  //       meta: {
  //         title: '用户反馈'
  //       },
  //       component: Feedback
  //     }
  //   ]
  // },
  // {
  //   path: '/device',
  //   redirect: '/device/manage',
  //   component: Layout,
  //   meta: {
  //     authority: ['SBGL']
  //   },
  //   children: [
  //     {
  //       path: 'manage',
  //       name: 'DeviceManage',
  //       meta: {
  //         title: '设备管理'
  //       },
  //       component: DeviceManage
  //     }
  //   ]
  // },
  // {
  //   path: '/account',
  //   redirect: '/account/user',
  //   component: Layout,
  //   meta: {
  //     title: '账号管理',
  //     children: true,
  //     authority: ['ZHGL']
  //   },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'AccountUser',
  //       meta: {
  //         title: '用户管理',
  //         authority: ['YHGL']
  //       },
  //       component: AccountUser
  //     },
  //     {
  //       path: 'role',
  //       name: 'AccountRole',
  //       meta: {
  //         title: '角色管理',
  //         authority: ['JSGL']
  //       },
  //       component: AccountRole
  //     },
  //     {
  //       path: 'oplog',
  //       name: 'AccountOplog',
  //       meta: {
  //         title: '操作日志',
  //         authority: ['CZRZ']
  //       },
  //       component: AccountOplog
  //     }
  //   ]
  // },
  // {
  //   path: '/platform',
  //   redirect: '/platform/index',
  //   component: Layout,
  //   meta: {
  //     authority: ['QYGL']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Platform',
  //       meta: {
  //         title: '企业简介'
  //       },
  //       component: Platform
  //     },
  //     {
  //       path: 'edit',
  //       name: 'PlatformEdit',
  //       meta: {
  //         title: '企业简介编辑',
  //         keepAlivePath: '/platform/index'
  //       },
  //       component: PlatformEdit
  //     }
  //   ]
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   component: Layout,
  //   meta: {
  //     hide: true
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'Error404',
  //       meta: {
  //         title: '404页面'
  //       },
  //       component: Error404
  //     }
  //   ]
  // }
]
