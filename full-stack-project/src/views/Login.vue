<template>
  <section class="login-page justify-content-center align-content-center mt-5">
    <h2 class="bg-red">{{ loginTitle }}</h2>
    <LoginForm :loginTitle="loginTitle" @login="handleLogin" />
    <p class="text-danger">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import LoginForm from "../components/signin&signup/LoginForm.vue";
const errorMessage = ref(null);
const router = useRouter();
const loginTitle = ref("Logga in");

async function handleLogin(loginData) {
  try {
    // Make a login request
    const response = await fetch(
      "https://full-stack-pomo.onrender.com/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Save token and role
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("fName", data.firstName);
      localStorage.setItem("lName", data.lastName);

      if (data.user) {
        localStorage.setItem("userId", data.user);  // Save user id
      }

      if (!data.role) {
        return;
      }
      // Redirect based on role
      if (data.role === "ADMIN" && loginData.role === "ADMIN") {
        router.push("/admin/dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else if (data.role === "USER" && loginData.role === "USER") {
        router.push("/user/dashboard");
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        errorMessage.value = "Oväntad roll.";
      }
    } else {
      console.error("Login failed:", data.message);
      errorMessage.value = "Ogiltiga användaruppgifter";
      console.error(data.message);
    }
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    errorMessage.value = "Ett fel uppstod. Försök igen.";
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: auto;
  padding: 2em;
  background-color: #f4f4f4;
  border-radius: 5px;
}
</style>
