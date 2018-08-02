import {defaultData} from '@/assets/utils/defaultData'

// 过滤权限模块
const filterModule = (webNavList, module) => {
  let arr = []
  webNavList.forEach(item => {
    if (item.children && item.children.length > 0) {
      let itemArr = []
      item.children.forEach(v => {
        if (v.children && v.children.length > 0) {
          let vArr = []
          v.children.forEach(i => {
            if (module.includes(i.id)) {
              vArr.push(i)
            }
          })
          v.children = vArr
          itemArr.push(v)
        } else {
          if (module.includes(v.id)) {
            itemArr.push(v)
          }
        }
      })
      item.children = itemArr
      arr.push(item)
    } else {
      if (module.includes(item.id)) {
        arr.push(item)
      }
    }
  })
  return arr
}

const route = {
  state: {
    webNavList: []
  },
  mutations: {
    SET_RESOURCES: (state, data) => {
      state.webNavList = data
    }
  },
  actions: {
    GetAuthority: ({ commit }, data) => {
      return new Promise(resolve => {
        let resouces = []
        // if (data.roleTx === 'FIRST') {
        //   resources = defaultData.webNavList
        // } else {
        resouces = filterModule(defaultData.webNavList, data.resouces)
        // }
        commit('SET_RESOURCES', resouces)
        resolve()
      })
    }
  }
}

export default route
