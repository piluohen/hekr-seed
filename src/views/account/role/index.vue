<template lang="pug">
  .account-role-page
    hk-card(:top="20")
      .hekr-search-area
        .hekr-search-item
          .item
            .label 选择角色：
          .item
            el-input(v-model="searchParams.roleName", size="small", prefix-icon="el-icon-search" placeholder="搜索角色／角色编号")
          .item
            el-button(type="success", size="small", @click="searchHandle") 查询
        .hekr-search-item
          .item
            .label 功能操作：
          .item
            el-button.hekr-btn(type="success", size="small", icon="iconfont icon-xinzeng", @click="showDialogHandle({}, 'add')") 新增角色
    hk-card(:top="20" :bottom="20")
      .hekr-table-container
        el-table.hekr-table(:data="tableData", tooltip-effect="light", v-loading="loading", :element-loading-text="loadingText")
          el-table-column(label="序号", width="80", type="index", align="center", fixed="left")
          el-table-column(prop="roleName", label="角色", min-width="120", show-overflow-tooltip)
          el-table-column(prop="roleNo", label="角色编号", min-width="120")
          el-table-column(prop="roleDesc", label="角色描述", min-width="200")
          el-table-column(prop="peopleNum", label="当前人数", min-width="120")
          el-table-column(prop="createUser", label="创建人", min-width="120")
          el-table-column(prop="createDate", label="创建时间", :formatter="transformDate", min-width="120")
          el-table-column(label="操作", width="160", align="center", fixed="right")
            el-button-group(slot-scope="scope")
              el-button(size='small', type="text", @click="showDialogHandle(scope.row, 'view')") 查看
              el-button(size='small', type="text", @click="showDialogHandle(scope.row, 'edit')") 修改
              el-button.font-error(size='small', type="text", @click="deleteHandle(scope.row)", v-show="!scope.row.lock") 删除
        .hekr-page-pagination
          PaginationBar(:pagination="pagination", :sizeChange="changSizeEvt", :currentChange="changeCurrentEvt")
    EditDialog(v-model="showDialog", :infos="dialogData", :type="dialogType", @refresh="refreshHandle")
</template>

<script>
import List from '@/mixins/list'
import EditDialog from './edit-dialog'
import {defaultData} from '@/assets/utils/defaultData'
import { getRoleListApi, deleteRoleApi } from '@/api/account'
export default {
  name: 'AccountRole',
  mixins: [List],
  components: {
    EditDialog
  },
  data () {
    return {
      userIslocked: defaultData.userIslocked,
      roleList: []
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getList (params) {
      getRoleListApi(params).then(response => {
        this.tableData = response.content
        this.pagination.total = response.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    deleteHandle (row) {
      this.$confirm('此操作将永久删除该角色, 是否继续？', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'hekr-message-box'
      }).then(() => {
        deleteRoleApi(row.roleId).then(response => {
          this.$message.success('删除成功')
          this.getNewList()
        }).catch(({ response }) => {
          this.$message.error(response.data.desc)
        })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
</style>
