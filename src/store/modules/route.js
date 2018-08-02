import { navRouter, publicRouter } from '@/router'

function hasPermission (roles, route) {
  if (route.meta && route.meta.authority) {
    return roles.some(role => route.meta.authority.includes(role))
  } else {
    return true
  }
}

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
    // routes: publicRouter,
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
        const authorities = data.resouces
        let accessedRouters = navRouter
        // if (data.role.includes('enterprise')) {
        //   accessedRouters = navRouter
        // } else {
        accessedRouters = filterAsyncRouter(navRouter, authorities)
        // }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default route
