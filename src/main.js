import Vue from 'vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Common from '@/components/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/font/iconfont.css"
import axios from "axios"
import App from './App.vue'
import api from './api/index'

Vue.use(Common)
Vue.use(ElementUI)
window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.prototype.router = router
Vue.prototype.axios = axios
Vue.prototype.api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
