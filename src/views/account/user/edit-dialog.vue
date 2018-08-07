<template lang="pug">
  //- 处理弹框
  el-dialog(custom-class="hekr-dialog", :title="dialogTitle", :visible="value", width="720px", :close-on-click-modal="false",
  @close="closeDialog", @open="openDialog")
    el-form.hekr-form(ref="form", :model="data", :rules="rules", label-width="80px", :validate-on-rule-change="false" :disabled="!isEdit")
      el-row(:gutter="20")
        el-col(:span="12")
          el-form-item(label="用户名称", prop="userName")
            el-input(size="small", type="text", v-model="data.userName")
          el-form-item(label="用户角色", prop="roleId")
            SelectRole(v-model="data.roleId")
          el-form-item(label="单位类别", prop="orgnType")
            el-select(v-model="data.orgnType", size="small",)
              el-option(v-for="item in companyCategoryList", :key="item.value", :label="item.label", :value="item.value")
          el-form-item(label="单位地址", prop="orgAddress")
            el-input(size="small", type="text", v-model="data.orgAddress",)
          el-form-item(label="联系电话", prop="telephone")
            el-input(size="small", type="text", v-model="data.telephone",)
        el-col(:span="12")
          el-form-item(label="手机号", prop="phone")
            el-input(size="small", type="text", v-model="data.phone", placeholder="请输入手机号",)
          el-form-item(style="visibility: hidden;")
            el-input(size="small", type="text", )
          el-form-item(label="单位名称", prop="orgName")
            el-input(size="small", type="text", v-model="data.orgName",)
          el-form-item(label="联系人", prop="contact")
            el-input(size="small", type="text", v-model="data.contact", placeholder="请输入联系人名称",)
          el-form-item(label="邮箱地址", prop="email")
            el-input(size="small", type="text", v-model="data.email",)
    .hekr-dialog-footer(slot="footer")
      el-button.hekr-btn(size="small" @click="closeDialog") 取消
      el-button.hekr-btn(v-show="isEdit", type="success" size="small" @click="postHandle", :loading="btnLoading", :disabled="btnLoading") 保存
</template>
<script>
import mixinsDialog from '@/mixins/dialog'
import SelectRole from './selectRole'
import {defaultData} from '@/assets/utils/defaultData'
import { validate } from '@/assets/utils/validate'
export default {
  name: 'MaintainDialog',
  mixins: [mixinsDialog],
  components: {SelectRole},
  props: {
  },
  data () {
    return {
      dialogName: '用户',
      userRoleList: defaultData.userRoleList,
      companyCategoryList: defaultData.companyCategoryList,
      initRules: {
        userName: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入该字段', trigger: 'blur'},
          {validator: validate.mobile, trigger: 'blur'}
        ],
        roleId: [
          {required: true, message: '请选择用户角色', trigger: 'blur'}
        ],
        orgnType: [
          {required: true, message: '请选择单位类别', trigger: 'blur'}
        ],
        orgName: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        orgAddress: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入该字段', trigger: 'blur'}
        ],
        telephone: [
          {required: true, message: '请输入该字段', trigger: 'blur'},
          {validator: validate.mobile, trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入该字段', trigger: 'blur'},
          {validator: validate.email, trigger: 'blur'}
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
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
      if (this.type === 'add') {
        this.data = {}
      } else {
        this.data = Object.assign({}, this.infos)
      }
    },
    // 设置params
    setParams (data) {
      let params = {
        userName: data.userName,
        phone: data.phone,
        roleId: data.roleId,
        orgnType: data.orgnType,
        orgName: data.orgName,
        orgAddress: data.orgAddress,
        contact: data.contact,
        telephone: data.telephone,
        email: data.email
      }
      return params
    },
    postHandle () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = this.setParams(this.data)
          this.btnLoading = true
          if (this.type === 'add') {
            this.Api.addUserApi(params).then(response => {
              this.postMsg('新增成功')
            }).catch(() => {
              this.btnLoading = false
            })
          } else if (this.type === 'edit') {
            this.Api.updateUserApi(this.data.userId, params).then(response => {
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
.user-project-tree {
  height: 280px;
  overflow-y: auto;
}
</style>
