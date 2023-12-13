<script setup>
import {ref, computed, onMounted} from "vue";
import { useUrlStore } from "../../stores/url";
import PopUp from "@/components/PopUp.vue";


const urlStore = useUrlStore()

const emit = defineEmits(['delete', 'reply'])
const props = defineProps(['user','idPost', 'idParent', 'content', 'createComment', 'parentName'])

const user = ref(props.user)
const idPost = ref(props.idPost)
const idParent = ref(props.idParent)
const comment = computed(()=>props.content)
const del = ref(false);
const createComment = computed(()=>props.createComment)
const parentName = computed(()=>props.parentName)
const hover = ref(false)

async function reply(){
    await createComment.value(comment.value.id_comment, replyComment)
    getNbChildrens()
}

const wantsToReply = ref(false);
const replyComment = ref('');

const wantsToSeeReplies = ref(false)
const nbChildrens = ref(0)
const childrens = ref([])
// the api expect the first page to be 1 cause it do : (page-1) * amount
const childrensPage = ref(1)
const amountChildrenPerPage = ref(5)
const canSeeMore= computed(()=> nbChildrens.value > childrens.value.length)


function getNameCreator(){
    let url = urlStore.api + "/user/name/" + comment.value.id_user
    fetch(url, {credentials: "include"}).then(resp => resp.json()).then(data => comment.value.username = data.username)
}

function deleteComment(id_comment){
    childrens.value = childrens.value.filter((e)=> e.id_comment != id_comment)
    emit('delete', id_comment)
}


async function getNbChildrens(){
    let url = urlStore.api + "/comment/" + idPost.value + "/total/enfantof/" + comment.value.id_comment.toString()
    let r = await fetch(url, {credientials: "include"})
    if (r.status == 200){
        let resp = await r.json()
        nbChildrens.value = resp.total
    } else {
        console.log("status: ",r.status)
    }
}

async function getChildrens(){
    // /id_post/enfantof/id_parent/page/nb_by_page
    let url = urlStore.api + "/comment/" + idPost.value + "/enfantof/" + comment.value.id_comment.toString() + "/"
                    + childrensPage.value.toString() + "/" + amountChildrenPerPage.value.toString()
    let r = await fetch(url, {credientials: "include"})
    if (r.status == 200){
        let resp = await r.json()
        resp.forEach(element => {
            childrens.value.push(element)
        });
        console.log(childrens.value)
        childrensPage.value +=1
    } else {
        console.log(r.status)
    }
}

async function seeReplies(){
    if (!wantsToSeeReplies.value){
        if (childrens.value.length == 0){
            getChildrens()
        }
    }
    wantsToSeeReplies.value = !wantsToSeeReplies.value
}

async function getMoreReplies(){
    if (canSeeMore){
        getChildrens()
    }
}


onMounted(()=>{
    getNameCreator()
    getNbChildrens()
})



</script>

<template>
    <div class="comment" >
        <div class="my" @mouseover="hover=true" @mouseleave="hover=false">
            <div class="annexe" v-if="hover">
                <button v-if="comment.id_user != user.id_user" class="reply-button" @click="wantsToReply = !wantsToReply">Répondre</button>
                <button v-if="comment.id_user == user.id_user" @click="del = true" class="delete-button">X</button>
            </div>
            <div class="header">
                <p class="username">
                    {{ comment.username }}
                    <p v-if="parentName != null" class="parentname">
                          {{ " à " + parentName }}
                    </p>
                </p>
            </div>
            <div class="content">
                <p>{{comment.content}}</p>
            </div>
        </div>
        
        
        <div class="replies">
            <!-- can't reply to your own comments -->
            <div class="form">
                <form v-if="wantsToReply" @submit.prevent="reply()">
                    <div>
                        <textarea class="area" v-model="replyComment" id="c" name="c" rows="4" placeholder="rédiger votre réponse" required></textarea>            
                    </div>
                    <div>
                        <button type="submit" class="commmenter">commenter</button>
                    </div>
                </form>
            </div>
            <div v-if="nbChildrens > 0">
                <div class="seeReplies">
                    <button @click="seeReplies">{{ wantsToSeeReplies ? "masquer" : "voir les réponses"}}</button>
                </div>
                <div v-if="wantsToSeeReplies">
                    <CommentComp v-for="c in childrens" :idPost="idPost" :idParent="comment.id_comment" :content="c" :user="user" :createComment="createComment" :parentName="comment.username" @delete="deleteComment"></CommentComp>
                    <div class="seeReplies">
                        <button v-if="canSeeMore" @click="getMoreReplies">Voir plus de réponses</button>
                    </div>
                    
                </div>
            </div>
        </div>
        
        
        
       
        

        <PopUp v-if="del" message="Voulez vous vraiment supprimer ce commentaire ?" confirmMessage="supprimer" @confirm="$emit('delete', comment.id_comment)" @close="del = false"></PopUp>

    </div>
</template>

<style scoped>
.comment {
    
    /* display: flex; */
    /* flex-direction: column; */
    /* margin: 1rem 1rem 1rem 1rem; */
    max-width: 25rem;
    padding: 1rem 0rem 1rem 0rem;
}

.my {
    position: relative;
}

.content {
    word-wrap: break-word;
    overflow: hidden;
}


.username {
    font-size: large;
    font-weight: bold;
    color: rgb(78, 56, 88);
    display: flex;
    flex-direction: row;
}
.parentname {
    margin-left: 0.5rem;
    font-size: large;
    font-weight: normal;
    color: rgb(78, 56, 88);
}

.annexe{
    position: absolute;
    top: 0px;
    right: 0px;
}


/* reply */
.reply-button {
    /* background-color: rgb(201, 139, 226); */
    /* border-radius: 6px;
    border-color: white;
    border-width: 1px;
    border-style: solid; */
    border: none;
    background-color: white;
    color: rgb(78, 56, 88);
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

.delete-button {
    border: none;
    background-color: white;
    color: rgb(197, 51, 40);
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    display: inline-block;
}

.seeReplies {
    display: flex;
    justify-content: center;
}
.seeReplies button {
    border: none;
    background-color: white;
    color: rgb(78, 56, 88);
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

form {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.area {
  width: 20rem;
  height: 3rem; 
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #f8f8f8;
  /* resize: none; */
  word-wrap: break-word;
}

.commmenter {
    border: none;
    background-color: white;
    color: rgb(78, 56, 88);
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

</style>