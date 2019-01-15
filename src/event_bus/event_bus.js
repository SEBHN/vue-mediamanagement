import Vue from 'vue'
import mediaService from '../services/mediaService';

export const eventBus = new Vue({
  data: {
    // shared data here
    mediaService,
    path: '/',
    canNavigateUp: false
  },
  methods: {
    add(media) {
      mediaService.addOne(media);
      this.emitEvent('mediaAdded');
    },
    addMany(files) {
      mediaService.addMany(files);
      this.emitEvent('mediaAdded');
    },
    update(id, name) {
      mediaService.update(id, name);
      this.emitEvent('mediaUpdated');
    },
    getAll() {
      mediaService.getAll();
    },
    getAllForPath(path) {
      return mediaService.getAllForPath(path);
    },
    remove(id) {
      mediaService.remove(id);
      this.emitEvent('mediaRemoved');
    },
    // event to emit
    emitEvent(event) {
      this.$emit(event, mediaService.getAllForPath(this.path));
    }
  }
});