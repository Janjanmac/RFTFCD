<template>
  <div class="page-container">

    <!-- SIDEBAR -->
    <div :class="['sidebar', { open: sidebarOpen }]">
      <h2 class="sidebar-title">Menu</h2>
      <ul>
        <router-link to="/2024">Masterlist</router-link>
        <li><router-link to="/DFWArchiveDashboard">DFW Archive</router-link></li>
        <li><router-link to="/Dashboard">Back</router-link></li>
         <li><a href="#" @click="logout" class="logout-link">Logout</a></li>
      </ul>
    </div>

    <!-- MAIN PAGE -->
    <div :class="['page', { shifted: sidebarOpen }]">

      <!-- HEADER -->
      <div class="top-header">
        <button class="hamburger-btn" @click="toggleSidebar">&#9776;</button>
        <h1 class="header-title">LIST OF DEPUTIZED FISH WARDEN (2023)</h1>
      </div>

      <!-- TOGGLE BUTTON -->
      <div class="form-toggle">
        <button class="toggle-btn" @click="showForm = !showForm">
          {{ showForm ? "Hide Form ▲" : "Add New Record ▼" }}
        </button>
      </div>

      <!-- ADD / EDIT FORM -->
      <div v-show="showForm" class="card form">
        <input v-model="form.province" placeholder="Province" @input="form.province = form.province.toUpperCase()" />
        <input v-model="form.municipality" placeholder="Municipality" @input="form.municipality = form.municipality.toUpperCase()" />
        <input v-model="form.idNo" placeholder="ID No" @input="form.idNo = form.idNo.toUpperCase()" />
        <input v-model="form.lastName" placeholder="Last Name" @input="form.lastName = form.lastName.toUpperCase()" />
        <input v-model="form.firstName" placeholder="First Name" @input="form.firstName = form.firstName.toUpperCase()" />
        <input v-model="form.middleName" placeholder="Middle Name" @input="form.middleName = form.middleName.toUpperCase()" />
        <input v-model="form.sex" placeholder="Sex" @input="form.sex = form.sex.toUpperCase()" />
        <input v-model="form.issuanceDate" type="text" placeholder="Issuance Date" />
        <input v-model="form.expirationDate" type="text" placeholder="Expiration Date" />
        <input v-model="form.status" placeholder="Status" @input="form.status = form.status.toUpperCase()" />

        <div class="form-buttons">
          <button @click="saveRecord">
            {{ editIndex === null ? "Add Record" : "Update Record" }}
          </button>
        </div>
      </div>

      <!-- PROVINCE LOOP -->
      <div v-for="(municipalities, province) in groupedData" :key="province" class="province">
        <h2 class="province-title">{{ province }}</h2>

        <div v-if="Object.keys(municipalities).length === 0" class="empty">
          No records yet
        </div>

        <div v-else v-for="(rows, municipality) in municipalities" :key="municipality" class="card record-card">
          <h3 class="municipality-title">{{ municipality }}</h3>

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
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(r,index) in rows" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ r.idNo }}</td>
                <td>{{ r.lastName }}</td>
                <td>{{ r.firstName }}</td>
                <td>{{ r.middleName }}</td>
                <td>{{ r.sex }}</td>
                <td>{{ r.issuanceDate }}</td>
                <td>{{ r.expirationDate }}</td>
                <td>{{ r.status }}</td>
                <td>
                  <button @click="editRecord(r)">Edit</button>
                  <button @click="archiveRecord(r)">Archive</button>
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { db } from "@/firebase"
import { collection, addDoc, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore"

const route = useRoute()
const router = useRouter()

const sidebarOpen = ref(false)
const showForm = ref(false)

const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value

/* 🔐 SESSION CHECK */
function checkSession(){

  const user = JSON.parse(
    sessionStorage.getItem("user") ||
    localStorage.getItem("user")
  )

  if(!user){
    router.replace("/login")
    return false
  }

  if(user.role !== "admin"){
    router.replace("/login")
    return false
  }

  return true
}

/* 🔐 LOGOUT */
function logout(){

  sessionStorage.clear()
  localStorage.clear()

  router.replace("/login")

}

const selectedProvince = ref(route.query.province || "")
const selectedMunicipality = ref(route.query.municipality || "")

const STORAGE_KEY = "main-dashboard-dfw-records"
const records = ref([])
const editIndex = ref(null)

const form = ref({
  province:"",
  municipality:"",
  idNo:"",
  lastName:"",
  firstName:"",
  middleName:"",
  sex:"",
  issuanceDate:"",
  expirationDate:"",
  status:""
})

/* LOAD DATA */
onMounted(async()=>{

  /* 🔐 PREVENT BACK BUTTON */
  window.history.pushState(null,null,window.location.href)
  window.onpopstate = function(){
    window.history.pushState(null,null,window.location.href)
  }

  if(!checkSession()) return

  const snap = await getDocs(collection(db,"dfwRecords"))

  if(!snap.empty){
    records.value = snap.docs.map(d=>({
      ...d.data(),
      firebaseId:d.id
    }))
    localStorage.setItem(STORAGE_KEY,JSON.stringify(records.value))
  }else{
    const saved = localStorage.getItem(STORAGE_KEY)
    if(saved) records.value = JSON.parse(saved)
  }

  if(route.query.province)
    selectedProvince.value = route.query.province.toUpperCase()

  if(route.query.municipality)
    selectedMunicipality.value = route.query.municipality.toUpperCase()

})

watch(records,val=>{
  localStorage.setItem(STORAGE_KEY,JSON.stringify(val))
},{deep:true})

/* SAVE RECORD */
async function saveRecord(){

  const newRecord = {}

  Object.keys(form.value).forEach(k=>{
    newRecord[k] =
      typeof form.value[k]==="string"
      ? form.value[k].toUpperCase()
      : form.value[k]
  })

  if(editIndex.value !== null){

    const existing = records.value[editIndex.value]

    if(existing.firebaseId){
      await setDoc(doc(db,"dfwRecords",existing.firebaseId), newRecord)
    }

    records.value[editIndex.value] = {
      ...newRecord,
      firebaseId: existing.firebaseId
    }

    editIndex.value = null

  }else{

    const docRef = await addDoc(collection(db,"dfwRecords"), newRecord)

    newRecord.firebaseId = docRef.id

    records.value.push(newRecord)

  }

  resetForm()

}

/* GROUP DATA */
const groupedData = computed(()=>{

  const g = {}

  const filtered = records.value.filter(r=>{

    if(!selectedProvince.value && !selectedMunicipality.value)
      return true

    return(
      (!selectedProvince.value || r.province === selectedProvince.value) &&
      (!selectedMunicipality.value || r.municipality === selectedMunicipality.value)
    )

  })

  filtered.forEach(r=>{

    if(!g[r.province]) g[r.province] = {}

    if(!g[r.province][r.municipality])
      g[r.province][r.municipality] = []

    g[r.province][r.municipality].push(r)

  })

  const sorted = {}

  Object.keys(g)
  .sort((a,b)=>a.localeCompare(b))
  .forEach(prov=>{

    const muni = g[prov]

    sorted[prov] = Object.keys(muni)
      .sort((a,b)=>a.localeCompare(b))
      .reduce((acc,m)=>{

        acc[m] = muni[m]
          .slice()
          .sort((a,b)=>a.lastName.localeCompare(b.lastName))

        return acc

      },{})

  })

  return sorted

})

/* EDIT */
function editRecord(row){

  editIndex.value = records.value.indexOf(row)

  form.value = {...row}

  showForm.value = true

}

/* ARCHIVE */
async function archiveRecord(row){

  const { firebaseId, ...data } = row

  await addDoc(collection(db,"dfwArchivedRecords"), data)

  if(firebaseId)
    await deleteDoc(doc(db,"dfwRecords",firebaseId))

  const i = records.value.indexOf(row)

  if(i>-1) records.value.splice(i,1)

}

/* RESET */
function resetForm(){

  form.value = {
    province:"",
    municipality:"",
    idNo:"",
    lastName:"",
    firstName:"",
    middleName:"",
    sex:"",
    issuanceDate:"",
    expirationDate:"",
    status:""
  }

}
</script>

<style scoped>
.page-container{
  display:flex;
  font-family:Arial, Helvetica, sans-serif;
}

/* SIDEBAR */
.sidebar{ 
  position:fixed;
  top:0;
  left:-260px;
  width:260px;
  height:100vh;
  background:#ffffff00;
  padding:20px;
  transition:left .3s;
  z-index:1000;
}

.sidebar.open{ left:0; }

.sidebar-title{ font-size:1.3rem; margin-bottom:15px; }
.sidebar ul{ list-style:none; padding:0; }
.sidebar li{ margin:10px 0; }

.sidebar a{
  text-decoration:none;
  font-size:1.1rem;
  color:black;
}

.sidebar a.logout-link { color: #d32f2f; }

/* MAIN PAGE */
.page{
  flex:1;
  padding:20px;
  transition:margin-left .3s;
}

.page.shifted{ margin-left:260px; }

/* HEADER */
.top-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  background:#114a86;
  color:white;
  padding:15px;
  border-radius:10px;
}

.header-title{
  font-size:clamp(1.2rem, 2.5vw, 2rem);
  font-weight:700;
  text-align:center;
  flex:1;
}

.hamburger-btn{
  font-size:1.5rem;
  background:#083c3f;
  color:white;
  border:none;
  padding:8px 12px;
  cursor:pointer;
  border-radius:6px;
}

/* FORM TOGGLE */
.form-toggle{ margin-top:15px; }

.toggle-btn{
  padding:10px 16px;
  font-size:1rem;
  background:#114a86;
  color:white;
  border:none;
  border-radius:8px;
  cursor:pointer;
}

/* CARD */
.card{
  background:white;
  padding:20px;
  margin-top:20px;
  border-radius:12px;
  box-shadow:0 5px 10px rgba(0,0,0,.1);
}

/* FORM GRID */
.form{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(180px,1fr));
  gap:12px;
}

