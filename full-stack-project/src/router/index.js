import { createRouter, createWebHistory } from 'vue-router';
import AdminDashboard from '../views/AdminDashboard.vue';
import UserDashboard from '../views/UserDashboard.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import UserList from '@/views/UserList.vue';
import Category from '@/views/Category.vue';
import Items from '@/views/Items.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/UserList',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/Category',
    name: 'Category',
    component: Category,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/Items',
    name: 'Items',
    component: Items,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'ADMIN' },
  },
  {
    path: '/user/dashboard',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, role: 'USER' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (to.meta.requiresAuth && !token) {
    next('/'); // Redirect to login if not authenticated
  } else if (to.meta.role && to.meta.role !== userRole) {
    next('/'); // Redirect to login if role doesn't match
  } else {
    next(); // Proceed to route
  }
});

export default router;








// import { createRouter, createWebHistory } from 'vue-router';
// import AdminDashboard from '../views/AdminDashboard.vue';
// import UserDashboard from '../views/UserDashboard.vue';
// import Login from '../views/Login.vue';
// import Signup from '../views/Signup.vue';
// import UserList from '../views/UserList.vue';
// import stores from '@/stores';

// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Login,
//   },
//   {
//     path: '/Login',
//     name: 'Login',
//     component: Login,
//   },
//   {
//     path: '/Signup',
//     name: 'Signup',
//     component: Signup,
//     meta: { requiresAuth: true, role: 'ADMIN' },
//   },
//   {
//     path: '/UserList',
//     name: 'UserList',
//     component: UserList,
//     meta: { requiresAuth: true, role: 'ADMIN' },
//   },
//   {
//     path: '/admin/dashboard',
//     name: 'AdminDashboard',
//     component: AdminDashboard,
//     meta: { requiresAuth: true, role: 'ADMIN' },
//   },
//   {
//     path: '/user/dashboard',
//     name: 'UserDashboard',
//     component: UserDashboard,
//     meta: { requiresAuth: true, role: 'USER' },
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = /* check if user is authenticated */;
//   const userRole = /* get the current user's role */;

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     // If the route requires authentication
//     if (!isAuthenticated) {
//       next({ name: 'Login' }); // Redirect to login if not authenticated
//     } else if (to.meta.role && to.meta.role !== userRole) {
//       next({ name: 'Unauthorized' }); // Redirect if the user does not have the correct role
//     } else {
//       next(); // Allow access to the route
//     }
//   } else {
//     next(); // If the route doesn't require auth, allow access
//   }
// });

// export default router;
