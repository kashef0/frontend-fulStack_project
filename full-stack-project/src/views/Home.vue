<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import LoginForm from '../components/signin&signup/LoginForm.vue';

const router = useRouter();

// Reactive references for username and loginTitle
const username = ref(localStorage.getItem('username') || '');
const loginTitle = ref('Login to your account');

// Handle the login event and redirect
function handleLogin(loginData) {
  console.log('Login successful, redirecting...', loginData);

  // Store token, role, and username in localStorage
  localStorage.setItem('token', loginData.token);
  localStorage.setItem('role', loginData.role);
  localStorage.setItem('username', loginData.firstName); // Store username
  
  // Update reactive username
  username.value = loginData.firstName;

  // Redirect to the corresponding dashboard based on the role
  if (loginData.role === 'ADMIN') {
    router.push('/admin/dashboard'); // Redirect to Admin Dashboard
  } else if (loginData.role === 'USER') {
    router.push('/user/dashboard'); // Redirect to User Dashboard
  }
}

</script>

<template>
  <h1 class="pg-red">hello</h1>
  <main>
    <!-- Pass props to LoginForm and listen for the login event -->
    <LoginForm @login="handleLogin" :loginTitle="loginTitle" />
  </main>
</template>
