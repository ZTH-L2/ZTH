<script setup>
import { ref, computed } from "vue";
import { useUrlStore } from "../stores/url";
import MajorItem from "../components/MajorItem.vue";
import { useUserStore } from "./../stores/user";

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
  currentPage.value = currentPage.value + (1 % nbPages.value);
}

function previousPage() {
  currentPage.value = currentPage.value - (1 % nbPages.value);
}

get_all_majors();

const majorsFiltered = computed(() => {
  return majors.value
    .slice(
      currentPage.value * amountPerPage.value,
      (currentPage.value + 1) * amountPerPage.value
    )
    .filter(
      (el, i) =>
        el.name.includes(filterName.value) &&
        el.year.toUpperCase().includes(filterYear.value)
    );
});
</script>

<template>
  <div v-if="userStore.isLoggedIn">
    <div class="header">
      <input
        type="text"
        v-model="filterName"
        placeholder="Filtrer par nom de filière"
      />

      <p v-if="nbPages > 0">Page: {{ currentPage + 1 }}/{{ nbPages }}</p>
      <p v-else>Page: 1/1</p>
      <button @click="nextPage">Page suivante</button>
      <button @click="previousPage">Page précédente</button>

      <select v-model="filterYear">
        <option disabled value="">Année</option>
        <option value="">Toutes</option>
        <option>L1</option>
        <option>L2</option>
        <option>L3</option>
        <option>M1</option>
        <option>M2</option>
      </select>
    </div>
    <div v-if="loading">Loading</div>
    <div v-else class="majors">
      <div v-for="major in majorsFiltered" :key="major.id_major">
        <MajorItem
          :id="major.id_major"
          :name="major.name"
          :year="major.year"
        ></MajorItem>
      </div>
    </div>
  </div>
</template>

<style>
.majors {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px; /* Ajout d'un espacement entre les éléments */
  place-items: center; /* Centrage des éléments */
}

.header {
  margin-bottom: 20px;
}


.majors div {
  background-color: rgb(186, 134, 186); /* Couleur de fond légèrement modifiée */
  padding: 20px; /* Ajout de rembourrage pour un look plus esthétique */
}
</style>