<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            For a guide and recipes on how to configure / customize this project,<br>
            check out the
            <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
        </p>
        <h3>REST Calls</h3>
        <ul>
            <button v-on:click="getAllMediaForUser('999')">Get all Media</button>
        </ul>
        <ul>
            <button v-on:click="getMediaWithId('999', '8f6eb598-774e-4a2d-b59f-c88c90b1eeab')">Get Media with ID
            </button>
        </ul>
        <ul>
            <button v-on:click="downloadMedia('999', '96846e1b-16ae-4095-b89c-b5c7cf1188fb', 'D4_MG_0426.jpg')">Download
                Media
            </button>
        </ul>
        <ul>
            <input type="file" @change="postMetaData($event)"/>
        </ul>
        <ul>
            <button v-on:click="updateMedia(null)">Update Media</button>
        </ul>
        <ul>
            <button v-on:click="deleteMedia('8f6eb598-774e-4a2d-b59f-c88c90b1eeab')">Delete Media</button>
        </ul>
        <ul>
            <button v-on:click="listFolderContent('/test2/')">List folder content</button>
        </ul>
        <br>
        <p> Response </p>
        <p>{{ resp }} </p>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import axios from "axios";
    import {Media} from "../Media";


    @Component
    export default class HelloWorld extends Vue {
        @Prop() private msg!: string;
        @Prop() private resp!: string;

        file: File;

        // get all medias for user with userId
        private getAllMediaForUser(userId: string): void {
            //users/{userId}/media
            axios.get("http://localhost:8080/users/" + userId + "/media/", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then(response => {
                    this.resp = response.data;
                    this.getFolders(this.resp);
                })
                .catch(e => console.log(e.toString()));
        }

        // gets a media with id
        private getMediaWithId(userId: string, mediaId: string): void {
            //users/{userId}/media/{id}
            axios.get("http://localhost:8080/users/" + userId + "/media/" + mediaId, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => console.log(e.toString()));
        }

        private downloadMedia(userId: string, mediaId: string, fileName: string): void {
            // TODO: Media object as parameter for the function to get id and name
            axios.get("http://localhost:8080/users/" + userId + "/media/" + mediaId + "/download", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                responseType: "blob"
            })
                .then(response => {
                    const FileDownload = require("js-file-download");
                    FileDownload(response.data, fileName);
                })
                .catch(e => console.log(e.toString()));
        }

        // post file meta data
        private postMetaData(event): void {
            this.file = event.target.files[0];
            event.target.value = "";

            // TODO: filePath, UserId
            const media = new Media(null, this.file.name, null, this.getExtension(this.file), "/", null, null);
            let userId = "999";

            //POST("/users/{userId}/media").and(accept(APPLICATION_JSON)), mediaHandler::create)
            console.log(media);
            axios.post("http://localhost:8080/users/" + userId + "/media", JSON.stringify(media), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    this.postFile(response.data["id"]);
                })
                .catch(e => console.log(e.toString()));
        }

        // upload file
        private postFile(mediaId: string, userId: string = "999"): void {
            const formData = new FormData();
            formData.append("file", this.file);

            axios.post("http://localhost:8080/users/" + userId + "/media/" + mediaId + "/upload", formData, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then(response => {
                    const media = JSON.parse(JSON.stringify(response.data));
                    console.log(media.toString());
                    this.file = null;
                })
                .catch(e => console.log(e));
        }

        // update media
        private updateMedia(media: Media): void {
            //TODO: User ID, Media ID
            axios.put("http://localhost:8080/users/" + "999" + "/media/" + media.id, JSON.stringify(media), {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => console.log(e.toString()));
        }

        // delete media
        private deleteMedia(mediaId: string): void {
            let userId = "999";
            axios.delete("http://localhost:8080/users/" + userId + "/media/" + mediaId, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then(response => console.log(response.status))
                .catch(e => console.log(e));
        }

        private listFolderContent(path: string): void {
            //TODO: userID
            let userId = '999';
            axios.get('http://localhost:8080/users/' + userId + '/folders/'+ encodeURIComponent(path) + '/media',{
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            })
                .then(response => {
                    let folderContent = JSON.parse(JSON.stringify(response.data));
                    console.log(folderContent);
                })
                .catch(e => console.log(e));
        }

        // this method stores all subfolders into subfolders array
        private getFolders(jsonArray: string): void {
            let array: string[] = JSON.parse(JSON.stringify(jsonArray));
            let subfolders = [];

            let entry: any;
            for (entry of array) {
                if (entry["filePath"] != "" && entry["filePath"] != "/") {
                    subfolders.push(entry);
                }
            }
        }

        getExtension(file: File): string {
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
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
