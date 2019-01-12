<template>
<v-app>
  <app-header></app-header>
  <br><br><br>
  <app-media-explorer class="ma-4"></app-media-explorer>
</v-app>
</template>

<script>
import MediaExplorer from './components/media-explorer/MediaExplorer.vue'
import Header from './components/layout/Header.vue'
import eventBus from './event_bus/event_bus.js'

export default {
  components: {
    'app-header': Header,
    'app-media-explorer': MediaExplorer
  }
}
</script>

<style>

</style>
