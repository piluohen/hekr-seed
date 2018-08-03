import axios from '@/api/axios/index'

// 后台管理api

// 基本信息api
// 获取基本信息
export const getBasicUserInfoApi = () => {
  return axios.get(`feifan!/account/self`)
}
// 修改基本信息
export const updateBasicUserInfoApi = (params) => {
  return axios.put(`feifan!/account/self`, params)
}
// 修改密码
export const updatePasswordApi = (params) => {
  return axios.put(`feifan!/password`, params)
}

// 用户相关api
// 新增子账号
export const addUserApi = (params) => {
  return axios.post(`feifan!/user`, params)
}
// 查询子账号
export const getUserListApi = (params) => {
  return axios.get(`feifan!/user`, {params})
}
// 修改子账号
export const updateUserApi = (id, params) => {
  return axios.put(`feifan!/user/${id}`, params)
}
// 删除用户
export const frozenUserApi = (uid, lock) => {
  return axios.put(`feifan!/user/${uid}/lock?lock=${lock}`)
}
// 导出子账号报表
export const getUserExportApi = (params) => {
  return axios.get(`feifan!/user/export`, params)
}

// 角色相关api
// 新增角色
export const addRoleApi = (params) => {
  return axios.post(`feifan!/role`, params)
}
// 查询角色
export const getRoleListApi = (params) => {
  return axios.get(`feifan!/role`, {params})
}
// 修改角色
export const updateRoleApi = (id, params) => {
  return axios.put(`feifan!/role/${id}`, params)
}
// 删除角色
export const deleteRoleApi = (id) => {
  return axios.delete(`feifan!/role/${id}`)
}

// 反馈问题相关api
// 查询反馈列表
export const getFeedbackListApi = (params) => {
  return axios.get(`feifan!/feedback`, {params})
}
// 处理反馈
export const handleFeedbackApi = (id, params) => {
  return axios.put(`feifan!/feedback/${id}`, params)
}

// 操作日志相关api
// 列表
export const getOplogListApi = (params) => {
  return axios.get(`feifan!/log`, {params})
}
