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
    rename(id, name) {
      mediaService.rename(id, name);
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
    // Path handling
    pushToPath(path) {
      this.path += path;
      this.emitEvent('pathChanged');
    },
    popFromPath() {
      const split = eventBus.path.split('/');
      split.splice(split.length - 2, 1);
      eventBus.path = split.join('/');
      console.log('After pop' + eventBus.path);
      this.emitEvent('pathChanged');
    },
    resetPath() {
      this.path = '/';
      this.emitEvent('pathChanged');
    },
    // event to emit
    emitEvent(event) {
      this.$emit(event, mediaService.getAllForPath(this.path));
    }
  }
});