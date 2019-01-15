<template>
 <v-footer class="pa-3 footer" color="amber accent-4">
  <v-spacer></v-spacer>
  <v-btn icon fixed @click="goBack">
    <v-icon medium>arrow_back</v-icon>
  </v-btn>
</v-footer>
</template>

<script>
import { eventBus } from '../../event_bus/event_bus';

export default {
data: function () {
  return {

  }
},
methods: {
  goBack() {
    if (eventBus.canNavigateUp) {
      if (eventBus.path === '/') {
        eventBus.canNavigateUp = false;
      } else {
        eventBus.popFromPath();
      }
    } else {
      // already in '/'
    }
  }
}
}
</script>

<style>
  .footer {
    position: fixed;
    height: 55px;
    bottom: 0;
    width: 100%;
  }
</style>
