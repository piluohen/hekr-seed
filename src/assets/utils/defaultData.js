import dayjs from 'dayjs'

export const getTimeRange = (time = Date.now()) => {
  return dayjs(dayjs(time).format('YYYY-MM-DD')).unix() * 1000
}

export const defaultData = {
  // 用户类型
  userCategoryList: [
    {label: '外部用户', value: 'EXTERNAL'},
    {label: '内部用户', value: 'INTERNAL'}
  ],
  // 用户冻结状态
  userIslocked: [
    {label: '正常', value: 'NORMAL', type: 'success'},
    {label: '禁用', value: 'FORBIDDEN', type: 'danger'}
  ],
  // 公司类型
  companyCategoryList: [
    {label: '重点', value: 'EMPHASIS'},
    {label: '普通', value: 'GENERAL'},
    {label: '九小', value: 'NINE_SMALL'}
  ],
  // 用户角色
  userRoleList: [
    {label: '超级管理员', value: 'fire_admin'},
    {label: '集团管理员', value: 'company_admin'}
  ],
  // 用户反馈处理状态
  feedbackStatusList: [
    {label: '已处理', value: 'PROCESSED', type: 'success'},
    {label: '未处理', value: 'UNPROCESSED', type: 'danger'}
  ],
  // 操作日志操作类型
  oplogStatusList: [
    {label: '新增', value: 'ADD', type: 'success'},
    {label: '更新', value: 'UPDATE', type: 'warning'},
    {label: '控制', value: 'CONTROL', type: 'primary'},
    {label: '删除', value: 'DELETE', type: 'danger'}
  ],
  // 设备类型
  deviceTypeList: [
    {label: '燃气', value: 'ONE'}
    // {label: '烟草', value: 'TWO'}
  ],
  // 设备安装场所类别
  deviceLocationTypeList: [
    {label: '家庭', value: 'HOME'},
    {label: '沿街商铺', value: 'SHOP'},
    {label: '九小场所', value: 'NINE_SMALL'},
    {label: '其他', value: 'OTHER'}
  ],
  // 设备状态
  deviceStatusList: [
    {label: '告警', value: 'ALARM', type: 'danger'},
    {label: '故障', value: 'FAULT', type: 'warning'},
    {label: '正常', value: 'NORMAL', type: 'success'}
  ],
  // 设备联网状态
  networkStatusList: [
    {label: '在线', value: 'ON', type: 'success'},
    {label: '离线', value: 'OFF', type: 'info'}
  ],
  // 设备处理状态
  deviceHandleStatusList: [
    {label: '已处理', value: 'PROCESSED', type: 'success'},
    {label: '未处理', value: 'UNPROCESSED', type: 'danger'}
  ],
  // 设备处理方式
  handleMethodList: [
    {label: '无', value: 'NULL'},
    {label: '继续观察', value: 'CONTINUE_OBSERVE'},
    {label: '重置模块', value: 'RESET_MODULE'},
    {label: '排查处理', value: 'DISPOSE'},
    {label: '系统调试', value: 'SYSTEM_DEBUG'},
    {label: '误报', value: 'MISREPORT'}
  ],
  // 功能模块
  webNavList: [
    {id: 'XMGK', label: '项目概况'},
    {id: 'SBLB', label: '设备列表'},
    {id: 'BJGL', label: '报警管理'},
    {
      id: 'BBFX',
      label: '报表分析',
      children: [
        {id: 'HZTJ', label: '汇总分析'},
        {id: 'BJFX', label: '报警分析'},
        {id: 'GZFX', label: '故障分析'},
        {id: 'ZZTJ', label: '最值分析'}
      ]
    },
    {id: 'YHFK', label: '用户反馈'},
    {id: 'SBGL', label: '设备管理'},
    {
      id: 'ZHGL',
      label: '账号管理',
      children: [
        {id: 'YHGL', label: '用户管理'},
        {id: 'JSGL', label: '角色管理'},
        {id: 'CZRZ', label: '操作日志'}
      ]
    },
    {id: 'SCGL', label: '生产管理'},
    {id: 'QYGL', label: '企业简介'}
  ],
  // 日期快速选择
  pickerOptions: {
    disabledDate (time) {
      return time.getTime() > Date.now()
    },
    shortcuts: [{
      text: '最近一周',
      onClick (picker) {
        const end = getTimeRange(new Date())
        const start = getTimeRange(Date.now() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近一个月',
      onClick (picker) {
        const end = getTimeRange(new Date())
        const start = getTimeRange(Date.now() - 3600 * 1000 * 24 * 30)
        picker.$emit('pick', [start, end])
      }
    }, {
      text: '最近三个月',
      onClick (picker) {
        const end = getTimeRange(new Date())
        const start = getTimeRange(Date.now() - 3600 * 1000 * 24 * 90)
        picker.$emit('pick', [start, end])
      }
    }]
  }
}
