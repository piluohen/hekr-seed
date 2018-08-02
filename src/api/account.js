import request from '@/assets/utils/request'

// 后台管理api

// 基本信息api
// 获取基本信息
export const getBasicUserInfoApi = async () => {
  return request.get(`feifan!/account/self`)
}
// 修改基本信息
export const updateBasicUserInfoApi = async (params) => {
  return request.put(`feifan!/account/self`, params)
}
// 修改密码
export const updatePasswordApi = async (params) => {
  return request.put(`feifan!/password`, params)
}

// 用户相关api
// 新增子账号
export const addUserApi = async (params) => {
  return request.post(`feifan!/user`, params)
}
// 查询子账号
export const getUserListApi = async (params) => {
  return request.get(`feifan!/user`, {params})
}
// 修改子账号
export const updateUserApi = async (id, params) => {
  return request.put(`feifan!/user/${id}`, params)
}
// 删除用户
export const frozenUserApi = async (uid, lock) => {
  return request.put(`feifan!/user/${uid}/lock?lock=${lock}`)
}
// 导出子账号报表
export const getUserExportApi = async (params) => {
  return request.get(`feifan!/user/export`, params)
}

// 角色相关api
// 新增角色
export const addRoleApi = async (params) => {
  return request.post(`feifan!/role`, params)
}
// 查询角色
export const getRoleListApi = async (params) => {
  return request.get(`feifan!/role`, {params})
}
// 修改角色
export const updateRoleApi = async (id, params) => {
  return request.put(`feifan!/role/${id}`, params)
}
// 删除角色
export const deleteRoleApi = async (id) => {
  return request.delete(`feifan!/role/${id}`)
}

// 反馈问题相关api
// 查询反馈列表
export const getFeedbackListApi = async (params) => {
  return request.get(`feifan!/feedback`, {params})
}
// 处理反馈
export const handleFeedbackApi = async (id, params) => {
  return request.put(`feifan!/feedback/${id}`, params)
}

// 操作日志相关api
// 列表
export const getOplogListApi = async (params) => {
  return request.get(`feifan!/log`, {params})
}
