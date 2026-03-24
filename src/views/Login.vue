<template>
  <div class="login-page">
    <div class="login-container">

      <!-- LEFT -->
      <div class="login-left">
        <div class="auth-card">
          <h1 class="title">BFAR</h1>
          <h2>Welcome Back</h2>

          <form @submit.prevent="loginUser">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />

            <button type="submit">Login</button>
          </form>

          <p v-if="error" class="error">{{ error }}</p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="login-right">
        <img src="../assets/bfar.jpg" class="hero-image" />
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useRouter } from "vue-router"

export default {
  setup() {
    const email = ref("")
    const password = ref("")
    const error = ref("")
    const router = useRouter()

    const loginUser = async () => {
      error.value = ""
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push("/dashboard")
      } catch (err) {
        error.value = err.message
      }
    }

    return { email, password, loginUser, error }
  }
}
</script>

<style scoped>
/* PAGE */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f5f9;
  padding: 20px;
}

/* CONTAINER */
.login-container {
  display: flex;
  width: 100%;
  max-width: 1100px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  flex-wrap: wrap;
}

/* LEFT */
.login-left {
  flex: 1 1 50%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.auth-card {
  width: 100%;
  max-width: 350px;
}

.title {
  font-size: 32px;
  color: #1e40af;
  margin-bottom: 10px;
}

.auth-card h2 {
  margin-bottom: 20px;
}

/* INPUT */
input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* BUTTON */
button {
  width: 100%;
  padding: 12px;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

/* ERROR */
.error {
  color: red;
  margin-top: 10px;
}

/* RIGHT */
.login-right {
  flex: 1 1 50%;
  min-width: 300px;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* TABLET */
@media (max-width: 1024px) {
  .login-container {
    flex-direction: column;
  }

  .login-right {
    height: 250px;
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .login-left {
    padding: 20px;
  }

  .title {
    font-size: 24px;
  }
}

/* EXTRA SMALL */
@media (max-width: 480px) {
  .login-right {
    display: none;
  }
}
</style>