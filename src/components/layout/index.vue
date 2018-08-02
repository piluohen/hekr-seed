<template lang="pug">
.app-wrapper
  Header
  Main
</template>

<script>
import Header from '@/components/layout/header'
import Main from '@/components/layout/main'

export default {
  name: 'layout',
  components: {
    Header,
    Main
  }
}
</script>

<style lang="scss">
.app-wrapper {
  min-width: 1300px;
  height: 100%;
}
</style>
