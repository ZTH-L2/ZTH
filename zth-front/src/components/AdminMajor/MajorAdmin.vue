<script setup>
import {ref, watch} from "vue"
import MajorComp from '@/components/AdminMajor/MajorComp.vue';
import { useUrlStore } from "../../stores/url"

const majorHeader = [
    "id_major",
    "name",
    "year",
    "modification"
]

const urlStore = useUrlStore()

const majors = ref(null)
const currentPage = ref(0)
const amountPerPage = ref(5)
watch(currentPage, get_majors);

const majorName = ref('');
const majorYear = ref('');
const customerror = ref(null);
const message = ref(null);

function nextPage(){
    currentPage.value = currentPage.value + 1;
}
function previousPage(){
    let prev = currentPage.value - 1;
    currentPage.value =  prev >= 0 ? prev : 0;
}
async function get_majors(){
    let url = urlStore.api
    let params = "/major/"+ currentPage.value.toString() + "/" + amountPerPage.value.toString()
    majors.value = await fetch(url + params, {
        credentials: "include"
    })
    .then((resp)=>{return resp.json()})
    .then((data)=>{return data})
}
async function deleteMajor(id){
    console.log("fetch delete at ", id)
    let url = urlStore.api
    let params = "/major/" + id.toString()
    await fetch(url+params, {
        method: "DELETE",
        credentials: "include"
    })
    get_majors()
}

async function createMajor(){
    if (!majorName.value || !majorYear.value) {
        customerror.value = "Remplir les champs"
        return;
    }
    let stop = false
    majors.value.forEach((element) => {
        if (element[1] == majorName.value && element[2] == majorYear.value){
            customerror.value = "Il y a déjà un major avec ce nom et année"
            stop = true;
            return;
        }
    });
    if (stop){
        return
    }
    // fetch
    let url = urlStore.api + "/major"
    let data = {
        name: majorName.value,
        year: majorYear.value
    }

    let res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(data => data)
    
    get_majors()

    if ('error' in res){
        customerror.value = res.error;
    } else if ('message' in res) {
        message.value = res.message;
    }
    // Clear form fields
    majorName.value = '';
    majorYear.value = '';
}


get_majors()

</script>
<template>
    <div class="all">
        <div class="page-data">
            <button @click="previousPage">Page precedente</button>
            <p>page : {{ currentPage }}</p>
            <button @click="nextPage">Page suivante</button>
        </div>
        
        <div class="grid">
            <p v-for="el in majorHeader" class="text-header">{{ el }}</p>
        </div>
        <MajorComp v-for="major in majors" :data="major" @delete-major="deleteMajor"></MajorComp>

        <div class="creer">
            <form @submit.prevent="createMajor">
                <div class="champs">
                    <label for="majorName">Nom de la filière</label>
                    <input v-model="majorName" type="text" id="majorName" placeholder="Saisir texte" required />

                    <label for="majorYear">Année de la filière</label>
                    <input v-model="majorYear" type="text" id="majorYear" placeholder="Saisir texte" required />
                </div>
                
                <div class="message">
                    <p v-if="customerror !== null">{{ customerror }}</p>
                    <p v-if="message">{{ message }}</p>
                </div>
                <div class="creer-button">
                    <button type="submit">créer un major</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

.grid {
    grid-template-columns: repeat(4, 10rem);
}


</style>