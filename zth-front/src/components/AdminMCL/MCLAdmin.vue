<script setup>
import {ref, watch} from "vue";
import MCLComp from "@/components/AdminMCL/MCLComp.vue"
import { useUrlStore } from "../../stores/url";

const mclHeader = [
    "id_majors_courses_link",
    "id_major",
    "id_course",
    "modification",
]

const urlStore = useUrlStore()

const mcls = ref(null)

const currentPage = ref(0)
const amountPerPage = ref(5)

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
    <div class="all">
        <div class="page-data">
            <button class="page-admin-button" @click="previousPage">Page precedente</button>
            <p>page : {{ currentPage }}</p>
            <button class="page-admin-button" @click="nextPage">Page suivante</button>
        </div>
        
        <div class="grid">
            <p v-for="el in mclHeader" class="text-header">{{ el }}</p>
        </div>
        <MCLComp v-for="mcl in mcls" :data="mcl" @delete-mcl="deleteMCL"></MCLComp>

        <div class="creer">
            <form @submit.prevent="createMCL">
                <div class="champs">
                    <label for="idMajor">Id de la filière</label>
                    <input v-model="idMajor" type="text" id="idMajor" placeholder="Saisir texte" required />

                    <label for="idCourse">Id de la matière</label>
                    <input v-model="idCourse" type="text" id="idCourse" placeholder="Saisir texte" required />
                </div>
                
                <div class="message">
                    <p v-if="customerror !== null">{{ customerror }}</p>
                    <p v-if="message">{{ message }}</p>
                </div>
                <div class="creer-button">
                    <button class="page-admin-button" type="submit">Créer un lien filière - matière</button>
                </div>
            </form>
        </div>
        

    </div>
</template>

<style scoped>

.grid {
    /* display: grid; */
    grid-template-columns: repeat(4, 10rem);
    /* grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto); */
}

</style>