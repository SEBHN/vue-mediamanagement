const axios = require('axios');

// REST api : 
const baseUrl = `https://mvs-18-ws-spring-in-cloud.appspot.com`

const http = axios.create({
  baseURL: baseUrl
});

module.exports = http;