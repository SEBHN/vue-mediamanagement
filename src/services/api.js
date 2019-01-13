import Vue from 'vue'
import http from '../http/http';
import { eventBus } from '../event_bus/event_bus';

/*eslint no-console: ["error", { allow: ["log"] }] */
const api = new Vue({
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
      let obj = {};
      obj.name = file.name;
      obj.fileExtension = this.getExtension(file);
      obj.filePath = eventBus.path;
      const requestUrl = `/users/${userId}/media/`;
      http.post(requestUrl, JSON.stringify(obj)).then(res => {
        this.postMedia(userId, res.data['id'], file)});
    },
    postMedia(userId, mediaId, file) {
      const formData = new FormData();
      formData.append("file", file);
      const requestUrl = `/users/${userId}/media/${mediaId}/upload`;
      http.post(requestUrl, formData).then(res => console.log(res.data));
    },
    getExtension(file) {
      const fileName = file.name;
      const countDots = fileName.replace(/[^.]/g, "").length;
      if (countDots < 1) {
        return "undefined";
      } else if (countDots === 1) {
        return "." + fileName.split(".").pop();
      } else {
        const file_name_array = fileName.split(".");
        return "." + file_name_array[file_name_array.length - 1];
      }
    },
    deleteMedia(userId, mediaId) {
      const requestUrl = `/users/${userId}/media/${mediaId}`; 
      http.delete(requestUrl).then(res => console.log(res.status));
    }
  }
})

export default api