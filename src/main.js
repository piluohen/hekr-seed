import Vue from 'vue'
import App from './App.vue'
import Api from './service/api'
import store from './store/index'
import router from './router/index'
import ElementUI from 'element-ui'
import './permission' // permission control
import HKCard from '@/components/hk-card'

Vue.component(HKCard.name, HKCard)

Vue.config.productionTip = false

Vue.prototype.Api = Api
Vue.use(ElementUI)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
