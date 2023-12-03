<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/voir_post" >voir</RouterLink>
        <RouterLink to="/inscription" >Inscription</RouterLink>
        <RouterLink to="/connexion">Connexion</RouterLink>

      </nav>
  </header>

  <RouterView/>
</template>

