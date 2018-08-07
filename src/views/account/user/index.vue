<template lang="pug">
  .account-user-page
    hk-card(:top="20")
      .hekr-search-area
        .hekr-search-item
          .item
            .label 选择用户：
          .item
            el-input(v-model="searchParams.userName", size="small", prefix-icon="el-icon-search" placeholder="搜索用户姓名／用户编号")
          .item
            SelectRole(v-model="searchParams.roleId")
          .item
            el-select(v-model="searchParams.status", size="small", clearable placeholder="选择状态")
              el-option(v-for="item in userIslocked", :key="item.label", :label="item.label", :value="item.value")
          .item
            el-button(type="success", size="small", @click="searchHandle") 查询
        .hekr-search-item
          .item
            .label 功能操作：
          .item
            el-button.hekr-btn(type="success", size="small", icon="iconfont icon-xinzeng", @click="showDialogHandle({}, 'add')") 新增用户
          .item
            el-button.hekr-btn(type="success", size="small", icon="iconfont icon-daochu", @click="") 导出Excel
    hk-card(:top="20" :bottom="20")
      .hekr-table-container
        el-table.hekr-table(:data="tableData", tooltip-effect="light", v-loading="loading", :element-loading-text="loadingText")
          el-table-column(prop="userNo", label="用户编号", min-width="120")
          el-table-column(prop="userName", label="用户名称", min-width="120", show-overflow-tooltip)
          el-table-column(prop="roleName", label="角色", min-width="200")
          el-table-column(prop="phone", label="手机号码", min-width="120")
          el-table-column(prop="email", label="电子邮件", min-width="120")
          el-table-column(prop="registerDate", label="注册日期", :formatter="transformDate", min-width="120")
          el-table-column(label="状态", width="120")
            template(slot-scope="scope")
              el-tag(v-for="item in userIslocked" :key="item.label" v-if="scope.row.status === item.value" :type="item.type" size="small") {{item.label}}
          el-table-column(label="操作", width="160", align="center", fixed="right")
            el-button-group(slot-scope="scope")
              el-button(size='small', type="text", @click="showDialogHandle(scope.row, 'view')") 查看
              el-button(size='small', type="text", @click="showDialogHandle(scope.row, 'edit')") 修改
              el-button.font-error(v-show="scope.row.status === 'NORMAL'", size='small', type="text", @click="frozenUserHandle(scope.row.uid, true)") 禁用
              el-button.font-success(v-show="scope.row.status !== 'NORMAL'", size='small', type="text", @click="frozenUserHandle(scope.row.uid, false)") 解禁
        .hekr-page-pagination
          PaginationBar(:pagination="pagination", :sizeChange="changSizeEvt", :currentChange="changeCurrentEvt")
    EditDialog(v-model="showDialog", :infos="dialogData", :type="dialogType", @refresh="refreshHandle")
</template>

<script>
import List from '@/mixins/list'
import EditDialog from './edit-dialog'
import SelectRole from './selectRole'
import {defaultData} from '@/assets/utils/defaultData'
export default {
  name: 'AccountUser',
  mixins: [List],
  components: {
    EditDialog,
    SelectRole
  },
  data () {
    return {
      userIslocked: defaultData.userIslocked
    }
  },
  mounted () {
  },
  methods: {
    getList (params) {
      this.Api.getUserListApi(params).then(response => {
        this.tableData = response.content
        this.pagination.total = response.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 冻结解冻账号
    frozenUserHandle (uid, lock) {
      this.Api.frozenUserApi(uid, lock).then(response => {
        if (lock) {
          this.$message.success('禁用成功')
        } else {
          this.$message.success('解禁成功')
        }
        this.getNewList()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss">
</style>
