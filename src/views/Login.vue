<template>
  <div class="login-page">

    <!-- Ocean Particle Canvas Background -->
    <canvas class="ocean-canvas" ref="canvasRef"></canvas>

    <!-- Scanline Overlay -->
    <div class="scanlines"></div>

    <div class="login-container">

      <!-- LEFT SIDE -->
      <div class="login-left">
        <div class="auth-card">

          <!-- Logo Section -->
          <div class="logo-section">
            <div class="logo-icon-wrap">
              <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="1.5"/>
                <path d="M24 12 L28 20 L24 28 L20 20 Z" fill="currentColor" opacity="0.9"/>
                <circle cx="24" cy="24" r="2.5" fill="currentColor"/>
                <text x="24" y="39" text-anchor="middle" font-size="5.5" fill="currentColor" font-weight="700" letter-spacing="1">BFAR</text>
              </svg>
            </div>
            <div class="logo-text-wrap">
              <h1 class="logo-title">BFAR</h1>
              <p class="logo-sub">Fish Warden Information System</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="card-divider"></div>

          <!-- Welcome Section -->
          <div class="welcome-section">
            <h2 class="welcome-heading">Mag-sign in</h2>
            <p class="welcome-sub">I-access ang iyong opisyal na account</p>
            <div class="secure-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>Secure Government Portal</span>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="loginUser" class="login-form">

            <!-- Email -->
            <div class="field-group">
              <label for="email" class="field-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-10 5L2 7"/>
                </svg>
                Email Address
              </label>
              <div class="field-wrap">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="your@bfar.gov.ph"
                  required
                  class="field-input"
                  autocomplete="email"
                />
                <span class="field-check" v-if="email && email.includes('@')">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </span>
              </div>
            </div>

            <!-- Password -->
            <div class="field-group">
              <label for="password" class="field-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Password
              </label>
              <div class="field-wrap">
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="••••••••••••"
                  required
                  class="field-input"
                  autocomplete="current-password"
                />
                <button type="button" class="eye-btn" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide' : 'Show'">
                  <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <div class="pw-strength" v-if="password">
                <div class="pw-bar" :class="getPasswordStrength()"></div>
              </div>
            </div>

            <!-- Options -->
            <div class="form-meta">
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <!-- Error -->
            <div v-if="error" class="error-box" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ error }}</span>
              <button class="err-x" @click="error = ''">✕</button>
            </div>

            <!-- Submit -->
            <button type="submit" class="submit-btn" :disabled="!email || !password || isLoading">
              <span v-if="!isLoading" class="btn-inner">
                Sign In
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </span>
              <span v-else class="btn-loading">
                <span class="spin"></span> Signing in...
              </span>
            </button>

            <!-- Register -->
            <p class="register-row">
              Bago sa BFAR System?
              <router-link to="/register" class="reg-link">Gumawa ng account</router-link>
            </p>

            <!-- Footer Links -->
            <div class="card-footer">
              <a href="#" class="footer-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Tulong
              </a>
              <span class="footer-sep">·</span>
              <a href="#" class="footer-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
                Privacy Policy
              </a>
            </div>

          </form>
        </div>
      </div>

      <!-- RIGHT SIDE -->
      <div class="login-right">
        <img src="../assets/bfar.jpg" alt="BFAR Operations" class="hero-img">
        <div class="right-overlay"></div>
        <div class="right-content">
          <div class="right-badge">Republic of the Philippines</div>
          <h2 class="right-title">BFAR Monitoring<br>System</h2>
          <p class="right-desc">Pinoprotektahan at pinangangalagaan ang mga yamang-dagat ng Pilipinas sa pamamagitan ng sustainable na pamamahala at makabagong teknolohiya.</p>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <span class="stat-val">{{ stats.islandsProtected.toLocaleString() }}</span>
              <span class="stat-lbl">Islands Protected</span>
            </div>
            <div class="stat-card">
              <div class="stat-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span class="stat-val">{{ stats.activeWardens }}</span>
              <span class="stat-lbl">Active Wardens</span>
            </div>
            <div class="stat-card stat-warn">
              <div class="stat-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <span class="stat-val">{{ stats.expiredWardens }}</span>
              <span class="stat-lbl">Expired Wardens</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { useRouter } from "vue-router"

