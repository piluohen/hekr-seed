<template lang="pug">
  .dropdown-page
    el-dropdown(placement="bottom")
      .dropdown-title
        .img
          span {{userName}}
        span
          span {{userInfo.userName}}
        i(class="el-icon-caret-bottom el-icon--right")
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item
          div(@click="showDialogHandle") 修改密码
        el-dropdown-item
          div(@click="loginoutHandle") 退出登录
    EditDialog(v-model="showDialog")
</template>
<script>
import EditDialog from './edit-dialog'
import {mapState} from 'vuex'
export default {
  name: 'DropDown',
  components: {EditDialog},
  data () {
    return {
      showDialog: false,
      userName: ''
    }
  },
  computed: {
    ...mapState(['user']),
    // 用户信息
    userInfo () {
      return this.user ? this.user.userInfo : {}
    }
  },
  beforeMount () {
    this.userName = this.userInfo.userName.slice(0, 1)
  },
  methods: {
    loginoutHandle () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    showDialogHandle () {
      this.showDialog = true
    }
  }
}
</script>
<style lang="scss">
.dropdown-page {
  display: inline-block
}
</style>
