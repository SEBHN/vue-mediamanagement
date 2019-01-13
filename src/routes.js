import Header from './components/layout/Header';
import MediaExplorer from './components/media-explorer/MediaExplorer'

export const routes = [
  {
    path: '/home',
    components: {
      'appHeader': Header,
      'appMediaExplorer': MediaExplorer
    },
    beforeEnter: (to, from, next) => {
      if (true) {
        next();
      } else {
        
      }
    }
  },
  {
    path: '',
    redirect: '/home'
  }
];