const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref("")
const showPassword = ref(false)
const isLoading = ref(false)
const canvasRef = ref(null)

const stats = ref({ islandsProtected: 0, activeWardens: 0, expiredWardens: 0 })

// ── Canvas particle animation ──────────────────────────────────────────────
let animId = null
const initCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext("2d")
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
  resize()
  window.addEventListener("resize", resize)

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    alpha: Math.random() * 0.5 + 0.1,
  }))

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(56, 211, 183, ${p.alpha})`
      ctx.fill()
      p.x += p.dx; p.y += p.dy
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1
    })
    animId = requestAnimationFrame(draw)
  }
  draw()
}

// ── Stats ──────────────────────────────────────────────────────────────────
const fetchStats = async () => {
  try {
    const snap = await getDocs(collection(db, "users"))
    let active = 0, expired = 0
    const today = new Date(); today.setHours(0,0,0,0)
    snap.forEach(d => {
      const u = d.data()
      if (u.licenseExpiry) {
        const exp = u.licenseExpiry?.toDate ? u.licenseExpiry.toDate() : new Date(u.licenseExpiry)
        if (isNaN(exp)) return
        exp.setHours(0,0,0,0)
        exp < today ? expired++ : active++
      } else { active++ }
    })
    stats.value = { islandsProtected: 7641, activeWardens: active, expiredWardens: expired }
  } catch { stats.value = { islandsProtected: 7641, activeWardens: 0, expiredWardens: 0 } }
}

const getPasswordStrength = () => {
  const l = password.value.length
  if (l < 6) return 'weak'
  if (l < 10) return 'medium'
  if (l < 14) return 'strong'
  return 'very-strong'
}

const loginUser = async () => {
  error.value = ""; isLoading.value = true
  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value)
    const snap = await getDoc(doc(db, "users", cred.user.uid))
    if (snap.exists()) {
      const u = snap.data()
      sessionStorage.setItem("user", JSON.stringify({ uid: cred.user.uid, email: cred.user.email, role: u.role }))
      if (u.role === "admin") router.push("/admin-dashboard")
      else if (u.role === "user") router.push("/user-dashboard")
      else error.value = "Access Denied. Unknown role."
    } else { error.value = "User record not found." }
  } catch (e) {
    if (e.code === "auth/user-not-found") error.value = "User not found."
    else if (e.code === "auth/wrong-password") error.value = "Wrong password."
    else if (e.code === "auth/invalid-email") error.value = "Invalid email format."
    else error.value = e.message
  } finally { isLoading.value = false }
}

onMounted(() => { fetchStats(); initCanvas() })
onUnmounted(() => { if (animId) cancelAnimationFrame(animId) })
</script>

<style scoped>
/* ─────────────────────────────────────────────
   FONTS
───────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ─────────────────────────────────────────────
   TOKENS
───────────────────────────────────────────── */
:root {
  --ink:       #0a0f1e;
  --ink-2:     #0d1628;
  --teal:      #38d3b7;
  --teal-dim:  rgba(56,211,183,0.18);
  --teal-glow: rgba(56,211,183,0.08);
  --amber:     #f5a623;
  --red:       #ff5b5b;
  --white:     #ffffff;
  --mist:      rgba(255,255,255,0.06);
  --mist-2:    rgba(255,255,255,0.10);
  --mist-3:    rgba(255,255,255,0.55);
  --border:    rgba(56,211,183,0.15);
  --border-2:  rgba(255,255,255,0.08);
  --ff-head:   'Syne', sans-serif;
  --ff-body:   'DM Sans', sans-serif;
}

/* ─────────────────────────────────────────────
   BASE
───────────────────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  font-family: var(--ff-body);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

/* ─────────────────────────────────────────────
   CANVAS + SCANLINES
───────────────────────────────────────────── */
.ocean-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0,0,0,0.06) 3px,
    rgba(0,0,0,0.06) 4px
  );
}

/* ─────────────────────────────────────────────
   CONTAINER
───────────────────────────────────────────── */
.login-container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1080px;
  min-height: 620px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow:
    0 0 0 1px rgba(56,211,183,0.06),
    0 40px 80px -20px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.04);
  animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ─────────────────────────────────────────────
   LEFT
───────────────────────────────────────────── */
.login-left {
  width: 48%;
  background: var(--ink-2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  overflow-y: auto;
}

.auth-card {
  width: 100%;
  max-width: 380px;
}

/* ── Logo ── */
.logo-section {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.logo-icon-wrap {
  color: var(--teal);
  flex-shrink: 0;
  animation: logoBreath 3s ease-in-out infinite;
}

@keyframes logoBreath {
  0%,100% { filter: drop-shadow(0 0 6px rgba(56,211,183,0.4)); }
  50%      { filter: drop-shadow(0 0 16px rgba(56,211,183,0.8)); }
}

.logo-title {
  font-family: var(--ff-head);
  font-size: 30px;
  font-weight: 800;
  color: var(--white);
  letter-spacing: -0.01em;
  line-height: 1;
}

.logo-sub {
  font-size: 11.5px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.02em;
  margin-top: 4px;
  line-height: 1.3;
}

/* ── Divider ── */
.card-divider {
  height: 1px;
  background: linear-gradient(90deg, var(--teal-dim), transparent);
  margin-bottom: 28px;
}

/* ── Welcome ── */
.welcome-section {
  margin-bottom: 32px;
}

.welcome-heading {
  font-family: var(--ff-head);
  font-size: 26px;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.welcome-sub {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 14px;
}

.secure-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 12px;
  border: 1px solid rgba(56,211,183,0.25);
  border-radius: 999px;
  font-size: 11.5px;
  color: var(--teal);
  font-weight: 500;
  background: var(--teal-glow);
  letter-spacing: 0.02em;
}

/* ── Fields ── */
.field-group {
  margin-bottom: 20px;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255,255,255,0.55);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.field-wrap {
  position: relative;
}

.field-input {
  width: 100%;
  padding: 13px 44px 13px 16px;
  background: var(--mist);
  border: 1px solid var(--border-2);
  border-radius: 10px;
  font-size: 14.5px;
  font-family: var(--ff-body);
  color: var(--white);
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
}

.field-input::placeholder {
  color: rgba(255,255,255,0.2);
}

.field-input:focus {
  border-color: var(--teal);
  background: rgba(56,211,183,0.05);
  box-shadow: 0 0 0 3px rgba(56,211,183,0.1);
}

.field-check {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--teal);
  display: flex;
  align-items: center;
}

.eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.eye-btn:hover { color: var(--teal); }

/* Password strength */
.pw-strength {
  height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: 2px;
  margin-top: 6px;
  overflow: hidden;
}

.pw-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s, background 0.3s;
}

.pw-bar.weak      { width: 25%; background: var(--red); }
.pw-bar.medium    { width: 50%; background: var(--amber); }
.pw-bar.strong    { width: 75%; background: var(--teal); }
.pw-bar.very-strong { width: 100%; background: #22c55e; }

/* ── Form meta ── */
.form-meta {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
}

.forgot-link {
  font-size: 13px;
  color: var(--teal);
  text-decoration: none;
  font-weight: 500;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.forgot-link:hover { opacity: 1; }

/* ── Error ── */
.error-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(255,91,91,0.1);
  border: 1px solid rgba(255,91,91,0.25);
  border-radius: 10px;
  color: var(--red);
  font-size: 13px;
  margin-bottom: 16px;
  animation: errPop 0.25s ease;
}

@keyframes errPop {
  from { opacity: 0; transform: scale(0.97); }
  to   { opacity: 1; transform: scale(1); }
}

.err-x {
  margin-left: auto;
  background: none;
  border: none;
  color: var(--red);
  cursor: pointer;
  font-size: 13px;
  padding: 2px 4px;
  border-radius: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.err-x:hover { opacity: 1; }

/* ── Submit ── */
.submit-btn {
  width: 100%;
  padding: 14px 20px;
  background: var(--teal);
  color: var(--ink);
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: var(--ff-head);
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  margin-bottom: 20px;
  letter-spacing: 0.01em;
  min-height: 50px;
}

.submit-btn:hover:not(:disabled) {
  background: #4de8cc;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(56,211,183,0.3);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: none;
}

.submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spin {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(10,15,30,0.3);
  border-top-color: var(--ink);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ── Register row ── */
.register-row {
  text-align: center;
  font-size: 13.5px;
  color: rgba(255,255,255,0.35);
  margin-bottom: 24px;
}

.reg-link {
  color: var(--teal);
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: opacity 0.2s;
}

.reg-link:hover { opacity: 0.75; }

/* ── Card footer ── */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 18px;
  border-top: 1px solid var(--border-2);
}

.footer-sep { color: rgba(255,255,255,0.15); font-size: 14px; }

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover { color: var(--teal); }

/* ─────────────────────────────────────────────
   RIGHT
───────────────────────────────────────────── */
.login-right {
  width: 52%;
  position: relative;
  overflow: hidden;
  background: var(--ink);
}

.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
  filter: saturate(0.4);
  transform: scale(1.04);
}

.right-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(160deg, rgba(10,15,30,0.5) 0%, rgba(56,211,183,0.12) 100%),
    linear-gradient(to top, rgba(10,15,30,0.9) 0%, transparent 60%);
  z-index: 1;
}

.right-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px 44px;
}

.right-badge {
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--teal);
  border: 1px solid var(--border);
  padding: 5px 12px;
  border-radius: 999px;
  background: var(--teal-glow);
  width: fit-content;
  margin-bottom: 20px;
}

.right-title {
  font-family: var(--ff-head);
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 800;
  color: var(--white);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
}

.right-desc {
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  max-width: 380px;
  margin-bottom: 40px;
}

/* ── Stats grid ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 18px;
  background: var(--mist);
  border: 1px solid var(--border-2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: background 0.25s, transform 0.25s;
  gap: 6px;
}

.stat-card:hover {
  background: var(--mist-2);
  transform: translateY(-3px);
}

.stat-ico {
  color: var(--teal);
  margin-bottom: 2px;
}

.stat-warn .stat-ico,
.stat-warn .stat-val { color: var(--amber); }

.stat-val {
  font-family: var(--ff-head);
  font-size: 22px;
  font-weight: 800;
  color: var(--teal);
  line-height: 1;
}

.stat-lbl {
  font-size: 10.5px;
  color: rgba(255,255,255,0.35);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.3;
}

/* ─────────────────────────────────────────────
   RESPONSIVE
───────────────────────────────────────────── */
@media (max-width: 900px) {
  .login-container {
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
  }

  .login-left, .login-right { width: 100%; }

  .login-right {
    min-height: 300px;
    order: 2;
  }

  .login-left { order: 1; }

  .right-content {
    padding: 32px 28px;
    justify-content: flex-end;
  }

  .right-title { font-size: 26px; }
  .stats-grid { gap: 8px; }
  .stat-card { padding: 12px 14px; }
  .stat-val { font-size: 18px; }
}

@media (max-width: 600px) {
  .login-page { padding: 12px; }

  .login-left { padding: 32px 24px; }

  .logo-title { font-size: 26px; }
  .welcome-heading { font-size: 22px; }

  .field-input { font-size: 16px; }

  .login-right { min-height: 260px; }
  .right-content { padding: 24px 20px; }
  .right-title { font-size: 22px; }
  .right-desc { font-size: 13px; margin-bottom: 24px; }

  .stats-grid { grid-template-columns: 1fr; gap: 8px; }

  .stat-card {
    flex-direction: row;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
  }
  .stat-ico { margin-bottom: 0; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>