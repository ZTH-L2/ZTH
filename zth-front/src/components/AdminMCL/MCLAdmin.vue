<script setup>
import {ref, watch} from "vue";
import MCLComp from "@/components/AdminMCL/MCLComp.vue"
import { useUrlStore } from "../../stores/url";

const mclHeader = [
    "id_majors_courses_link",
    "id_major",
    "id_course"
]

const urlStore = useUrlStore()

const mcls = ref(null)

const currentPage = ref(0)
const amountPerPage = ref(10)

watch(currentPage, get_mcls);

const idCourse = ref('');
const idMajor = ref('');
const customerror = ref(null);
const message = ref(null);

function nextPage(){
    currentPage.value = currentPage.value + 1;
}

function previousPage(){
    let prev = currentPage.value - 1;
    currentPage.value =  prev >= 0 ? prev : 0;
}

async function get_mcls(){
    let url = urlStore.api
    let params = "/majors_courses_link" + "/"+ currentPage.value.toString() + "/" + amountPerPage.value.toString()
    mcls.value = await fetch(url + params, {
        credentials: "include"
    })
    .then((resp)=>{return resp.json()})
    .then((data)=>{return data})
}

async function deleteMCL(id){
    console.log("fetch delete at ", id)
    let url = urlStore.api
    let params = "/majors_courses_link/" + id.toString()
    await fetch(url+params, {
        method: "DELETE",
        credentials: "include"
    })
    get_mcls()
}

async function createMCL(){
    if (!idMajor.value || !idCourse.value ) {
        customerror.value = "Remplir les champs"
        return;
    }
    let stop = false
    mcls.value.forEach((element) => {
        if (element[1] == idMajor.value && element[2] == idCourse.value){
            customerror.value = "Il y a déjà un lien avec ces matières"
            stop = true;
            return;
        }
    });
    if (stop){
        return
    }
    // fetch
    let url = urlStore.api + "/majors_courses_link"
    let data = {
        id_course: idCourse.value,
        id_major: idMajor.value
    }

    let res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(data => data)
    
    get_mcls()

    if ('error' in res){
        customerror.value = res.error;
    } else if ('message' in res) {
        message.value = res.message;
    }
    // Clear form fields
    idCourse.value = '';
    idMajor.value = '';

}

get_mcls()

</script>
<template>
    <div >
        <div class="page-data">
            <button @click="previousPage">Page precedente</button>
            <button @click="nextPage">Page suivante</button>
            <p>page : {{ currentPage }}</p>
        </div>
        
        <div class="grid">
            <p v-for="el in mclHeader">{{ el }}</p>
        </div>
        <MCLComp v-for="mcl in mcls" :data="mcl" @delete-mcl="deleteMCL"></MCLComp>

        <h4>Creer un major course link</h4>
        <form @submit.prevent="createMCL">
        <label for="idMajor">Id Major:</label>
        <input v-model="idMajor" type="text" id="idMajor" required />

        <label for="idCourse">Id Course:</label>
        <input v-model="idCourse" type="text" id="idCourse" required />

        <p v-if="customerror !== null">{{ customerror }}</p>
        <p v-if="message">{{ message }}</p>
        <button type="submit">Create major course link</button>
        </form>

    </div>
</template>

<style scoped>

.page-data{
    display: inline-block;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 10rem);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

</style>