<template>
    <form @submit.prevent="handleCreateTransaction">
      <select v-model="itemId" required>
        <option v-for="item in items" :key="item.id" :value="item.id">{{ item.title }}</option>
      </select>
      <input v-model="quantity" type="number" placeholder="Quantity" required />
      <button type="submit">Create Transaction</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        itemId: null,
        quantity: 0,
        items: [],
      };
    },
    async created() {
      try {
        const response = await fetch('https://full-stack-pomo.onrender.com/items', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`, // Include token for authorization
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          this.items = data;
        } else {
          console.error('Error fetching items:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    },
    methods: {
      async handleCreateTransaction() {
        try {
          const response = await fetch('https://full-stack-pomo.onrender.com/transaction/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.state.token}`, // Include token for authorization
            },
            body: JSON.stringify({
              itemId: this.itemId,
              quantity: this.quantity,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Transaction created successfully
            console.log('Transaction created:', data);
            this.$router.push('/transactions');
          } else {
            console.error('Error creating transaction:', data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error creating transaction:', error);
        }
      }
    }
  };
  </script>
  