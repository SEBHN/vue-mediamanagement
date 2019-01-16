import Vue from 'vue'
import VueRouter from 'vue-router'
import OktaVuePlugin from '@okta/okta-vue';
import App from './App.vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import { routes } from './routes'


const productionSuffix = process.env.NODE_ENV === 'production' ? '/mvsvue/#': '/'
Vue.use(VueRouter);
Vue.use(OktaVuePlugin, {
  issuer: 'https://dev-332680.oktapreview.com/oauth2/default',
  client_id: '0oahyyghlrI8poUre0h7',
  redirect_uri: window.location.origin + productionSuffix + 'implicit/callback',
  scope: 'openid profile email',
});

// object with routes which will be registered in the main Vue instance
const router = new VueRouter({
  routes, // pass in our imported routes array
  base: process.env.BASE_URL,
  mode: 'hash' // remove '/#' (hash mode)npm
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

export default router;