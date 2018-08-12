import Api from '@/service/api/login'
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
    authorities: [],
    userInfo: []
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload
    },
    SET_USERINFO: (state, payload) => {
      state.userInfo = payload
    },
    SET_AUTHORITIES: (state, payload) => {
      state.authorities = payload
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
        Api.loginApi(loginData).then(rsp => {
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
        Api.getUserInfoApi().then(rsp => {
          commit('SET_USERINFO', rsp)
          commit('SET_AUTHORITIES', rsp.resouces)
          commit('SET_WEBNAVLIST', state.authorities)
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
