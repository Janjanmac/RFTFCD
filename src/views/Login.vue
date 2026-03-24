<template>
  <div class="login-page">
    <!-- Animated Background Elements -->
    <div class="background-decoration">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
      <div class="gradient-orbs">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
      </div>
    </div>

    <div class="login-container">
      <!-- LEFT SIDE -->
      <div class="login-left">
        <div class="auth-card">
          <!-- Logo Section with Animation -->
          <div class="logo-section">
            <div class="logo-wrapper">
              <div class="logo">
                <div class="logo-icon">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="2"/>
                    <path d="M24 12 L28 20 L24 28 L20 20 Z" fill="currentColor"/>
                    <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
                    <text x="24" y="38" text-anchor="middle" font-size="6" fill="currentColor" font-weight="bold">BFAR</text>
                  </svg>
                </div>
                <h1>BFAR</h1>
                <p>Fish Warden Information System</p>
              </div>
            </div>
          </div>

          <!-- Welcome Section -->
          <div class="welcome-section">
            <h2>Welcome Back!</h2>
            <p class="subtitle">Please log in to your account to continue</p>
            <div class="security-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>Secure Government Portal</span>
            </div>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="loginUser" class="login-form">
            <!-- Email Input -->
            <div class="form-group">
              <label for="email" class="form-label">
                <div class="label-content">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-10 5L2 7"/>
                  </svg>
                  <span>Email Address</span>
                </div>
                <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your government email"
                  required
                  class="form-input"
                  autocomplete="email"
                />
                <div class="input-status">
                  <svg v-if="email && email.includes('@')" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Password Input -->
            <div class="form-group">
              <label for="password" class="form-label">
                <div class="label-content">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  <span>Password</span>
                </div>
                <span class="required">*</span>
              </label>
              <div class="input-wrapper">
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="Enter your secure password"
                  required
                  class="form-input"
                  autocomplete="current-password"
                />
                <div class="password-strength" v-if="password">
                  <div class="strength-bar" :class="getPasswordStrength()"></div>
                </div>
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Options Row -->
            <div class="form-options">
              <!-- <label class="checkbox-label">
                <input type="checkbox" v-model="remember" class="checkbox">
                <span class="checkmark"></span>
                <span>Remember me for 30 days</span>
              </label> -->
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="error-message" role="alert">
              <div class="error-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div class="error-content">
                <strong>Authentication Error</strong>
                <span class="error-text">{{ error }}</span>
              </div>
              <button class="error-close" @click="error = ''">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="login-btn" :disabled="!email || !password">
              <span class="btn-text">Sign In</span>
              <div class="btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </div>
              <div class="btn-loading" v-if="isLoading">
                <div class="spinner"></div>
              </div>
            </button>

            <!-- Create Account Link -->
            <div class="create-account">
              <span>New to BFAR System?</span>
              <router-link to="/register" class="create-link">
                Create your account
              </router-link>
            </div>

            <!-- Additional Links -->
            <div class="additional-links">
              <a href="#" class="help-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                Need help?
              </a>
              <a href="#" class="policy-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                Privacy Policy
              </a>
            </div>
          </form>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="login-right">
        <div class="image-overlay"></div>
        <img src="../assets/bfar.jpg" alt="BFAR Fisheries Operations" class="hero-image">
        
        <div class="content-overlay">
          <div class="system-info">
            <div class="system-header">
              <h2>BFAR Monitoring System</h2>
              <!-- <div class="live-indicator">
                <span class="live-dot"></span>
                <span>System Active</span>
              </div> -->
            </div>
            <p>Protecting and conserving Philippine aquatic resources through sustainable management and advanced technology.</p>
            
            <!-- Stats Section -->
            <div class="stats-section">
              <div class="stat-item">
                <div class="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <span class="stat-number">{{ stats.islandsProtected }}</span>
                  <span class="stat-label">Islands Protected</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <span class="stat-number">{{ stats.activeWardens }}</span>
                  <span class="stat-label">Active Wardens</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <div class="stat-content">
                  <span class="stat-number">{{ stats.expiredWardens }}</span>
                  <span class="stat-label">Expired Wardens</span>
                </div>
              </div>
            </div>
            
            <!-- Features
            <div class="features">
              <div class="feature-item">
                <div class="feature-icon">🛡️</div>
                <div class="feature-content">
                  <strong>Real-time Protection</strong>
                  <span>AI-powered monitoring system</span>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">📊</div>
                <div class="feature-content">
                  <strong>Advanced Analytics</strong>
                  <span>Predictive modeling insights</span>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">🌊</div>
                <div class="feature-content">
                  <strong>Marine Conservation</strong>
                  <span>Biodiversity protection</span>
                </div>
              </div>
            </div> -->

            <!-- System Status 
            <div class="system-status">
              <h4>System Status</h4>
              <div class="status-grid">
                <div class="status-item">
                  <span class="status-label">Network</span>
                  <span class="status-value optimal">Optimal</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Database</span>
                  <span class="status-value healthy">Healthy</span>
                </div>
                <div class="status-item">
                  <span class="status-label">API</span>
                  <span class="status-value fast">12ms</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Uptime</span>
                  <span class="status-value uptime">99.9%</span>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { useRouter } from "vue-router"

