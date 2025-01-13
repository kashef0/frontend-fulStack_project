<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>

    <div v-if="username">
      <span>{{ username }}</span>
      <button @click="logout">Sign out</button>
    </div>
  </div>
</template>

<script>
export default {
  // Define reactive data properties
  data() {
    return {
      username: localStorage.getItem('username') || '', // Retrieve the username from localStorage
    };
  },
  
  // Mounted lifecycle hook
  mounted() {
    console.log('Admin Dashboard mounted');
  },
  
  // Methods for logic or actions (like logout)
  methods: {
    logout() {
      // Clear all relevant data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');

      // Reset the data to null
      this.username = null;
      this.$router.push('/login'); // Redirect to login page after logout
    }
  }
};
</script>

<style scoped>
/* Your styles here */
</style>
