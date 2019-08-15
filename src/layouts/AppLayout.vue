<template lang="pug">
  fragment
    top-panel(
      :initial-drawer="drawer"
      @drawerClick="changeDrawer"
    )

    side-panel(
      :initial-drawer="drawer"
    )  
        
    v-content
      v-container.fluid.fill-height
        router-view
        
</template>

<script>

import { mapGetters } from "vuex"
import TopPanel from '@/components/panels/TopPanel'
import SidePanel from '@/components/panels/SidePanel'

export default {
  name: 'App',
  data() {
    return {
      drawer: false
    }
  },
  components: {
    TopPanel,
    SidePanel
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
