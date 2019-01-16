import uuidv4 from 'uuid/v4';

/**
 * Map containing all media files fetched from Backend
 * key -> media id
 * value -> media object
 */
const mediaDao = new Map();

/**
 * Service implementing CRUD operations on the mediaDao map.
 */
const mediaService = {
    addOne: function (media) {
        // incoming folder
        if (media.id == null) {
            // check by name if folder is in memory
            const match = this.getAll().find(element => element.name === media.name);
            if (typeof match === 'undefined') {
                // folder doesn't exist in memory
                media.id = uuidv4(); // generate random uuid
                media.isFolder = true;
                mediaDao.set(media.id, media);
            } // if folder is in memory - do nothing
        } else {
            // handle media files
            mediaDao.set(media.id, media);
        }

    },
    addMany: function (files) {
        if (Array.isArray(files)) {
            files.forEach((file) => {
                this.addOne(file);
            });
        } else {
            throw new Error(`The arg ${files} is not an Array.`);
        }
    },
    rename: function (id, name) {
        this.getMediaForId(id).name = name;
    },
    getAll: function () {
        return Array.from(mediaDao.values()).slice()
    },
    getAllForPath(path) {
        return this.getAll().filter(media => media.filePath === path);
    },
    getMediaForId(id) {
        return mediaDao.get(id);
    },
    remove: function (id) {
        mediaDao.delete(id);
    },
    removeAll: function () {
        mediaDao.clear();
    }
}

export default mediaService