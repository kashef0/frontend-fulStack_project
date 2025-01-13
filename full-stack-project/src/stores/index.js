// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('role') || null,
    userName: localStorage.getItem('fName') || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUserRole(state, role) {
      state.userRole = role;
      localStorage.setItem('role', role);
    },
    setUserName(state, name) {
      state.userName = name;
      localStorage.setItem('fName', name);
    },
    clearAuth(state) {
      state.token = null;
      state.userRole = null;
      state.userName = null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('fName');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token && !!state.userRole && !!state.userName;
    },
    firstLetter(state) {
      return state.userName ? state.userName.charAt(0).toUpperCase() : '';
    },
  },
});
