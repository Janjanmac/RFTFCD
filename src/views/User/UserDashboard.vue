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
  data() {
    return {
      years: ["2023","2024","2025","2026","2027","2028","2029","2030"],
      provinces: ["Occidental Mindoro","Oriental Mindoro","Marinduque","Romblon","Palawan"],
      municipalities: {
        "Occidental Mindoro":["Mamburao","Sablayan","San Jose","Looc","Calintaan","Abra de Ilog","Lubang","Magsaysay","Paluan","Rizal","Sta. Cruz"],
        "Oriental Mindoro":["Calapan City","Baco","San Teodoro","Puerto Galera","Naujan","Victoria","Pola","Socorro","Pinamalayan","Gloria","Bansud","Bongabong","Roxas","Mansalay","Bulalacao"],
        "Marinduque":["Boac","Mogpog","Gasan","Torrijos","Buenavista","Santa Cruz"],
        "Romblon":["Romblon","Odiongan","San Jose","Ferrol","Alcantara","Banton","Cajidiocan","Calatrava","Concepcion","Corcuera","Looc","Magdiwang","San Agustin","San Andres","San Fernando","Santa Fe","Santa Maria"],
        "Palawan":["Puerto Princesa","El Nido","Coron","Aborlan","Agutaya","Araceli","Balabac","Bataraza","Brooke's Point","Busuanga","Cagayancillo","Culion","Cuyo","Dumaran","Kalayaan","Linapacan","Magsaysay","Narra","Quezon","Rizal","Roxas","San Vicente","Sofronio Española","Taytay"]
      },
      selectedYear: "",
      selectedProvince: "",
      selectedMunicipality: "",
      filteredMunicipalities: []
    }
  },
  mounted() {
    window.history.pushState(null, null, window.location.href)
    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href)
    }
  },
  methods: {
    filterMunicipalities() {
      if(this.selectedProvince){
        this.filteredMunicipalities = this.municipalities[this.selectedProvince]
        this.selectedMunicipality=""
      } else {
        this.filteredMunicipalities=[]
      }
    },
    enterDashboard() {
      if(!this.selectedYear || !this.selectedProvince || !this.selectedMunicipality){
        alert("Please select Year, Province and Municipality")
        return
      }

      let routeName = "UserDFWDashboard" // default
      if(this.selectedYear !== "2023"){
        routeName = `UserDFW${this.selectedYear}`
      }

      this.$router.push({
        name: routeName,
        query:{
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
  min-height: 90vh;
  background: linear-gradient(135deg,#d8e7ff,#eff6ff);
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* HEADER */
.header {
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg,#5c9bfa,#f4f7fb);
}

.header-image {
  width: 90%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
  margin: auto;
  display: block;
  padding: 10px 0;
}

/* TITLE */
.title-section {
  text-align: center;
  margin-top: 15px;
  padding: 0 10px;
}

.title-section h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 900;
  margin-bottom: 5px;
}

.title-section p {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: #444;
}

/* DASHBOARD */
.dashboard {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
  margin-top: 25px;
}

/* CARD */
.card {
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

/* TEXT */
.card h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

/* LABEL */
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  font-size: 0.95rem;
}

/* SELECT */
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 12px;
  font-size: 0.95rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* BUTTON */
button {
  width: 100%;
  padding: 12px;
  border: none;
  background: #5ca5ff;
  color: white;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #084a9a;
}

button:disabled {
  background: #aaa;
}

/* 📱 MOBILE */
@media (max-width: 768px) {

  .header-image {
    max-width: 90%;
    max-height: 150px;
  }

  .card {
    padding: 15px;
  }

  button {
    font-size: 0.9rem;
    padding: 10px;
  }

  .title-section h1 {
    font-size: clamp(1.2rem, 5vw, 1.8rem);
  }

  .title-section p {
    font-size: clamp(0.9rem, 4vw, 1.1rem);
  }
}
</style>