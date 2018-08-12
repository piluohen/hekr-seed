<template lang="pug">
  //- 处理弹框
  el-dialog(custom-class="hekr-dialog", :title="dialogTitle", :visible="value", width="720px", :close-on-click-modal="false",
  @close="closeDialog", @open="openDialog")
    el-form.hekr-form(ref="form", :model="data", :rules="rules", label-width="80px", :validate-on-rule-change="false", :disabled="!isEdit")
      el-row(:gutter="20")
        el-col(:span="12")
          el-form-item(label="角色名称", prop="roleName")
            el-input(size="small", type="text", v-model="data.roleName")
        el-col(:span="12")
          el-form-item(label="角色编号", prop="roleNo")
            el-input(v-model="data.roleNo", type="text" size="small")
        el-col(:span="24")
          el-form-item.hekr-textarea(label="角色描述", prop="roleDesc")
            el-input(size="small", type="textarea", :rows="2", v-model="data.roleDesc")
        el-col(:span="24" v-if="moduleList")
          hk-card(:top="10" :bottom="20" title="选择功能模块")
            el-tree.role-tree(:data="moduleList", show-checkbox, :default-expand-all="true", ref="tree", node-key="id", :default-checked-keys="[]",
              :props="defaultProps")
    .hekr-dialog-footer(slot="footer")
      el-button.hekr-btn(size="small" @click="closeDialog") 取消
      el-button.hekr-btn(v-show="isEdit", type="success" size="small", :loading="btnLoading", :disabled="btnLoading" @click="postHandle") 保存
</template>
<script>
import mixinsDialog from '@/mixins/dialog'
export default {
  name: 'MaintainDialog',
  mixins: [mixinsDialog],
  data () {
    return {
      dialogName: '用户',
      moduleList: [],
      initRules: {
        roleName: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        roleNo: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  beforeMount () {
    this.moduleList = this.authority.moduleList
  },
  mounted () {
  },
  watch: {
    infos () {
      this.$nextTick(() => {
        this.initData()
      })
    }
  },
  methods: {
    // 初始化数据
    initData () {
      let checkedKeys = []
      this.reportName = 'userPart'
      if (this.type === 'add') {
        this.data = {}
        checkedKeys = []
      } else {
        this.data = Object.assign({}, this.infos)
        checkedKeys = this.setResource(this.data.resources)
      }
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(checkedKeys)
      }
    },
    // 处理权限数组
    setResource (keys) {
      let arr = []
      let moduleList = [].concat(this.moduleList)
      moduleList.forEach(item => {
        if (item.children && item.children.length > 0) {
          item.children.forEach(v => {
            if (v.children && v.children.length > 0) {
              v.children.forEach(i => {
                if (keys.includes(i.id)) {
                  arr.push(i.id)
                }
              })
              let allTwoLevel = v.children.every(i => {
                return keys.includes(i.id)
              })
              if (allTwoLevel) {
                arr.push(v.id)
              } else if (keys.includes(v.id)) {
                keys.splice(keys.indexOf(v.id), 1)
              }
            } else if (keys.includes(v.id)) {
              arr.push(v.id)
            }
          })
          let allOneLevel = item.children.every(v => {
            return keys.includes(v.id)
          })
          if (allOneLevel) {
            arr.push(item.id)
          }
        } else if (keys.includes(item.id)) {
          arr.push(item.id)
        }
      })
      return arr
    },
    // 设置params
    setParams (data) {
      let keys = this.$refs.tree.getCheckedKeys()
      let halfKeys = this.$refs.tree.getHalfCheckedKeys()
      let allKeys = keys.concat(halfKeys)
      let params = {
        roleName: data.roleName,
        roleNo: data.roleNo,
        roleDesc: data.roleDesc,
        resources: allKeys
      }
      return params
    },
    // 提交操作
    postHandle () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.setParams(this.data)
          this.btnLoading = true
          if (this.type === 'add') {
            this.Api.addRoleApi(params).then(response => {
              this.postMsg('新增成功')
            }).catch(() => {
              this.btnLoading = false
            })
          } else if (this.type === 'edit') {
            this.Api.updateRoleApi(this.data.roleId, params).then(response => {
              this.postMsg('修改成功')
            }).catch(() => {
              this.btnLoading = false
            })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.role-tree {
  padding: 20px;
  height: 360px;
}
</style>
