export const regRule = {
  // 手机号正则
  mobile: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
  // 账号
  account: /^[0-9a-zA-Z]{6,16}$/,
  // 密码
  password: /^[0-9a-zA-Z]{6,16}$/,
  email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
}

export const validate = {
  // 手机号
  mobile: (rule, value, callback) => {
    if (value && !regRule.mobile.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  },
  // 账号
  account: (rule, value, callback) => {
    if (value && !regRule.account.test(value)) {
      callback(new Error('请输入6-16位只含字母数字的字符'))
    } else {
      callback()
    }
  },
  // 密码
  password: (rule, value, callback) => {
    if (value && !regRule.password.test(value)) {
      callback(new Error('请输入6-16位只含字母数字的密码'))
    } else {
      callback()
    }
  },
  // 邮箱
  email: (rule, value, callback) => {
    if (value && !regRule.email.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      callback()
    }
  }
}
