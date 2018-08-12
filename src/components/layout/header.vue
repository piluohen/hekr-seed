<template lang="pug">
  .app-header
    .app-top
      .item.logo
      .item.user-info
        DropDown()
    AppNav()
</template>
<script>
import AppNav from './nav'
import DropDown from './dropdown'
export default {
  name: 'Aside',
  components: {
    AppNav,
    DropDown
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss">
  .app-header {
    position: fixed;
    width: 100%;
    min-width: 1300px;
    top: 0;
    height: 110px;
    background-color: $--hc-bg02;
    z-index: 123;
    .app-top {
      display: flex;
      justify-content: space-between;
      height: 50px;
      padding: 5px 40px;
      background-color: $--hc-white;
      .item {
        height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
      .logo {
        width: 120px;
        background: url('~@/assets/images/logo.png') center center no-repeat;
      }
      .user-info {
        line-height: 40px;
        .dropdown-title {
          cursor: pointer;
        }
        .img {
          display: inline-block;
          width: 32px;
          height: 32px;
          margin-right: 10px;
          line-height: 32px;
          text-align: center;
          border-radius: 50%;
          vertical-align: middle;
          overflow: hidden;
          background-color: $--hc-primary;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          span {
            margin: 0;
            width: 100%;
            height: 100%;
            vertical-align: middle;
            color: $--hc-white;
            font-size: 18px;
          }
          .el-icon--right {
            font-size: 16px;
          }
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
</style>
