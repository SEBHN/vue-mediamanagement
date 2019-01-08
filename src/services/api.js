import { http } from '../http/http'
import { eventBus } from '../event_bus/event_bus'

export default class Api {
  getMediaForPath (currentPath) {
    const encodedCurrentPath = encodeURIComponent(currentPath);
    const requestUrl = `/users/folders/${encodedCurrentPath}/media/`;
    
    return http.get(requestUrl);
  }
}