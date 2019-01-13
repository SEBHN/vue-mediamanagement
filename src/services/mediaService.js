import uuidv4 from 'uuid/v4';
import mediaDao from '../dao/mediaDao';

const mediaService = {
  addOne: function(media) {
    // incoming folder
    if (media.id == null) {
      // check by name if folder is in memory
      const match = this.getAll().find(element => element.name === media.name);
      if (typeof match === 'undefined') {
        // folder doesn't exist in memory
        media.id = uuidv4(); // generate random uuid
        media.isFolder = true;
        mediaDao.push(media);
      } // if folder is in memory - do nothing
    } else {
      // handle media files
      mediaDao.push(media);
    }

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

export default mediaService