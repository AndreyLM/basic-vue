<template lang="pug">
    v-app-bar(app)
      v-app-bar-nav-icon(@click="drawerClick")
      v-toolbar-title Study App
      v-spacer
      v-toolbar-items
        v-btn(
            text 
            to="/profile"
        ) 
          v-icon account_circle 
          | {{ user.login }}
        v-btn(
            text 
            to="/logout"
            @click="logout"
        )
          v-icon exit_to_app
          | Logout
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: [ "initialDrawer" ],
    data() {
        return {
            drawer: this.initialDrawer
        }
    },
    methods: {
        logout() {
            this.$store.dispatch("logout")
            this.$router.push({path: '/login'})
        },
        drawerClick() {
            this.$emit("drawerClick")
        }
    },
    computed: {
        ...mapGetters({ user: "user" }),
    }
}
</script>

