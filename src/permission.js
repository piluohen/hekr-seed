import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/assets/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  let remember = JSON.parse(getToken(true))
  let token = getToken(false, remember)
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store && store.getters.addRouters.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let data = store.state.user.userInfo
          store.dispatch('GenerateRoutes', { data }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if (data.resouces && data.resouces.length > 0) {
              next({ ...to, replace: true })
            } else {
              Message.error('账号异常')
              removeToken(false, remember)
              removeToken(true)
            }
          })
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
