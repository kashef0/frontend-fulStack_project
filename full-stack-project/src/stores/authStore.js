import { reactive } from "vue";

export const authStore = reactive({
  token: localStorage.getItem("token"),
  userRole: localStorage.getItem("role"),
  userName: localStorage.getItem("fName"),
  updateUserState() {
    this.token = localStorage.getItem("token");
    this.userRole = localStorage.getItem("role");
    this.userName = localStorage.getItem("fName");
  },
  logout() {
    localStorage.clear();
    this.token = null;
    this.rol = null;
    this.userName = null;
  },
});
