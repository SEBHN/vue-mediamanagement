import Vue from 'vue'
import { mediaService } from '../services/mediaService'

export const eventBus = new Vue({
  data: {
    // shared data here
  },
  methods: {
    add(media) {
      mediaService.add(media);
    },
    update(id, name) {
      mediaService.update(id, name);
    },
    getAll() {
      mediaService.getAll();
    },
    remove(id) {
      mediaService.remove(id);
    }
  }
});