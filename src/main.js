import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import store from './services/store'
import router from './services/router'
import server from './services/server'

Vue.config.productionTip = false

Vue.use(server, {
  baseUrl: localStorage.getItem(process.VUE_APP_SERVER_URL) || '',
  token: localStorage.getItem(process.VUE_APP_TOKEN_NAME) || ''
})

new Vue({
  data: () => {
    return {
      authenticated: false,
      loading: true
    }
  },
  render: h => h(App),
  store,
  router,
  async mounted() {
    self = this
    try {
      data = await self.$server.testAuth()
      self.authenticated = true
      self.$router.push( { path: '/' })
    } catch(err) {
      self.authenticated = false
      self.$router.push( { path: '/auth/login' })
    }
  }
}).$mount('#app')
