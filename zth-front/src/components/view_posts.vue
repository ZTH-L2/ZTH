
<template> 
    <div id="mesPosts">   
        <Post v-for="post in posts" :id_post= "post[0]" :titre="post[2]" :createur="post[1]" :note="post[4]" :nbr_note="post[5]"></Post>
    </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import Post from './view_post.vue'
import { useCourseStore } from "./../stores/course";
import { useRoute } from 'vue-router'

const courseStore = useCourseStore();
const posts = ref(null)
async function chargerDonnee(id_course, category){
  posts.value = await fetch("http://localhost:8080/post/" + id_course + "/" + category,{
    credentials: 'include'
}).then((Response)=>{
    console.log(Response)
    return Response.json()
}).then((data)=>{
    console.log(data)
    return data
})
}

const route = useRoute()

chargerDonnee(route.params.id_course, route.params.category) 
// const flag = computed(()=>{
//   return [courseStore.id_course, courseStore.category]
// })
const flag = computed(()=>{
  return [route.params.id_course, route.params.category]
})

watch(flag, () => {
  chargerDonnee(route.params.id_course, route.params.category)
})

    
</script>

<style scoped>

</style>