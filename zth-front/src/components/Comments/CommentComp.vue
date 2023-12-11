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
    <div>
        <p>user name : {{ comment.username }}</p>
        {{comment.content}}
        <button v-if="comment.id_user == user.id_user" @click="del = true">X</button>
        <PopUp v-if="del" message="Voulez vous vraiment supprimer ce commentaire ?" confirmMessage="supprimer" @confirm="$emit('delete', comment.id_comment)" @close="del = false"></PopUp>
        <!-- can't reply to your own comments -->
        <button v-if="comment.id_user != user.id_user" @click="wantsToReply = !wantsToReply">Répondre</button>
        
        <form v-if="wantsToReply" @submit.prevent="reply()">
            <textarea v-model="replyComment" id="c" name="c" rows="4" placeholder="rédiger votre réponse" required></textarea>            
            <button type="submit">commenter</button>
        </form>
        
        
        <div v-if="nbChildrens > 0">
            <button @click="seeReplies">Voir réponses</button>
            <div v-if="wantsToSeeReplies">
                <CommentComp v-for="c in childrens" :idPost="idPost" :idParent="comment.id_comment" :content="c" :user="user" :createComment="createComment" @delete="deleteComment"></CommentComp>
                <button v-if="canSeeMore" @click="getMoreReplies">Voir plus de réponses</button>
            </div>
        </div>

    </div>
</template>
<style>

</style>