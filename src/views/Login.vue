<template>
  <div class="login-page">

    <!-- Background Grid -->
    <div class="bg-grid"></div>
    <div class="bg-noise"></div>

    <div class="login-shell">

      <!-- ═══ LEFT PANEL ═══ -->
      <aside class="panel-left">
        <div class="panel-left__inner">

          <!-- Brand -->
          <div class="brand">
            <div class="brand__emblem">
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="21" stroke="currentColor" stroke-width="1.5"/>
                <path d="M24 10 L29 21 L24 30 L19 21 Z" fill="currentColor" opacity="0.9"/>
                <circle cx="24" cy="24" r="3" fill="currentColor"/>
                <text x="24" y="40" text-anchor="middle" font-size="5.5" fill="currentColor" font-weight="700" letter-spacing="1">BFAR</text>
              </svg>
            </div>
            <div class="brand__text">
              <span class="brand__name">BFAR</span>
              <span class="brand__sub">Fish Warden Information System</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-divider"></div>

          <!-- Heading -->
          <div class="heading-block">
            <p class="heading-block__eyebrow">Secure Government Portal</p>
            <h1 class="heading-block__title">Sign In to<br>Your Account</h1>
            <p class="heading-block__desc">Access the BFAR monitoring dashboard using your authorised credentials.</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="loginUser" class="auth-form" novalidate>

            <div class="field">
              <label class="field__label" for="email">Email Address</label>
              <div class="field__wrap">
                <span class="field__icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>
                  </svg>
                </span>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="your@agency.gov.ph"
                  required
                  class="field__input"
                  autocomplete="email"
                />
                <span class="field__check" v-if="email && email.includes('@')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                </span>
              </div>
            </div>

            <div class="field">
              <div class="field__label-row">
                <label class="field__label" for="password">Password</label>
                <a href="#" class="field__forgot">Forgot password?</a>
              </div>
              <div class="field__wrap">
                <span class="field__icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="16" r="1"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                </span>
                <input
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="••••••••••••"
                  required
                  class="field__input"
                  autocomplete="current-password"
                />
                <button type="button" class="field__toggle" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <div class="strength-track" v-if="password">
                <div class="strength-fill" :class="getPasswordStrength()"></div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="auth-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ error }}</span>
              <button class="auth-error__close" @click="error = ''">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <!-- CTA -->
            <button type="submit" class="btn-signin" :disabled="!email || !password || isLoading">
              <span v-if="!isLoading" class="btn-signin__text">
                Sign In
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/>
                  <polyline points="10,17 15,12 10,7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
              </span>
              <span v-else class="btn-signin__loader">
                <span class="spin-ring"></span>
              </span>
            </button>

          </form>

          <!-- Footer Links -->
          <div class="panel-footer">
            <span>New to the system?</span>
            <router-link to="/register" class="panel-footer__link">Create an account</router-link>
          </div>

          <div class="panel-meta">
            <a href="#" class="panel-meta__link">Help Center</a>
            <span class="panel-meta__dot"></span>
            <a href="#" class="panel-meta__link">Privacy Policy</a>
            <span class="panel-meta__dot"></span>
            <a href="#" class="panel-meta__link">Terms of Use</a>
          </div>

        </div>
      </aside>

      <!-- ═══ RIGHT PANEL ═══ -->
      <section class="panel-right">
        <img src="../assets/bfar.jpg" alt="BFAR Operations" class="panel-right__img" />
        <div class="panel-right__veil"></div>

        <div class="panel-right__content">
          <!-- Tag -->
          <span class="content-tag">
            <span class="tag-dot"></span>
            Bureau of Fisheries and Aquatic Resources
          </span>

          <h2 class="content-headline">Protecting<br>Philippine<br>Waters</h2>

          <p class="content-body">
            Conserving aquatic resources through sustainable management and advanced monitoring technology across 7,641 islands.
          </p>

          <!-- Stats strip -->
          <div class="stats-strip">
            <div class="stat-card">
              <span class="stat-card__num">{{ stats.islandsProtected.toLocaleString() }}</span>
              <span class="stat-card__lbl">Islands Protected</span>
            </div>
            <div class="stat-sep"></div>
            <div class="stat-card">
              <span class="stat-card__num">{{ stats.activeWardens }}</span>
              <span class="stat-card__lbl">Active Wardens</span>
            </div>
            <div class="stat-sep"></div>
            <div class="stat-card">
              <span class="stat-card__num">{{ stats.expiredWardens }}</span>
              <span class="stat-card__lbl">Expired Wardens</span>
            </div>
          </div>

          <!-- Seal -->
          <div class="gov-seal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>Official Republic of the Philippines Government Portal</span>
          </div>
        </div>
      </section>

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
  setup() {
    const email = ref("")
    const password = ref("")
    const error = ref("")
    const showPassword = ref(false)
    const remember = ref(false)
    const isLoading = ref(false)

    const stats = ref({
      islandsProtected: 0,
      activeWardens: 0,
      expiredWardens: 0
    })

    const router = useRouter()

    const fetchStats = async () => {
      try {
        const usersRef = collection(db, "users")
        const usersSnapshot = await getDocs(usersRef)

        let activeCount = 0
        let expiredCount = 0

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        usersSnapshot.forEach((docSnap) => {
          const userData = docSnap.data()
          let expiryDate = null

          if (userData.licenseExpiry) {
            expiryDate = userData.licenseExpiry?.toDate
              ? userData.licenseExpiry.toDate()
              : new Date(userData.licenseExpiry)

            if (isNaN(expiryDate)) return

            expiryDate.setHours(0, 0, 0, 0)

            if (expiryDate < today) {
              expiredCount++
            } else {
              activeCount++
            }
          } else {
            activeCount++
          }
        })

        stats.value.activeWardens = activeCount
        stats.value.expiredWardens = expiredCount
        stats.value.islandsProtected = 7641
      } catch (err) {
        console.error("ERROR FETCHING STATS:", err)
        stats.value = { islandsProtected: 7641, activeWardens: 0, expiredWardens: 0 }
      }
    }

    onMounted(() => { fetchStats() })

    const getPasswordStrength = () => {
      if (!password.value) return ''
      const l = password.value.length
      if (l < 6) return 'weak'
      if (l < 10) return 'medium'
      if (l < 14) return 'strong'
      return 'very-strong'
    }

    const loginUser = async () => {
      error.value = ""
      isLoading.value = true

      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user

        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const userData = docSnap.data()
          const session = { uid: user.uid, email: user.email, role: userData.role }

          if (remember.value) {
            localStorage.setItem("user", JSON.stringify(session))
          } else {
            sessionStorage.setItem("user", JSON.stringify(session))
          }

          if (userData.role === "admin") router.push("/admin-dashboard")
          else if (userData.role === "user") router.push("/user-dashboard")
          else error.value = "Access Denied. Unknown role."
        } else {
          error.value = "User record not found in database."
        }
      } catch (err) {
        if (err.code === "auth/user-not-found") error.value = "User not found."
        else if (err.code === "auth/wrong-password") error.value = "Wrong password."
        else if (err.code === "auth/invalid-email") error.value = "Invalid email format."
        else error.value = err.message
      } finally {
        isLoading.value = false
      }
    }

    return { email, password, loginUser, error, showPassword, remember, isLoading, getPasswordStrength, stats }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

