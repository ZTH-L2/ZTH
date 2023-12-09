<script setup>
import {ref, watch} from "vue";
import CourseComp from "@/components/AdminCourse/CourseComp.vue"
import { useUrlStore } from "../../stores/url";

const courseHeader = [
    "id_course",
    "name",
]

const urlStore = useUrlStore()

const courses = ref(null)

const currentPage = ref(0)
const amountPerPage = ref(10)

watch(currentPage, get_courses);

const courseName = ref('');
const customerror = ref(null);
const message = ref(null);


function nextPage(){
    currentPage.value = currentPage.value + 1;
}

function previousPage(){
    let prev = currentPage.value - 1;
    currentPage.value =  prev >= 0 ? prev : 0;
}

async function get_courses(){
    let url = urlStore.api
    let params = "/course/"+ currentPage.value.toString() + "/" + amountPerPage.value.toString()
    courses.value = await fetch(url + params, {
        credentials: "include"
    })
    .then((resp)=>{return resp.json()})
    .then((data)=>{return data})
}

async function deleteCourse(id){
    console.log("fetch delete at ", id)
    let url = urlStore.api
    let params = "/course/" + id.toString()
    await fetch(url+params, {
        method: "DELETE",
        credentials: "include"
    })
    get_courses()
}

async function createCourse(){
    if (!courseName.value) {
        customerror.value = "Remplir les champs"
        return;
    }
    let stop = false
    courses.value.forEach((element) => {
        if (element[1] == courseName.value){
            customerror.value = "Il y a déjà une matiere avec ce nom"
            stop = true;
            return;
        }
    });
    if (stop){
        return
    }
    // fetch
    let url = urlStore.api + "/course"
    let data = {
        name: courseName.value
    }

    let res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data)
    }).then(resp => resp.json()).then(data => data)
    
    get_courses()

    if ('error' in res){
        customerror.value = res.error;
    } else if ('message' in res) {
        message.value = res.message;
    }
    // Clear form fields
    courseName.value = '';
}

get_courses()

</script>
<template>
    <div >
        <div class="page-data">
            <button @click="previousPage">Page precedente</button>
            <button @click="nextPage">Page suivante</button>
            <p>page : {{ currentPage }}</p>
        </div>
        
        <div class="grid">
            <p v-for="el in courseHeader">{{ el }}</p>
        </div>
        <CourseComp v-for="course in courses" :data="course" @delete-course="deleteCourse"></CourseComp>

        <div>
            <h4>Creer une matiere</h4>
            <form @submit.prevent="createCourse">
            <label for="courseName">Course Name:</label>
            <input v-model="courseName" type="text" id="courseName" required />

            <p v-if="customerror !== null">{{ customerror }}</p>
            <p v-if="message">{{ message }}</p>
            <button type="submit">Create course</button>
            </form>
        </div>
    </div>
</template>

<style scoped>

.page-data{
    display: inline-block;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, 10rem);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

</style>