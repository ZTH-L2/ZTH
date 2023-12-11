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

// async function reply() {
//     let url = urlStore.api + "/comment"
//     let data = {
//         "id_post": idPost.value,
//         "id_parent_comment": id_parent_comment,
//         "content": comment.value
//     }
    
//     let setting = {
//         method: "POST",
//         credentials: "include",
//         body: JSON.stringify(data)
//     }

//     let resp = await fetch(url, setting).then(resp => resp.json())

//     if (resp instanceof Object && 'error' in resp){
//         console.log(resp.error)
//     }
//     message.value = "bien envoyé"
//     comment.value = "";

//     getNumberOfParents()
//     getParents()

// }

const wantsToReply = ref(false);
const replyComment = ref('');

const wantsToSeeReplies = ref(false)
const nbChildrens = ref(0)
const childrens = ref([])
const childrensPage = ref(0)
const amountChildrenPerPage = 5
const canSeeMore= computed(()=> nbChildrens.value > childrens.value.length)

function getNameCreator(){
    let url = urlStore.api + "/user/name/" + comment.value.id_user
    fetch(url, {credentials: "include"}).then(resp => resp.json()).then(data => comment.value.username = data.username)
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
async function seeReplies(){
    if (!wantsToSeeReplies.value){
        // charge first if empty
       
    }
    wantsToSeeReplies.value = !wantsToSeeReplies.value
}

async function getChildrensTest(){
    let url = urlStore.api + "/comment/" + idPost.value.toString() + "/parent/" + (currentPage.value + 1).toString() + "/"+ amountPerPage.value.toString()
    
    comments.value = []
    comments.value = await fetch(url, {credentials: "include"}).then(resp => resp.json())
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
                <button v-if="canSeeMore">Voir plus de réponses</button>
            </div>
        </div>

    </div>
</template>
<style>

</style>