<template>
  <div class="page">

    <!-- HEADER -->
    <div class="header">
      <img src="@/assets/bfar-header.png" class="header-image" />
    </div>

    <!-- TITLE -->
    <div class="title-section">
      <h1>Fish Warden Public Search</h1>
      <p>MIMAROPA Region</p>
    </div>

    <!-- DASHBOARD -->
    <div class="dashboard">

      <div class="card">

        <h2>Select Location</h2>

        <!-- YEAR -->
        <label>Fiscal Year</label>
        <select v-model="selectedYear">
          <option value="">Select Year</option>
          <option v-for="year in years" :key="year">
            {{ year }}
          </option>
        </select>

        <!-- PROVINCE -->
        <label>Province</label>
        <select v-model="selectedProvince" @change="filterMunicipalities">
          <option value="">Select Province</option>
          <option v-for="province in provinces" :key="province">
            {{ province }}
          </option>
        </select>

        <!-- MUNICIPALITY -->
        <label>Municipality</label>
        <select v-model="selectedMunicipality">
          <option value="">Select Municipality</option>
          <option v-for="mun in filteredMunicipalities" :key="mun">
            {{ mun }}
          </option>
        </select>

        <!-- BUTTON -->
        <button
          @click="enterDashboard"
          :disabled="!selectedYear || !selectedProvince || !selectedMunicipality"
        >
          View Fish Wardens
        </button>

      </div>

    </div>

  </div>
</template>

<script>
export default {

data(){
return{

years:[
"2023",
"2024",
"2025",
"2026",
"2027",
"2028",
"2029",
"2030"
],

provinces:[
"Occidental Mindoro",
"Oriental Mindoro",
"Marinduque",
"Romblon",
"Palawan"
],

municipalities:{

"Occidental Mindoro":[
"Mamburao","Sablayan","San Jose","Looc","Calintaan",
"Abra de Ilog","Lubang","Magsaysay","Paluan","Rizal","Sta. Cruz"
],

"Oriental Mindoro":[
"Calapan City","Baco","San Teodoro","Puerto Galera",
"Naujan","Victoria","Pola","Socorro","Pinamalayan",
"Gloria","Bansud","Bongabong","Roxas","Mansalay","Bulalacao"
],

"Marinduque":[
"Boac","Mogpog","Gasan","Torrijos","Buenavista","Santa Cruz"
],

"Romblon":[
"Romblon","Odiongan","San Jose","Ferrol","Alcantara",
"Banton","Cajidiocan","Calatrava","Concepcion","Corcuera",
"Looc","Magdiwang","San Agustin","San Andres",
"San Fernando","Santa Fe","Santa Maria"
],

"Palawan":[
"Puerto Princesa","El Nido","Coron","Aborlan","Agutaya",
"Araceli","Balabac","Bataraza","Brooke's Point",
"Busuanga","Cagayancillo","Culion","Cuyo","Dumaran",
"Kalayaan","Linapacan","Magsaysay","Narra","Quezon",
"Rizal","Roxas","San Vicente","Sofronio Española","Taytay"
]

},

selectedYear:"",
selectedProvince:"",
selectedMunicipality:"",
filteredMunicipalities:[]

}
},

mounted() {
  // 🔒 BLOCK BACK BUTTON
  window.history.pushState(null, null, window.location.href)
  window.onpopstate = function () {
    window.history.pushState(null, null, window.location.href)
  }
},

methods:{

filterMunicipalities(){

if(this.selectedProvince){

this.filteredMunicipalities =
this.municipalities[this.selectedProvince]

this.selectedMunicipality=""

}else{

this.filteredMunicipalities=[]

}

},

enterDashboard(){

if(!this.selectedYear || !this.selectedProvince || !this.selectedMunicipality){

alert("Please select Year, Province and Municipality")
return

}

let routeName=""

if(this.selectedYear==="2023"){
routeName="UserDFWDashboard"
}
else if(this.selectedYear==="2024"){
routeName="UserDFW2024"
}
else if(this.selectedYear==="2025"){
routeName="UserDFW2025"
}
else if(this.selectedYear==="2026"){
routeName="UserDFW2026"
}
else if(this.selectedYear==="2027"){
routeName="UserDFW2027"
}
else if(this.selectedYear==="2028"){
routeName="UserDFW2028"
}
else if(this.selectedYear==="2029"){
routeName="UserDFW2029"
}
else if(this.selectedYear==="2030"){
routeName="UserDFW2030"
}

this.$router.push({
name:routeName,
params: {
year:this.selectedYear,
province:this.selectedProvince,
municipality:this.selectedMunicipality
}
})

}

}

}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg,#d8e7ff,#eff6ff);
  padding: 0 10px 30px;
  box-sizing: border-box;
}

/* HEADER */
.header {
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg,#5c9bfa,#f4f7fb);
}

.header-image {
  width: 100%;
  max-height: 220px;
  object-fit: contain;
}

/* TITLE */
.title-section {
  text-align: center;
  margin-top: 15px;
  padding: 0 10px;
}

.title-section h1 {
  font-size: clamp(1.5rem, 4vw, 2.3rem);
  font-weight: 900;
}

.title-section p {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #444;
}

/* DASHBOARD */
.dashboard {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  padding: 0 10px;
}

/* CARD */
.card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: clamp(15px, 4vw, 25px);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  margin: 0 auto;
}

/* TEXT */
.card h2 {
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  margin-bottom: clamp(8px, 2vw, 15px);
  text-align: center;
}

/* LABEL */
label {
  display: block;
  margin-top: clamp(8px, 2vw, 12px);
  font-weight: bold;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
}

/* SELECT */
select {
  width: 100%;
  padding: clamp(8px, 2vw, 12px);
  margin-top: 5px;
  margin-bottom: clamp(8px, 2vw, 15px);
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;
}

select:focus {
  outline: none;
  border-color: #5ca5ff;
  box-shadow: 0 0 0 2px rgba(92, 165, 255, 0.2);
}

/* BUTTON */
button {
  width: 100%;
  padding: clamp(10px, 3vw, 14px);
  border: none;
  background: #5ca5ff;
  color: white;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  margin-top: clamp(5px, 2vw, 10px);
}

button:hover {
  background: #084a9a;
}

button:disabled {
  background: #aaa;
}

/* MOBILE */
@media (max-width: 768px) {
  .page {
    padding: 0 5px 20px;
  }

  .header-image {
    max-height: 120px;
  }

  .title-section {
    margin-top: 10px;
  }

  .dashboard {
    margin-top: 15px;
    padding: 0 5px;
  }

  .card {
    padding: 15px;
    border-radius: 10px;
  }

  button {
    font-size: 0.9rem;
    padding: 10px;
  }
}

/* SMALL MOBILE */
@media (max-width: 480px) {
  .header-image {
    max-height: 100px;
  }

  .title-section h1 {
    font-size: 1.3rem;
  }

  .title-section p {
    font-size: 0.9rem;
  }

  .card {
    padding: 12px;
    border-radius: 8px;
  }

  .card h2 {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  label {
    font-size: 0.8rem;
    margin-top: 6px;
  }

  select {
    padding: 8px;
    font-size: 0.8rem;
  }

  button {
    padding: 8px;
    font-size: 0.85rem;
  }
}

/* LARGE SCREENS */
@media (min-width: 1200px) {
  .card {
    max-width: 450px;
    padding: 30px;
  }

  .card h2 {
    font-size: 1.4rem;
  }

  select {
    padding: 14px;
    font-size: 1rem;
  }

  button {
    padding: 16px;
    font-size: 1.1rem;
  }
}
</style>