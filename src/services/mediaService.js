import { mediaDao } from '../dao/mediaDao'

export const mediaService = {
  mediaDao: mediaDao,
  add: function(media) {
    this.mediaDao.push(media);
  },
  update: function(id, name) {
    this.getMediaForId(id).name = name;
  },
  getAll: function() {
    return this.mediaDao.slice();
  },
  getAllForPath(path) {
    return this.mediaDao.filter(media => media.filePath === path);
  },
  getMediaForId(id) {
    return this.mediaDao.find(media => media.id === id);
  },
  remove: function(id) {
    const media = this.mediaFiles.find(media => media.id === id);
    this.mediaFiles.remove(media);
  }
}