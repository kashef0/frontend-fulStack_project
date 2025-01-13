<template>
    <form @submit.prevent="handleCreateCategory">
      <input v-model="name" type="text" placeholder="Category Name" required />
      <textarea v-model="description" placeholder="Category Description"></textarea>
      <button type="submit">Create Category</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        description: '',
      };
    },
    methods: {
      async handleCreateCategory() {
        try {
          const response = await fetch('https://full-stack-pomo.onrender.com/category/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.state.token}`, // Include token for authorization
            },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Category created successfully
            console.log('Category created:', data);
            this.$router.push('/categories');
          } else {
            console.error('Error creating category:', data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error creating category:', error);
        }
      }
    }
  };
  </script>
  