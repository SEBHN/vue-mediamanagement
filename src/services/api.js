import Vue from 'vue'
import {eventBus} from '../event_bus/event_bus';

const axios = require('axios');
const API_URL = 'https://mvs-18-ws-spring-in-cloud.appspot.com';

/*eslint no-console: ["error", { allow: ["log"] }] */
export const api = new Vue({
    data: {
        // shared data here
        bearer: String,
        http: axios,
    },
    methods: {
        async configureHttp() {
            this.http = axios.create({
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await this.$auth.getAccessToken()}`
                }
            });
        },
        getMediaForPath(path) {
            const requestUrl = `/folders/${encodeURIComponent(path)}/media`;
            this.http.get(API_URL + requestUrl).then((res) => {
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
        getAllMediaForUser() {
            const requestUrl = `/media`;
            this.http.get(API_URL + requestUrl).then((res) => {
                eventBus.addMany(res.data);
            });
        },
        getMediaForId(mediaId) {
            const requestUrl = `/media/${mediaId}`;
            this.http.get(API_URL + requestUrl).then(res => console.log(res.data));
        },
        uploadMetadata(file) {
            let obj = {};
            obj.name = file.name;
            obj.fileExtension = this.getExtension(file);
            obj.filePath = eventBus.path;
            const requestUrl = `/media`;
            this.http.post(API_URL + requestUrl, JSON.stringify(obj)).then(res => {
                this.postMedia(res.data.id, file)
            });
        },
        postMedia(mediaId, file) {
            const formData = new FormData();
            formData.append("file", file);
            const requestUrl = `/media/${mediaId}/upload`;
            this.http.post(API_URL + requestUrl, formData).then(res => {
                res.data.isFolder = false;
                eventBus.add(res.data);
            });
        },
        deleteMedia(mediaId) {
            const requestUrl = `/media/${mediaId}`;
            this.http.delete(API_URL + requestUrl).then(res => {
                eventBus.remove(mediaId);
            });
        },
        downloadMedia(fileName, mediaId){
            const requestUrl = `/media/${mediaId}/download`;

            this.http.get(API_URL + requestUrl, {
                responseType: "blob"
            })
                .then(response => {
                    const FileDownload = require("js-file-download");
                    FileDownload(response.data, fileName);
                })
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
        }
    }
})