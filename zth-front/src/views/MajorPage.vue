<script setup>
import { ref, computed } from "vue";
import { useUrlStore } from "../stores/url";
import MajorItem from "../components/MajorItem.vue";

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
  console.log("store is", urlStore);
  console.log("api", urlStore.api);
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
  <div>
    <input
      type="text"
      v-model="filterName"
      placeholder="Filtrer par nom de filière"
    />

    <p>Page: {{ currentPage + 1 }}/{{ nbPages }}</p>

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
    <div v-if="loading">Loading</div>
    <div v-else class="majors">
      <div v-for="major in majorsFiltered">
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
}

.majors div {
  height: 10rem;
  background-color: rgb(156, 104, 156);
}
</style>
