<template>
 <div class="home">
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <p v-else>You are currently logged in!</p>
      <button @click="callApi">Call API</button>
      <p v-if="loadingFromApi">Loading from API</p>
      <p v-if="!loadingFromApi">{{ message }}</p>
    </div>
    <div v-if="$auth.loading">
      Logging in...
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data: () => ({
    loadingFromApi: false,
    message: '',
  }),
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
      this.loadingFromApi = true;
      try {
      const accessToken = await this.$auth.getTokenSilently({ audience: 'resume-builder-api' });
      const response = await fetch('http://localhost:8080/authorized', {
        headers: new Headers({
          'Authorization': `Bearer ${accessToken}`, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
      });
      const result = await response.json();
      this.message = result.message;
      } catch (err) {
        this.message = "Did not receive success response from backend!";
      }
      this.loadingFromApi = false;
    }
  }
}
</script>
