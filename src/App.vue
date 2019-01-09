<template>
<v-app>
  <app-header></app-header>
</v-app>
</template>

<script>
import Header from './components/layout/Header.vue'
import eventBus from './event_bus/event_bus.js'

export default {
  components: {
    'app-header': Header
  }
}
</script>

<style>

</style>
