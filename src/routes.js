import Header from './components/layout/Header';
import MediaExplorer from './components/media-explorer/MediaExplorer'

export const routes = [
  {
    path: '/home',
    components: {
      'appHeader': Header,
      'appMediaExplorer': MediaExplorer
    },
  },
  {
    path: '',
    redirect: '/home'
  }
];