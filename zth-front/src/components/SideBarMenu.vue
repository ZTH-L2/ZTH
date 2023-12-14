<script setup>
import { ref } from "vue";
import MajorComp from "./MajorComp.vue";
import { useUserStore } from "./../stores/user";
const userStore = useUserStore();

</script>

<template>
  <div class="sidebar-menu">
    <!-- HEADER -->
    <div class="sidebar-header-menu">
      <h2>Menu</h2>
      <button @click="$emit('SideBarCloseMenu')" class="button-menu">Close</button>
    </div>
    <!-- BODY -->
    <MajorComp v-if="userStore.isLoggedIn"></MajorComp>
  </div>
</template>

<style scoped>
.sidebar-menu {
  height: 100%;
  z-index: 100;
  width: 15rem;
  background-color: #ffffff;
}

.sidebar-header-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 4rem;
}

/* .sidebar-body-menu {
} */

.button-menu {
    background-color: rgb(78, 56, 88); /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid rgb(78, 56, 88);
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
.button-menu:hover {
    border: 1px solid rgb(78, 56, 88);
    background-color: white;
    color: rgb(78, 56, 88); /* Couleur du texte du bouton */
}
</style>
