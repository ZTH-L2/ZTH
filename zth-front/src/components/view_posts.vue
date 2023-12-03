<script setup>
import { ref } from 'vue'


</script>
<template> 
    <div id="mesPosts">   
        <Post v-for="post in posts" :id_post= "post[0]" :titre="post[2]" :createur="post[1]" :note="post[4]" :nbr_note="post[5]"></Post>
    </div>
</template>
<script>
    import Post from './view_post.vue'
    export default {
        name: 'Posts',
        props: ['id_course', 'category'],
        components:{
            Post,
        },
        data() {
            return {
                posts: null,
            };
        },
        async created() {
            this.posts = await fetch("http://localhost:8080/post/" + this.id_course + "/" + this.category,{
                credentials: 'include'
            }).then((Response)=>{
                console.log(Response)
                return Response.json()
            }).then((data)=>{
                console.log(data)
                return data
            })
        }
    }
</script>

<style scoped>

</style>