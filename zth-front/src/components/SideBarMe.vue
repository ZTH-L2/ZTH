<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
// userStore.init();
</script>

<template>
  <div class="sidebar-me">
    <!-- HEADER -->
    <div class="sidebar-header-me">
      <p>{{ userStore.user.username }}</p>
      <button @click="$emit('SideBarCloseMe')" class="button-me">Close</button>
    </div>
    <!-- BODY -->
    <div class="sidebar-body-me">
      <nav class="nav-me">
        <router-link :to="{ name: 'profil', params: { id: userStore.id_user, username: userStore.username }}" @click="$emit('SideBarCloseMe')" class="button-me">Me</router-link>
        <RouterLink to="/" @click="$emit('logout')" class="button-me">Logout</RouterLink>
        <RouterLink v-if="userStore.isAdmin" to="/admin" @click="$emit('SideBarCloseMe')" class="button-me">page admin</RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.sidebar-me {
  height: 100%;
  z-index: 100;
  width: 15rem;
  background-color: #ffffff;
}

.sidebar-header-me {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
}

.nav-me {
  display: flex;
  flex-direction: column; /* Aligner les boutons verticalement */
  gap: 0.5rem; /* Espacement entre les boutons */
  flex-wrap: wrap;
  align-items: center;
}

.nav-me * {
  width: 5rem;
  text-align: center;
}

.button-me {
    background-color: rgb(78, 56, 88); /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid rgb(78, 56, 88);
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
.button-me:hover {
    border: 1px solid rgb(78, 56, 88);
    background-color: white;
    color: rgb(78, 56, 88); /* Couleur du texte du bouton */
}
</style>
