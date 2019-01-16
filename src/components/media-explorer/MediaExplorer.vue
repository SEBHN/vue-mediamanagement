<template>
  <div>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex v-for="file in mediaFiles" :key="file.id" md3 xs12 class="my-4">
          <app-media
              :name="file.name"
              :id="file.id"
              :filePath="file.filePath"
              :isFolder="file.isFolder"
          ></app-media>
        </v-flex>
      </v-layout>
      <!-- <v-progress-circular
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular> -->
    </v-container>
  </div>
</template>

<script>
import Media from './Media.vue'
import { eventBus } from '../../event_bus/event_bus';
import { api } from '../../services/api';

export default {

  data: function () {
    return {
      mediaFiles: [],
      sheet: false
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
    eventBus.$on('mediaAdded', (files) => {
      this.mediaFiles = files;
    });
    eventBus.$on('pathChanged', (files) => {
      this.mediaFiles = files;
    });
      eventBus.$on('mediaRemoved', (files) => {
          this.mediaFiles = files;
      });
  },
  async beforeMount() {
    await api.configureHttp();
    this.mediaFiles = api.getMediaForPath(eventBus.path);
      console.log("HALLO");
  }
}
</script>

<style scoped>
  
</style>