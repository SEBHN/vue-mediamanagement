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
            <button v-on:click="getMediaWithId('999', '3a5802f1-96f7-4168-9558-cfd549f4d51a')">Get Media with ID
            </button>
        </ul>
        <br>
        <p> Response </p>
        <p>{{ resp }} </p>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import axios from "axios";

    @Component
    export default class HelloWorld extends Vue {
        @Prop() private msg!: string;
        @Prop() private resp!: string;

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
                    this.resp = response.data;
                })
                .catch(e => console.log(e.toString()));
        }

        // this method stores all subfolders into subfolders array
        private getFolders(jsonArray: string): void {
            let array: string[] = JSON.parse(JSON.stringify(jsonArray));
            let subfolders = [];

            for(let entry of array){
                if(entry["filePath"] != "" && entry["filePath"] != "/"){
                    subfolders.push(entry);
                }
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
