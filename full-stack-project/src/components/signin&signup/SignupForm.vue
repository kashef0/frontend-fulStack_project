<template>
  <div class="container mt-5">
    <form @submit.prevent="handleSubmit" class="shadow p-3 rounded">
      <h3 class="text-center mb-4">Sign Up</h3>

      <div class="mb-3">
        <label for="fname" class="form-label">First Name</label>
        <input 
          v-model="firstName" 
          id="fname"
          type="text" 
          class="form-control"
          placeholder="First Name"
          required 
        />
      </div>

      <div class="mb-3">
        <label for="lname" class="form-label">Last Name</label>
        <input 
          v-model="lastName" 
          id="lname"
          type="text" 
          class="form-control"
          placeholder="Last Name"
          required 
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input 
          v-model="email" 
          id="email"
          type="email" 
          class="form-control"
          placeholder="Email"
          required 
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input 
          v-model="password" 
          id="password"
          type="password" 
          class="form-control"
          placeholder="Password"
          required 
        />
      </div>

      <div class="mb-3">
        <label for="role" class="form-label">Select Role</label>
        <select 
          v-model="role" 
          id="role"
          class="form-select"
          required 
        >
          <option disabled value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      <button 
        type="submit" 
        class="btn btn-primary w-100"
      >
        Sign Up
      </button>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </form>
  </div>
</template>

  
  <script>
  export default {
    props: {
      signupTitle: {
        type: String,
        default: "Skapa ditt konto",
      },
    },
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
        errorMessage: "",
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const signupData = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: this.role,
          };
  
          // Emit signup data back to parent
          this.$emit("signup", signupData);
  
          // Clear fields after submit
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.password = "";
          this.role = "";
        } catch (error) {
          this.errorMessage = "Signup failed. Please try again.";
          console.error("Signup error:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional styling for the error message */
  .error {
    color: red;
    font-size: 0.9em;
  }
  </style>
  