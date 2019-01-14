<template>
<div id="app">
  <div v-if="authenticated">
    <router-view name="appHeader"></router-view>
    <br><br><br>
    <router-view class="mx-4" name="appMediaExplorer"></router-view>
  </div>
  <button v-if='authenticated' v-on:click='logout' id='logout-button'> Logout </button>
  <button v-else v-on:click='$auth.loginRedirect' id='login-button'> Login </button>
  <router-view/>
</div>
</template>

<script>
import { router } from './main'

export default {
  name: 'app',
  data: function () {
    return {
      authenticated: false
    }
  },
  created () {
    this.isAuthenticated()
  },
  watch: {
    // Everytime the route changes, check for auth status
    '$route': 'isAuthenticated'
  },
  methods: {
    async isAuthenticated () {
      this.authenticated = await this.$auth.isAuthenticated()
    },
    async logout () {
      await this.$auth.logout()
      await this.isAuthenticated()

      // Navigate back to home
      this.router.push({ path: '/' })
    }
  }
}
</script>

<style>

</style>