export default {

setup(){              

const email = ref("")
const password = ref("")
const error = ref("")
const showPassword = ref(false)
const remember = ref(false)
const isLoading = ref(false)

// Statistics
const stats = ref({
  islandsProtected: 0,
  activeWardens: 0,
  expiredWardens: 0
})

const router = useRouter()

// ✅ FIXED FETCH STATS
const fetchStats = async () => {
  try {
    const usersRef = collection(db, "users")
    const usersSnapshot = await getDocs(usersRef)

    let activeCount = 0
    let expiredCount = 0

    const today = new Date()
    today.setHours(0,0,0,0)

    console.log("TOTAL USERS:", usersSnapshot.size)
    console.log("TODAY'S DATE:", today.toDateString())

    usersSnapshot.forEach((docSnap) => {
      const userData = docSnap.data()

      let expiryDate = null   

      // ✅ HANDLE FIRESTORE TIMESTAMP + STRING
      if (userData.licenseExpiry) {
        expiryDate = userData.licenseExpiry?.toDate
          ? userData.licenseExpiry.toDate()
          : new Date(userData.licenseExpiry)

        // ❌ INVALID DATE
        if (isNaN(expiryDate)) {
          console.log("INVALID DATE:", userData.licenseExpiry)
          return
        }

        expiryDate.setHours(0,0,0,0)

        console.log(`USER: ${userData.name || userData.email}`)
        console.log(`EXPIRY DATE: ${expiryDate.toDateString()}`)
        console.log(`TODAY: ${today.toDateString()}`)
        console.log(`IS EXPIRED: ${expiryDate < today}`)

        // ✅ CHECK EXPIRED - EXPIRY < TODAY
        if (expiryDate < today) {
          expiredCount++
          console.log("✅ EXPIRED:", userData.name || userData.email)
        } else {
          activeCount++
          console.log("✅ ACTIVE:", userData.name || userData.email)
        }

      } else {
        // WALANG EXPIRY → ACTIVE
        activeCount++
        console.log("✅ ACTIVE (NO EXPIRY):", userData.name || userData.email)
      }
    })

    console.log("FINAL COUNT:", { activeCount, expiredCount })

    stats.value.activeWardens = activeCount
    stats.value.expiredWardens = expiredCount
    stats.value.islandsProtected = 7641

   } catch (err) {
    console.error("ERROR FETCHING STATS:", err)

    stats.value = {
      islandsProtected: 7641,
      activeWardens: 0,
      expiredWardens: 0
    }
  }
}

// LOAD STATS
onMounted(() => {
  fetchStats()
})

// PASSWORD STRENGTH
const getPasswordStrength = () => {
  if (!password.value) return ''
  const length = password.value.length
  if (length < 6) return 'weak'
  if (length < 10) return 'medium'
  if (length < 14) return 'strong'
  return 'very-strong'
}

// LOGIN FUNCTION
const loginUser = async () => {

error.value = ""
isLoading.value = true

try{

const userCredential = await signInWithEmailAndPassword(
auth,
email.value,
password.value
)

const user = userCredential.user

const docRef = doc(db,"users",user.uid)
const docSnap = await getDoc(docRef)

if(docSnap.exists()){

const userData = docSnap.data()

const session = {
uid: user.uid,
email: user.email,
role: userData.role
}

if(remember.value){
localStorage.setItem("user", JSON.stringify(session))
}else{
sessionStorage.setItem("user", JSON.stringify(session))
}

if(userData.role === "admin"){
router.push("/admin-dashboard")
}
else if(userData.role === "user"){
router.push("/user-dashboard")
}
else{
error.value = "Access Denied. Unknown role."
}

}else{
error.value = "User record not found in database."
}

}catch(err){

if(err.code === "auth/user-not-found"){
error.value = "User not found."
}
else if(err.code === "auth/wrong-password"){
error.value = "Wrong password."
}
else if(err.code === "auth/invalid-email"){
error.value = "Invalid email format."
}
else{
error.value = err.message
}

} finally{
isLoading.value = false
}

}

return{
email,
password,
loginUser,
error,
showPassword,
remember,
isLoading,
getPasswordStrength,
stats
}

}

}
</script>

