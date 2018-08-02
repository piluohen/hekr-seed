import { requestLogin, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/assets/utils/auth'

// 获取本地存储信息
const getUserFromLocal = () => {
  let token = {
    access_token: null,
    refresh_token: null
  }
  let remember = JSON.parse(getToken(true))
  const localUser = getToken(false, remember)
  if (localUser) {
    try {
      token = JSON.parse(localUser)
    } catch (e) { }
  }
  return token
}

const user = {
  state: {
    token: getUserFromLocal(),
    roles: [],
    isSuperAdmin: false,
    protocol: [],
    userInfo: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    IS_SUPER_ADMIN: (state, isSuperAdmin) => {
      state.isSuperAdmin = isSuperAdmin
    }
  },
  actions: {
    Login: ({ commit }, userInfo) => {
      var username = userInfo.account.trim()
      var checkPass = userInfo.checkPass.trim()
      var pid = (username === '18091781756' || '18368002600') ? '00000000000' : '01998843645'
      var loginData = {
        username: username,
        password: checkPass,
        clientType: 'WEB',
        pid: pid
      }
      return new Promise((resolve, reject) => {
        requestLogin(loginData).then(rsp => {
          const respToken = {
            access_token: rsp.access_token,
            refresh_token: rsp.refresh_token
          }
          let remember = userInfo.remember
          setToken(remember, true)
          setToken(respToken, false, remember)
          commit('SET_TOKEN', respToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetInfo: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        getUserInfo().then(rsp => {
          commit('SET_ROLES', rsp.role)
          commit('SET_USERINFO', rsp)
          // if (rsp.role.includes('enterprise')) {
          //   commit('IS_SUPER_ADMIN', true)
          // }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LogOut: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_TOKEN', {})
        sessionStorage.removeItem('userInfo')
        commit('SET_ROUTERS', [])
        let remember = JSON.parse(getToken(true))
        removeToken(false, remember)
        removeToken(true)
        resolve()
      })
    }
  }
}

export default user
