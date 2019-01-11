import { mediaDao } from '../dao/mediaDao'

export const mediaService = {
  mediaDao: mediaDao,
  add: function(media) {
    this.mediaDao.push(media);
  },
  update: function(id, name) {
    this.mediaDao.find(media => media.id === id).name = name;
  },
  getAll: function() {
    return this.mediaDao.slice();
  },
  getAllForPath(path) {
    return this.mediaDao.find(media => media.filePath === path);
  },
  remove: function(id) {
    const media = this.mediaFiles.find(media => media.id === id);
    this.mediaFiles.remove(media);
  }
}