<template lang="pug">
  .home-page
    i.el-icon-loading
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {}
  },
  computed: {
    ...mapState(['route'])
  },
  mounted () {
    let toRouter = this.route.addRouters[0].path
    this.$router.push(toRouter)
  },
  methods: {}
}
</script>
<style lang="scss">
.home-page{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: $--hc-success;
  background: url('~@/assets/images/loginBg.jpg') no-repeat center center / cover;
}
</style>
