<template>
  <form
    @submit.prevent="handleCreateCategory"
    class="container-md p-4 mt-4 border border-black form-container"
  >
    <!-- Category Name Input -->
    <div class="mb-3">
      <label for="categoryName" class="form-label">Category namn</label>
      <input
        v-model="name"
        type="text"
        class="form-control"
        id="categoryName"
        placeholder="Category Name"
        required
      />
    </div>

    <!-- Category Description Textarea -->
    <div class="mb-3">
      <label for="categoryDescription" class="form-label"
        >Category Beskrivning</label
      >
      <textarea
        v-model="description"
        class="form-control"
        id="categoryDescription"
        placeholder="Category Description"
      ></textarea>
    </div>

    <!-- Submit Button -->
    <button type="submit" class="btn btn-primary w-100">Skapa Category</button>
    <p class="text-danger">{{ message }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      message: "",
    };
  },
  methods: {
    async handleCreateCategory() {
      try {
        const response = await fetch(
          "https://full-stack-pomo.onrender.com/category/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.$store.state.token}`,
            },
            body: JSON.stringify({
              name: this.name,
              description: this.description,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          this.message = "Category har skapats";
          // Emit the category data to the parent component
          this.$emit("categoryCreated", data);

          // Optionally clear the form or handle success state
          this.name = "";
          this.description = "";
        } else {
          console.error(
            "Error creating category:",
            data.message || "Unknown error"
          );
          this.message = (
            "Error creating category:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
  },
};
</script>

<style>
.form-container {
  width: 50%;
}

@media (max-width: 768px) {
  .form-container {
    width: 90%;
  }
}
</style>
