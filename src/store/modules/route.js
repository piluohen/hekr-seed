import { navRouter, publicRouter } from '@/router'

// 判断是否有权限
function hasPermission (roles, route) {
  if (route.meta && route.meta.authority) {
    return roles.some(role => route.meta.authority.includes(role))
  } else {
    return true
  }
}

// 过滤路由
function filterAsyncRouter (navRouter, roles) {
  const accessedRouters = navRouter.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRouter(route.children, roles)
        if (route.redirect && route.children[0].path) {
          route.redirect = route.path + '/' + route.children[0].path
        }
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const route = {
  state: {
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, payload) => {
      state.addRouters = payload
      state.routers = publicRouter.concat(payload)
    }
  },
  actions: {
    GenerateRoutes: ({ commit }, { data }) => {
      return new Promise(resolve => {
        let accessedRouters = filterAsyncRouter(navRouter, data)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default route
