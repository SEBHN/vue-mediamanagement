import Vue from 'vue'
const http = require('../http/http');
const httpPost = require('../http/http');
import { eventBus } from '../event_bus/event_bus';

export const api = new Vue({
  data: {
    // shared data here
  },
  methods: {
    getMediaForPath(userId, path) {
      const requestUrl = `/users/${userId}/folders/${encodeURIComponent(path)}/media`;
      http.get(requestUrl).then((res) => {
        // add folders if they exist
        if (res.data.subfolders) {
          res.data.subfolders.forEach((folder) => {
            folder.filePath = path;
            eventBus.add(folder);
          });
        }
        // add media
        res.data.media.forEach((media) => {
          media.isFolder = false;
          eventBus.add(media);
        })
      });
    },
    getAllMediaForUser(userId) {
      const requestUrl = `/users/${userId}/media/`;
      http.get(requestUrl).then((res) => {
        eventBus.addMany(res.data);
      });
    },
    getMediaForId(userId, mediaId) {
      const requestUrl = `/users/${userId}/media/${mediaId}`;
      http.get(requestUrl).then(res => console.log(res.data));
    },
    uploadMetadata(file, userId) {
      var obj = new Object();
      obj.name = file.name;
      obj.fileExtension = this.getExtension(file);
      obj.filePath = eventBus.path;
      const requestUrl = `/users/${userId}/media/`;
      httpPost.post(requestUrl, JSON.stringify(obj)).then(res => {
        this.postMedia(userId, res.data.id, file)});
    },
    postMedia(userId, mediaId, file) {
      const formData = new FormData();
      formData.append("file", file);
      const requestUrl = `/users/${userId}/media/${mediaId}/upload`;
      http.post(requestUrl, formData).then(res => {
        res.data.isFolder = false;
        eventBus.add(res.data);
      });
    },
    getExtension(file) {
      const fileName = file.name;
      const countDots = fileName.replace(/[^.]/g, "").length;
      let extension;
      if (countDots < 1) {
        return extension = "undefined";
      } else if (countDots === 1) {
        return extension = "." + fileName.split(".").pop();
      } else {
        const file_name_array = fileName.split(".");
        return extension = "." + file_name_array[file_name_array.length - 1];
      }
    },
    deleteMedia(userId, mediaId) {
      const requestUrl = `/users/${userId}/media/${mediaId}`; 
      http.delete(requestUrl).then(res => console.log(res.status));
    }
  }
}) ;
