<template lang="pug">
  v-navigation-drawer(
      :value="drawer"
      app
      mobile-break-point=640
    )
      v-list
        v-list-item(link to="/profile")
          v-list-item-icon
            v-icon account_circle
          v-list-item-content
            v-list-item-title Profile

        v-list-item(link to="/chat")
          v-list-item-icon
            v-icon chat
          v-list-item-content
            v-list-item-title Chat
</template>

<script>
export default {
    props: [ "initialDrawer"],
    computed: {
        drawer() {
            return this.initialDrawer
        }
    }
}
</script>