<script setup>
import { useUrlStore } from "../stores/url";
import { useUserStore } from "../stores/user";
import { ref } from "vue";

const props = defineProps(["id", "name", "year"]);
// See if user is subscribe to
const urlStore = useUrlStore();
const userStore = useUserStore();
const sub = ref(0)
async function isSub(){
  return await fetch(urlStore.api + "/subscription/user/" + props.id, {
    credentials: 'include'
  }).then((Response)=>{
    return Response.json()
  }).then((data)=>{
    sub.value = data
  })
}
isSub()


async function desabonne(){
  await fetch(urlStore.api + "/subscription/delete/user/" + props.id, {
  credentials: 'include'
  })
  sub.value = false
}

async function abonne(){
  await fetch(urlStore.api + "/subscription", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: 'include',
    body: JSON.stringify({
	  "id_user": userStore.user.id_user,
    "id_major": props.id
  })
})
  sub.value = true
}
// TO DO :

// Ceci pourrait etre fait dans un store.
// vérifier si l'utilisateur est abonné a cette filiere
// mettre un bouton pour s'abonner
// mettre un bouton pour se désabonner
</script>
<template>
    <h3>{{ props.year }} - {{ props.name }}</h3>
    <button @click="abonne" v-if="!sub" class="modifier-button">S'abonner</button>
    <button @click="desabonne" v-else class="modifier-button">Se désabonner</button>
</template>


<style scoped>


.major{
  display:flex;
}
.modifier-button {
  float: right;
  background-color: #007BFF; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 10px 15px; /* Espacement interne du bouton */
  border: none; /* Supprimer la bordure du bouton */
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
  transition: background-color 0.3s; /* Ajouter une transition pour une animation fluide */
}

.modifier-button:hover {
  background-color: #0056b3;
}

</style>
