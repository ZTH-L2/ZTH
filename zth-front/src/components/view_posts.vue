<script setup>
import { ref } from 'vue'

    const posts = ref([
  { id: 1, title: 'My journey with Vue', note:3, nbr_note : 15, createur : 'elian'},
  { id: 2, title: 'Blogging with Vue', note:2.3, nbr_note : 93, createur : 'elian'},
  { id: 3, title: 'Blogging with Vue', note:2.3, nbr_note : 93, createur : 'elian'},
  { id: 14, title: 'Blogging with Vue', note:2.3, nbr_note : 93, createur : 'elian'}
  
    ])
</script>
<template> 
    <div>   
        <Post v-for="post in posts" :id_post= "post.id" :titre="post.title" :createur="post.createur" :note="post.note" :nbr_note="post.nbr_note"></Post>
    </div>
</template>
<script>
    import Post from './view_post.vue'
    export default {
        name: 'Posts',
        components:{
            Post,
        }
    }
</script>

<style scoped>

</style>