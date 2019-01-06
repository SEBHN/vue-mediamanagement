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

        private getAllMediaForUser(userId: string): void {
            //users/{userId}/media
            axios.get("http://localhost:8080/users/"+ userId + "/media/", { headers: {
                    'Access-Control-Allow-Origin': '*',
                }})
                .then(response => { this.resp = response.data })
                .catch(e => console.log(e.toString()));
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
