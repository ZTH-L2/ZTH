<script setup>
import {ref, computed, onMounted} from "vue";
import { useUrlStore } from "../../stores/url";
import MarkdownIt from 'markdown-it';
const urlStore = useUrlStore()

const props = defineProps(['user','idPost', 'idParent', 'content'])
const user = ref(props.user)
const idPost = ref(props.idPost)
const idParent = ref(props.idParent)
const comment = computed(()=>props.content)

function getName(){
    console.log(comment.value.id_user)
    let url = urlStore.api + "/user/name/" + comment.value.id_user
    fetch(url, {credentials: "include"}).then(resp => resp.json()).then(data => comment.value.username = data.username)
}

onMounted(()=>{
    getName()
})



</script>

<template>
    <div>
        <p>user name : {{ comment.username }}</p>
        
        {{comment.content}}
    </div>
</template>
<style>

</style>