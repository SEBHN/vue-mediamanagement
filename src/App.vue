<template>
<v-app>
  <div v-if="authenticated">
    <router-view name="appHeader"></router-view>
    <br><br><br>
    <router-view class="mx-4" name="appMediaExplorer"></router-view>
  </div>
  <button v-else @click="$auth.loginRedirect()">Login</button>
</v-app>
</template>

<script>
import { router } from './main'

export default {
  data: function () {
    return {
      authenticated: false
    }
  },
  methods: {
    isAuthenticated: async function() {
      this.authenticated = await this.$auth.isAuthenticated();
      console.log(this.authenticated);
    },
    logout: async function() {
      await this.$auth.logout();
      await this.$auth.isAuthenticated();

      this.$router.push({path: '/'});
    }
  },
  created() {
    this.isAuthenticated();
  },
  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.authenticated = this.isAuthenticated();
    }
  }
}
</script>

<style>

</style>
