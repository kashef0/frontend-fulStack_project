<template>
  <div class="container-md my-4">
    <div class="row g-4">
      <!-- Signup Page Section -->
      <div class="col-md-6">
        <div class="signup-page">
          <h2>{{ signupTitle }}</h2>
          <SignupForm
            :signupTitle="signupTitle"
            @signup="handleSignup"
            class="w-80-md"
          />
        </div>
      </div>

      <!-- Information Section -->
      <div class="col-md-6">
        <div class="info p-4 bg-light border rounded">
          <h5 class="mb-3">Så här registrerar du ett nytt konto:</h5>
          <ul>
            <li>Fyll i ditt förnamn och efternamn i de angivna fälten.</li>
            <li>Ange din e-postadress och välj ett lösenord.</li>
            <li>Välj din roll (Admin eller Användare).</li>
            <li>
              Klicka på "Registrera" knappen för att slutföra registreringen.
            </li>
            <li>Du kommer att få en bekräftelse via e-post.</li>
          </ul>
          <p>
            Följ dessa steg för att skapa ditt nya konto och börja använda vår
            tjänst!
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref } from "vue";
import SignupForm from "@/components/signin&signup/SignupForm.vue";
const userRole = localStorage.getItem('role');
const signupTitle = ref("Registrera dig för ett konto");

async function handleSignup(signupData) {
  const token = localStorage.getItem("token");
  const message = ref(null);
  try {
    const response = await fetch(
      "https://full-stack-pomo.onrender.com/auth/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
        Authorization: `Bearer ${token}`,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Kontot har skapats:", data);
      message.value = ("Kontot har skapats! Logga in.");
    } else {
      console.error("Signup failed:", data.message);
      alert(data.message || "Error creating account.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  }
}
</script>

<style scoped>
.signup-page {
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 2em;
  background-color: #f4f4f4;
  border-radius: 5px;
}

.visible {
  display: flex;

}
.invisible{
  display: none;
}

</style>
