<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import SideBarMenu from "./SideBarMenu.vue";
import SideBarMe from "./SideBarMe.vue";

const userStore = useUserStore();
// userStore.init()
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
        <button @click="toogleSideBarMenu" class="button" v-if="userStore.isLoggedIn">menu</button>
        <h2 class="main-title"><RouterLink to="/">NoteSync</RouterLink></h2>
      </div>
      <div class="navElement" v-if="!userStore.isLoggedIn">
        <RouterLink to="/connexion" class="button">Connexion</RouterLink>
      </div>
      <div class="navElement" v-else>
        <router-link to="/filiere" v-if="userStore.isLoggedIn" class="button" id="filieres">Filières</router-link>
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

.main-title {
  color: #4527A0;
}

#filieres{
  margin-right: 30px;
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
    background-color: #673AB7; /* Couleur de fond du bouton */
    color: white; /* Couleur du texte du bouton */
    padding: 10px 15px; /* Espacement interne du bouton */
    border: 1px solid #673AB7;
    border-radius: 4px; /* Ajouter un peu de bord arrondi */
    cursor: pointer;
    text-decoration: none;
    transition: all ease 0.3s;
}
.button:hover {
    border: 1px solid #673AB7;
    background-color: white;
    color: #673AB7; /* Couleur du texte du bouton */
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