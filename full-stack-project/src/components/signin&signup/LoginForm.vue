<template>
  <main>
    <form @submit.prevent="handleSubmit" class="container mt-5 ">
       <div class="form-group">
         <label for="email">Email</label>
         <input
           v-model="email"
           type="email"
           id="email"
           class="form-control"
           placeholder="Enter your email"
           required
         />
       </div>
   
       <div class="form-group mt-3">
         <label for="password">Password</label>
         <input
           v-model="password"
           type="password"
           id="password"
           class="form-control"
           placeholder="Enter your password"
           required
         />
       </div>
   
       <div class="form-group mt-3">
         <label for="role">Role</label>
         <select v-model="role" id="role" class="form-control" required>
           <option disabled value="">Select Role</option>
           <option value="ADMIN">Admin</option>
           <option value="USER">User</option>
         </select>
       </div>
   
       <button type="submit" class="btn btn-primary mt-3 w-100">Login</button>
   
       <p v-if="errorMessage" class="mt-3 text-danger">{{ errorMessage }}</p>
     </form>

  </main>
</template>

<script>
export default {
  props: {
    loginTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      role: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const loginData = {
          email: this.email,
          password: this.password,
          role: this.role,
        };

        // Emit login data back to parent
        this.$emit('login', loginData);

        // Optional: Clear fields after submit
        this.email = '';
        this.password = '';
        this.role = '';
      } catch (error) {
        this.errorMessage = 'Login failed. Please try again later.';
        console.error('Login error:', error);
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
