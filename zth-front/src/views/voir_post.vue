<template>
    <div class="affichage">
        <h1> mes posts : </h1>
        <Posts></Posts>
    </div>
</template>

<script>
import Posts from './../components/view_posts.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

export default {
 // setup(){
 //   const route = useRoute()
 //   watch(
 //     () => route.params,
 //     newId => {
 //       this.id_course = newId.id_user
 //     },
 //   )
 // },
data() {
  return {
    id_course: null,
    id_category: null
    };
  },
  components: {
    Posts,
  },
  created() {
    this.id_course = this.$route.params.id_course
    this.category = this.$route.params.category
  },
  //conmputed:{
  //  id_course(){
  //    console.log("azezae")
  //    return this.$route.params.id_course
  //  },
  //  category(){
  //    console.log("bzezae")
  //    return this.$route.params.category
  //  }
  //  
  //}

};
</script>

<style scoped>
.affichage{
  margin-top: 5%;
  margin-left: 5%
}
</style>