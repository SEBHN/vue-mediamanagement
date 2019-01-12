import Vue from 'vue'
const mediaService = require('../services/mediaService');

export const eventBus = new Vue({
  data: {
    // shared data here
    path: '/'
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