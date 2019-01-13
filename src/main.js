import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify, {
  iconfont: 'mdi'
})

new Vue({
  el: '#app',
  render: h => h(App)
})