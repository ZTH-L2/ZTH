<script setup>
import {ref, watch} from "vue";
import PostComp from "@/components/AdminPost/PostComp.vue"
import { useUrlStore } from "../../stores/url";

const postHeader = [
    "id_post",
    "id_creator",
    "id_course",
    "title",
    "category",
    "date",
    "privacy",
    "published",
    "grade",
    "nb_note",
    "nb_report",
    "size",
    "text",
    "modification"

]

const urlStore = useUrlStore()

const posts = ref(null)

const currentPage = ref(0)
const amountPerPage = ref(10)

watch(currentPage, get_posts);

function nextPage(){
    currentPage.value = currentPage.value + 1;
}

function previousPage(){
    let prev = currentPage.value - 1;
    currentPage.value =  prev >= 0 ? prev : 0;
}

async function get_posts(){
    let url = urlStore.api
    let params = "/post" + "/"+ currentPage.value.toString() + "/" + amountPerPage.value.toString()
    posts.value = await fetch(url + params, {
        credentials: "include"
    })
    .then((resp)=>{return resp.json()})
    .then((data)=>{return data})
}

async function deletePost(id){
    console.log("fetch delete at ", id)
    let url = urlStore.api
    let params = "/post/admin/" + id.toString()
    await fetch(url+params, {
        method: "DELETE",
        credentials: "include"
    })
    get_posts()
}

get_posts()

</script>
<template>
    <div class="all">
        <div class="page-data">
            <button @click="previousPage">Page precedente</button>
            <p>page : {{ currentPage }}</p>
            <button @click="nextPage">Page suivante</button>
        </div>
        
        <div class="grid">
            <p v-for="el in postHeader" class="text-header">{{ el }}</p>
        </div>
        <PostComp v-for="post in posts" :data="post" @delete-post="deletePost"></PostComp>
    </div>
</template>

<style scoped>

.grid {
    grid-template-columns: repeat(14, 10rem);
}

</style>