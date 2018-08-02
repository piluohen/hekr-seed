<template lang="pug">
.login-page
  .login-box
    .login-box-top
      .login-box-left
        .login-logo
        .login-box-title
          .title 飞繁智慧云平台
          .desc SONGJIANG FEIFAN ELECTRONIC
        el-form(:model="loginForm", :rules="rules", ref="loginForm", label-position="left", label-width="0px")
          el-form-item(prop="account", class="login-box-input")
            .login-box-input-label 账号
            el-input(type="text", v-model="loginForm.account" auto-complete="off", placeholder="点击输入账号")
          el-form-item(prop="checkPass", class="login-box-input")
            .login-box-input-label 密码
            el-input(type="password", v-model="loginForm.checkPass" auto-complete="off", placeholder="点击输入密码")
          el-form-item(class="login-box-checkbox")
            el-checkbox(v-model="loginForm.remember", checked, class="remember") 下次自动登录
            .login-box-error(v-if="showError") 账号或密码错误
          el-form-item(class="login-box-submit")
            el-button(type="success" :loading="logining", :disabled="submitDisabled", native-type="submit", @click.prevent="handleSubmit") 登录
      .login-box-right
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      logining: false,
      showError: false,
      loginForm: {
        account: '',
        checkPass: '',
        remember: true
      },
      rules: {
        account: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    submitDisabled () {
      if (this.loginForm.account === '' || this.loginForm.checkPass === '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleSubmit (ev) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.logining = false
            this.$router.push({ path: '/' })
          }).catch(({response}) => {
            if (response.data.code === 3400032) {
              this.$message.error('该用户已被冻结')
            } else {
              this.showError = true
            }
            this.logining = false
          })
        } else {
          console.log('error submit!')
          this.showError = true
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/variables.scss";
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: url('~@/assets/images/loginBg.jpg') no-repeat center center / cover;
  .login-box {
    .login-box-top {
      display: flex;
      width: 920px;
      min-height: 570px;
      border-radius: 10px;
      background-clip: padding-box;
      background-color: #fff;
      box-shadow:0 3px 12px 0 rgba(0,0,0,0.20);
      .login-box-left {
        width: 50%;
        height: 570px;
        padding: 40px 50px;
        border-radius: 10px 0 0 10px;
      }
      .login-box-right {
        width: 50%;
        height: 570px;
        border-radius: 0 10px 10px 0;
        background-image: url('~@/assets/images/login-right-bg.jpg');
        background-size: cover;
        background-position: center;
      }
      .login-logo {
        width: 120px;
        height: 36px;
        background-image: url('~@/assets/images/logo.png');
      }
      .login-box-title {
        margin: 60px 0 40px 0;
        .title {
          font-weight: bold;
          text-align: left;
          font-size: 16px;
          color: $--hc-f01;
          margin-bottom: 5px;
        }
        .desc {
          font-size:12px;
          color: $--hc-info;
          letter-spacing:1px;
        }
      }
      .login-box-error {
        float: right;
        text-align: center;
        font-size: 12px;
        color: $--hc-danger;
      }
      .login-box-input {
        margin-bottom: 0;
        position: relative;
        color: $--hc-f01;
        .el-form-item__content {
          line-height: inherit;
        }
        &-label {
          position: absolute;
          top: 14px;
          left: 5px;
          font-size: 12px;
          line-height: 14px;
          color: $--hc-info;
          z-index: 22;
        }
        .el-input {
          .el-input__inner {
            border: none;
            border-bottom: 1px solid $--hc-b01;
            color: $--hc-f01;
            padding: 2px 10px 0 45px;
            border-radius: 0;
            font-size: 12px;
          }
          .el-input__inner:focus {
            border-bottom: 1px solid $--hc-primary;
          }
        }
      }
      .login-box-input.is-error {
        .el-input {
          .el-input__inner {
            border-bottom: 1px solid $--hc-danger;
          }
          .el-input__inner:focus {
            border-bottom: 1px solid $--hc-primary;
          }
        }
      }
      .login-box-checkbox {
        margin-top: 0;
        text-align: left;
        .el-checkbox,
        .el-checkbox__label {
          font-size: 12px;
        }
      }
      .login-box-submit {
        margin-top: 40px;
        .el-button {
          width: 188px;
          padding: 11px 0;
          font-size: 16px;
          letter-spacing: 1px;
        }
      }
    }
    .login-box-bottom {
      margin-top: 45px;
      width: 100%;
      font-size: 20px;
      letter-spacing: 10px;
      text-align: center;
      color: $--hc-white;
    }
  }
}
</style>
