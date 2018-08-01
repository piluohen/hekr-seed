// vue.config.js
module.exports = {
  // 部署应用基本URL
  baseUrl: '/',
  css: {
    modules: true,
    loaderOptions: {
      sass: {
        data: '@import "@/assets/variables.scss"'
      }
    }
  },
  devServer: {
    proxy: ''
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}
