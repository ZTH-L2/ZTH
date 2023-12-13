<script setup>
import { ref } from "vue";
import { useUserStore } from '../stores/user';

import UserAdmin from '../components/AdminUser/UserAdmin.vue'
import PostAdmin from '../components/AdminPost/PostAdmin.vue'
import MajorAdmin from '../components/AdminMajor/MajorAdmin.vue'
import CourseAdmin from '../components/AdminCourse/CourseAdmin.vue'
import MCLAdmin from '../components/AdminMCL/MCLAdmin.vue'


const userStore = useUserStore()
// userStore.init()

const states = ref({
    user: "user",
    post: "post",
    major: "major",
    course: "course",
    majors_courses_link: "major_course_link"
});

const currentState = ref("user")

</script>
<template>
    <div>
        <div v-if="userStore.isAdmin">
            <div class="header">
                <h2 class="titre">Page d'administration</h2>
                <nav>
                    <ul class="states">
                        <li v-for="state in states" @click="currentState=state" class="state">
                            <button class="onglet" :class="{stateselected: currentState==state}">{{  state }}</button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <div class="content">
                <div v-if="currentState == states.user">
                    <UserAdmin></UserAdmin>
                </div>
                <div v-else-if="currentState == states.post">
                    <PostAdmin></PostAdmin>
                </div>
                <div v-else-if="currentState == states.major">
                    <MajorAdmin></MajorAdmin>
                </div>
                <div v-else-if="currentState == states.course">
                    <CourseAdmin></CourseAdmin>
                </div>
                <div v-else-if="currentState == states.majors_courses_link">
                    <MCLAdmin></MCLAdmin>
                </div>
            </div>
        </div>



        <div v-else>
            Vous n'êtes pas supposé avoir accès à cette page.
            Normalement vous ne pourrez pas faire grand chose.
            Merci de reporter ce bug aux créateurs du site.
        </div>
    </div>
</template>

<style scoped>

.header, .content{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header {
    margin-bottom: 3rem;
}

.titre {
    padding-top: 1rem ;
    padding-bottom: 1rem;
    margin-bottom: 3rem;
}

.states{
    display: flex;
    flex-direction: row;
}



.state {
    list-style: none;
    /* padding: 0rem 1rem 0rem 1rem; */
    margin: 0rem 1rem 0rem 1rem ; 
}

.onglet {
    width: 10rem;
}
.stateselected {
    border: 1px solid rgb(78, 56, 88);
    background-color: white;
    color: rgb(78, 56, 88); /* Couleur du texte du bouton */
}

.all {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    justify-content: center;
    align-items: center;
}

button {
    background-color: rgb(78, 56, 88); /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid rgb(78, 56, 88);
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
button:hover {
    border: 1px solid rgb(78, 56, 88);
    background-color: white;
    color: rgb(78, 56, 88); /* Couleur du texte du bouton */
}
.page-data{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    /* display: grid;
    grid-template-columns: 10rem 7rem 10rem;
    grid-template-rows: 2rem 2rem 2rem;
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto); */
}

.page-data button {
    width: 10rem;
}


.text-header {
    font-weight: bold;
    text-align: center;
}

.comp-element {
    text-align: center;
}


.page-data p {
    margin-left: 1rem;
    margin-right: 1rem;
}

.grid {
    /* display: flex;
    flex-direction: row; */

    display: grid;
    grid-template-columns: repeat(3, 10rem);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

/* .grid p{
    width: 10rem;
} */

.creer, .creer form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.creer label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.message {
    margin-top: 0.5rem;
}

.creer-button {
    margin-top: 1rem;
}

.champs {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.champs input {
    text-align: center;
}

.champs input::placeholder {
    text-align: center;
    font-style: italic;
}


</style>