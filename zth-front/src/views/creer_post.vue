<template>
    <div class="affichage center-container" v-if="userStore.isLoggedIn">
      <h1>Créer un post</h1>
      <div>
        <input v-model="titre" placeholder="Titre du post" class="custom-input" required/>
        <button @click="envoi()" class="custom-button">Valider</button>
      </div>
    </div>
  </template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useUserStore } from "./../stores/user";
import { useRoute } from 'vue-router'
import { useUrlStore } from "../stores/url";

const urlStore = useUrlStore();
const route = useRoute()
const userStore = useUserStore();
const titre = ref("")
const id_course = ref(null)
const category = ref(null)
id_course.value = route.params.id_course
category.value = route.params.category
async function envoi(){
  if (titre.value!=""){
    await fetch(urlStore.api + "/post",{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        body: JSON.stringify({
	    "id_creator": userStore.user.id_user,
        "id_course": id_course.value,
        "title": titre.value,
        "category":category.value,
        "privacy":0,
        "published":0,
        "text":""
        })
    }).then((Response)=>{
        return Response.json()
    }).then((data)=>{
      router.push("/ecrire_post/" + data.id_post)
    })
  }
}

const flag = computed(()=>{
  return [route.params.id_course, route.params.category]
})

watch(flag, () => {
  id_course.value = route.params.id_course
  category.value = route.params.category
})
</script>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.custom-input {
  padding: 10px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.custom-button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.custom-button:hover {
  background-color: #45a049;
}
</style>