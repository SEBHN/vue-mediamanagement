const http = require('../http/http');

const api = {
  getMediaForPath (currentPath) {
    const encodedCurrentPath = encodeURIComponent(currentPath);
    const requestUrl = `/users/folders/${encodedCurrentPath}/media/`;
    
    return http.get(requestUrl);
  }
}

module.exports = api;