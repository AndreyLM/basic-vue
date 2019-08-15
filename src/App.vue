<template>
  <v-app>
    <component :is="layout"></component> 
  </v-app>
</template>

<script>
import AppLayout from './layouts/AppLayout'
import CleanLayout from './layouts/CleanLayout'

export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
  components: {
    'app-layout': AppLayout,
    'clean-layout': CleanLayout
  },
  computed: {
    layout() {
      return this.$store.getters.layout
    }
  }
  
}
</script>
