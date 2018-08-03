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
        if (route.redirect) {
          route.redirect = route.path + '/' + route.children[0].path
        }
        route.children = filterAsyncRouter(route.children, roles)
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
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = publicRouter.concat(routers)
    }
  },
  actions: {
    GenerateRoutes: ({ commit }, { data }) => {
      return new Promise(resolve => {
        const roles = data.resouces
        let accessedRouters = navRouter
        // if (data.role.includes('enterprise')) {
        //   accessedRouters = navRouter
        // } else {
        accessedRouters = filterAsyncRouter(navRouter, roles)
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default route
