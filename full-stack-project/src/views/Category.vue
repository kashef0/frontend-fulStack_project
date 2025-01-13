<template>
  <div class=" form-container container-md w-50">
    <h1 class="text-center mt-4">Skapa Category</h1>
    <CreateCategory @categoryCreated="handleCategoryCreated" />
  </div>
</template>

<script>
import CreateCategory from "@/components/CategoryController/CreateCategory.vue";



export default {
    
  components: {
    CreateCategory,
  },
  methods: {
    handleCategoryCreated(category) {
      // You can now use the created category for any additional logic
      console.log("Category Created:", category);

      // Example: Redirecting to a category list page after creation
      this.$router.push("/category");
    },
  },
};
</script>


<style>


@media (max-width: 768px) {
  .form-container {
    width: 90% !important;
  }
}
</style>
<!-- <template>
  <div class=" form-container-md w-50">
    <h1 class="text-center mt-4">Skapa Category</h1>
    <CreateCategory @categoryCreated="handleCategoryCreated" />
  </div>
</template>

<script>
import CreateCategory from "@/components/CategoryController/CreateCategory.vue";



export default {
    
  components: {
    CreateCategory,
  },
  methods: {
    handleCategoryCreated(category) {
      // You can now use the created category for any additional logic
      console.log("Category Created:", category);

      // Example: Redirecting to a category list page after creation
      this.$router.push("/category");
    },
  },
};
</script>


<style>


@media (max-width: 768px) {
  .form-container {
    width: 90% !important;
  }
}
</style> -->