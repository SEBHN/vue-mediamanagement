<template>
  <div>
    <app-media v-for="media in 5"></app-media>
  </div>
</template>

<script>
import Media from './Media.vue'

export default {
  data: function () {
    return {
      media
    }
  },
  components: {
    'app-media': Media
  }
}
</script>

<style scoped>
  
</style>