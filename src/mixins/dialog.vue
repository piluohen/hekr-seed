<template lang="pug">
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MixinsDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    infos: {
      type: Object,
      default: function () {
        return {}
      }
    },
    type: {
      type: String,
      default: 'add',
      validator: val => {
        return [
          'add',
          'edit',
          'view'
        ].indexOf(val) !== -1
      }
    }
  },
  data () {
    return {
      btnLoading: false,
      data: {},
      rules: {}
    }
  },
  computed: {
    ...mapState(['user', 'authority']),
    userInfo () {
      return this.user.userInfo
    },
    authotityList () {
      return this.userInfo.resources
    },
    dialogTitle () {
      let msg = ''
      switch (this.type) {
        case 'view':
          msg = '查看'
          break
        case 'add':
          msg = '新增'
          break
        case 'edit':
          msg = '编辑'
          break
      }
      return msg + this.dialogName
    },
    isEdit () {
      return this.type !== 'view'
    }
  },
  methods: {
    // 打开弹框
    openDialog () {
      if (this.type === 'view') {
        this.rules = {}
      } else {
        this.rules = this.initRules
      }
      if (this.$refs.form) {
        this.$refs.form.clearValidate()
      }
    },
    // 关闭弹框
    closeDialog () {
      this.$emit('input', false)
    },
    // 提交操作统一处理信息
    postMsg (msg) {
      this.$message.success(msg)
      this.btnLoading = false
      this.closeDialog()
      this.$emit('refresh', this.type)
    }
  }
}
</script>
