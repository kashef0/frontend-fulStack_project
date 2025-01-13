<template>
  <div class="user-dashboard">
    <h2>{{ welcomeMessage }}</h2>
    <!-- User-related functionalities -->
  </div>
</template>

<script>


export default {
  data() {
    return {
      welcomeMessage: `Välkomna ${localStorage.getItem('fName')}`,
      username: localStorage.getItem("username") || "", // Retrieve the username from localStorage
    };
  },

  // Mounted lifecycle hook
  mounted() {
    console.log("User Dashboard mounted");
  },

  // Methods for logic or actions (like logout)
  methods: {
    logout() {
      // Clear all relevant data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");

      // Reset the data to null
      this.username = null;
      this.$router.push("/login"); // Redirect to login page after logout
    },
  },
};
</script>
