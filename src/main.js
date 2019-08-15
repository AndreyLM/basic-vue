import Vue from 'vue'
// import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'
import Notifications from 'vue-notification'
import Fragment from 'vue-fragment'

import store from './services/store'
import router from './services/router'
import server from './services/server'
import socket from './services/socket'

Vue.config.productionTip = false


// Vue.use(Vuetify)
Vue.use(server, {
  baseUrl: process.env.VUE_APP_SERVER_URL || '',
  localStorageTokenKey: process.env.VUE_APP_TOKEN_NAME || "vue-app",
})
Vue.use(Notifications)
Vue.use(require('vue-moment'))
Vue.use(socket, {url: 'ws://localhost:8000/v1/chat'})
Vue.use(Fragment.Plugin)
Vue.use(require('vue-moment'));

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  async mounted() {
      let vm = this
      this.$store.commit("SetServer", vm.$server)
      let authenticated = await this.$store.dispatch("initApp")
      let path = "/login"
      if( authenticated ) {
        path = '/'
        this.$store.dispatch("chat/connect", 'ws://localhost:8000/v1/chat')
      } 
      vm.$router.push( { path: path })
  }
}).$mount('#app')
