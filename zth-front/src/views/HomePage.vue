<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div id="home">
    <section id="hero-section" class="home-section">MY HERO SECTION</section>
    <section class="home-section">OTHER INFORMATION</section>
    <section class="home-section">
      <router-link to="/filiere">Filières</router-link>
    </section>
  </div>
</template>

<style></style>
