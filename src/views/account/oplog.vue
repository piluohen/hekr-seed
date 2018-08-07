
<template lang="pug">
.account-oplog-page
  hk-card(:top="20")
    .hekr-search-area
      .hekr-search-item
        .item
          .label 选择日志：
        .item
          el-input(v-model="searchParams.user", size="small", prefix-icon="el-icon-search" placeholder="搜索操作用户")
        .item
          el-select(v-model="searchParams.logType", size="small", clearable placeholder="选择类型")
            el-option(v-for="item in oplogStatusList", :key="item.label", :label="item.label", :value="item.value")
      .hekr-search-item
        .item
          .label 选择时间：
        .item
          el-date-picker(
            v-model="logDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            align="right"
            size="small"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          )
        .item
          el-button(type="success", size="small", @click="searchHandle") 查询
  hk-card(:top="20" :bottom="20")
    .hekr-table-container
      el-table.hekr-table(:data="tableData", tooltip-effect="light", v-loading="loading", :element-loading-text="loadingText")
        el-table-column(prop="logCode", label="日志编号", min-width="120")
        el-table-column(label="类型", min-width="120")
          template(slot-scope="scope")
            el-tag(v-for="item in oplogStatusList" :key="item.label" v-if="scope.row.logType === item.value" :type="item.type" size="small") {{item.label}}
        el-table-column(prop="content", label="操作内容", min-width="200")
        el-table-column(prop="user", label="用户", min-width="120")
        el-table-column(prop="ip", label="IP地址", min-width="120")
        el-table-column(prop="logDate", label="创建时间", :formatter="transformDate", min-width="120")
      .hekr-page-pagination
        PaginationBar(:pagination="pagination", :sizeChange="changSizeEvt", :currentChange="changeCurrentEvt")
</template>
<script>
import List from '@/mixins/list'
import {defaultData} from '@/assets/utils/defaultData'
export default {
  name: 'AccountOplog',
  mixins: [List],
  data () {
    return {
      logDate: [],
      oplogStatusList: defaultData.oplogStatusList,
      pickerOptions: defaultData.pickerOptions
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getList (params) {
      this.Api.getOplogListApi(params).then(response => {
        this.tableData = response.content
        this.pagination.total = response.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    setSearchTime () {
      if (this.logDate && this.logDate.length > 0) {
        this.searchParams.startDate = this.logDate[0]
        this.searchParams.endDate = this.logDate[1]
      } else {
        this.searchParams.startDate = ''
        this.searchParams.endDate = ''
      }
    },
    searchHandle () {
      this.setSearchTime()
      this.getNewList(1)
    }
  }
}
</script>
<style lang="scss">

</style>
