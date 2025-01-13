<template>
  <div v-if="user" class="card">
  <div class="card-body" :key="user.id">
    <p>userID: {{ user.id }}</p>
    <h5 class="card-title">Email: <small>{{ user.email }}</small></h5>
    <p class="card-text">Användaren's namn: {{ user.firstName }} {{ user.lastName }}</p>
  </div>
</div>

<div v-else class="card" aria-hidden="true">
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      Email: <small class="placeholder col-6"></small>
    </h5>
    <p class="card-text placeholder-glow">
      Användaren's namn: <span class="placeholder col-4"></span> <span class="placeholder col-4"></span>
    </p>
  </div>
</div>
</template>

<script>

export default {

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitUserData() {
      if (this.user) {
        this.$emit("UserList", this.user);
      }
    },
  },

};
</script>

<style scoped>

</style>
