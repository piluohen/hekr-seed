<script>
  import dayjs from 'dayjs'
  import PaginationBar from '@/components/paginationBar'
  export default {
    name: 'list',
    components: {
      PaginationBar
    },
    data () {
      return {
        loading: true,
        loadingText: '正在加载中...',
        pagination: {
          total: 0,
          current: 1,
          size: 10,
          count: 5,
          sizes: [10, 20, 50]
        },
        searchParams: {},
        tableData: [],
        // 弹框
        showDialog: false,
        dialogData: {},
        dialogType: 'view'
      }
    },
    mounted () {
      this.getNewList(1)
    },
    methods: {
      // 格式化时间
      transformDate (row, column, cellValue) {
        if (cellValue) {
          return dayjs(cellValue).format('YYYY-MM-DD HH:mm')
        } else {
          return ''
        }
      },
      // 改变分页size
      changSizeEvt (val) {
        this.loading = true
        this.pagination.size = val
        this.getNewList()
      },
      // 改变分页页码
      changeCurrentEvt (val) {
        this.loading = true
        this.pagination.current = val
        this.getNewList()
      },
      // 获取表格数据
      getNewList (current) {
        if (current) {
          this.pagination.current = current
        }
        let initParams = {
          size: this.pagination.size,
          page: this.pagination.current
        }
        let filterSearchParams = {}
        for (let i in this.searchParams) {
          if (this.searchParams[i]) {
            filterSearchParams[i] = this.searchParams[i]
          }
        }
        let newParams = Object.assign(initParams, filterSearchParams)
        this.getList(newParams)
      },
      // 搜索方法
      searchHandle () {
        this.getNewList(1)
      },
      // 刷新列表
      refreshHandle (type) {
        if (type === 'add') {
          this.getNewList(1)
        } else {
          this.getNewList()
        }
      },
      // 显示弹框
      showDialogHandle (row, type) {
        this.showDialog = true
        this.dialogData = row
        this.dialogType = type
      },
      setPagination (data) {
        this.pagination.total = data.total
      }
    }
  }
</script>

<style scoped>

</style>
