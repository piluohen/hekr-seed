<template lang="pug">
  el-row.pagination-bar(v-show="pagination.total > 10")
    el-pagination(background, :current-page.sync="pagination.current", :page-size="pagination.size", :page-sizes="pagination.sizes",
    layout="total, sizes, prev, pager, next, jumper", :total="pagination.total", :pager-count="pagination.count",
    @size-change="sizeChange", @current-change="currentChange")

</template>
<script>
export default {
  name: 'pagination-bar',
  props: {
    pagination: {
      type: Object
    },
    sizeChange: {
      type: Function
    },
    currentChange: {
      type: Function
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/styles/variables.scss";
.el-pagination.is-background {
  .el-pagination__jump {
    margin-left: 10px;
  }
  .el-pager li:not(.disabled).active {
    background-color: $--hc-success;
  }
}
</style>
