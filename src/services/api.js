import Vue from 'vue'
import {eventBus} from '../event_bus/event_bus';

const axios = require('axios');

//const baseUrl = 'http://localhost:8080';


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
        getMediaForPath(userId, path) {
            //const requestUrl = ` / users / ${userId}/folders/${encodeURIComponent(path)}/media`;
            const requestUrl = `/folders/${encodeURIComponent(path)}/media`;

            console.log('Get Media for Path');

            this.http.get('https://mvs-18-ws-spring-in-cloud.appspot.com' + requestUrl).then((res) => {
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
        }
        ,
        getAllMediaForUser(userId) {
            const requestUrl = `/users/${userId}/media/`;
            this.http.get(requestUrl).then((res) => {
                eventBus.addMany(res.data);
            });
        }
        ,
        getMediaForId(userId, mediaId) {
            const requestUrl = `/users/${userId}/media/${mediaId}`;
            this.http.get(requestUrl).then(res => console.log(res.data));
        }
        ,
        uploadMetadata(file, userId) {
            let obj = {};
            obj.name = file.name;
            obj.fileExtension = this.getExtension(file);
            obj.filePath = eventBus.path;
            const requestUrl = `/users/${userId}/media/`;
            this.http.post(requestUrl, JSON.stringify(obj)).then(res => {
                this.postMedia(userId, res.data.id, file)
            });
        }
        ,
        postMedia(userId, mediaId, file) {
            const formData = new FormData();
            formData.append("file", file);
            const requestUrl = `/users/${userId}/media/${mediaId}/upload`;
            this.http.post(requestUrl, formData).then(res => {
                res.data.isFolder = false;
                eventBus.add(res.data);
            });
        }
        ,
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
        ,
        deleteMedia(userId, mediaId) {
            const requestUrl = `/users/${userId}/media/${mediaId}`;
            this.http.delete(requestUrl).then(res => console.log(res.status));
        }
    }
})