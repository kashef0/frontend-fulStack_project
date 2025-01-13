<template>
    <div class="container">
      <h2>Category List</h2>
  
      <!-- Table to display categories -->
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through categories and pass them to the CategoryCard component -->
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>{{ category.description }}</td>
            <td>
              <CategoryCard
                :category="category"
                @update-category="handleUpdateCategory"
                @delete-category="handleDeleteCategory"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import CategoryCard from "@/components/CategoryCard.vue"; // Import the CategoryCard component
  
  export default {
    components: {
      CategoryCard,
    },
    data() {
      return {
        categories: [], // This will hold the categories fetched from the API
      };
    },
    mounted() {
      // Fetch the categories when the component is mounted
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await fetch("https://full-stack-pomo.onrender.com/category"); // Replace with your API URL
          const data = await response.json();
          this.categories = data; // Store the categories in the data property
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
  
      // Method to handle category update
      handleUpdateCategory(updatedCategory) {
        // You can open a modal or navigate to another page to handle the update
        console.log("Update category:", updatedCategory);
      },
  
      // Method to handle category deletion
      async handleDeleteCategory(categoryId) {
        try {
          const response = await fetch(`https://full-stack-pomo.onrender.com/category/delete/${categoryId}`, {
            method: "DELETE",
          });
          
          if (response.ok) {
            this.categories = this.categories.filter((category) => category.id !== categoryId); // Remove the category from the list
            console.log("Category deleted successfully");
          } else {
            console.error("Failed to delete category");
          }
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for the category list page */
  </style>
  


<!-- 

<template>
    <div class="card">
      <div class="card-body" :key="user.id">
        <h5 class="card-title">Email: <small>{{ user.email }}</small></h5>
        <p class="card-text">Användaren's namn: {{ user.firstName }} {{ user.lastName }}</p>
      </div>
    </div>
  </template>
  
  <script>
import Category from '@/views/Category.vue';

  export default {
    props: {
      user: Object,
    },
    data() {
      return {
        name: "",
        description: "",
      };
    },
    methods: {
      async handleUserList() {
        try {
          const userList = {
            name: Category.name,
            description: Category.description,
          };
  
          this.$emit("signup", userList);
        } catch (error) {
          this.errorMessage = "failed get data. Please try again.";
          console.error("get error:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles for displaying user details here */
  </style>
   -->