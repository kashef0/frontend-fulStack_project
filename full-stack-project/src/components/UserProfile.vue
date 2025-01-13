<template>
    <div>
      <h2>{{ user.firstName }} {{ user.lastName }}</h2>
      <p>Email: {{ user.email }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
    },
  };
  </script>
  