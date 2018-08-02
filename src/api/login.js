import request from '@/assets/utils/request'

// 登录相关api

export const requestLogin = async data => {
  return request.post(`feifan!/login`, data)
}
export const refreshUserToken = async data => {
  return request.post(`feifan!/token/refresh`, data)
}
export const getUserInfo = async () => {
  return request.get(`feifan!/self`)
}
