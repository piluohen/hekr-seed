<template lang="pug">
  el-card.hekr-card(:style="style" top="0")
    .hekr-card-header(slot="header" v-if="title")
      .hekr-card-title {{ title }}
      div
        slot(name="expand")
    slot
</template>

<script>
export default {
  name: 'hk-card',
  props: {
    title: {
      type: String,
      default: ''
    },
    top: {
      type: [String, Number],
      default: 0
    },
    bottom: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    style () {
      let style = {
        marginTop: this.top + 'px',
        marginBottom: this.bottom + 'px'
      }
      return style
    }
  }
}
</script>

<style lang="scss">

</style>