/* ── TOKENS ── */
:root {
  --ink: #0b0f1a;
  --ink-2: #111827;
  --ink-3: #1c2333;
  --surface: #f5f4f0;
  --surface-2: #eceae4;
  --border: rgba(255,255,255,0.08);
  --text-primary: #f0ede6;
  --text-muted: rgba(240,237,230,0.55);
  --accent: #d4f53c;       /* electric lime — sharp government authority */
  --accent-dim: rgba(212,245,60,0.12);
  --teal: #2dd4bf;
  --red: #f87171;
  --green: #4ade80;
  --ff-display: 'Syne', sans-serif;
  --ff-body: 'DM Sans', sans-serif;
}

/* ── RESET ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── PAGE ── */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  background: var(--ink);
  font-family: var(--ff-body);
  position: relative;
  overflow: hidden;
}

/* Subtle dot grid */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

/* Noise texture overlay */
.bg-noise {
  position: fixed;
  inset: 0;
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
}

/* ── SHELL ── */
.login-shell {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* ══════════════════════════════════════
   LEFT PANEL
══════════════════════════════════════ */
.panel-left {
  width: 480px;
  flex-shrink: 0;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  position: relative;
}

/* Subtle right-edge shadow toward dark panel */
.panel-left::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(0,0,0,0.12);
}

.panel-left__inner {
  width: 100%;
  max-width: 380px;
  padding: 0 40px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 36px;
  color: var(--ink);
}

.brand__emblem {
  color: var(--ink-2);
  flex-shrink: 0;
}

.brand__text {
  display: flex;
  flex-direction: column;
}

