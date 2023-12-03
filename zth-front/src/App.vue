<script setup>
import { RouterView } from "vue-router";
import TheNavbar from "./components/TheNavbar.vue";
</script>

<template>
  <header>
    <TheNavbar></TheNavbar>
  </header>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
