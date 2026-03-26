<template>
  <div class="page-container">

    <!-- SIDEBAR -->
    <div :class="['sidebar', { open: sidebarOpen }]">
      <h2 class="sidebar-title">Menu</h2>
      <ul>
        <li><router-link to="/2024">Masterlist</router-link></li>
        <li><router-link to="/DFWArchive2028">DFW Archive</router-link></li>
        <li><router-link to="/Dashboard">Back</router-link></li>
        <li><router-link to="/login">Logout</router-link></li>
      </ul>
    </div>

    <!-- MAIN PAGE -->
    <div :class="['page', { shifted: sidebarOpen }]">

      <!-- HEADER -->
      <div class="top-header">
        <button class="hamburger-btn" @click="toggleSidebar">&#9776;</button>
        <h1 class="header-title">LIST OF DEPUTIZED FISH WARDEN (2028)</h1>
      </div>

      <!-- TOGGLE FORM BUTTON -->
      <div class="form-toggle">
        <button class="toggle-btn" @click="showForm = !showForm">
          {{ showForm ? "Hide Form ▲" : "Add New Record ▼" }}
        </button>
      </div>

      <!-- FORM -->
      <div v-show="showForm" class="card form">
        <input v-model="form.province" placeholder="Province" @input="form.province=form.province.toUpperCase()" />
        <input v-model="form.municipality" placeholder="Municipality" @input="form.municipality=form.municipality.toUpperCase()" />
        <input v-model="form.idNo" placeholder="ID No" @input="form.idNo=form.idNo.toUpperCase()" />
        <input v-model="form.lastName" placeholder="Last Name" @input="form.lastName=form.lastName.toUpperCase()" />
        <input v-model="form.firstName" placeholder="First Name" @input="form.firstName=form.firstName.toUpperCase()" />
        <input v-model="form.middleName" placeholder="Middle Name" @input="form.middleName=form.middleName.toUpperCase()" />
        <input v-model="form.sex" placeholder="Sex" @input="form.sex=form.sex.toUpperCase()" />
        <input v-model="form.issuanceDate" placeholder="Issuance Date" />
        <input v-model="form.expirationDate" placeholder="Expiration Date" />
        <input v-model="form.status" placeholder="Status" @input="form.status=form.status.toUpperCase()" />

        <div class="form-buttons">
          <button @click="saveRecord">
            {{ editIndex === null ? "Add Record" : "Update Record" }}
          </button>
        </div>
      </div>

      <!-- DATA -->
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
import { ref, computed, onMounted, watch } from "vue"
import { useRoute } from "vue-router"
import { db } from "@/firebase"
import { collection, getDocs, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore"

const route = useRoute()
const sidebarOpen = ref(false)
const toggleSidebar = () => sidebarOpen.value = !sidebarOpen.value
const showForm = ref(false)
const form = ref({province:"", municipality:"", idNo:"", lastName:"", firstName:"", middleName:"", sex:"", issuanceDate:"", expirationDate:"", status:""})
const editIndex = ref(null)
const selectedProvince = ref(route.query.province?.toUpperCase() || "")
const selectedMunicipality = ref(route.query.municipality?.toUpperCase() || "")
const selectedYear = ref(route.query.year || "")
watch(() => route.query, (newQuery) => {
  selectedProvince.value = newQuery.province?.toUpperCase() || ""
  selectedMunicipality.value = newQuery.municipality?.toUpperCase() || ""
  selectedYear.value = newQuery.year || ""
})
const records = ref([])
onMounted(async () => {
  const snap = await getDocs(collection(db,"dfwRecords2028"))
  records.value = snap.docs.map(d => ({...d.data(), firebaseId: d.id})).filter(r => r.status !== "ARCHIVED")
})
async function saveRecord() {
  const newRecord = {}
  Object.keys(form.value).forEach(k => newRecord[k] = typeof form.value[k] === "string" ? form.value[k].toUpperCase() : form.value[k])
  if(editIndex.value !== null){
    const existing = records.value[editIndex.value]
    await setDoc(doc(db,"dfwRecords2028",existing.firebaseId), newRecord)
    records.value[editIndex.value] = {...newRecord, firebaseId: existing.firebaseId}
    editIndex.value = null
  } else {
    const docRef = await addDoc(collection(db,"dfwRecords2028"), newRecord)
    newRecord.firebaseId = docRef.id
    records.value.push(newRecord)
  }
  resetForm()
}
function editRecord(row){ editIndex.value = records.value.indexOf(row); form.value = {...row}; showForm.value = true }
async function archiveRecord(row){
  const { firebaseId, ...data } = row
  await addDoc(collection(db,"DFWArchive2028"), {...data, status:"ARCHIVED"})
  if(firebaseId) await deleteDoc(doc(db,"dfwRecords2028",firebaseId))
  const i = records.value.indexOf(row); if(i > -1) records.value.splice(i,1)
}
function resetForm(){ form.value = {province:"", municipality:"", idNo:"", lastName:"", firstName:"", middleName:"", sex:"", issuanceDate:"", expirationDate:"", status:""} }
const groupedData = computed(() => {
  const g = {}
  const filtered = records.value.filter(r =>
    (!selectedProvince.value || r.province === selectedProvince.value) &&
    (!selectedMunicipality.value || r.municipality === selectedMunicipality.value)
  )
  filtered.forEach(r => { if(!g[r.province]) g[r.province] = {}; if(!g[r.province][r.municipality]) g[r.province][r.municipality] = []; g[r.province][r.municipality].push(r) })
  const sorted = {}
  Object.keys(g).forEach(prov => { const muni = g[prov]; if(Object.keys(muni).length>0){ sorted[prov]={}; Object.keys(muni).sort((a,b)=>a.localeCompare(b)).forEach(m=>{sorted[prov][m]=muni[m].sort((a,b)=>a.lastName.localeCompare(b.lastName))}) } })
  return sorted
})
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