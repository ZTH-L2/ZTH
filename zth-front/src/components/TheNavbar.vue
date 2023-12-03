<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <nav>
    <!-- logo -->
    <!-- menu -->
    <div class="navElement">
      <button @click="$emit('toogleSideBarMenu')">menu</button>
    </div>
    <!-- home page-->
    <RouterLink to="/" class="navElement">Home</RouterLink>
    <!-- authentification -->
    <div class="navElement" v-if="userStore.loggedIn">
      <RouterLink to="/inscription">Inscription</RouterLink>
      <RouterLink to="/connexion">Connexion</RouterLink>
    </div>
    <div class="navElement" v-else>
      <button @click="$emit('toogleSideBarMe')">Me</button>
    </div>
  </nav>
</template>

<style>
nav {
  display: flex;
  background-color: lightblue;
  justify-content: space-between;
}
.navElement {
  flex-direction: row;
  background-color: lightcoral;
}
</style>
