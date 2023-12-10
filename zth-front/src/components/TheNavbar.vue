<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import SideBarMenu from "./SideBarMenu.vue";
import SideBarMe from "./SideBarMe.vue";

const userStore = useUserStore();
userStore.init()
const SideBarMenuState = ref(false);
const SideBarMeState = ref(false);

function toogle(a) {
  a.value = !a.value;
}

function toogleSideBarMenu() {
  toogle(SideBarMenuState);
}
function toogleSideBarMe() {
  toogle(SideBarMeState);
}
function logout(){
  toogleSideBarMe()
  userStore.logout()
}
</script>

<template>
  <div>
    <nav class="TheNavBar white-shadow">
      <div class="navElement">
        <button @click="toogleSideBarMenu" class="button">menu</button>
        <h2><RouterLink to="/" class="navElement">NoteSync</RouterLink></h2>
      </div>

      <div class="navElement" v-if="!userStore.isLoggedIn">
        <RouterLink to="/connexion">Connexion</RouterLink>
      </div>
      <div class="navElement" v-else>
        <button @click="toogleSideBarMe" class="button">Me</button>
      </div>
    </nav>
    <SideBarMenu
      id="SideBarMenu"
      v-if="SideBarMenuState"
      @side-bar-close-menu="toogleSideBarMenu"
    ></SideBarMenu>
    <SideBarMe
      id="SideBarMe"
      v-if="SideBarMeState"
      @side-bar-close-me="toogleSideBarMe"
      @logout="logout"
    ></SideBarMe>
  </div>
</template>

<style scoped>
.TheNavBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.white-shadow {
  background-color: #ffffff;
  box-shadow: -2px 7px 11px -11px rgba(0, 0, 0, 0.23);
}

.navElement {
  flex-direction: row;
  margin: 1rem;
  padding: 0.5rem;
}

.navElement * {
  display: inline-block;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

#SideBarMenu {
  position: absolute;
  top: 0px;
  left: 0px;
}


.button {
  background-color: #007BFF; /* Couleur de fond du bouton */
  color: white; /* Couleur du texte du bouton */
  padding: 10px 15px; /* Espacement interne du bouton */
  border: none; /* Supprimer la bordure du bouton */
  border-radius: 4px; /* Ajouter un peu de bord arrondi */
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s; /* Ajouter une transition pour une animation fluide */
}

.button:hover {
  background-color: #0056b3;
}

#SideBarMe {
  position: absolute;
  top: 0px;
  right: 0px;
}

.TheNavBar h2 a {
  color: inherit; /* Utilise la couleur par défaut du texte */
  text-decoration: none; /* Enlève le soulignement */
}
</style>