.form input{
  padding:10px;
  font-size:0.95rem;
}

.form-buttons{
  grid-column:1/-1;
}

.form button{
  padding:12px;
  font-size:1rem;
  background:#114a86;
  color:white;
  border:none;
  border-radius:6px;
}

/* TITLES */
.province-title{
  margin-top:25px;
  background:#083c3f;
  color:white;
  padding:10px;
  font-size:clamp(1.2rem,2vw,1.5rem);
  border-radius:8px;
}

.municipality-title{
  margin-bottom:10px;
  font-size:1.2rem;
}

/* TABLE RESPONSIVE */
.record-card{
  overflow-x:auto; /* 🔥 IMPORTANT */
}

.record-card table{
  width:100%;
  border-collapse:collapse;
  font-size:0.9rem;
  min-width:700px; /* para hindi siksikan */
}

.record-card th{
  background:#cfd8dc;
  padding:10px;
}

.record-card td{
  padding:8px;
  border-bottom:1px solid #ddd;
}

.record-card button{
  padding:6px 10px;
  font-size:0.8rem;
  margin:2px;
  border:none;
  border-radius:4px;
  cursor:pointer;
}

.record-card button:first-child{
  background:#0b68a5;
  color:white;
}

.record-card button:last-child{
  background:#f44336;
  color:white;
}

.empty{
  padding:10px;
  background:#fff3cd;
  border-radius:8px;
  margin-top:10px;
}

/* 📱 MOBILE FIX */
@media (max-width:768px){

  .page{
    padding:10px;
  }

  .page.shifted{
    margin-left:0; /* wag na i-push sa mobile */
  }

  .header-title{
    font-size:1rem;
  }

  .sidebar{
    width:220px;
  }

}
</style>
