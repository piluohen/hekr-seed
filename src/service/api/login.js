import axios from '@/service/axios/index'

// 登录相关api

const login = {
  loginApi: data => {
    return axios.post(`feifan!/login`, data)
  },
  refreshUserTokenApi: data => {
    return axios.post(`feifan!/token/refresh`, data)
  },
  getUserInfoApi: () => {
    return axios.get(`feifan!/self`)
  }
}

export default login
