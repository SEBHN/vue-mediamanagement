import axios from 'axios'

// REST api : 
const baseUrl = `https://mvs-18-ws-spring-in-cloud.appspot.com`

export let http = axios.create({
  baseURL: baseUrl
})