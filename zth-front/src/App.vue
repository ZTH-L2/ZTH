<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
</script>

<template>
  <head>
    <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'>  
  </head>
  <header id="home-page">
    <TheNavbar class="navbar"></TheNavbar>
  </header>
  <RouterView />
</template>

<style>
* {
  font-family: 'Lato' ;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  
}
</style>
