import axios from 'axios'

// REST api : 
//const baseUrl = `https://mvs-18-ws-spring-in-cloud.appspot.com`; => this version of backend needs auth
const baseUrl = 'http://localhost:8080/';

export let http = axios.create({
  baseURL: baseUrl
});
