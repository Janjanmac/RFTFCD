import { createRouter, createWebHistory } from 'vue-router'

// Views
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

// Admin
import AdminDashboard from '../views/Admin/AdminDashboard.vue'
import Dashboard from '../views/Admin/AdminDashboard.vue'
import Students from '../views/Student.vue'
import DeputizedDashboard from "../views/Admin/MasterlistDashboard.vue"
import DFWARDENDashboard from "../views/Admin/DFW2024.vue"

// Admin DFW
import DFW2025 from '../views/Admin/DFW2025.vue'
import DFW2026 from '../views/Admin/DFW2026.vue'
import DFW2027 from '../views/Admin/DFW2027.vue'
import DFW2028 from '../views/Admin/DFW2028.vue'
import DFW2029 from '../views/Admin/DFW2029.vue'
import DFW2030 from '../views/Admin/DFW2030.vue'

// Archive
import DFWArchiveDashboard from "../views/Admin/DFWArchiveDashboard.vue"
import DFWArchive2024 from '../views/Admin/DFWArchive2024.vue'
import DFWArchive2025 from "../views/Admin/DFWArchive2025.vue"
import DFWArchive2026 from '../views/Admin/DFWArchive2026.vue'
import DFWArchive2027 from '../views/Admin/DFWArchive2027.vue'
import DFWArchive2028 from '../views/Admin/DFWArchive2028.vue'
import DFWArchive2029 from '../views/Admin/DFWArchive2029.vue'
import DFWArchive2030 from '../views/Admin/DFWArchive2030.vue'

// User
import UserDashboard from '../views/User/UserDashboard.vue'
import UserDFWDashboard from '../views/User/UserDFWDashboard.vue'
import UserMasterlistDashboard from "../views/User/UserMasterlistDashboard.vue"

// User DFW
import UserDFW2024 from '../views/User/UserDFW2024.vue'
import UserDFW2025 from '../views/User/UserDFW2025.vue'
import UserDFW2026 from '../views/User/UserDFW2026.vue'
import UserDFW2027 from '../views/User/UserDFW2027.vue'
import UserDFW2028 from '../views/User/UserDFW2028.vue'
import UserDFW2029 from '../views/User/UserDFW2029.vue'
import UserDFW2030 from '../views/User/UserDFW2030.vue'

// Components
import SecondDashboard from '../components/DFWDashboard.vue'

const routes = [
  // ✅ FIX: default route
  {
    path: '/',
    redirect: '/login'
  },

  { path: '/login', name: 'Login', component: Login },
  { path: '/Register', name: 'Register', component: Register },

  // Admin routes
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/students', name: 'Students', component: Students, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/2024", name: "DeputizedDashboard", component: DeputizedDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWARDENDashboard", name: "DFWARDENDashboard", component: DFWARDENDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/admin-dashboard', name: 'AdminDashboard', component: AdminDashboard, meta: { requiresAuth: true, role: 'admin' } },

  // User routes
  { path: '/user-dashboard', name: 'UserDashboard', component: UserDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: '/UserDFWDashboard', name: 'UserDFWDashboard', component: UserDFWDashboard, meta: { requiresAuth: true, role: 'user' } },
  { path: "/user-masterlist", name: "UserMasterlistDashboard", component: UserMasterlistDashboard, meta: { requiresAuth: true, role: 'user' } },

  // User DFW
  { path: "/UserDFW2024", name: "UserDFW2024", component: UserDFW2024, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2025", name: "UserDFW2025", component: UserDFW2025, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2026", name: "UserDFW2026", component: UserDFW2026, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2027", name: "UserDFW2027", component: UserDFW2027, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2028", name: "UserDFW2028", component: UserDFW2028, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2029", name: "UserDFW2029", component: UserDFW2029, meta: { requiresAuth: true, role: 'user' } },
  { path: "/UserDFW2030", name: "UserDFW2030", component: UserDFW2030, meta: { requiresAuth: true, role: 'user' } },

  // Admin DFW
  { path: "/2023", name: "SecondDashboard", component: SecondDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2025", name: "DFW2025", component: DFW2025, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2026", name: "DFW2026", component: DFW2026, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2027", name: "DFW2027", component: DFW2027, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2028", name: "DFW2028", component: DFW2028, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2029", name: "DFW2029", component: DFW2029, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFW2030", name: "DFW2030", component: DFW2030, meta: { requiresAuth: true, role: 'admin' } },

  // Archive
  { path: "/DFWArchiveDashboard", name: "DFWArchiveDashboard", component: DFWArchiveDashboard, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2024", name: "DFWArchive2024", component: DFWArchive2024, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2025", name: "DFWArchive2025", component: DFWArchive2025, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2026", name: "DFWArchive2026", component: DFWArchive2026, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2027", name: "DFWArchive2027", component: DFWArchive2027, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2028", name: "DFWArchive2028", component: DFWArchive2028, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2029", name: "DFWArchive2029", component: DFWArchive2029, meta: { requiresAuth: true, role: 'admin' } },
  { path: "/DFWArchive2030", name: "DFWArchive2030", component: DFWArchive2030, meta: { requiresAuth: true, role: 'admin' } },

  // ✅ FIX: fallback route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user')

  if (!isLoggedIn && to.path !== '/') {
    next('/')
  } else {
    next()
  }
})

export default router