<template>
 <div class="home">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      <button @click="callApi">Call API</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    async callApi() {
      const accessToken = await this.$auth.getTokenSilently();
      fetch('http://localhost:8080/authorized', {
        headers: new Headers({
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
      })
    }
  }
}
</script>
