import {defaultData} from '@/assets/utils/defaultData'

// 过滤权限模块
const filterModule = (allList, authorities) => {
  let arr = allList.filter(item => {
    if (item.children && item.children.length > 0) {
      item.children = filterModule(item.children, authorities)
      return true
    } else {
      if (authorities.includes(item.id)) {
        return true
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
    SET_WEBNAVLIST: (state, data) => {
      state.webNavList = filterModule(defaultData.webNavList, data)
    }
  }
}

export default route
