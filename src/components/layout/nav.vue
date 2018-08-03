<template lang="pug">
  .app-nav
    el-menu(ref="navMenu",:default-active="activeIndex", mode="horizontal", @open="handleOpen", @close="handleClose",
      @select="selectHandle", :unique-opened="true", :collapse-transition="false")
      template(v-for="item in list", v-if="item.show")
        el-menu-item(v-if="!item.children", :index="item.path")
          i(:class="item.icon")
          span(slot="title") {{item.title}}
        el-submenu(v-else, :index="item.path", :popper-append-to-body="false", ref="submenu", popper-class="hekr-submenu",
          :hide-timeout="0", :show-timeout="0")
          template(slot="title")
            i(:class="item.icon")
            span(slot="title") {{item.title}}
          template(v-for="sub in item.subList")
            el-menu-item(:index="sub.path", v-show="sub.show")
              i(:class="sub.icon")
              span {{sub.title}}
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: 'AppNav',
  data () {
    return {
      activeIndex: this.defaultActiveIndex
    }
  },
  computed: {
    ...mapState(['user', 'route']),
    defaultActiveIndex () {
      return this.$route.meta.keepAlivePath ? this.$route.meta.keepAlivePath : this.$route.path
    },
    list () {
      let isSuperAdmin = this.user.isSuperAdmin
      let router = this.route.addRouters
      return router.map(r => {
        let path = r.redirect
        let icon = r.meta.icon
        let title = r.meta.title || r.children[0].meta.title
        let children = r.meta.children
        let subList = []
        let show = !r.meta.hide
        if (children) {
          r.children.map(s => {
            subList.push({
              path: `${r.path}/${s.path}`,
              icon: s.meta.icon,
              title: s.meta.title,
              show: (!s.meta.isSuperAdmin || (s.meta.isSuperAdmin && isSuperAdmin)) && !s.meta.hide
            })
          })
        }
        return {
          path,
          icon,
          title,
          children,
          show,
          subList
        }
      })
    }
  },
  mounted () {
    this.activeIndex = this.defaultActiveIndex
  },
  watch: {
    '$route' (to, from) {
      this.activeIndex = this.defaultActiveIndex
    }
  },
  methods: {
    handleOpen (index, path) {
      this.$nextTick(() => {
        this.$router.push(index)
        this.$refs.navMenu.activeIndex = index
        this.closeSubmenu(index)
      })
    },
    handleClose (index, path) {
      this.closeSubmenu(index)
    },
    selectHandle (index, path) {
      if (index !== this.$route.path) {
        this.$nextTick(() => {
          this.$router.push(index)
          this.closeSubmenu(index)
        })
      }
    },
    // 关闭子菜单
    closeSubmenu (index) {
      this.$refs.navMenu.close(index)
    },
    // 打开子菜单
    openSubmenu (index) {
      this.$refs.submenu.forEach(v => {
        let arr = Object.keys(v.items)
        if (arr.includes(index)) {
          this.$refs.navMenu.open(arr[0])
        }
      })
    }
  }
}
</script>
<style lang="scss">
  $-hc-br: 2px;
  .app-nav {
    display: flex;
    padding: 0 40px;
    overflow: hidden;
    background-color: $--hc-bg01;
    .el-menu {
      flex: 1;
      border: 0;
      background-color: $--hc-bg01;
      .el-menu-item{
        min-width: auto;
        padding: 0 40px;
        height: 60px;
        line-height: 60px;
        text-align: left;
        border-radius: $-hc-br;
        font-size: 16px;
        color: $--hc-nav-fc;
        background-color: transparent;
        &:hover {
          color: $--hc-nav-fh;
          background-color: transparent;
        }
        &:active,
        &:visited,
        &:focus {
          color: $--hc-nav-fh;
          background-color: transparent;
        }
        &.is-active {
          background-image:linear-gradient(0deg, rgba(33,174,59,0.38) 0%, rgba(33,174,59,0.08) 100%);
          background-color: transparent;
          color: $--hc-nav-fh;
          border-bottom: 4px solid $--hc-success;
        }
      }
    }
    .el-submenu {
      width: 144px;
      .el-submenu__title {
        overflow: hidden;
        padding: 0 40px;
        height: 60px;
        line-height: 60px;
        text-align: left;
        border-radius: $-hc-br;
        font-size: 16px;
        color: $--hc-nav-fc;
        i {
          color: $--hc-nav-fc;
        }
        &:hover {
          color: $--hc-nav-fh;
          background-color: transparent;
          i {
            color: $--hc-nav-fh;
          }
        }
      }
      &:focus {
        .el-submenu__title {
          color: $--hc-nav-fc;
        }
      }
      &.is-opened {
        .el-submenu__title {
          color: $--hc-nav-fh;
          i {
            color: $--hc-nav-fh;
          }
        }
      }
      &.is-active {
        .el-submenu__title {
          background-image:linear-gradient(0deg, rgba(33,174,59,0.38) 0%, rgba(33,174,59,0.08) 100%);
          background-color: transparent;
          color: $--hc-nav-fh;
          border-bottom: 4px solid $--hc-success !important;
          i {
            color: $--hc-nav-fh;
          }
        }
      }
    }
  }
  .hekr-submenu {
    background-color: transparent;
    border: none;
    .el-menu--popup {
      background-color: $--hc-bg01;
      .el-menu-item {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background-color: $--hc-bg01;
        color: $--hc-nav-fc;
        &:hover {
          color: $--hc-nav-fh;
          background-color: transparent;
        }
        &.is-active {
          background-color: transparent;
          color: $--hc-nav-fh;
          border-bottom: 2px solid $--hc-success;
        }
      }
    }
  }
</style>
