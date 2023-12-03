<template>
    <div class="affichage">
        <h1> mes posts : </h1>
        <Posts :id_course= 1 category= "cm"></Posts>
    </div>
</template>

<script setup>
import Posts from './../components/view_posts.vue'
</script>

<style scoped>
.affichage{
  margin-top: 5%;
  margin-left: 5%
}
</style>