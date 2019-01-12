const mediaDao = require('../dao/mediaDao');

const mediaService = {
  addOne: function(media) {
    mediaDao.push(media);
  },
  addMany: function(files) {
    if (Array.isArray(files)) {
      files.forEach((file) => {
        this.addOne(file);
      });
    } else {
      throw new Error(`The arg ${files} is not an Array.`);
    }
  },
  rename: function(id, name) {
    this.getMediaForId(id).name = name;
  },
  getAll: function() {
    return mediaDao;
  },
  getAllForPath(path) {
    return mediaDao.filter(media => media.filePath === path);
  },
  getMediaForId(id) {
    return mediaDao.find(media => media.id === id);
  },
  remove: function(id) {
    const media = mediaDao.find(media => media.id === id);
    const index = mediaDao.indexOf(media);
    if (index > -1) {
      mediaDao.splice(index, 1);
    } else {
      throw new Error(`Media with id ${id} doesn't exist in mediaDao.`);
    }
  },
  removeAll() {
    mediaDao.slice(0, mediaDao.length);
  }
}

module.exports = mediaService;