<style scoped>
/* Modern Professional Color Palette */
:root {
  --primary-blue: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  --accent-teal: #14b8a6;
  --accent-emerald: #10b981;
  --neutral-50: #f8fafc;
  --neutral-100: #f1f5f9;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;
  --white: #ffffff;
  --error-red: #ef4444;
  --warning-amber: #f59e0b;
  --success-green: #22c55e;
}

/* =========================
   RESPONSIVE FIX (NO UI CHANGE)
========================= */

/* FIX HEIGHT ISSUE */
.login-page {
  min-height: 100vh;
  height: auto;
}

/* FLEXIBILITY */
.login-container {
  display: flex;
  flex-wrap: wrap;
  height: auto;
  max-height: none;
}

/* PANELS FLEX */
.login-left,
.login-right {
  flex: 1 1 50%;
  min-width: 320px;
}

/* =========================
   TABLET (≤1024px)
========================= */
@media (max-width: 1024px) {

  .login-container {
    flex-direction: column;
    max-width: 600px;
    margin: auto;
  }

  .login-right {
    order: -1;
    height: 260px;
  }

  .hero-image {
    height: 100%;
    object-fit: cover;
  }

  .content-overlay {
    padding: 24px;
  }

  .system-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }

  .auth-card {
    padding: 32px 24px;
  }
}

/* =========================
   MOBILE (≤768px)
========================= */
@media (max-width: 768px) {

  .login-page {
    padding: 12px;
  }

  .login-container {
    border-radius: 16px;
  }

  .auth-card {
    padding: 24px 18px;
  }

  .logo h1 {
    font-size: 26px;
  }

  .welcome-section h2 {
    font-size: 22px;
  }

  .form-input {
    padding: 12px 14px;
    font-size: 14px;
  }

  .login-btn {
    padding: 14px;
    font-size: 14px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .additional-links {
    flex-direction: column;
    gap: 10px;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .system-info p {
    font-size: 14px;
  }
}

/* =========================
   SMALL PHONES (≤480px)
========================= */
@media (max-width: 480px) {

  .login-right {
    display: none; /* CLEAN MOBILE UX */
  }

  .login-left {
    width: 100%;
  }

  .auth-card {
    max-width: 100%;
  }

  .logo h1 {
    font-size: 22px;
  }

  .welcome-section h2 {
    font-size: 20px;
  }

  .subtitle {
    font-size: 13px;
  }
}
</style>