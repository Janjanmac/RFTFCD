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

/* PAGE */
.login-page {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--neutral-50), var(--neutral-100));
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(222, 229, 255), rgba(72, 219, 202, 0.05));
}

/* ANIMATED BACKGROUND */
.background-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  inset: 0;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(20, 184, 166, 0.05));
  backdrop-filter: blur(10px);
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 25s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 20%;
  right: 20%;
  animation-delay: 3s;
  animation-duration: 20s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 30%;
  left: 10%;
  animation-delay: 5s;
  animation-duration: 22s;
}

.shape-4 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: 7s;
  animation-duration: 18s;
}

.shape-5 {
  width: 90px;
  height: 90px;
  bottom: 20%;
  right: 30%;
  animation-delay: 2s;
  animation-duration: 24s;
}

.shape-6 {
  width: 70px;
  height: 70px;
  top: 40%;
  left: 25%;
  animation-delay: 4s;
  animation-duration: 21s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
    opacity: 0.9;
  }
  50% {
    transform: translateY(10px) rotate(180deg);
    opacity: 0.5;
  }
  75% {
    transform: translateY(-15px) rotate(270deg);
    opacity: 0.8;
  }
}

.gradient-orbs {
  position: absolute;
  inset: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: pulse 4s infinite ease-in-out;
}

.orb-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(30, 64, 175, 0.3), transparent);
  animation-delay: 0s;
}

.orb-2 {
  width: 250px;
  height: 250px;
  bottom: -100px;
  right: -100px;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.3), transparent);
  animation-delay: 2s;
}

.orb-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
  animation-delay: 1s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* CONTAINER */
.login-container {
  width: 100%;
  max-width: 1200px;
  height: auto;
  max-height: 90vh;
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: var(--white);
  border: 1px solid var(--neutral-200);
  position: relative;
  z-index: 10;
}

/* LEFT PANEL */
.login-left {
  width: 50%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
}

/* AUTH CARD */
.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 48px 40px;
  text-align: center;
  background: var(--white);
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* LOGO SECTION */
.logo-section {
  margin-bottom: 40px;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-icon {
  margin-bottom: 16px;
  color: var(--primary-blue);
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.logo h1 {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-blue);
  margin: 0 0 6px 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo p {
  font-size: 14px;
  color: var(--neutral-600);
  margin: 0;
  font-weight: 500;
}

/* WELCOME SECTION */
.welcome-section {
  margin-bottom: 40px;
}

.welcome-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--neutral-800);
  margin: 0 0 12px 0;
}

.subtitle {
  font-size: 15px;
  color: var(--neutral-500);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.security-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1));
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  font-size: 12px;
  color: var(--accent-emerald);
  font-weight: 600;
}

/* FORM STYLES */
.login-form {
  text-align: left;
  
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 600;
  color: var(--neutral-700);
  margin-bottom: 8px;
}

.label-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.required {
  color: var(--error-red);
  font-weight: 700;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid var(--neutral-200);
  border-radius: 12px;
  font-size: 15px;
  color: var(--neutral-800);
  background: var(--white);
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.form-input::placeholder {
  color: var(--neutral-400);
}

.input-status {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.password-strength {
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  background: var(--neutral-200);
}

.strength-bar {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-bar.weak {
  width: 25%;
  background: var(--error-red);
}

.strength-bar.medium {
  width: 50%;
  background: var(--warning-amber);
}

.strength-bar.strong {
  width: 75%;
  background: var(--primary-blue);
}

.strength-bar.very-strong {
  width: 100%;
  background: var(--success-green);
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--neutral-400);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  color: var(--primary-blue);
  background: var(--neutral-100);
}

/* FORM OPTIONS */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  color: var(--neutral-600);
  font-weight: 500;
}

.checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-300);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox:checked ~ .checkmark {
  background: var(--primary-blue);
  border-color: var(--primary-blue);
}

.checkbox:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* ERROR MESSAGE */
.error-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  margin-bottom: 24px;
  color: var(--error-red);
  font-size: 14px;
  animation: slideDown 0.3s ease;
  position: relative;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.error-content {
  flex: 1;
}

.error-content strong {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
}

.error-text {
  line-height: 1.4;
}

.error-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: var(--error-red);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.error-close:hover {
  background: rgba(239, 68, 68, 0.1);
}

/* LOGIN BUTTON */
.login-btn {
  width: 100%;
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-light));
  color: var(--white);
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
}

.login-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-blue));
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon svg {
  transition: transform 0.2s ease;
}

.login-btn:hover:not(:disabled) .btn-icon svg {
  transform: translateX(3px);
}

.btn-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* CREATE ACCOUNT */
.create-account {
  text-align: center;
  font-size: 14px;
  color: var(--neutral-600);
  margin-bottom: 24px;
}

.create-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.2s ease;
}

.create-link:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

/* ADDITIONAL LINKS */
.additional-links {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--neutral-200);
}

.help-link, .policy-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--neutral-500);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
}

.help-link:hover, .policy-link:hover {
  color: var(--primary-blue);
}

/* RIGHT PANEL */
.login-right {
  width: 50%;
  position: relative;
  overflow: hidden;
  background: var(--neutral-900);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(137, 160, 235, 0.329) 0%, rgba(20, 184, 166, 0.8) 100%);
  z-index: 1;
}

.content-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 48px;
}

.system-info {
  text-align: center;
  color: var(--white);
  max-width: 500px;
}

.system-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.system-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.system-info p {
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 40px 0;
  opacity: 0.9;
}

/* STATS SECTION */
.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
}

.stat-icon {
  margin-bottom: 12px;
  color: var(--accent-emerald);
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: var(--accent-emerald);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* FEATURES */
.features {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 24px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  flex-shrink: 0;
}

.feature-content {
  text-align: left;
}

.feature-content strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.feature-content span {
  font-size: 12px;
  opacity: 0.8;
}

/* SYSTEM STATUS */
.system-status {
  text-align: center;
}

.system-status h4 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--accent-emerald);
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
}

.status-label {
  color: rgba(255, 255, 255, 0.8);
}

.status-value {
  font-weight: 600;
}

.status-value.optimal {
  color: #10b981;
}

.status-value.healthy {
  color: var(--accent-emerald);
}

.status-value.fast {
  color: var(--primary-light);
}

.status-value.uptime {
  color: #8b5cf6;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .login-container {
    flex-direction: column;
    max-height: none;
    max-width: 500px;
    
  }
  
  .login-left,
  .login-right {
    width: 100%;
  }
  
  .login-left {
    min-height: auto;
  }
  
  .login-right {
    min-height: 400px;
  }
  
  .auth-card {
    padding: 32px 24px;
  }
  
  .content-overlay {
    padding: 32px 24px;
  }
  
  .system-header {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .stats-section {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .features {
    gap: 12px;
  }
  
  .status-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .login-page {
    padding: 16px;
    
  }
  
  .auth-card {
    padding: 24px 20px;
  }
  
  .logo h1 {
    font-size: 28px;
  }
  
  .welcome-section h2 {
    font-size: 22px;
  }
  
  .form-options {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .additional-links {
    flex-direction: column;
    gap: 12px;
  }
  
  .system-header h2 {
    font-size: 24px;
  }
  
  .content-overlay {
    padding: 24px 20px;
  }
  
  .features {
    gap: 8px;
  }
  
  .feature-item {
    padding: 16px;
  }
}

/* ACCESSIBILITY */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>