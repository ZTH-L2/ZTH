<script setup>
import { ref } from "vue";
import { useUserStore } from '../stores/user';

import UserAdmin from '../components/AdminUser/UserAdmin.vue'
import PostAdmin from '../components/AdminPost/PostAdmin.vue'
import MajorAdmin from '../components/AdminMajor/MajorAdmin.vue'
import CourseAdmin from '../components/AdminCourse/CourseAdmin.vue'
import MCLAdmin from '../components/AdminMCL/MCLAdmin.vue'


const userStore = useUserStore()
userStore.init()

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
            <h3>Page d'administration</h3>
            <nav>
                <ul class="states">
                    <li v-for="state in states" @click="currentState=state" class="state">
                        <button>{{  state }}</button>
                    </li>
                </ul>
            </nav>


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







        <div v-else>
            Vous n'êtes pas supposé avoir accès à cette page.
            Normalement vous ne pourrez pas faire grand chose.
            Merci de reporter ce bug aux créateurs du site.
        </div>
    </div>
</template>

<style>


.states{
    display: flex;
    flex-direction: row;
}

.state {
    list-style: none;
    /* padding: 0rem 1rem 0rem 1rem; */
    margin: 0rem 1rem 0rem 1rem ;
    background-color: lightblue;

    
}
</style>