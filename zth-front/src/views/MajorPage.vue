<script setup>
import { ref, computed } from "vue";
import { useUrlStore } from "../stores/url";
import MajorItem from "../components/MajorItem.vue";
import { useUserStore } from "./../stores/user";
const userStore = useUserStore();
const urlStore = useUrlStore();
const majors = ref([]);
const loading = ref(false);
const currentPage = ref(0);
const nbPages = ref(0);
const amountPerPage = ref(6);
const filterName = ref("");
const filterYear = ref("");


async function get_all_majors() {
  loading.value = true;

  let res = await fetch(urlStore.api + "/major").then((resp) => {
    return resp.json();
  });
  res.forEach((el) => {
    majors.value.push({
      id_major: el[0],
      name: el[1],
      year: el[2],
    });
  });
  nbPages.value = Math.ceil(majors.value.length / amountPerPage.value);

  loading.value = false;
}

function nextPage() {
  let m = filterName.value =="" && filterYear.value =="" ? nbPages.value : nbPageFiltered.value
  currentPage.value = (currentPage.value + 1 )% m;
}

function previousPage() {
  let m = filterName.value =="" && filterYear.value =="" ? nbPages.value : nbPageFiltered.value
  currentPage.value = (((currentPage.value - 1 ) % m) + m) % m;
}
  
get_all_majors();

const majorsFiltered = computed(() => {
  return majors.value
    .filter(
      (el, i) =>
        el.name.toUpperCase().includes(filterName.value.toUpperCase()) &&
        el.year.toUpperCase().includes(filterYear.value)
    )
    .slice(
      currentPage.value * amountPerPage.value,
      (currentPage.value + 1) * amountPerPage.value
    );
});

const nbPageFiltered = computed(()=>{
  return Math.floor(majorsFiltered.value.length / amountPerPage.value) + 1
})

</script>

<template>
  <div v-if="userStore.isLoggedIn" class="major-page">
    <div class="header">
      <div class="filter">
        <select v-model="filterYear">
          <option disabled value="">Année</option>
          <option value="">Toutes</option>
          <option>L1</option>
          <option>L2</option>
          <option>L3</option>
          <option>M1</option>
          <option>M2</option>
        </select>

        <input
        type="text"
        v-model="filterName"
        placeholder="Filtrer par nom de filière"
        />
      </div>
      

      <div class="page-data" v-if="nbPages > 0">
        <button class="page-button" @click="previousPage">Page précédente</button>
        <p>{{ currentPage + 1 }}/{{ filterName=="" && filterYear=="" ? nbPages : nbPageFiltered }}</p>
        <button class="page-button" @click="nextPage">Page suivante</button>
      </div>
    </div>

    <div v-if="loading">Loading</div>
    <div v-else class="majors">
      <div v-for="major in majorsFiltered" :key="major.id_major" class="major">
        <MajorItem
          :id="major.id_major"
          :name="major.name"
          :year="major.year"
        ></MajorItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
.major-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.majors {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* 168p is the width of a major */
  max-width: calc(15rem * 3);

  /*
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  place-items: center; */
}
.major{
  display: flex;
  align-items: center;
  flex-direction: column
}
.header {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.filter select {
  margin-right: 0.5rem;
  text-align: center;
  text-decoration: none;
}

.filter input {
  margin-left: 0.5rem;
  text-align: center;
}

.filter input::placeholder{
  font-style: italic;
  text-align: center;
}

.majors div {
  /* background-color: #ff6b35; */
  padding: 20px;
}


.page-data {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
}

.page-button {
    background-color: #673AB7; /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid #673AB7;
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
.page-button:hover {
    border: 1px solid #673AB7;
    background-color: white;
    color: #673AB7; /* Couleur du texte du bouton */
}

.page-data button {
    width: 10rem;
}

.page-data p {
  text-align: center;
  width: 5rem;
}

</style>