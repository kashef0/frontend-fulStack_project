<template>
  <div>
    <h1>Dashboard</h1>
    <UserProfile :user="user" />
    <TransactionList v-if="isAdmin" :transactions="transactions" />
    <ItemList v-if="isUser" :items="items" />
  </div>
</template>

<script>
import UserProfile from '../components/UserProfile.vue';
import TransactionList from '../components/TransactionList.vue';
import ItemList from '../components/itemsController/ItemList.vue';

export default {
  components: {
    UserProfile,
    TransactionList,
    ItemList,
  },
  computed: {
    isAdmin() {
      return this.$store.state.userRole === 'ADMIN';
    },
    isUser() {
      return this.$store.state.userRole === 'USER';
    },
    user() {
      return this.$store.state.user;
    },
    transactions() {
      return this.$store.state.transactions;
    },
    items() {
      return this.$store.state.items;
    },
  },
  created() {
    if (!this.$store.state.token) {
      this.$router.push('/login');
    }
  },
};
</script>
