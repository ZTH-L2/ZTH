
<template>
  <div v-if="title" class="posts-container">
    <h2>Posts de {{ title }} :</h2>
    <div class="header">

      <router-link :to="{ name: 'creer_post', params: { id_course: id_course, category: category }}" class="router-link-button">
        Creer un post
      </router-link>
    </div>
    <div id="mesPosts">
      <Post v-for="post in posts" :key="post[0]" :id_post="post[0]" :titre="post[2]" :createur="post[1]" :note="post[4]" :nbr_note="post[5]" />
    </div>
  </div>
</template>


<script setup>
import { ref, watch, computed } from 'vue'
import Post from './view_post.vue'
import { useRoute } from 'vue-router'
import { useUrlStore } from "../stores/url";

const urlStore = useUrlStore();
const title = ref(null)
const posts = ref(null)
const id_course = ref(null)
const category = ref(null)

async function chargerDonnee(id_course, category){
  posts.value = await fetch(urlStore.api + "/post/" + id_course + "/" + category,{
    credentials: 'include'
  }).then((Response)=>{
      return Response.json()
  }).then((data)=>{
      return data
  })
  title.value = await fetch(urlStore.api + "/course/name/" + id_course,{
    credentials: 'include'
  }).then((Response)=>{
      return Response.json()
  }).then((data)=>{
      return data
})
}

const route = useRoute()

chargerDonnee(route.params.id_course, route.params.category) 

const flag = computed(()=>{
  return [route.params.id_course, route.params.category]
})

watch(flag, () => {
  id_course.value = route.params.id_course
  category.value = route.params.category
  chargerDonnee(route.params.id_course, route.params.category)
})

    
</script>

<style scoped>
.posts-container {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
}

.router-link-button {
  display: inline-block;
  padding: 10px 15px;
  background-color: #3498db;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-bottom: 30px;
}

.router-link-button:hover {
  background-color: #2980b9;
}
</style>