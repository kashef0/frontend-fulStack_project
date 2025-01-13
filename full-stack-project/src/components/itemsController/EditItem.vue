<template>
  <div class="container my-5">
    <h2>Edit Item</h2>
    <div v-if="successMessage" class="alert alert-success mt-4">
      {{ successMessage }}
    </div>
    <form @submit.prevent="handleEditItem" class="p-4 border">
      <!-- Item Title -->
      <div class="mb-3">
        <label for="itemTitle" class="form-label">Item Title</label>
        <input
          v-model="editableItem.title"
          type="text"
          id="itemTitle"
          class="form-control"
          placeholder="Enter item title"
          required
        />
      </div>

      <!-- Item Description -->
      <div class="mb-3">
        <label for="itemDescription" class="form-label">Description</label>
        <textarea
          v-model="editableItem.itemDescription"
          id="itemDescription"
          class="form-control"
          placeholder="Enter item description (optional)"
        ></textarea>
      </div>

      <!-- Item Price -->
      <div class="mb-3">
        <label for="itemPrice" class="form-label">Price</label>
        <input
          v-model.number="editableItem.price"
          type="number"
          id="itemPrice"
          class="form-control"
          step="0.01"
          placeholder="Enter item price"
          required
        />
      </div>

      <!-- Item Image URL -->
      <div class="mb-3">
        <label for="itemImageUrl" class="form-label">Image URL</label>
        <input
          v-model="editableItem.imageUrl"
          type="url"
          id="itemImageUrl"
          class="form-control"
          placeholder="Enter item image URL (optional)"
        />
      </div>

      <!-- Item Quantity -->
      <div class="mb-3">
        <label for="itemQuantity" class="form-label">Quantity</label>
        <input
          v-model.number="editableItem.quantity"
          type="number"
          id="itemQuantity"
          class="form-control"
          min="1"
          placeholder="Enter item quantity"
          required
        />
      </div>

      <!-- Item Category -->
      <div class="mb-3">
        <label for="itemCategory" class="form-label">Category</label>
        <select
          v-model="editableItem.categoryId"
          id="itemCategory"
          class="form-control"
          required
        >
          <option value="">Select Category</option>
          <!-- Added this to prompt the user -->
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-success w-25">Update</button>
      <button type="button" class="btn btn-secondary mx-1" @click="$emit('closeEdit')">Cancel</button>
    </form>
    
    <!-- Loading state or error message -->
    <div v-if="loading" class="text-center mt-4">Loading categories...</div>
    <div v-if="errorMessage" class="text-danger mt-4">{{ errorMessage }}</div>
  </div>

</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editableItem: { ...this.item },
      categories: [],
      loading: false, 
      errorMessage: "", 
      successMessage: "",
      category: {type: Object}
    };
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true;
        const response = await fetch(
          "https://full-stack-pomo.onrender.com/category",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          this.categories = await response.json();
        } else {
          this.errorMessage = "Failed to load categories.";
        }
      } catch (error) {
        this.errorMessage = "Error fetching categories.";
        console.error("Error fetching categories:", error);
      } finally {
        this.loading = false;
      }
    },
    async handleEditItem() {
        const userId = parseInt(localStorage.getItem('userId'));
      try {
        if (!this.editableItem.id) {
          this.errorMessage = "Item ID is missing!";
          return;
        }
        const requestBody = {
          title: this.editableItem.title,
          itemDescription: this.editableItem.itemDescription || undefined,
          price: this.editableItem.price,
          imageUrl: this.editableItem.imageUrl || null,
          quantity: this.editableItem.quantity,
          categoryId: this.editableItem.categoryId,
          userId: userId
        };

        const response = await fetch(
          `https://full-stack-pomo.onrender.com/items/update/${this.editableItem.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(requestBody),
          }
        );
          console.log(requestBody);
        if (response.ok) {
          this.successMessage = 'Item har uppdaterats!'
          this.$emit("itemUpdated"); 
        } else {
          const errorData = await response.json();
          this.errorMessage = errorData.message || response.statusText;
        }
      } catch (error) {
        this.errorMessage = "Error updating item.";
        console.error("Error updating item:", error);
      }
    },
  },
  mounted() {
    this.fetchCategories(); 
  },
};
</script>


<style scoped>
.container {
  max-width: 700px;
  margin: 0 auto; 
}


</style>