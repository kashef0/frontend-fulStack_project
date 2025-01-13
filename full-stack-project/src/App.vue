<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import NavMeny from '@/components/NavMeny.vue'; 


// Get token and role from localStorage
// const token = localStorage.getItem('token');
// const userRole = localStorage.getItem('role');
</script>

<template>
  <NavMeny/>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/Signup">Sign up</RouterLink>

        
        <RouterLink v-if="token && userRole === 'ADMIN'" to="/admin/dashboard">Admin Dashboard</RouterLink>
        <RouterLink v-if="token && userRole === 'USER'" to="/user/dashboard">User Dashboard</RouterLink>
      </nav>
    </div>
  </header> -->

  <!-- RouterView to display the current view based on the active route -->
  <RouterView />
</template>

<style scoped>
/* Keep your styles as-is */
</style>
