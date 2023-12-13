<script setup>
import {ref, computed, watch} from "vue";
import { useUrlStore } from "../../stores/url";
import CommentCompt from "../../components/Comments/CommentComp.vue";

const props = defineProps(['user', 'idPost'])
const user = ref(props.user)
const idPost = computed(()=>props.idPost)

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

function handleCreation(){
    createComment(0, comment)
}

const createComment = async (id_parent_comment, commentRef) => {
    let url = urlStore.api + "/comment"
    let data = {
        "id_post": idPost.value,
        "id_parent_comment": id_parent_comment,
        "content": commentRef.value
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
    commentRef.value = "";

    getNumberOfParents()
    getParents()
}

async function getNumberOfParents(){
    let url = urlStore.api + "/comment/" + idPost.value.toString() + "/total/parent"
    
    let resp = await fetch(url).then(resp => resp.json())

    nbParents.value = resp.total;
    
}

async function getParents(){
    let url = urlStore.api + "/comment/" + idPost.value.toString() + "/parent/" + (currentPage.value + 1).toString() + "/"+ amountPerPage.value.toString()
    
    comments.value = []
    comments.value = await fetch(url, {credentials: "include"}).then(resp => resp.json())
}

async function deleteComment(id_comment){
    let url = urlStore.api + "/comment/" + id_comment.toString()
    let setting = {
        method: "DELETE",
        credentials: "include"
    }
    let resp = await fetch(url, setting)
    if (resp.status == 204){
        console.log(resp.status)
        comments.value = comments.value.filter((e)=> e.id_comment != id_comment)
    }
}



getNumberOfParents()
getParents()
</script>

<template>
    <div class="comments">
        <div class="pages" v-if="nbPages > 0">
            <button class="page-button" @click="currentPage = (((currentPage - 1) % nbPages) + nbPages) % nbPages">-</button>
            <p class="page-display">{{ currentPage + 1 }}/{{nbPages}}</p>
            <button class="page-button" @click="currentPage = (currentPage + 1) % nbPages">+</button>
        </div>
        
        <div>
            <form @submit.prevent="handleCreation">
                <textarea class="area" v-model="comment" id="comment" name="comment" rows="4" placeholder="écrire un commentaire" required></textarea>            
                <div>
                    <button type="submit" class="commenter">commenter</button>
                </div>
            </form>
            <p>{{ message }}</p>
        </div>
        
        
        

        <div class="comment-space">
            <CommentCompt v-for="c in comments" :idPost="idPost" :idParent="null" :content="c" :user="user" :createComment="createComment" :parentName="null" @delete="deleteComment"></CommentCompt>
        </div>
    </div>
</template>

<style scoped>
.comments {
    display: flex;
    flex-direction: column;
    max-width: 25rem;
}

form {
    padding: 1rem 0rem 1rem 0rem;
    display: flex;
    flex-direction: column;
    max-width: 15rem;
}

.comment-space{
    display: flex;
    flex-direction: column;
}

.pages {
    display: flex;
    padding: 1rem 1rem 1rem 1rem;
    justify-content: center;
    max-width: 15rem;
}
.page-display {
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    color: rgb(78, 56, 88);
}
.page-button {
    border: solid 1px rgb(109, 83, 121);
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background-color: rgb(109, 83, 121);
    color: white;
    text-align: center;
    line-height: 0.1rem;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s;
}

.page-button:hover{
    background-color: white;
    color: rgb(109, 83, 121);
}

.area {
  width: 15rem;
  height: 3rem; 
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #f8f8f8;
  /* resize: none; */
  word-wrap: break-word;
}

.commenter {
    border: none;
    background-color: white;
    color: rgb(78, 56, 88);
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

</style>