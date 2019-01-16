import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MediaExplorer from './components/media-explorer/MediaExplorer'
import OktaVuePlugin from '@okta/okta-vue';

export const routes = [
  {
    path: '/home',
    components: {
      'appHeader': Header,
      'appMediaExplorer': MediaExplorer,
      'appFooter': Footer
    },
    meta: {
      requiresAuth: true,
    },
  },
  { 
    path: '/implicit/callback', 
    component: OktaVuePlugin.handleCallback(),
  },
  {
    path: '',
    redirect: '/home'
  }
];