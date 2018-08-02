<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "~normalize.css";
@import "~@/assets/styles/index.scss";
html, body {
  width: 100%;
  height: 100%;
  background-color: $--hc-bg03;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $--hc-info;
}
</style>
