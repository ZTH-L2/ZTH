<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import SideBarMenu from "./SideBarMenu.vue";
import SideBarMe from "./SideBarMe.vue";

const userStore = useUserStore();

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
</script>

<template>
  <div>
    <nav class="TheNavBar white-shadow">
      <div class="navElement">
        <button @click="toogleSideBarMenu">menu</button>
        <h2>NoteSync</h2>
      </div>

      <RouterLink to="/" class="navElement">Home</RouterLink>

      <div class="navElement" v-if="!userStore.isLoggedIn">
        <RouterLink to="/connexion">Connexion</RouterLink>
      </div>
      <div class="navElement" v-else>
        <button @click="toogleSideBarMe">Me</button>
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
    ></SideBarMe>
  </div>
</template>

<style>
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
#SideBarMe {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
