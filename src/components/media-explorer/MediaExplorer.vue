<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex v-for="file in mediaFiles" :key="file.id" xs4>
          <app-media></app-media>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Media from './Media.vue'
import { eventBus } from '../../event_bus/event_bus'

export default {

  data: function () {
    return {
      eventBus,
      mediaFiles: []
    }
  },
  components: {
    'app-media': Media
  },
  methods: {
    // methods here
  },
  created() {
    // register events
    this.eventBus.$on('mediaAdded', (allMedia) => {
      
    });
  },
  beforeMount() {
    this.mediaFiles = this.eventBus.getAllForPath(this.eventBus.path);
  }

}
</script>

<style scoped>
  
</style>