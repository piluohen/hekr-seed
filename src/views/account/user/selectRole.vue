<template lang="pug">
  .select-role
    el-select(
      v-model="getValue"
      size="small"
      clearable
      filterable
      remote
      :remote-method="remoteMethod"
      :loading="loading"
      placeholder="选择角色"
    )
      el-option(
        v-for="item in roleList"
        :key="item.roleId"
        :label="item.roleName"
        :value="item.roleId"
      )
</template>
<script>
import { getRoleListApi } from '@/api/account'
export default {
  name: 'SelectRole',
  data () {
    return {
      loading: false,
      roleList: []
    }
  },
  props: {
    value: {}
  },
  computed: {
    getValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 查询角色列表
    getRoleList (query) {
      let params = {
        page: 1,
        size: 10
      }
      if (query) {
        params.roleName = query
      }
      getRoleListApi(params).then(response => {
        this.roleList = response.content
      }).catch(() => {})
    },
    // 远程搜索角色
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.getRoleList(query)
        }, 500)
      } else {
        this.roleList = []
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
