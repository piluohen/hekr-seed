import axios from '@/api/axios/index'

// 登录相关api

export const loginApi = data => {
  return axios.post(`feifan!/login`, data)
}
export const refreshUserTokenApi = data => {
  return axios.post(`feifan!/token/refresh`, data)
}
export const getUserInfoApi = () => {
  return axios.get(`feifan!/self`)
}
