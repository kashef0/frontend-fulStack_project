<template>
 <div class="d-flex justify-content-center  min-vh-100">
    <div class="container">
      <div class="text-center mb-4">
        <h3 class="text-danger p-2 m-4">Användare Lista</h3>
        <button @click="fetchUsers" class="btn btn-primary mb-3">
          Hämta alla användare
        </button>
      </div>

      <div v-if="users.length" class="user-list-container">
        <UserItem
          v-for="user in users"
          :key="user.id"
          :user="user"
          @signup="handleSignup"
          
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserItem from "@/components/signin&signup/UserItems.vue"; 

export default {
  name: "UserList",
  components: {
    UserItem
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token"); 

        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await fetch(
          "https://full-stack-pomo.onrender.com/users/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    handleSignup(userData) {
      console.log("User Data Received in Parent:", userData);

    },
  },
};
</script>

<style scoped>

.container {
    max-width: 700px;
    
}
.user-list-container {
  max-height: 70%;
  scroll-behavior: smooth;
  overflow-y: auto; /* Enables vertical scrolling */
  margin-top: 10px;
}
</style>
