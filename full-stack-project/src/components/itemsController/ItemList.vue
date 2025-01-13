<!-- <template>
    <form @submit.prevent="handleCreateItem">
      <input v-model="title" type="text" placeholder="Item Title" required />
      <textarea v-model="itemDescription" placeholder="Item Description"></textarea>
      <input v-model="quantity" type="number" placeholder="Quantity" required />
      <input v-model="price" type="number" placeholder="Price" required />
      <button type="submit">Create Item</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        itemDescription: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
        categoryId: 0,
      };
    },
    methods: {
      async handleCreateItem() {
        try {
          const response = await fetch('https://full-stack-pomo.onrender.com/items/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.$store.state.token}`, // Include token for authorization
            },
            body: JSON.stringify({
              title: this.title,
              itemDescription: this.itemDescription,
              quantity: this.quantity,
              price: this.price,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
            // Item created successfully
            console.log('Item created:', data);
            this.$router.push('/items');
          } else {
            console.error('Error creating item:', data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error creating item:', error);
        }
      }
    }
  };
  </script>
   -->

<template>
  <div class="container">
    <h2>Item List</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Item Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.itemDescription }}</td>
          <td>{{ item.price }} $</td>
          <td>{{ item.quantity }} .st</td>
          <td>
            {{
              categories.find((category) => category.id === item.categoryId)
                ?.name || "Category Not Found"
            }}
          </td>

          <td>
            <button
              class="btn btn-primary me-2 mb-1"
              @click="$emit('editItem', item)"
            >
              Edit
            </button>

            <button
              class="btn btn-danger mt-1"
              @click="$emit('deleteItem', item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
