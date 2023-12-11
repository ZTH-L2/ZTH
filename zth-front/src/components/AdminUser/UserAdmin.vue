<script setup>
import {ref, watch} from "vue";
import UserComp from "@/components/AdminUser/UserComp.vue"
import { useUrlStore } from "../../stores/url";

const userHeader = [
    "id",
    "mail",
    "username",
    "permission",
    "restricted",
    "first_connexion",
    "data_size"
]

const urlStore = useUrlStore()

const users = ref(null)

const currentPage = ref(0)
const amountPerPage = ref(10)
watch(currentPage, get_users);



function nextPage(){
    currentPage.value = currentPage.value + 1;
}

function previousPage(){
    let prev = currentPage.value - 1;
    currentPage.value =  prev >= 0 ? prev : 0;
}

async function get_users(){
    let url = urlStore.api
    let params = "/user" + "/"+ currentPage.value.toString() + "/" + amountPerPage.value.toString()
    users.value = await fetch(url + params, {
        credentials: "include"
    })
    .then((resp)=>{return resp.json()})
    .then((data)=>{return data})
}

async function deleteUser(id){
    console.log("fetch delete at ", id)
    let url = urlStore.api
    let params = "/user/" + id.toString()
    await fetch(url+params, {
        method: "DELETE",
        credentials: "include"
    })
    get_users()
}

get_users()

</script>
<template>
    <div >
        <div class="page-data">
            <button @click="previousPage">Page precedente</button>
            <button @click="nextPage">Page suivante</button>
            <p>page : {{ currentPage }}</p>
        </div>
        
        <div class="grid">
            <p v-for="el in userHeader">{{ el }}</p>
        </div>
        <UserComp v-for="user in users" :data="user" @delete-user="deleteUser"></UserComp>
    </div>
</template>

<style scoped>

.page-data{
    display: inline-block;
}

.grid {
    display: grid;
    grid-template-columns: repeat(8, 10rem);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

</style>