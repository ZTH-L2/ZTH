<template>
    <div>
        Créer un post
        <div>
            <input v-model="titre" placeholder="titre du post" />
            <button @click="envoi()">valider</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useUserStore } from "./../stores/user";
import { useRoute } from 'vue-router'
const route = useRoute()
const userStore = useUserStore();
console.log("l'id de l'utilisateur est : ", userStore.user.id_user)
const titre = ref(null)
const id_course = ref(null)
const category = ref(null)
id_course.value = route.params.id_course
category.value = route.params.category
async function envoi(){
    await fetch("http://localhost:8080/post",{
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
        console.log(data)
        document.location.href='http://localhost:5173/ecrire_post/' + data.id_post

    })
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

</style>