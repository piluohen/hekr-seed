// vue.config.js

// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, '..', dir)
// }

module.exports = {
  // 部署应用基本URL
  baseUrl: '/',
  css: {
    modules: true
    // loaderOptions: {
    //   sass: {
    //     data: `@import "@/assets/styles/variables.scss"`
    //   }
    // }
  },
  devServer: {
    proxy: null
  },
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.resolve.alias.set('assets', resolve('src/assets'))
  // },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
