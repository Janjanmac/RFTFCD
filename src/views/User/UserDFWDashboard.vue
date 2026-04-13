<template>
  <div class="page-container">

    <!-- SIDEBAR -->
    <div :class="['sidebar', { open: sidebarOpen }]">
      <h2 class="sidebar-title">Menu</h2>
      <ul>
        <li><router-link to="/user-dashboard">Home</router-link></li>
        <li><router-link to="/user-masterlist">Masterlist</router-link></li>
        <li><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </div>

    <!-- MAIN PAGE -->
    <div :class="['page', { shifted: sidebarOpen }]">

      <!-- HEADER -->
      <div class="top-header">
        <button class="hamburger-btn" @click="toggleSidebar">&#9776;</button>
        <h1 class="header-title">
          LIST OF DEPUTIZED FISH WARDEN ({{ selectedYear }})
        </h1>
      </div>

      <!-- EMPTY -->
      <div v-if="records.length === 0" class="empty">
        No records found
      </div>

      <!-- TABLE -->
      <div v-else class="card record-card">

        <h2>{{ selectedProvince }} - {{ selectedMunicipality }}</h2>

        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>ID No</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Sex</th>
              <th>Issuance Date</th>
              <th>Expiration Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(r,index) in records" :key="r.firebaseId">
              <td>{{ index + 1 }}</td>
              <td>{{ r.idNo }}</td>
              <td>{{ r.lastName }}</td>
              <td>{{ r.firstName }}</td>
              <td>{{ r.middleName }}</td>
              <td>{{ r.sex }}</td>
              <td>{{ r.issuanceDate }}</td>
              <td>{{ r.expirationDate }}</td>
              <td>{{ r.status }}</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { db } from "@/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

// ROUTER
const route = useRoute()
const router = useRouter()

// SIDEBAR
const sidebarOpen = ref(false)
const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value

// DATA FROM ROUTE PARAMS ✅
const selectedYear = ref(route.params.year || "")
const selectedProvince = ref(route.params.province || "")
const selectedMunicipality = ref(route.params.municipality || "")

// RECORDS
const records = ref([])

// SESSION CHECK
const checkSession = () => {
  const user = JSON.parse(
    sessionStorage.getItem("user") ||
    localStorage.getItem("user")
  )

  if(!user || user.role !== "user"){
    router.replace("/login")
    return false
  }

  return true
}

// LOGOUT
const logout = () => {
  sessionStorage.clear()
  localStorage.clear()
  router.replace("/login")
}

// LOAD DATA (FIXED 🔥)
onMounted(async () => {

  if(!checkSession()) return

  try {

    const q = query(
      collection(db, "dfwRecords"),
      where("year", "==", selectedYear.value),
      where("province", "==", selectedProvince.value),
      where("municipality", "==", selectedMunicipality.value)
    )

    const snap = await getDocs(q)

    records.value = snap.docs.map(doc => ({
      ...doc.data(),
      firebaseId: doc.id
    }))

  } catch (error) {
    console.error("Error fetching data:", error)
  }

})
</script>

<style scoped>
.page-container { display:flex; font-family:Arial; }

/* SIDEBAR */
.sidebar { position:fixed; top:0; left:-250px; width:250px; height:100vh; background:white; padding:20px; transition:left .3s; }
.sidebar.open { left:0; }
.sidebar-title { font-size:22px; margin-bottom:20px; }
.sidebar ul { list-style:none; padding:0; }
.sidebar li { margin:15px 0; }
.sidebar a { text-decoration:none; font-size:20px; color:black; }

/* PAGE */
.page { flex:1; padding:25px; transition:margin-left .3s; }
.page.shifted { margin-left:250px; }

/* HEADER */
.top-header { display:flex; align-items:center; background:#114a86; color:white; padding:18px; border-radius:10px; position:relative; }
.header-title { position:absolute; left:50%; transform:translateX(-50%); font-size:26px; font-weight:700; }
.hamburger-btn { font-size:22px; background:#083c3f; color:white; border:none; padding:8px 12px; cursor:pointer; border-radius:6px; }

/* CARD */
.card { background:white; padding:20px; margin-top:20px; border-radius:12px; box-shadow:0 6px 12px rgba(0,0,0,.1); }

/* TABLE */
table { width:100%; border-collapse:collapse; }
th { background:#cfd8dc; padding:10px; }
td { padding:8px; border-bottom:1px solid #ddd; }

/* EMPTY */
.empty { padding:15px; background:#fff3cd; border-radius:8px; margin-top:10px; font-weight:bold; text-align:center; }
</style>