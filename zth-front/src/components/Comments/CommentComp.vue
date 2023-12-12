<script setup>
import {ref, computed, onMounted} from "vue";
import { useUrlStore } from "../../stores/url";
import PopUp from "@/components/PopUp.vue";


const urlStore = useUrlStore()

const emit = defineEmits(['delete', 'reply'])
const props = defineProps(['user','idPost', 'idParent', 'content', 'createComment'])

const user = ref(props.user)
const idPost = ref(props.idPost)
const idParent = ref(props.idParent)
const comment = computed(()=>props.content)
const del = ref(false);
const createComment = computed(()=>props.createComment)
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
            <button v-if="comment.id_user == user.id_user" @click="del = true">X</button>
            </div>
            <div class="header">
                <p class="username">{{ comment.username }}</p>
            </div>
            <div class="content">
                <p>{{comment.content}}</p>
            </div>
        </div>
        
        
        <div class="replies">
            <!-- can't reply to your own comments -->
            <button v-if="comment.id_user != user.id_user" class="reply-button" @click="wantsToReply = !wantsToReply">Répondre</button>
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
                <button @click="seeReplies">Voir réponses</button>
                <div v-if="wantsToSeeReplies">
                    <CommentComp v-for="c in childrens" :idPost="idPost" :idParent="comment.id_comment" :content="c" :user="user" :createComment="createComment" @delete="deleteComment"></CommentComp>
                    <button v-if="canSeeMore" @click="getMoreReplies">Voir plus de réponses</button>
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
    padding: 1rem 1rem 1rem 1rem;
}

.my {
    position: relative;
}

.content {
    max-width: 20rem;
}


.username {

}

.annexe{
    position: absolute;
    top: 0px;
    right: 0px;
}

/* reply */
.reply-button, button {
    /* background-color: rgb(201, 139, 226); */
    /* border-radius: 6px;
    border-color: white;
    border-width: 1px;
    border-style: solid; */
    border: none;
    background-color: white;
    color: rgb(201, 139, 226);
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

/* .reply-button:hover {
    background-color: white;
    color: rgb(201, 139, 226);
    border-color: rgb(201, 139, 226);
    border-width: 1px;
} */

form {
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
}

.commmenter {
    border: none;
    background-color: white;
    color: rgb(201, 139, 226);
    text-align: center;
    text-decoration: none;
    display: inline-block;
}

</style>