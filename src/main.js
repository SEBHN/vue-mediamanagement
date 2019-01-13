import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import { routes } from './routes'

Vue.use(VueRouter);
// object with routes which will be registered in the main Vue instance
const router = new VueRouter({
  routes, // pass in our imported routes array
  mode: 'history' // remove '/#' (hash mode)
});

Vue.use(Vuetify, {
  iconfont: 'mdi'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
