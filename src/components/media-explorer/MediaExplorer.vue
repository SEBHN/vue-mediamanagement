<template>
  <div>
    <v-btn color="success" @click="renderMatrix">Get media</v-btn>
    <!-- <app-media v-for="media in mediaFiles" :key="media.id"></app-media> -->
  </div>
</template>

<script>
import Media from './Media.vue'
import { mediaService } from '../../services/mediaService'

export default {

  data: function () {
    return {
      mediaService,
      mediaFiles: [],
      displayFiles: []
    }
  },
  components: {
    'app-media': Media
  },
  methods: {
    renderMatrix() {
      console.log('render invoked');
      console.log(this.mediaService.getAllForPath('/'));
    }
  },
  created() {
    // register events for update
    
  }
}
</script>

<style scoped>
  
</style>