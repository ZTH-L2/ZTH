<script setup>
import { useUrlStore } from "../stores/url";
import { useUserStore } from "../stores/user";

const props = defineProps(["id", "name", "year"]);
// See if user is subscribe to
const urlStore = useUrlStore();
const userStore = useUserStore();

// TO DO :

// Ceci pourrait etre fait dans un store.
// vérifier si l'utilisateur est abonné a cette filiere
// mettre un bouton pour s'abonner
// mettre un bouton pour se désabonner
</script>
<template>
  <div>
    <p>{{ props.year }} - {{ props.name }}</p>
  </div>
</template>
<style></style>
