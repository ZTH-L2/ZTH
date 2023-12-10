<script setup>
import {ref, computed, watch} from "vue";
import { useUrlStore } from "../../stores/url";
import CommentCompt from "@/components/Comments/CommentComp.vue";

const props = defineProps(['user', 'idPost'])
const user = ref(props.user)
const idPost = ref(props.idPost)

// counter only uses props.initialCounter as the initial value;
// it is disconnected from future prop updates.
const counter = ref(props.initialCounter)

const urlStore = useUrlStore()
const comment = ref("");
const message = ref("")

const nbParents = ref(0);
const amountPerPage = ref(10);
const currentPage = ref(0);
const nbPages = computed(()=>Math.ceil(nbParents.value / amountPerPage.value) )
const comments = ref(null)

watch (currentPage, ()=>{getParents()})
async function createComment(){
    let url = urlStore.api + "/comment"
    let data = {
        "id_post": idPost.value,
        "id_parent_comment": 0,
        "content": comment.value
    }
    
    let setting = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data)
    }

    let resp = await fetch(url, setting).then(resp => resp.json())

    if (resp instanceof Object && 'error' in resp){
        console.log(resp.error)
    }
    message.value = "bien envoyé"
    comment.value = "";

    getNumberOfParents()
    getParents()
}

async function getNumberOfParents(){
    let url = urlStore.api + "/comment/" + idPost.value.toString() + "/total/parent"
    
    let resp = await fetch(url).then(resp => resp.json())

    nbParents.value = resp.total;
    
}

async function getParents(){
    "/comment/1/parent/1/10"
    let url = urlStore.api + "/comment/" + idPost.value.toString() + "/parent/" + (currentPage.value + 1).toString() + "/"+ amountPerPage.value.toString()
    
    comments.value = []
    comments.value = await fetch(url, {credentials: "include"}).then(resp => resp.json())
}

getNumberOfParents()
getParents()
</script>

<template>
    <div>
        <h3>Commentaires</h3>
        
        <form @submit.prevent="createComment">
            <label for="comment">No label</label>
            <textarea v-model="comment" id="comment" name="comment" rows="4" placeholder="écrire un commentaire" required></textarea>            
            <button type="submit">commenter</button>
        </form>
        <p>{{ message }}</p>
        <p>page de commentaire :{{ currentPage + 1 }}/{{ nbPages }}</p>
        <button @click="currentPage = (currentPage + 1) % nbPages">Page suivante</button>
        <button @click="currentPage = (((currentPage - 1) % nbPages) + nbPages) % nbPages">Page précédente</button>
        <CommentCompt v-for="c in comments" :idPost="idPost" :idParent="null" :content="c" :user="user"></CommentCompt>
    </div>
</template>
<style>

</style>