.brand__name {
  font-family: var(--ff-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1;
}

.brand__sub {
  font-size: 11px;
  color: #64748b;
  font-weight: 400;
  margin-top: 3px;
  letter-spacing: 0.01em;
}

.h-divider {
  height: 1px;
  background: var(--surface-2);
  margin-bottom: 36px;
}

/* Heading */
.heading-block {
  margin-bottom: 36px;
}

.heading-block__eyebrow {
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.heading-block__eyebrow::before {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
  background: #94a3b8;
}

.heading-block__title {
  font-family: var(--ff-display);
  font-size: 36px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.heading-block__desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.65;
}

/* ── Form ── */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 28px;
}

.field { display: flex; flex-direction: column; gap: 7px; }

.field__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.field__label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.field__forgot {
  font-size: 12px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.field__forgot:hover { color: #1d4ed8; }

.field__wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.field__icon {
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  pointer-events: none;
}

.field__input {
  width: 100%;
  padding: 13px 44px 13px 42px;
  border: 1.5px solid var(--surface-2);
  border-radius: 10px;
  font-family: var(--ff-body);
  font-size: 14px;
  color: var(--ink);
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.field__input::placeholder { color: #94a3b8; }

.field__input:focus {
  border-color: var(--ink);
  box-shadow: 0 0 0 3px rgba(11,15,26,0.08);
}

.field__check {
  position: absolute;
  right: 14px;
  display: flex;
}

.field__toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  transition: color 0.2s, background 0.2s;
}
.field__toggle:hover { color: var(--ink); background: var(--surface-2); }

/* Strength bar */
.strength-track {
  height: 3px;
  background: var(--surface-2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 6px;
}
.strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
.strength-fill.weak    { width: 25%; background: #f87171; }
.strength-fill.medium  { width: 50%; background: #fbbf24; }
.strength-fill.strong  { width: 75%; background: #3b82f6; }
.strength-fill.very-strong { width: 100%; background: #22c55e; }

/* Error */
.auth-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.25);
  border-radius: 10px;
  color: #dc2626;
  font-size: 13px;
  animation: errIn 0.25s ease;
  position: relative;
}
@keyframes errIn { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform: none; } }

.auth-error span { flex: 1; line-height: 1.4; }

.auth-error__close {
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  opacity: 0.7;
  transition: opacity 0.2s;
}
.auth-error__close:hover { opacity: 1; }

/* Sign In Button */
.btn-signin {
  width: 100%;
  padding: 15px;
  background: var(--ink);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-family: var(--ff-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  position: relative;
  overflow: hidden;
}

.btn-signin::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212,245,60,0.12), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.btn-signin:hover:not(:disabled)::before { opacity: 1; }

.btn-signin:hover:not(:disabled) {
  background: #1c2333;
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
}

.btn-signin:active:not(:disabled) { transform: none; }

.btn-signin:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-signin__text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-signin__loader { display: flex; }

.spin-ring {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Footer */
.panel-footer {
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 20px;
}
.panel-footer__link {
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
  margin-left: 5px;
  border-bottom: 1px solid var(--ink);
  transition: opacity 0.2s;
}
.panel-footer__link:hover { opacity: 0.6; }

.panel-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.panel-meta__link {
  font-size: 11.5px;
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}
.panel-meta__link:hover { color: var(--ink); }
.panel-meta__dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #cbd5e1;
}

/* ══════════════════════════════════════
   RIGHT PANEL
══════════════════════════════════════ */
.panel-right {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.panel-right__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.6) brightness(0.5);
}

/* Multi-layer veil: bottom-heavy dark gradient + teal tint */
.panel-right__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(11,15,26,0.97) 0%, rgba(11,15,26,0.55) 45%, rgba(11,15,26,0.2) 100%),
    linear-gradient(135deg, rgba(45,212,191,0.08) 0%, transparent 60%);
}

/* Decorative vertical line */
.panel-right::before {
  content: '';
  position: absolute;
  left: 48px;
  top: 80px;
  bottom: 80px;
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(212,245,60,0.4), transparent);
  z-index: 2;
}

.panel-right__content {
  position: relative;
  z-index: 3;
  padding: 64px 64px 64px 80px;
  max-width: 620px;
  width: 100%;
}

/* Tag */
.content-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
  padding: 7px 14px;
  border: 1px solid rgba(212,245,60,0.25);
  border-radius: 20px;
  background: rgba(212,245,60,0.06);
}

.tag-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

/* Headline */
.content-headline {
  font-family: var(--ff-display);
  font-size: clamp(48px, 6vw, 72px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.content-body {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 420px;
  margin-bottom: 48px;
}

/* Stats strip */
.stats-strip {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 40px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  overflow: hidden;
  max-width: 460px;
}

.stat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 22px 16px;
  gap: 4px;
  transition: background 0.2s;
}
.stat-card:hover { background: rgba(255,255,255,0.04); }

.stat-card__num {
  font-family: var(--ff-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-card__lbl {
  font-size: 10.5px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-align: center;
}

.stat-sep {
  width: 1px;
  height: 44px;
  background: rgba(255,255,255,0.08);
  flex-shrink: 0;
}

/* Gov Seal */
.gov-seal {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

/* ══════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════ */
@media (max-width: 1024px) {
  .login-shell { flex-direction: column; }

  .panel-left {
    width: 100%;
    padding: 40px 20px;
  }

  .panel-left__inner { max-width: 460px; padding: 0 20px; }

  .panel-right {
    min-height: 420px;
    align-items: flex-end;
  }

  .panel-right::before { display: none; }

  .panel-right__content {
    padding: 40px;
  }

  .content-headline { font-size: 40px; }

  .stats-strip { max-width: 100%; }
}

@media (max-width: 640px) {
  .panel-left__inner { padding: 0; }

  .heading-block__title { font-size: 28px; }

  .panel-right__content { padding: 28px 24px; }

  .content-headline { font-size: 32px; }

  .stats-strip { flex-direction: column; gap: 0; }

  .stat-sep { width: 80%; height: 1px; }

  .panel-meta { flex-wrap: wrap; justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>