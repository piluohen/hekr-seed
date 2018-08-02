<template lang="pug">
  .app-main
    transition(
      name="fade"
      mode="out-in"
    )
      router-view
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
<style lang="scss" scoped>
// 主体区域
.app-main {
  padding-top: 110px;
  height: 100%;
  & > div {
    margin: 0 40px;
  }
}
</style>
