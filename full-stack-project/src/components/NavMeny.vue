<template>
  <nav
    id="navmenu-refresh"
    class="navbar navbar-expand-lg bg-dark"
    data-bs-theme="dark"
  >
    <div class="container-md">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" alt="Logo" width="40" height="32" />
      </a>

      <button
        class="navbar-toggler"
        :class="isAuthenticated ? 'visible' : 'invisible'"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarSupportedContent"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbar Links and Search Form -->
      <div
        class="collapse navbar-collapse"
        :class="{
          show: isMenuOpen,
          visible: isAuthenticated,
          invisible: !isAuthenticated,
        }"
        id="navbarSupportedContent"
        v-if="token"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Home Link -->
          <li class="nav-item">
            <router-link
              :to="{ name: 'Home' }"
              class="nav-link"
              routerLinkActive="active"
            >
              Hem
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'Items' }"
              class="nav-link"
              routerLinkActive="active"
            >
            Items
            </router-link>
          </li>

          <!-- Manage User Dropdown -->
          <li
            class="nav-item dropdown"
            v-if="toggleDropdownClick ? toggleDropdown : closeDropdown"
          >
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              v-if="isAdmin"
              href="#"
              id="manageUserDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggleDropdownClick"
            >
              Manage User
              <i :class="dropdownArrowClass" class="ms-2"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="manageUserDropdown">
              <li>
                <router-link :to="{ name: 'Signup' }" class="dropdown-item">
                  Skapa konto
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'UserList' }" class="dropdown-item">
                  Visa användare
                </router-link>
              </li>
            </ul>
          </li>
          <li
            class="nav-item dropdown"
            v-if="toggleDropdownClick ? toggleDropdown : closeDropdown"
          >
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              v-if="isAdmin"
              href="#"
              id="manageUserDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click="toggleDropdownClick"
            >
              Manage Category
              <i :class="dropdownArrowClass" class="ms-2"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="manageUserDropdown">
              <li>
                <router-link :to="{ name: 'Category' }" class="dropdown-item">
                  Skapa Category
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'UserList' }" class="dropdown-item">
                  Visa Categories
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Publicering Link -->
          <li class="nav-item">
            <a
              class="nav-link"
              routerLink="/publicering"
              routerLinkActive="active"
            >
              Publicering
            </a>
          </li>
        </ul>

        <div class="profile-div">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div class="profile" v-if="isAuthenticated">
            <div class="user-initial">
              {{ firstLetter }}
            </div>

            <p class="profile-p">
              <a class="dropdown-item text-light" href="#" @click="logout"
                >Sign out</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false, // Toggle state for the menu
      token: localStorage.getItem("token"),
      userRole: localStorage.getItem("role"),
      userName: localStorage.getItem("fName"),
      firstLetter: localStorage.getItem("fName")?.charAt(0).toUpperCase(),
      dropdownOpen: false,
      isVisible: false,
    };
  },
  computed: {
    // To check if user is authenticated
    isAuthenticated() {
        
      return this.token && this.userRole && this.userName;
    },

    isAdmin() {
      return this.isAuthenticated && this.userRole === "ADMIN";
    },

    dropdownArrowClass() {
      return this.dropdownOpen ? "fas fa-chevron-down" : "fas fa-chevron-right";
    },
  },
  methods: {

    toggleDropdownClick() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = true;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },

    // Method to toggle the menu visibility
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    // Logout method to remove token and redirect to login page
    logout() {
      // Clear the localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("fName");
      localStorage.removeItem("hasRefreshed");

      this.token = null;
      this.role = null;
      this.firstName = null;

      // Redirect to login page after logout
      window.location.href = "/login";
    },
  },
};
</script>

<style scoped>
.nav-link i {
  transition: transform 0.2s ease;
}

.nav-item.dropdown:hover .nav-link i {
  transform: rotate(0deg); /* Optional smooth rotation */
}
.dropdown-toggle::after {
  content: none; /* Remove the default arrow icon for the dropdown */
}

.dropdown {
  display: flex;
  flex-direction: row;
}

.profile-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.profile {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
}
.profile-p {
  margin: 0;
}
.user-initial {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #007bff; /* Choose a background color */
  color: white;
  text-align: center;
  line-height: 32px; /* Centers the letter */
  font-size: 16px;
  font-weight: bold;
}
/* .invisible {
  display: none;
}

.visible {
  display: flex;
} */

@media (max-width: 961px) {
  .profile-div {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile {
    margin-top: 0.5rem;
  }
}
</style>
