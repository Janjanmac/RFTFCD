// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

// 🔒 1️⃣ Block browser back button
window.history.pushState(null, null, window.location.href)
window.onpopstate = function () {
  window.history.pushState(null, null, window.location.href)
}

// 🔒 2️⃣ Block page refresh (F5 / Ctrl+R / Cmd+R)
window.addEventListener('keydown', function (e) {
  if (
    e.key === 'F5' ||              // F5 key
    (e.ctrlKey && e.key === 'r') || // Ctrl+R
    (e.metaKey && e.key === 'r')     // Cmd+R (Mac)
  ) {
    e.preventDefault()
  }
})

// 🔒 3️⃣ Block page leave (Strong Protection)
window.addEventListener('beforeunload', function (e) {
  e.preventDefault()
  e.returnValue = '' // Magpapakita ng default confirmation dialog
})

app.mount('#app')