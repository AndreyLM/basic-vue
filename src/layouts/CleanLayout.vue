<template lang="pug">
  v-container.fluid.fill-height.align-bottom
    notifications(
      width="50%" position='top center' group="alerts"
    )
    router-view

</template>


<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
