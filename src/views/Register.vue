<template>
  <div class="auth-page">
    <!-- Background Design -->
    <div class="bg-overlay"></div>

    <!-- Form Card -->
    <div class="auth-container">
      <h2>Create Account</h2>
      <p class="subtitle">Sign up to get started 🚀</p>

      <form @submit.prevent="registerUser">
        <div class="input-group">
          <input v-model="email" type="email" required />
          <label>Email</label>
        </div>

        <div class="input-group">
          <input v-model="password" type="password" required />
          <label>Password</label>
        </div>

        <div class="input-group">
          <input v-model="confirmPassword" type="password" required />
          <label>Confirm Password</label>
        </div>

        <button type="submit">Register</button>
      </form>

      <p class="switch">
        Already have an account?
        <router-link to="/login">Login here</router-link>
      </p>

      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref("");

    const registerUser = async () => {
      error.value = "";

      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match!";
        return;
      }

      try {
        await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        alert("Registration Successful!");
        window.location.href = "/login";
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, confirmPassword, registerUser, error };
  },
};
</script>

<style scoped>
/* PAGE BACKGROUND */
.auth-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  position: relative;
  padding: 20px;
}

/* GLASS EFFECT OVERLAY */
.bg-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
}

/* FORM CARD */
.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
}

/* TITLE */
.auth-container h2 {
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  margin-bottom: 20px;
  opacity: 0.8;
}

/* INPUT GROUP */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
}

/* FLOATING LABEL */
.input-group label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #ddd;
  font-size: 13px;
  pointer-events: none;
  transition: 0.3s;
}

/* FLOAT EFFECT */
.input-group input:focus + label,
.input-group input:valid + label {
  top: -8px;
  left: 10px;
  font-size: 11px;
  color: #fff;
}

/* BUTTON */
button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #ffffff;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #f1f1f1;
  transform: scale(1.03);
}

/* SWITCH TEXT */
.switch {
  margin-top: 15px;
  font-size: 13px;
}

.switch a {
  color: #fff;
  font-weight: bold;
  text-decoration: underline;
}

/* ERROR */
.error {
  margin-top: 10px;
  color: #ff4d4d;
  font-size: 13px;
}

/* RESPONSIVE */
@media (max-width: 480px) {
  .auth-container {
    padding: 20px;
  }

  .auth-container h2 {
    font-size: 20px;
  }
}
</style>