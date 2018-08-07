import axios from '@/service/axios/index'

// 后台管理api

const account = {
  // 修改密码
  updatePasswordApi: (params) => {
    return axios.put(`feifan!/password`, params)
  },
  // 用户相关api
  // 新增子账号
  addUserApi: (params) => {
    return axios.post(`feifan!/user`, params)
  },
  // 查询子账号
  getUserListApi: (params) => {
    return axios.get(`feifan!/user`, {params})
  },
  // 修改子账号
  updateUserApi: (id, params) => {
    return axios.put(`feifan!/user/${id},`, params)
  },
  // 冻结用户
  frozenUserApi: (uid, lock) => {
    return axios.put(`feifan!/user/${uid},/lock?lock=${lock},`)
  },
  // 角色相关api
  // 新增角色
  addRoleApi: (params) => {
    return axios.post(`feifan!/role`, params)
  },
  // 查询角色
  getRoleListApi: (params) => {
    return axios.get(`feifan!/role`, {params})
  },
  // 修改角色
  updateRoleApi: (id, params) => {
    return axios.put(`feifan!/role/${id},`, params)
  },
  // 删除角色
  deleteRoleApi: (id) => {
    return axios.delete(`feifan!/role/${id},`)
  },
  // 反馈问题相关api
  // 查询反馈列表
  getFeedbackListApi: (params) => {
    return axios.get(`feifan!/feedback`, {params})
  },
  // 处理反馈
  handleFeedbackApi: (id, params) => {
    return axios.put(`feifan!/feedback/${id},`, params)
  },
  // 操作日志相关api
  // 列表
  getOplogListApi: (params) => {
    return axios.get(`feifan!/log`, {params})
  }
}

export default account
