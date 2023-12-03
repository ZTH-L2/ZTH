<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{ name: 'voir_post', params: {id_course: 1, category:'cm'}}">voir</RouterLink>
        <RouterLink to="/inscription" >Inscription</RouterLink>
        <RouterLink to="/connexion">Connexion</RouterLink>

      </nav>
  </header>

  <RouterView/>
</template>

